/**
 * Кейс «Alephy» — тёмный редакционный первый экран.
 * Архетип: только типографика — серифный оффер слева и «указатель»
 * корпуса справа, крупная буква-сигил как водяной знак. Без стоковых фото.
 */
import { DARK as C } from './mono-tokens';

const INDEX: [string, string][] = [
  ['Образ', '0.84'],
  ['Движение', '0.61'],
  ['Состояние', '0.77'],
  ['Телесность', '0.52'],
  ['Звук', '0.69'],
];

export default function AlephyPreview() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: C.bg, color: C.ink }}>
      {/* Водяной знак: буква-сигил проекта. */}
      <span
        className="pointer-events-none absolute -right-[4cqw] -top-[10cqw] select-none font-serif text-[46cqw] leading-none"
        style={{ color: C.ink, opacity: 0.035 }}
        aria-hidden
      >
        א
      </span>

      <header className="z-10 flex items-center justify-between border-b px-[3cqw] py-[1.6cqw]" style={{ borderColor: C.line }}>
        <span className="flex items-center gap-[1.1cqw] font-serif text-[1.9cqw]">
          <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-[0.5cqw] border text-[1.3cqw]" style={{ borderColor: C.line }}>
            א
          </span>
          alephy
        </span>
        <nav className="flex items-center gap-[2.2cqw] text-[1.25cqw]" style={{ color: C.muted }}>
          <span>Карта</span>
          <span>Лаборатория</span>
          <span>Клуб</span>
        </nav>
        <span className="border-b pb-[0.5cqw] text-[1.25cqw] font-medium" style={{ borderColor: C.ink }}>Войти</span>
      </header>

      <div className="relative z-10 flex flex-1 items-center gap-[5cqw] px-[3cqw]">
        <div className="flex w-[56%] flex-col">
          <span className="text-[1.1cqw] uppercase tracking-[0.24em]" style={{ color: C.faint }}>
            Исследование · 2026
          </span>
          <h3 className="mt-[1.6cqw] font-serif text-balance text-[4.6cqw] font-normal leading-[1.06] tracking-[-0.06cqw]">
            Реконструкция палео-мышления
          </h3>
          <p className="mt-[1.7cqw] max-w-[40cqw] text-[1.4cqw] leading-[1.55]" style={{ color: C.muted }}>
            Возвращаем тексту его физику: образ, движение, состояние. Не читать, а переживать.
          </p>
          <span className="mt-[2.4cqw] w-fit whitespace-nowrap rounded-[0.6cqw] border px-[2.4cqw] py-[1.1cqw] text-[1.35cqw] font-medium" style={{ borderColor: C.ink }}>
            Начать исследование
          </span>
        </div>

        <div className="w-[44%]">
          <div className="border-t pt-[1.4cqw] text-[1.1cqw] uppercase tracking-[0.18em]" style={{ borderColor: C.line, color: C.faint }}>
            Указатель утрат
          </div>
          <div className="mt-[1.4cqw] flex flex-col">
            {INDEX.map(([label, val], i) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-[1.6cqw] border-b py-[1.1cqw]"
                style={{ borderColor: C.lineSoft }}
              >
                <span className="text-[1.15cqw] tabular-nums" style={{ color: C.faint }}>
                  0{i + 1}
                </span>
                <span className="flex-1 font-serif text-[1.9cqw] leading-none">{label}</span>
                <span
                  className="h-[1px] flex-1 self-center"
                  style={{ background: C.line }}
                  aria-hidden
                />
                <span className="text-[1.3cqw] tabular-nums">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
