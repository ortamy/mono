/**
 * Кейс «Ukus» — тёмный экран мобильной доставки.
 * Архетип: телефон с картой, проложенным маршрутом курьера и нижней
 * шторкой статусов. Телефон — свой контейнер, поэтому размеры внутри
 * считаются в cqw ширины телефона.
 */
import { DARK as C } from './mono-tokens';

const STEPS = ['Заказ принят', 'Готовится', 'Курьер в пути', 'Доставлено'];

export default function MapPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ background: C.bg }}>
      {/* Мягкое световое пятно — глубина сцены. */}
      <div className="absolute h-[80%] w-[42%] rounded-full blur-[9cqw]" style={{ background: 'rgba(250,250,250,0.06)' }} aria-hidden />
      <div
        className="absolute left-[6cqw] top-[14%] h-[64%] w-[17%] rounded-[1.6cqw] border"
        style={{ borderColor: C.line, background: C.panel, opacity: 0.6 }}
        aria-hidden
      />
      <div
        className="absolute right-[6cqw] top-[10%] h-[72%] w-[17%] rounded-[1.6cqw] border"
        style={{ borderColor: C.line, background: C.panel, opacity: 0.6 }}
        aria-hidden
      />

      <div
        className="relative flex h-[94%] aspect-[9/19] flex-col overflow-hidden rounded-[3.2cqw] border [container-type:inline-size]"
        style={{ background: C.panel, borderColor: C.line, color: C.ink }}
      >
        {/* Статус-строка */}
        <div className="flex items-center justify-between px-[5cqw] pt-[3.4cqw] text-[3.2cqw]" style={{ color: C.muted }}>
          <span>9:41</span>
          <span className="h-[2cqw] w-[7cqw] rounded-full" style={{ background: C.line }} />
        </div>

        <div className="px-[5cqw] pt-[3cqw] text-[3.4cqw] font-semibold">Курьер в пути</div>
        <div className="px-[5cqw] text-[2.9cqw]" style={{ color: C.muted }}>Приедет через 18 минут</div>

        {/* Карта: сетка улиц + маршрут */}
        <div className="relative mx-[4cqw] mt-[3cqw] h-[34cqw] overflow-hidden rounded-[2.6cqw]" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
              backgroundSize: '8cqw 8cqw',
            }}
            aria-hidden
          />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <polyline
              points="14,84 38,84 38,52 68,52 68,28 86,28"
              fill="none"
              stroke={C.ink}
              strokeWidth="1.4"
              strokeDasharray="3 2.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="absolute left-[10%] top-[78%] h-[2.4cqw] w-[2.4cqw] -translate-x-1/2 rounded-full border-2" style={{ borderColor: C.muted }} />
          <span className="absolute left-[84%] top-[22%] h-[3cqw] w-[3cqw] -translate-x-1/2 rounded-full" style={{ background: C.ink }} />
        </div>

        {/* Нижняя шторка статусов */}
        <div className="mt-[3cqw] flex flex-1 flex-col rounded-t-[3cqw] border-t px-[5cqw] pt-[3.4cqw]" style={{ borderColor: C.line, background: C.soft }}>
          <div className="flex items-center gap-[2.4cqw]">
            <span className="min-w-0 truncate text-[3.1cqw] font-semibold">Курьер Тимур</span>
            <span className="shrink-0 whitespace-nowrap rounded-full px-[2.4cqw] py-[0.8cqw] text-[2.5cqw]" style={{ background: C.ink, color: C.bg }}>
              Позвонить
            </span>
          </div>
          <div className="mt-[2.6cqw] flex flex-col gap-[1.8cqw]">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-[2.4cqw] text-[2.8cqw]">
                <span
                  className="h-[2cqw] w-[2cqw] rounded-full"
                  style={{ background: i <= 2 ? C.ink : C.line }}
                />
                <span style={{ color: i <= 2 ? C.ink : C.muted }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
