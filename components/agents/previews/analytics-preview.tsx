/**
 * Превью кейса marketplace-analyst: чат с агентом, KPI с контекстом и SKU.
 *
 * Уникальный архетип (не KPI+график+источники). Размеры в cqw, цвета
 * инлайновые из LIGHT — макет не перекрашивается темой страницы.
 */
import { LIGHT } from '@/components/design/previews/mono-tokens';
import type { AgentAnalyticsPreview } from '@/data/agent-cases';

export default function AnalyticsPreview({ data }: { data: AgentAnalyticsPreview }) {
  const C = LIGHT;

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-[1.3cqw] overflow-hidden px-[2.4cqw] py-[1.8cqw]" style={{ background: C.bg, color: C.ink }}>
      <section className="min-w-0 rounded-[1cqw] border px-[1.5cqw] py-[1.2cqw]" style={{ borderColor: C.line, background: C.panel }}>
        <div className="text-[1.1cqw] font-medium" style={{ color: C.muted }}>Чат с агентом</div>
        <div className="mt-[0.8cqw] flex flex-col gap-[0.7cqw]">
          <div className="max-w-[78%] self-start rounded-[1cqw] px-[1.3cqw] py-[0.8cqw] text-[1.25cqw] leading-[1.35]" style={{ background: C.soft, color: C.ink }}>
            {data.question}
          </div>
          <div className="max-w-[86%] self-end rounded-[1cqw] px-[1.3cqw] py-[0.8cqw] text-[1.25cqw] leading-[1.35]" style={{ background: C.ink, color: C.bg }}>
            <div>{data.answer}</div>
            <div className="mt-[0.35cqw] text-[1.05cqw] opacity-70">Источники: {data.sources}</div>
          </div>
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-2 gap-[1.1cqw]">
        {data.kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0 overflow-hidden rounded-[1cqw] border px-[1.4cqw] py-[1.1cqw]" style={{ borderColor: C.line, background: C.panel }}>
            <div className="truncate text-[1.1cqw]" style={{ color: C.muted }}>{kpi.label}</div>
            <div className="mt-[0.15cqw] truncate text-[1.9cqw] font-bold tracking-[-0.04em] tabular-nums">{kpi.value}</div>
            <div className="mt-[0.15cqw] truncate text-[1.1cqw] tabular-nums" style={{ color: kpi.up ? C.ink : C.muted }}>{kpi.delta}</div>
          </div>
        ))}
      </section>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
        <div className="shrink-0 px-[1.4cqw] pt-[1cqw] text-[1.25cqw] font-semibold">SKU под вниманием</div>
        <ul className="mt-[0.4cqw] flex flex-col pb-[0.5cqw]">
          {data.skus.map((sku, i) => (
            <li
              key={sku.code}
              className={'flex min-w-0 items-center gap-[0.8cqw] px-[1.4cqw] text-[1.2cqw]' + (i > 0 ? ' border-t' : '')}
              style={{ borderColor: C.lineSoft, minHeight: '2.6cqw' }}
            >
              <span className="w-[5.6cqw] shrink-0 tabular-nums" style={{ color: C.muted }}>{sku.code}</span>
              <span className="min-w-0 flex-1 truncate">{sku.name}</span>
              <span className="shrink-0 font-medium tabular-nums">{sku.margin}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}