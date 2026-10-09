/**
 * Кейс «mono» — тёмный первый экран лендинга для WB-селлеров.
 * Архетип: оффер слева, справа живая карточка-калькулятор экономии
 * с мини-графиком (без стокового фото).
 */
import { DARK as C } from './mono-tokens';

const ROWS: [string, string][] = [
  ['Оборот в месяц', '1 000 000 ₽'],
  ['Комиссия площадки', '−250 000 ₽'],
  ['Потеря за год', '−3 000 000 ₽'],
];

const BARS = [38, 52, 44, 66, 58, 74, 62, 88];

export default function MonoPreview() {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: C.bg, color: C.ink }}>
      <header className="flex items-center justify-between border-b px-[3cqw] py-[1.6cqw]" style={{ borderColor: C.line }}>
        <span className="text-[2.1cqw] font-bold tracking-[-0.06cqw]">
          mono<span style={{ color: C.faint }}>.</span>
        </span>
        <nav className="flex items-center gap-[2.2cqw] text-[1.35cqw]" style={{ color: C.muted }}>
          <span>Решение</span>
          <span>Тарифы</span>
          <span>Кейсы</span>
        </nav>
        <span className="whitespace-nowrap rounded-[0.6cqw] px-[2.2cqw] py-[0.9cqw] text-[1.3cqw] font-semibold" style={{ background: C.ink, color: C.bg }}>
          Рассчитать
        </span>
      </header>

      <div className="flex flex-1 items-center gap-[4cqw] px-[3cqw]">
        <div className="flex w-[46%] flex-col justify-center">
          <span
            className="mb-[1.8cqw] w-fit whitespace-nowrap rounded-full border px-[1.8cqw] py-[0.7cqw] text-[1.15cqw] tracking-[0.02em]"
            style={{ borderColor: C.line, color: C.muted }}
          >
            0% комиссий · 21 день
          </span>
          <h3 className="text-balance text-[4.4cqw] font-bold leading-[1.05] tracking-[-0.14cqw]">
            Забирайте 100% выручки
          </h3>
          <p className="mt-[1.6cqw] max-w-[34cqw] text-[1.5cqw] leading-[1.5]" style={{ color: C.muted }}>
            Свой интернет-магазин вместо комиссий маркетплейсов.
          </p>
          <span
            className="mt-[2.4cqw] w-fit whitespace-nowrap rounded-[0.7cqw] px-[2.6cqw] py-[1.2cqw] text-[1.4cqw] font-semibold"
            style={{ background: C.ink, color: C.bg }}
          >
            Рассчитать экономию
          </span>
        </div>

        <div className="flex w-[54%] flex-col rounded-[1.4cqw] border p-[2.2cqw]" style={{ borderColor: C.line, background: C.panel }}>
          <div className="flex items-center justify-between">
            <span className="text-[1.3cqw]" style={{ color: C.muted }}>Калькулятор экономии</span>
            <span className="rounded-full px-[1.4cqw] py-[0.4cqw] text-[1.1cqw] tabular-nums" style={{ background: C.soft, color: C.muted }}>
              2026
            </span>
          </div>

          <div className="mt-[1.8cqw] flex flex-col gap-[1.1cqw]">
            {ROWS.map(([k, v], i) => (
              <div key={k} className="flex items-center justify-between border-b pb-[1cqw]" style={{ borderColor: C.lineSoft }}>
                <span className="text-[1.25cqw]" style={{ color: C.muted }}>{k}</span>
                <span className="text-[1.35cqw] font-medium tabular-nums" style={{ color: i === 0 ? C.ink : C.muted }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="mt-[1.8cqw] flex items-end justify-between gap-[1cqw]">
            <div>
              <div className="text-[1.15cqw]" style={{ color: C.muted }}>Окупаемость</div>
              <div className="text-[2.6cqw] font-bold tracking-[-0.08cqw] tabular-nums">2 месяца</div>
            </div>
            <div className="flex h-[7cqw] items-end gap-[0.7cqw]">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="w-[1.1cqw] rounded-[0.3cqw]"
                  style={{ height: `${h}%`, background: i === BARS.length - 1 ? C.ink : C.line }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
