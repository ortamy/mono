/**
 * Кейс «Nordbank» — тёмный первый экран банка для ИП.
 * Архетип: стопка наклонённых карт со счётом и кольцевая диаграмма
 * расходов по категориям (без мокапа телефона).
 */
import { DARK as C } from './mono-tokens';

const CATS: [string, string, number][] = [
  ['Налоги', '86 400 ₽', 46],
  ['Поставщики', '184 000 ₽', 34],
  ['Зарплата', '120 000 ₽', 20],
];

const R = 34;
const CIRC = 2 * Math.PI * R;

export default function BankPreview() {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden px-[3cqw]" style={{ background: C.bg, color: C.ink }}>
      <header className="absolute left-[3cqw] right-[3cqw] top-[1.6cqw] flex items-center justify-between border-b pb-[1.4cqw]" style={{ borderColor: C.line }}>
        <span className="text-[1.9cqw] font-semibold tracking-[-0.02em]">nordbank</span>
        <nav className="flex items-center gap-[2cqw] text-[1.25cqw]" style={{ color: C.muted }}>
          <span>Счета</span>
          <span>Платежи</span>
          <span>Налоги</span>
        </nav>
        <span className="whitespace-nowrap rounded-[0.6cqw] px-[2cqw] py-[0.8cqw] text-[1.2cqw] font-semibold" style={{ background: C.ink, color: C.bg }}>
          Открыть счёт
        </span>
      </header>

      {/* Стопка карт */}
      <div className="relative w-[46%] pt-[6cqw]">
        <div className="absolute left-[2.4cqw] top-[9cqw] h-[22cqw] w-[36cqw] rotate-[5deg] rounded-[1.6cqw] border" style={{ borderColor: C.line, background: C.panel }} aria-hidden />
        <div className="absolute left-[1.2cqw] top-[7cqw] h-[22cqw] w-[36cqw] rotate-[2deg] rounded-[1.6cqw] border" style={{ borderColor: C.line, background: C.soft }} aria-hidden />
        <div className="relative h-[22cqw] w-[36cqw] -rotate-[3deg] rounded-[1.6cqw] p-[2.2cqw]" style={{ background: C.ink, color: C.bg }}>
          <div className="flex items-center justify-between text-[1.15cqw] opacity-70">
            <span>Расчётный счёт</span>
            <span>ИП</span>
          </div>
          <div className="mt-[2.6cqw] text-[4.4cqw] font-bold tracking-[-0.1cqw] tabular-nums">1 240 000 ₽</div>
          <div className="mt-[2.6cqw] flex items-center justify-between text-[1.15cqw] opacity-70 tabular-nums">
            <span>•••• 4417</span>
            <span>Норд Бизнес</span>
          </div>
        </div>
      </div>

      {/* Кольцевая диаграмма расходов */}
      <div className="flex w-[54%] items-center gap-[3cqw] pl-[4cqw]">
        <svg viewBox="0 0 100 100" className="h-[22cqw] w-[22cqw] -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke={C.line} strokeWidth="12" />
          <circle cx="50" cy="50" r={R} fill="none" stroke={C.ink} strokeWidth="12" strokeDasharray={`${CIRC * 0.46} ${CIRC}`} strokeLinecap="round" />
          <circle cx="50" cy="50" r={R} fill="none" stroke={C.faint} strokeWidth="12" strokeDasharray={`${CIRC * 0.34} ${CIRC}`} strokeDashoffset={-CIRC * 0.48} />
        </svg>
        <div className="flex flex-1 flex-col gap-[1.4cqw]">
          <div className="text-[1.15cqw] uppercase tracking-[0.16em]" style={{ color: C.faint }}>Расходы за месяц</div>
          {CATS.map(([name, sum, share]) => (
            <div key={name} className="flex items-center justify-between border-b pb-[0.9cqw] text-[1.25cqw]" style={{ borderColor: C.lineSoft }}>
              <span className="flex items-center gap-[1cqw]" style={{ color: C.muted }}>
                <span className="h-[1.6cqw] w-[1.6cqw] rounded-full" style={{ background: share > 40 ? C.ink : C.faint }} />
                {name}
              </span>
              <span className="font-medium tabular-nums">{sum}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
