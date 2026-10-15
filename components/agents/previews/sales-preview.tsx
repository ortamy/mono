/**
 * Превью кейса sales-agent-b2b: воронка лидов, диалоги и календарь демо.
 *
 * Уникальный архетип (не KPI+график+источники). Размеры в cqw, цвета
 * инлайновые из DARK — макет не перекрашивается темой страницы.
 */
import { DARK } from '@/components/design/previews/mono-tokens';
import type { AgentSalesPreview } from '@/data/agent-cases';

export default function SalesPreview({ data }: { data: AgentSalesPreview }) {
  const C = DARK;
  const max = Math.max(...data.funnel.map((s) => s.value), 1);

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-[1.4cqw] overflow-hidden px-[2.4cqw] py-[1.8cqw]" style={{ background: C.bg, color: C.ink }}>
      <section className="min-w-0 rounded-[1cqw] border px-[1.5cqw] py-[1.2cqw]" style={{ borderColor: C.line, background: C.panel }}>
        <div className="flex items-center justify-between gap-[1cqw]">
          <span className="truncate text-[1.45cqw] font-semibold tracking-[-0.02em]">Воронка лидов</span>
          <span className="shrink-0 text-[1.1cqw]" style={{ color: C.muted }}>30 дней</span>
        </div>
        <ul className="mt-[0.9cqw] flex flex-col gap-[0.7cqw]">
          {data.funnel.map((stage, i) => {
            const next = data.funnel[i + 1];
            const conv = next ? Math.round((next.value / stage.value) * 100) : null;
            const width = (stage.value / max) * 100;
            return (
              <li key={stage.label} className="flex min-w-0 items-center gap-[0.8cqw]">
                <span className="w-[6.2cqw] shrink-0 truncate text-[1.15cqw]" style={{ color: C.muted }}>{stage.label}</span>
                <span className="w-[4.2cqw] shrink-0 text-right text-[1.35cqw] font-semibold tabular-nums tracking-[-0.03em]">{stage.value}</span>
                <div className="h-[1.35cqw] min-w-0 flex-1 overflow-hidden rounded-full" style={{ background: C.soft }}>
                  <div className="h-full rounded-full" style={{ width: width + '%', background: C.ink }} />
                </div>
                <span className="w-[3.6cqw] shrink-0 text-right text-[1.1cqw] tabular-nums" style={{ color: C.faint }}>
                  {conv !== null ? conv + '%' : ''}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-2 gap-[1.4cqw] overflow-hidden">
        <section className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
          <div className="shrink-0 px-[1.4cqw] pt-[1.1cqw] text-[1.25cqw] font-semibold">Диалоги в работе</div>
          <ul className="mt-[0.5cqw] flex min-h-0 flex-col gap-[0.7cqw] overflow-hidden px-[1cqw] pb-[0.8cqw]">
            {data.dialogues.map((d) => (
              <li key={d.name} className="flex min-w-0 items-center gap-[0.7cqw]">
                <span className="flex h-[2.4cqw] w-[2.4cqw] shrink-0 items-center justify-center rounded-full text-[0.95cqw] font-semibold" style={{ background: C.ink, color: C.bg }} aria-hidden>
                  {d.initials}
                </span>
                <span className="w-[7cqw] shrink-0 truncate text-[1.2cqw] font-medium">{d.name}</span>
                <span className="w-[4.6cqw] shrink-0 text-[1.1cqw] tabular-nums" style={{ color: C.muted }}>ICP {d.icp}</span>
                <span className="min-w-0 flex-1 truncate text-[1.1cqw]" style={{ color: C.muted }}>{d.last}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
          <div className="shrink-0 px-[1.4cqw] pt-[1.1cqw] text-[1.25cqw] font-semibold">Демо на неделю</div>
          <div className="mt-[0.8cqw] grid grid-cols-5 gap-[0.4cqw] px-[1.2cqw]">
            {data.weekDays.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-[0.35cqw]">
                <span className="text-[1.05cqw]" style={{ color: C.muted }}>{day}</span>
                <span className="flex h-[1.9cqw] w-[1.9cqw] items-center justify-center rounded-full" style={{ background: data.demoDays[i] ? C.ink : C.soft }} aria-hidden>
                  {data.demoDays[i] ? <span className="h-[0.55cqw] w-[0.55cqw] rounded-full" style={{ background: C.bg }} /> : null}
                </span>
              </div>
            ))}
          </div>
          <ul className="mt-[0.6cqw] flex min-h-0 flex-col gap-[0.55cqw] px-[1.4cqw] pb-[0.8cqw]">
            {data.demos.map((demo) => (
              <li key={demo.time + demo.name} className="flex min-w-0 items-center gap-[0.8cqw] text-[1.2cqw]">
                <span className="w-[7cqw] shrink-0 tabular-nums" style={{ color: C.muted }}>{demo.time}</span>
                <span className="min-w-0 truncate font-medium">{demo.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}