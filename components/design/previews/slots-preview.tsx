/**
 * Кейс «Levin» — светлый первый экран клиники.
 * Архетип: hero строится вокруг сетки свободных слотов записи —
 * полоска дней и тайм-сетка вместо стокового фото улыбки.
 */
import { LIGHT as C } from './mono-tokens';

const DAYS: [string, string][] = [
  ['Пн', '14'],
  ['Вт', '15'],
  ['Ср', '16'],
  ['Чт', '17'],
  ['Пт', '18'],
];

const SLOTS: [string, string, boolean][] = [
  ['09:40', 'терапия', false],
  ['11:20', 'гигиена', true],
  ['13:00', '—', true],
  ['15:40', 'гигиена', false],
  ['18:10', 'терапия', true],
  ['19:30', 'ортодонтия', false],
];

export default function SlotsPreview() {
  return (
    <div className="flex h-full w-full flex-col" style={{ background: C.bg, color: C.ink }}>
      <header className="flex items-center justify-between border-b px-[3cqw] py-[1.6cqw]" style={{ borderColor: C.line }}>
        <span className="flex items-center gap-[1cqw] text-[1.9cqw] font-semibold tracking-[-0.02em]">
          <span className="h-[2.2cqw] w-[2.2cqw] rounded-full border-2" style={{ borderColor: C.ink }} aria-hidden />
          Levin
        </span>
        <nav className="flex items-center gap-[2.2cqw] text-[1.3cqw]" style={{ color: C.muted }}>
          <span>Врачи</span>
          <span>Цены</span>
          <span>Клиника</span>
        </nav>
        <span className="text-[1.25cqw] tabular-nums" style={{ color: C.muted }}>+7 ··· 40 20</span>
      </header>

      <div className="flex flex-1 items-center gap-[4cqw] px-[3cqw]">
        <div className="flex w-[36%] flex-col justify-center">
          <span className="text-[1.15cqw] uppercase tracking-[0.2em]" style={{ color: C.faint }}>Online-запись</span>
          <h3 className="mt-[1.4cqw] text-balance text-[4.2cqw] font-bold leading-[1.04] tracking-[-0.14cqw]">
            Запись к врачу за 30 секунд
          </h3>
          <p className="mt-[1.5cqw] text-[1.4cqw] leading-[1.5]" style={{ color: C.muted }}>
            Свободное время на неделю вперёд. Без звонков и ожидания в очереди.
          </p>
          <div className="mt-[2.2cqw] flex items-center gap-[1.4cqw] rounded-[1cqw] border p-[1.4cqw]" style={{ borderColor: C.line }}>
            <span className="flex h-[4.4cqw] w-[4.4cqw] items-center justify-center rounded-full text-[1.4cqw] font-semibold" style={{ background: C.soft }}>
              МС
            </span>
            <div className="leading-[1.35]">
              <div className="text-[1.3cqw] font-medium">Соколова М.</div>
              <div className="text-[1.1cqw]" style={{ color: C.muted }}>Гигиена · 9 лет</div>
            </div>
          </div>
        </div>

        <div className="flex w-[64%] flex-col rounded-[1.4cqw] border p-[2.2cqw]" style={{ borderColor: C.line, background: C.panel }}>
          <div className="flex items-center justify-between">
            <span className="text-[1.3cqw] font-medium">Выберите время</span>
            <span className="text-[1.1cqw] tabular-nums" style={{ color: C.muted }}>март 2026</span>
          </div>

          <div className="mt-[1.8cqw] grid grid-cols-5 gap-[1cqw]">
            {DAYS.map(([d, n], i) => (
              <div
                key={d}
                className="flex flex-col items-center rounded-[0.9cqw] border py-[0.9cqw]"
                style={i === 0 ? { borderColor: C.ink, background: C.ink, color: C.bg } : { borderColor: C.line, color: C.muted }}
              >
                <span className="text-[1.05cqw]">{d}</span>
                <span className="text-[1.5cqw] font-semibold tabular-nums">{n}</span>
              </div>
            ))}
          </div>

          <div className="mt-[1.8cqw] grid grid-cols-3 gap-[1cqw]">
            {SLOTS.map(([time, kind, busy]) => (
              <div
                key={time}
                className="flex flex-col items-center justify-center rounded-[0.9cqw] border py-[1.1cqw]"
                style={
                  time === '15:40'
                    ? { borderColor: C.ink, background: C.ink, color: C.bg }
                    : { borderColor: C.line, opacity: busy ? 0.42 : 1 }
                }
              >
                <span className="text-[1.35cqw] font-semibold tabular-nums">{time}</span>
                <span className="text-[1cqw]">{busy ? 'занято' : kind}</span>
              </div>
            ))}
          </div>

          <div className="mt-[2cqw] flex min-w-0 items-center justify-between gap-[1.6cqw] border-t pt-[1.6cqw]" style={{ borderColor: C.line }}>
            <span className="min-w-0 truncate text-[1.2cqw]" style={{ color: C.muted }}>Понедельник, 15:40 · кабинет 3</span>
            <span className="shrink-0 whitespace-nowrap rounded-[0.7cqw] px-[2.2cqw] py-[1cqw] text-[1.25cqw] font-semibold" style={{ background: C.ink, color: C.bg }}>
              Записаться
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
