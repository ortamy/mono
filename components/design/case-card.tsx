/** Карточка кейса в сетке портфолио: градиентное превью + метрики. */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { DesignCase } from '@/data/design-cases';

export default function CaseCard({ item }: { item: DesignCase }) {
  return (
    <Link
      href={`/design/work/${item.slug}/`}
      className="d-card d-hover-line group block overflow-hidden"
      aria-label={`${item.title} — открыть кейс`}
    >
      {/* Превью: градиент по нише + сетка-заглушка (см. .d-preview). */}
      <div className="d-preview aspect-[4/3]" style={{ background: item.gradient }}>
        <span className="absolute left-4 top-4 z-10 text-[26px]" aria-hidden>
          {item.emoji}
        </span>
        <span className="absolute right-4 top-4 z-10 rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--d-ink)]">
          {item.year}
        </span>
      </div>

      <div className="p-5 sm:p-6">
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
      </div>
    </Link>
  );
}