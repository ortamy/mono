import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';
import { AGENT_CASES, getAgentCase } from '@/data/agent-cases';
import CaseMock from '@/components/design/case-mock';
import AgentCaseScreenshot from '@/components/agents/agent-case-screenshot';
import { AGENT_CASE_ICONS } from '@/components/agents/agent-case-icons';
import { buildMetadata } from '@/lib/meta';

/**
 * Страница кейса AI-агента: /agents/work/[slug].
 *
 * Статически генерируется из AGENT_CASES при сборке — каждый кейс получает
 * свой URL, metadata и 404 для неизвестных slug (notFound). Структура и
 * визуал — как у /design/work/[slug]: тот же CaseMock для экранов и общий
 * мокап превью, только контент про агентов.
 */

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

      {/* Стек и интеграции */}
      <div className="mx-auto mt-8 max-w-[820px] px-5 sm:px-8">
        <section className="border-y border-[var(--d-line)] py-6">
          <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Стек и интеграции</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <li key={s} className="rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>
      {/* Экраны */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
        <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Экраны агента</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {item.screens.map((screen) => (
            <figure key={screen.title} className="d-card overflow-hidden">
              <div className="d-screen-bar" aria-hidden>
                <span className="d-screen-dot" />
                <span className="d-screen-dot" />
                <span className="d-screen-dot" />
              </div>
              <div className="relative aspect-[16/10]">
                <CaseMock screen={screen} palette={item.palette} />
              </div>
              <figcaption className="px-4 py-3">
                <span className="block text-[14px] font-semibold text-[var(--d-ink)]">{screen.title}</span>
                <span className="mt-1 block text-[13px] leading-[1.6] d-muted">{screen.desc}</span>
              </figcaption>
            </figure>
          ))}
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
