/**
 * Кейс «Ferro» — светлый первый экран производителя оборудования.
 * Архетип: технический чертёж — миллиметровая сетка, схема станка,
 * размерные линии и таблица параметров. Всё набранное моноширинным.
 */
import { LIGHT as C } from './mono-tokens';

const SPECS: [string, string][] = [
  ['Габариты', '2 400 × 1 800 мм'],
  ['Мощность', '18,5 кВт'],
  ['Допуск', '± 0,02 мм'],
  ['Материал', 'чугун · сталь'],
  ['Масса', '3 200 кг'],
];

export default function SpecsheetPreview() {
  return (
    <div
      className="relative flex h-full w-full flex-col font-mono"
      style={{
        background: C.bg,
        color: C.ink,
        backgroundImage: `linear-gradient(${C.lineSoft} 1px, transparent 1px), linear-gradient(90deg, ${C.lineSoft} 1px, transparent 1px)`,
        backgroundSize: '4cqw 4cqw',
      }}
    >
      <header className="flex items-start justify-between border-b px-[3cqw] py-[1.6cqw]" style={{ borderColor: C.line, background: C.bg }}>
        <div className="leading-[1.4]">
          <div className="text-[2cqw] font-semibold tracking-[-0.02em]">FERRO</div>
          <div className="text-[1.15cqw] tracking-[0.14em]" style={{ color: C.muted }}>ОБОРУДОВАНИЕ ДЛЯ ЦЕХА</div>
        </div>
        <div className="text-right text-[1.1cqw] leading-[1.5]" style={{ color: C.muted }}>
          <div>ЧЕРТЁЖ · CNC-500</div>
          <div>РЕВ. 04 / 2025</div>
        </div>
      </header>

      <div className="flex flex-1 gap-[3cqw] px-[3cqw] py-[2.4cqw]">
        {/* Схема с размерными линиями */}
        <div className="relative flex-1">
          <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden>
            {/* корпус станка */}
            <rect x="34" y="34" width="108" height="52" rx="3" fill="none" stroke={C.ink} strokeWidth="1.4" />
            <rect x="46" y="46" width="52" height="28" rx="2" fill="none" stroke={C.muted} strokeWidth="1" />
            <circle cx="126" cy="60" r="13" fill="none" stroke={C.ink} strokeWidth="1.4" />
            <circle cx="126" cy="60" r="4" fill={C.ink} />
            <line x1="34" y1="86" x2="142" y2="86" stroke={C.ink} strokeWidth="1.4" />
            <line x1="60" y1="34" x2="60" y2="18" stroke={C.muted} strokeWidth="1" />
            <line x1="120" y1="34" x2="120" y2="18" stroke={C.muted} strokeWidth="1" />
            {/* горизонтальный размер */}
            <line x1="34" y1="112" x2="142" y2="112" stroke={C.muted} strokeWidth="1" />
            <line x1="34" y1="108" x2="34" y2="116" stroke={C.muted} strokeWidth="1" />
            <line x1="142" y1="108" x2="142" y2="116" stroke={C.muted} strokeWidth="1" />
            {/* базовая линия */}
            <line x1="20" y1="96" x2="180" y2="96" stroke={C.muted} strokeWidth="0.7" strokeDasharray="4 3" />
          </svg>
          <span className="absolute bottom-[6cqw] left-1/2 -translate-x-1/2 px-[1cqw] text-[1.05cqw] tabular-nums" style={{ color: C.muted, background: C.bg }}>
            2 400 мм
          </span>
          <span className="absolute left-[28%] top-[12%] text-[1.05cqw] tabular-nums" style={{ color: C.muted, background: C.bg }}>
            1 800
          </span>
        </div>

        {/* Таблица параметров */}
        <div className="w-[38%] border" style={{ borderColor: C.line, background: C.bg }}>
          <div className="border-b px-[1.6cqw] py-[1.1cqw] text-[1.1cqw] tracking-[0.14em]" style={{ borderColor: C.line, color: C.muted }}>
            СПЕЦИФИКАЦИЯ
          </div>
          {SPECS.map(([k, v], i) => (
            <div
              key={k}
              className={`flex items-center justify-between px-[1.6cqw] py-[1cqw] text-[1.1cqw] ${i > 0 ? 'border-t' : ''}`}
              style={{ borderColor: C.lineSoft }}
            >
              <span className="min-w-0 truncate" style={{ color: C.muted }}>{k}</span>
              <span className="shrink-0 whitespace-nowrap font-medium tabular-nums">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-[2cqw] border-t px-[3cqw] py-[1.2cqw] text-[1.1cqw]" style={{ borderColor: C.line, color: C.muted }}>
        <span className="whitespace-nowrap">ДОПУСК ± 0,02 ММ</span>
        <span className="min-w-0 truncate whitespace-nowrap">ЗАПРОС СПЕЦИФИКАЦИИ →</span>
      </div>
    </div>
  );
}
