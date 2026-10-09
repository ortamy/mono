/**
 * Кейс «Traq» — тёмная консоль наблюдаемости для разработчиков.
 * Архетип: окно с живым потоком логов слева и панелью метрик
 * с sparkline справа. Всё моноширинное — как в терминале.
 */
import { DARK as C } from './mono-tokens';

const LOGS: [string, string, string, string][] = [
  ['12:04:11', 'INFO', 'GET /cart 200', '42 ms'],
  ['12:04:12', 'WARN', 'payment retry 2/3', '1.2 s'],
  ['12:04:12', 'ERROR', 'gateway timeout', '5.0 s'],
  ['12:04:13', 'INFO', 'cache warm', '8 ms'],
  ['12:04:14', 'INFO', 'POST /order 201', '96 ms'],
];

const SPARK = '0,26 10,20 20,24 30,14 40,18 50,9 60,13 70,6 80,10 90,4 100,7';

export default function TraqPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ background: C.bg }}>
      <div
        className="absolute h-[80%] w-[46%] rounded-full blur-[10cqw]"
        style={{ background: 'rgba(250,250,250,0.05)' }}
        aria-hidden
      />

      <div
        className="relative flex h-[90%] w-[90%] flex-col overflow-hidden rounded-[1.6cqw] border font-mono"
        style={{ background: C.panel, borderColor: C.line, color: C.ink }}
      >
        <div className="flex items-center gap-[1.4cqw] border-b px-[2.2cqw] py-[1.4cqw]" style={{ borderColor: C.line }}>
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-full" style={{ background: C.line }} />
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-full" style={{ border: `1px solid ${C.line}` }} />
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-full" style={{ border: `1px solid ${C.line}` }} />
          <span className="min-w-0 truncate text-[1.2cqw]" style={{ color: C.muted }}>traq — checkout-api · prod</span>
          <span className="ml-auto flex items-center gap-[0.8cqw] text-[1.1cqw]" style={{ color: C.muted }}>
            <span className="h-[1.1cqw] w-[1.1cqw] rounded-full" style={{ background: C.ink }} />
            live
          </span>
        </div>

        <div className="flex flex-1 gap-[2cqw] p-[2.2cqw]">
          {/* Поток логов */}
          <div className="flex w-[62%] min-w-0 flex-col gap-[0.4cqw] text-[1.15cqw] leading-[1.9]">
            {LOGS.map(([t, lvl, msg, ms], i) => {
              const hot = lvl === 'ERROR';
              const warn = lvl === 'WARN';
              return (
                <div
                  key={i}
                  className="flex min-w-0 items-center gap-[1.2cqw] rounded-[0.4cqw] px-[1cqw]"
                  style={hot ? { background: C.soft } : undefined}
                >
                  <span className="shrink-0 tabular-nums" style={{ color: C.faint }}>{t}</span>
                  <span
                    className="shrink-0 rounded-[0.3cqw] px-[0.8cqw]"
                    style={
                      hot
                        ? { background: C.ink, color: C.bg }
                        : warn
                          ? { border: `1px solid ${C.line}`, color: C.muted }
                          : { color: C.muted }
                    }
                  >
                    {lvl}
                  </span>
                  <span className="min-w-0 flex-1 truncate" style={{ color: hot ? C.ink : C.muted }}>{msg}</span>
                  <span className="shrink-0 tabular-nums" style={{ color: C.faint }}>{ms}</span>
                </div>
              );
            })}
          </div>

          {/* Метрики и sparkline */}
          <div className="flex w-[38%] flex-col gap-[1.4cqw]">
            <div className="rounded-[1cqw] border p-[1.6cqw]" style={{ borderColor: C.line, background: C.bg }}>
              <div className="flex items-center justify-between text-[1.1cqw]" style={{ color: C.muted }}>
                <span>latency p95</span>
                <span className="tabular-nums" style={{ color: C.ink }}>182 ms</span>
              </div>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-[1.4cqw] h-[7cqw] w-full" aria-hidden>
                <polyline points={SPARK} fill="none" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            {[
              ['error rate', '0,7%'],
              ['requests/s', '1 240'],
              ['instances', '6 / 6'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b pb-[0.9cqw] text-[1.1cqw]" style={{ borderColor: C.lineSoft }}>
                <span style={{ color: C.muted }}>{k}</span>
                <span className="tabular-nums">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
