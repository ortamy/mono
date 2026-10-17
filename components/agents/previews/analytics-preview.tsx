/**
 * Превью кейса marketplace-analyst: чат слева, дашборд справа — две карточки
 * одинаковой высоты. Размеры в cqw, цвета инлайновые из LIGHT.
 */
import { LIGHT } from '@/components/design/previews/mono-tokens';
import type { AgentAnalyticsPreview } from '@/data/agent-cases';

export default function AnalyticsPreview({ data }: { data: AgentAnalyticsPreview }) {
  const C = LIGHT;

  return (
    <div className="grid h-full w-full min-w-0 grid-cols-2 gap-[0.9cqw] overflow-hidden px-[2cqw] py-[1.4cqw]" style={{ background: C.bg, color: C.ink }}>
      {/* ===== ЛЕВАЯ КАРТОЧКА: ЧАТ ===== */}
      <section className="flex h-full min-w-0 flex-col overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
        {/* Шапка: подпись на одной линии с субзаголовком */}
        <div className="shrink-0 px-[1.2cqw] pb-[0.3cqw] pt-[0.9cqw]">
          <div className="flex items-center justify-between gap-[0.6cqw]">
            <span className="truncate text-[1.1cqw] font-semibold tracking-[-0.02em]" style={{ color: C.ink }}>ЧАТ</span>
            <span className="truncate text-[0.85cqw] uppercase tracking-[0.1em]" style={{ color: C.faint }}>вопрос к данным словами</span>
          </div>
        </div>

        {/* Тело: сообщения чата слева + источники справа */}
        <div className="flex min-h-0 min-w-0 flex-1 gap-[0.7cqw] px-[1.2cqw] py-[0.6cqw]">
          {/* Сообщения чата — время мелким приглушённым шрифтом */}
          <div className="flex min-w-0 flex-1 flex-col gap-[0.45cqw] overflow-y-auto">
            {data.messages.map((m, i) => (
              <div
                key={i}
                className={
                  'max-w-[84%] rounded-[1cqw] px-[1cqw] py-[0.6cqw] text-[1.1cqw] leading-[1.4] ' +
                  (m.from === 'agent' ? 'self-end' : 'self-start')
                }
                style={m.from === 'agent' ? { background: C.ink, color: C.bg } : { background: C.soft, color: C.ink }}
              >
                <span>{m.text}</span>
                <span className="block text-[0.8cqw] leading-none tracking-[-0.02em]" style={{ color: C.faint }}>
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Правая колонка: источники — таблица 2 колонки */}
          <div className="flex w-[42%] shrink-0 flex-col overflow-hidden border-l" style={{ borderColor: C.lineSoft }}>
            <div className="shrink-0 pb-[0.4cqw] text-[0.85cqw] uppercase tracking-[0.12em]" style={{ color: C.faint }}>
              Источники
            </div>
            <ul className="flex flex-1 flex-col">
              {data.sourceList.map((s, i) => (
                <li
                  key={s.name}
                  className={
                    'flex min-w-0 items-start justify-between gap-[0.5cqw] py-[0.45cqw] text-[0.95cqw] leading-[1.4]' +
                    (i > 0 ? ' border-t' : '')
                  }
                  style={{ borderColor: C.lineSoft }}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{s.name}</span>
                    <span className="block truncate text-[0.8cqw]" style={{ color: C.muted }}>
                      {s.cabinet} · {s.updated}
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.8cqw]" style={{ color: C.muted }}>
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-[0.4cqw] text-[0.75cqw] leading-none" style={{ color: C.muted }}>
              6 источников
            </span>
          </div>
        </div>

        {/* Нижний блок: контекст запроса */}
        <div className="mt-auto flex shrink-0 items-center gap-[0.5cqw] px-[1.2cqw] pb-[0.9cqw] pt-[0.4cqw] text-[0.85cqw] leading-[1.45]" style={{ color: C.muted }}>
          <span className="h-[0.7cqw] w-[0.7cqw] shrink-0 rounded-full" style={{ background: C.ink }} aria-hidden />
          <span className="min-w-0">{data.contextBlock}</span>
        </div>
      </section>

      {/* ===== ПРАВАЯ КАРТОЧКА: ДАШБОРД ===== */}
      <section className="flex h-full min-w-0 flex-col overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
        {/* Шапка */}
        <div className="shrink-0 px-[1.2cqw] pb-[0.3cqw] pt-[0.9cqw]">
          <div className="flex items-center justify-between gap-[0.6cqw]">
            <span className="truncate text-[1.1cqw] font-semibold tracking-[-0.02em]" style={{ color: C.ink }}>ДАШБОРД</span>
            <span className="truncate text-[0.85cqw] uppercase tracking-[0.1em]" style={{ color: C.faint }}>сводка продаж</span>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-[0.7cqw] overflow-hidden px-[1.2cqw] py-[0.6cqw]">
          {/* KPI: 2x2, выровнено по базовой линии */}
          <div className="grid shrink-0 grid-cols-2 gap-[0.6cqw]">
            {data.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="min-w-0 overflow-hidden rounded-[1cqw] border px-[1cqw] py-[0.8cqw]"
                style={{ borderColor: C.line, background: C.panel }}
              >
                <div className="truncate text-[0.9cqw]" style={{ color: C.muted }}>{kpi.label}</div>
                <div className="mt-[0.1cqw] flex items-baseline gap-[0.5cqw]">
                  <span className="text-[1.6cqw] font-bold leading-none tracking-[-0.04em] tabular-nums" style={{ color: C.ink }}>{kpi.value}</span>
                  {kpi.delta ? (
                    <span className="shrink-0 text-[0.85cqw] tabular-nums" style={{ color: C.muted }}>{kpi.delta}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Ответ агента: расширенный блок */}
          <div className="w-2/5 min-w-0 shrink-0 rounded-[1cqw] border px-[1cqw] py-[0.7cqw]" style={{ borderColor: C.line, background: C.panel }}>
            <div className="text-[0.8cqw] uppercase tracking-[0.12em]" style={{ color: C.faint }}>Ответ агента</div>
            <ul className="mt-[0.4cqw] flex flex-col gap-[0.3cqw]">
              {data.agentResponse.map((line, i) => (
                <li key={i} className="flex min-w-0 items-start gap-[0.4cqw] text-[0.9cqw] leading-[1.45]">
                  <span className="mt-[0.4cqw] h-[0.6cqw] w-[0.6cqw] shrink-0 rounded-full" style={{ background: C.ink }} aria-hidden />
                  <span className="min-w-0">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-[0.4cqw] text-[0.8cqw] text-right" style={{ color: C.faint }}>ROI окно: 30 дней</div>
          </div>

          {/* Каналы продаж */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="shrink-0 pb-[0.4cqw] text-[0.85cqw] uppercase tracking-[0.12em]" style={{ color: C.faint }}>Каналы</div>
            <ul className="flex flex-1 flex-col overflow-y-auto">
              {data.channels.map((ch, i) => (
                <li
                  key={ch.name}
                  className={
                    'flex min-w-0 items-center justify-between gap-[0.6cqw] py-[0.35cqw] text-[0.95cqw]' +
                    (i > 0 ? ' border-t' : '')
                  }
                  style={{ borderColor: C.lineSoft }}
                >
                  <span className="min-w-0 truncate">{ch.name}</span>
                  <span className="shrink-0 font-medium tabular-nums" style={{ color: C.ink }}>{ch.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижний блок: обновлено */}
        <div className="mt-auto flex shrink-0 items-center gap-[0.5cqw] px-[1.2cqw] pb-[0.9cqw] pt-[0.4cqw] text-[0.85cqw] leading-[1.45]" style={{ color: C.muted }}>
          <span className="h-[0.7cqw] w-[0.7cqw] shrink-0 rounded-full" style={{ background: C.ink }} aria-hidden />
          <span className="min-w-0">7 каналов, обновлено 07:15</span>
        </div>
      </section>
    </div>
  );
}