/** Карточка кейса AI-агента в сетке /agents: превью, тип агента и метрики. */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { AgentCase } from '@/data/agent-cases';
import AgentCaseScreenshot from './agent-case-screenshot';
import { AGENT_CASE_ICONS } from './agent-case-icons';

export default function AgentCaseCard({ item }: { item: AgentCase }) {
  const Icon = AGENT_CASE_ICONS[item.preview];

  return (
    <article className="d-card d-hover-line group relative overflow-hidden">
      {/* Растянутая ссылка на кейс: клик по карточке открывает детали. */}
      <Link
        href={`/agents/work/${item.slug}/`}
        className="absolute inset-0 z-[1]"
        aria-label={`${item.title} — открыть кейс`}
      />

      {/* Превью — рабочий экран агента, свёрстанный в мокапе браузера. */}
      <div className="relative">
        <AgentCaseScreenshot item={item} />
      </div>

      <div className="pointer-events-none relative z-[1] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] d-faint">
            <Icon size={13} strokeWidth={1.6} aria-hidden /> {item.agentType}
          </span>
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
        <p className="mt-2 text-[14px] leading-[1.6] d-muted">{item.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--d-line)] pt-4">
          {item.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <div className="text-[15px] font-semibold text-[var(--d-ink)] tabular-nums">{m.value}</div>
              <div className="text-[11px] d-faint">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
