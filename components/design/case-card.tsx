/** Карточка кейса в сетке портфолио: свёрстанный первый экран + метрики. */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { DesignCase } from '@/data/design-cases';
import CaseScreenshot from './case-screenshot';

export default function CaseCard({ item }: { item: DesignCase }) {
  return (
    <article className="d-card d-hover-line group relative overflow-hidden">
      {/* Растянутая ссылка на кейс: клик по карточке открывает детали. */}
      <Link
        href={`/design/work/${item.slug}/`}
        className="absolute inset-0 z-[1]"
        aria-label={`${item.title} — открыть кейс`}
      />

      {/* Превью — первый экран проекта, свёрстанный в мокапе браузера. */}
      <div className="relative">
        <CaseScreenshot item={item} />
        <span className="pointer-events-none absolute bottom-3 right-3 z-[3] rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--d-ink)]">
          {item.year}
        </span>
      </div>

      <div className="pointer-events-none relative z-[1] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.08em] d-faint">{item.category}</span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="d-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--d-ink)]"
            aria-hidden
          />
        </div>

        <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.3px] text-[var(--d-ink)]">
          {item.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] d-muted">{item.summary}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--d-line)] pt-4">
          {item.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <div className="text-[15px] font-semibold text-[var(--d-ink)] tabular-nums">{m.value}</div>
              <div className="text-[11px] d-faint">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Прямая ссылка на живой проект (если он есть). */}
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto relative z-[2] mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--d-ink)] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Живой сайт
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}
