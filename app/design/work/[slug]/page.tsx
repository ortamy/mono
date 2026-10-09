import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Send } from 'lucide-react';
import { DESIGN_CASES, getDesignCase } from '@/data/design-cases';
import CaseMock from '@/components/design/case-mock';

/**
 * Страница кейса портфолио: /design/work/[slug].
 *
 * Статически генерируется из DESIGN_CASES при сборке — каждый кейс
 * получает свой URL, metadata и 404 для неизвестных slug (notFound).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return DESIGN_CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getDesignCase(slug);
  if (!item) return { title: 'Кейс не найден' };
  return {
    // absolute: не даёт корневому шаблону приклеить «| mono» — кейс живёт
    // в портфолио, а не на главной студии.
    title: { absolute: `${item.title} — UX/UI дизайнер | Портфолио` },
    description: `${item.category}, ${item.year}. ${item.summary}`,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: 'article',
      locale: 'ru_RU',
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getDesignCase(slug);
  if (!item) notFound();

  // Соседний кейс для навигации «дальше» — по кругу.
  const index = DESIGN_CASES.findIndex((c) => c.slug === item.slug);
  const next = DESIGN_CASES[(index + 1) % DESIGN_CASES.length];

  return (
    <article>
      {/* Верх: назад + мета */}
      <header className="mx-auto max-w-[1100px] px-5 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/design/#work"
          className="inline-flex items-center gap-2 text-[13px] d-muted transition-colors hover:text-[var(--d-ink)]"
        >
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden /> Назад к работам
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-[24px]" aria-hidden>{item.emoji}</span>
          <span className="rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
            {item.category} · {item.year}
          </span>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3.5 text-[12px] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-soft)]"
            >
              Открыть живой сайт <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
            </a>
          ) : null}
        </div>

        <h1 className="mt-4 max-w-[760px] text-[clamp(28px,5vw,44px)] font-bold leading-[1.1] tracking-[-1.5px] text-[var(--d-ink)]">
          {item.title}
        </h1>
        <p className="mt-4 max-w-[620px] text-[16px] leading-[1.65] d-muted">{item.summary}</p>
      </header>

      {/* Превью — живой макет первого экрана. */}
      <div className="mx-auto mt-10 max-w-[1100px] px-5 sm:px-8">
        <div className="overflow-hidden rounded-xl border border-[var(--d-line)]">
          <div className="relative aspect-[16/10]">
            <CaseMock screen={item.screens[0]} palette={item.palette} />
          </div>
        </div>
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

      {/* Задача / Решение / Результат */}
      <div className="mx-auto mt-14 max-w-[820px] px-5 sm:px-8">
        <section className="border-t border-[var(--d-line)] py-8">
          <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Задача</h2>
          <p className="mt-3 text-[16px] leading-[1.7] text-[var(--d-ink)]">{item.task}</p>
        </section>

        <section className="border-t border-[var(--d-line)] py-8">
          <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Решение</h2>
          <p className="mt-3 text-[16px] leading-[1.7] text-[var(--d-ink)]">{item.solution}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.services.map((s) => (
              <li key={s} className="rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-[var(--d-line)] py-8">
          <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Результат</h2>
          <p className="mt-3 text-[16px] leading-[1.7] text-[var(--d-ink)]">{item.result}</p>
        </section>
      </div>

      {/* Экраны */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
        <h2 className="text-[13px] uppercase tracking-[0.08em] d-faint">Экраны проекта</h2>
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
              <figcaption className="px-4 py-3 text-[13px] d-muted">{screen.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Навигация + CTA */}
      <section className="d-surface border-t border-[var(--d-line)]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-[12px] d-faint">Следующий проект</p>
            <Link
              href={`/design/work/${next.slug}/`}
              className="mt-1 inline-flex items-center gap-2 text-[17px] font-semibold text-[var(--d-ink)] hover:underline"
            >
              {next.emoji} {next.title}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer" className="d-btn d-btn-ghost">
                Живой сайт <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
              </a>
            ) : null}
            <a href="/design/#contact" className="d-btn d-btn-primary">
              <Send size={15} strokeWidth={1.5} aria-hidden /> Обсудить проект
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}