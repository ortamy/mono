/** Две колонки «Раньше / Сейчас»: красный vs зелёный акцент и пара цифр. */
import { CheckCircle, XCircle } from 'lucide-react';
import type { AgentCase } from '@/data/agent-cases';

export default function AgentBeforeAfter({
  item,
  compact = false,
}: {
  item: AgentCase;
  compact?: boolean;
}) {
  const pad = compact ? 'p-3' : 'p-4 sm:p-5';
  const titleSize = compact
    ? 'text-[11px] tracking-[0.06em]'
    : 'text-[12px] font-semibold tracking-[0.08em]';
  const statSize = compact ? 'text-[15px]' : 'text-[20px]';
  const bodySize = compact ? 'text-[12px] leading-[1.55]' : 'text-[14px] leading-[1.65]';
  const iconSize = compact ? 12 : 16;
  const TitleTag = compact ? 'p' : 'h2';

  return (
    <div className={`grid grid-cols-2 gap-3 ${compact ? 'mt-4' : 'mt-3'}`}>
      <div className={`rounded-lg ${compact ? 'bg-[var(--d-soft)]' : 'd-card'} ${pad}`}>
        <TitleTag className={`flex items-center gap-1.5 uppercase text-agentos-down ${titleSize}`}>
          <XCircle size={iconSize} strokeWidth={1.8} aria-hidden />
          Раньше
        </TitleTag>
        <p className={`mt-1.5 font-semibold tabular-nums tracking-[-0.3px] text-agentos-down ${statSize}`}>
          {item.beforeStat}
        </p>
        <p className={`mt-1.5 d-muted ${bodySize}`}>{item.before}</p>
      </div>
      <div className={`rounded-lg ${compact ? 'bg-[var(--d-soft)]' : 'd-card'} ${pad}`}>
        <TitleTag className={`flex items-center gap-1.5 uppercase text-agentos-up ${titleSize}`}>
          <CheckCircle size={iconSize} strokeWidth={1.8} aria-hidden />
          Сейчас
        </TitleTag>
        <p className={`mt-1.5 font-semibold tabular-nums tracking-[-0.3px] text-agentos-up ${statSize}`}>
          {item.afterStat}
        </p>
        <p className={`mt-1.5 text-[var(--d-ink)] ${bodySize}`}>{item.after}</p>
      </div>
    </div>
  );
}
