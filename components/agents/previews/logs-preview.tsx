/**
 * Превью «поток логов агента»: журнал шагов (сбор данных, инструменты)
 * слева и сводные метрики справа. Всё моноширинное — как в терминале.
 *
 * Параметризовано контентом — см. components/agents/agent-previews.tsx.
 * Размеры в cqw — см. chat-preview.tsx.
 */
import { DARK, LIGHT } from '@/components/design/previews/mono-tokens';

const SPARK = '0,26 10,20 20,24 30,14 40,18 50,9 60,13 70,6 80,10 90,4 100,7';

export interface LogsPreviewRow {
  time: string;
  level: 'info' | 'warn' | 'error';
  msg: string;
}

export default function LogsPreview({
  tone = 'dark',
  title,
  sub,
  rows,
  sparkLabel,
  sparkValue,
  stats,
}: {
  tone?: 'light' | 'dark';
  /** Название процесса в шапке окна. */
  title: string;
  /** Статус справа в шапке, например «12 сайтов · каждый час». */
  sub: string;
  rows: LogsPreviewRow[];
  /** Метрика со sparkline. */
  sparkLabel: string;
  sparkValue: string;
  /** Строки «подпись → значение» под графиком. */
  stats: [string, string][];
}) {
  const C = tone === 'dark' ? DARK : LIGHT;
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ background: C.bg }}>
      <div
        className="relative flex h-[92%] w-[92%] flex-col overflow-hidden rounded-[1.6cqw] border font-mono"
        style={{ background: C.panel, borderColor: C.line, color: C.ink }}
      >
        {/* Шапка окна: точки, название процесса, статус. */}
        <div className="flex items-center gap-[1.3cqw] border-b px-[2.1cqw] py-[1.3cqw]" style={{ borderColor: C.line }}>
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full" style={{ background: C.line }} />
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full" style={{ border: `1px solid ${C.line}` }} />
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full" style={{ border: `1px solid ${C.line}` }} />
          <span className="min-w-0 truncate text-[1.15cqw]" style={{ color: C.muted }}>{title}</span>
          <span className="ml-auto flex shrink-0 items-center gap-[0.7cqw] text-[1.05cqw]" style={{ color: C.muted }}>
            <span className="h-[1cqw] w-[1cqw] rounded-full" style={{ background: C.ink }} aria-hidden />
            {sub}
          </span>
        </div>

        <div className="flex flex-1 gap-[1.8cqw] p-[2cqw]">
          {/* Журнал шагов */}
          <div className="flex w-[62%] min-w-0 flex-col gap-[0.4cqw] text-[1.1cqw] leading-[1.9]">
            {rows.map((row, i) => {
              const hot = row.level === 'error';
              const warn = row.level === 'warn';
              return (
                <div
                  key={i}
                  className="flex min-w-0 items-center gap-[1.1cqw] rounded-[0.4cqw] px-[0.9cqw]"
                  style={hot ? { background: C.soft } : undefined}
                >
                  <span className="shrink-0 tabular-nums" style={{ color: C.faint }}>{row.time}</span>
                  <span
                    className="shrink-0 rounded-[0.3cqw] px-[0.7cqw]"
                    style={
                      hot
                        ? { background: C.ink, color: C.bg }
                        : warn
                          ? { border: `1px solid ${C.line}`, color: C.muted }
                          : { color: C.muted }
                    }
                  >
                    {row.level}
                  </span>
                  <span className="min-w-0 flex-1 truncate" style={{ color: hot ? C.ink : C.muted }}>{row.msg}</span>
                </div>
              );
            })}
          </div>

          {/* Метрики и sparkline */}
          <div className="flex w-[38%] flex-col gap-[1.3cqw]">
            <div className="rounded-[1cqw] border p-[1.5cqw]" style={{ borderColor: C.line, background: C.bg }}>
              <div className="flex items-center justify-between text-[1.05cqw]" style={{ color: C.muted }}>
                <span className="min-w-0 truncate">{sparkLabel}</span>
                <span className="shrink-0 tabular-nums" style={{ color: C.ink }}>{sparkValue}</span>
              </div>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-[1.2cqw] h-[6.5cqw] w-full" aria-hidden>
                <polyline points={SPARK} fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            {stats.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b pb-[0.85cqw] text-[1.05cqw]" style={{ borderColor: C.lineSoft }}>
                <span className="min-w-0 truncate" style={{ color: C.muted }}>{label}</span>
                <span className="shrink-0 tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
