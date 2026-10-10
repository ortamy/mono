import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';
import { AGENT_CASES, getAgentCase } from '@/data/agent-cases';
import AgentCaseScreenshot from '@/components/agents/agent-case-screenshot';
import { AGENT_CASE_ICONS } from '@/components/agents/agent-case-icons';
import { AGENT_SCREENS } from '@/components/agents/agent-screens';
import AgentArchitecture from '@/components/agents/agent-architecture';
import { AgentStackRow } from '@/components/agents/agent-stack-logos';
import { buildMetadata } from '@/lib/meta';

/**
 * Страница кейса AI-агента: /agents/work/[slug].
 *
 * Статически генерируется из AGENT_CASES при сборке — каждый кейс получает
 * свой URL, metadata и 404 для неизвестных slug (notFound). Структура и
 * визуал — как у /design/work/[slug]: общий мокап превью и четыре экрана,
 * мокап превью, только контент про агентов.
 */

/** Тип экрана → ярлык в подписи к экрану. */
const SCREEN_KIND_LABELS: Record<string, string> = {
  chat: 'Чат',
  grid: 'Сетка',
  terminal: 'Лог',
  economics: 'Дашборд',
  form: 'Форма',
  feed: 'Лента',
  funnel: 'Воронка',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return AGENT_CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getAgentCase(slug);
  if (!item) return { title: 'Кейс не найден' };
  return buildMetadata({
    title: `${item.title} — AI-агент`,
    description: `${item.agentType}. ${item.subtitle}`,
    path: `/agents/work/${slug}`,
  });
}

export default async function AgentCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getAgentCase(slug);
  if (!item) notFound();

  // Соседний кейс для навигации «дальше» — по кругу.
  const index = AGENT_CASES.findIndex((c) => c.slug === item.slug);
  const next = AGENT_CASES[(index + 1) % AGENT_CASES.length];

  const CaseIcon = AGENT_CASE_ICONS[item.preview];
  const NextIcon = AGENT_CASE_ICONS[next.preview];

  return (
    <article>
      {/* Верх: назад + мета */}
      <header className="mx-auto max-w-[1100px] px-5 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/agents/#work"
          className="inline-flex items-center gap-2 text-[13px] d-muted transition-colors hover:text-[var(--d-ink)]"
        >
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden /> Назад к кейсам
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
            <CaseIcon size={18} strokeWidth={1.6} />
          </span>
          <span className="rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
            AI-агент · {item.agentType}
          </span>
        </div>

        <h1 className="mt-4 max-w-[760px] text-[clamp(28px,5vw,44px)] font-bold leading-[1.1] tracking-[-1.5px] text-[var(--d-ink)]">
          {item.title}
        </h1>
        <p className="mt-4 max-w-[620px] text-[16px] leading-[1.65] d-muted">{item.subtitle}</p>
      </header>

      {/* Превью — рабочий экран агента. */}
      <div className="mx-auto mt-10 max-w-[1100px] px-5 sm:px-8">
        <AgentCaseScreenshot item={item} />
      </div>

      {/* Метрики */}
      <div className="mx-auto mt-8 max-w-[1100px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {item.metrics.map((m) => (
            <div key={m.label} className="d-card p-5 text-center sm:text-left">
              <div className="text-[clamp(24px,3.5vw,30px)] font-bold tabular-nums text-[var(--d-ink)]">
                {m.value}
              </div>
              <div className="mt-1 text-[13px] d-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Стек и архитектура */}
      <div className="mx-auto mt-8 max-w-[1100px] px-5 sm:px-8">
        <section className="border-y border-[var(--d-line)] py-6">
          <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Стек и интеграции</h2>
          <AgentStackRow stack={item.stack} />
        </section>
        <section className="border-b border-[var(--d-line)] py-6">
          <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Архитектура агента</h2>
          <div className="mt-4">
            <AgentArchitecture nodes={item.architecture} />
          </div>
        </section>
      </div>
      {/* Экраны — hi-fi макеты из AGENT_SCREENS, не CaseMock. */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
        <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Экраны агента</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {item.screens.map((screen, i) => {
            const ScreenView = AGENT_SCREENS[item.preview][i];
            return (
              <figure key={screen.title} className="d-card overflow-hidden">
                <div className="d-screen-bar" aria-hidden>
                  <span className="d-screen-dot" />
                  <span className="d-screen-dot" />
                  <span className="d-screen-dot" />
                </div>
                <div className="relative aspect-[16/10] [container-type:inline-size]">
                  {ScreenView ? <ScreenView /> : null}
                </div>
                <figcaption className="px-4 py-3">
                  <div className="flex flex-wrap items-baseline gap-2">
                  <span className="inline-flex items-center rounded-full bg-[var(--d-soft)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--d-ink)]">{SCREEN_KIND_LABELS[screen.kind] ?? screen.kind}</span>
                  <span className="block text-[14px] font-semibold text-[var(--d-ink)]">{screen.title}</span>
                  <span className="mt-1.5 block max-w-[60ch] text-[13px] leading-[1.65] d-muted">{screen.desc}</span>
                </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Навигация + CTA */}
      <section className="d-surface border-t border-[var(--d-line)]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-[12px] d-faint">Следующий кейс</p>
            <Link
              href={`/agents/work/${next.slug}/`}
              className="mt-1 inline-flex items-center gap-2 text-[17px] font-semibold text-[var(--d-ink)] hover:underline"
            >
              <NextIcon size={17} strokeWidth={1.6} aria-hidden /> {next.title}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/agents/#contact" className="d-btn d-btn-primary">
              <Send size={15} strokeWidth={1.5} aria-hidden /> Обсудить агента
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
