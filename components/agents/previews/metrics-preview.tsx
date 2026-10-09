/**
 * Превью «дашборд метрик агента»: KPI-плитки, график и таблица значений.
 *
 * Параметризовано контентом: sales-агент, аналитик маркетплейса и
 * контент-агент используют одну схему с разными данными (см.
 * components/agents/agent-previews.tsx). Размеры в cqw — см. chat-preview.
 */
import { DARK, LIGHT } from '@/components/design/previews/mono-tokens';

const LINE = '0,30 12,24 24,26 36,16 48,20 60,10 72,14 84,6 100,9';

export default function MetricsPreview({
  tone = 'light',
  title,
  period,
  kpis,
  chartLabel,
  chartDelta,
  rows,
}: {
  tone?: 'light' | 'dark';
  /** Заголовок дашборда. */
  title: string;
  /** Период в бейдже справа сверху. */
  period: string;
  /** Ровно 4 пары «подпись → значение». */
  kpis: [string, string][];
  /** Подпись графика и дельта справа от неё. */
  chartLabel: string;
  chartDelta: string;
  /** Строки таблицы «подпись → значение». */
  rows: [string, string][];
}) {
  const C = tone === 'dark' ? DARK : LIGHT;
  return (
    <div className="flex h-full w-full flex-col px-[2.6cqw] py-[2.2cqw]" style={{ background: C.bg, color: C.ink }}>
      <div className="flex items-center justify-between gap-[2cqw]">
        <span className="truncate text-[2cqw] font-semibold tracking-[-0.03em]">{title}</span>
        <span
          className="shrink-0 whitespace-nowrap rounded-[0.7cqw] border px-[1.4cqw] py-[0.65cqw] text-[1.15cqw]"
          style={{ borderColor: C.line, color: C.muted }}
        >
          {period}
        </span>
      </div>

      <div className="mt-[1.8cqw] grid grid-cols-4 gap-[1.3cqw]">
        {kpis.map(([label, value]) => (
          <div key={label} className="overflow-hidden rounded-[1cqw] border p-[1.4cqw]" style={{ borderColor: C.line, background: C.panel }}>
            <div className="truncate text-[1.05cqw]" style={{ color: C.muted }}>{label}</div>
            <div className="truncate text-[2cqw] font-bold tracking-[-0.05cqw] tabular-nums">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-[1.5cqw] rounded-[1cqw] border p-[1.5cqw]" style={{ borderColor: C.line, background: C.panel }}>
        <div className="flex items-center justify-between text-[1.15cqw]" style={{ color: C.muted }}>
          <span>{chartLabel}</span>
          <span className="tabular-nums" style={{ color: C.ink }}>{chartDelta}</span>
        </div>
        <svg viewBox="0 0 100 34" preserveAspectRatio="none" className="mt-[1.2cqw] h-[7cqw] w-full" aria-hidden>
          {[8, 17, 26].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={C.lineSoft} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          ))}
          <polyline points={LINE} fill="none" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="mt-[1.5cqw] overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex items-center justify-between px-[1.5cqw] py-[0.95cqw] text-[1.15cqw] ${i > 0 ? 'border-t' : ''}`}
            style={{ borderColor: C.lineSoft }}
          >
            <span className="min-w-0 truncate" style={{ color: C.muted }}>{label}</span>
            <span className="shrink-0 font-medium tabular-nums">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
