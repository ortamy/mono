/**
 * Кейс «Metrik» — тёмный app-shell аналитики.
 * Архетип: сайдбар с навигацией, KPI-плитки, рисованный график маржи
 * и таблица убыточных SKU.
 */
import { DARK as C } from './mono-tokens';

const MENU = ['Обзор', 'Воронка', 'Отчёты', 'Настройки'];

const KPIS: [string, string][] = [
  ['Выручка', '4,28 млн ₽'],
  ['Маржа', '18,4%'],
  ['ДРР', '7,2%'],
  ['Убыточные SKU', '12'],
];

const ROWS: [string, string, string][] = [
  ['SKU 4821', 'Крем SPF', '−4,2%'],
  ['SKU 4018', 'Коврик', '−1,8%'],
  ['SKU 3390', 'Лампа', '−0,6%'],
];

const LINE = '0,30 12,24 24,26 36,16 48,20 60,10 72,14 84,6 100,9';

export default function DashboardPreview() {
  return (
    <div className="flex h-full w-full" style={{ background: C.bg, color: C.ink }}>
      <aside className="flex w-[22%] flex-col border-r px-[2.2cqw] py-[2.4cqw]" style={{ borderColor: C.line, background: C.panel }}>
        <div className="flex items-center gap-[1.1cqw]">
          <span className="flex h-[2.8cqw] w-[2.8cqw] items-center justify-center rounded-[0.8cqw] text-[1.4cqw] font-bold" style={{ background: C.ink, color: C.bg }}>
            M
          </span>
          <span className="text-[1.7cqw] font-semibold tracking-[-0.02em]">Metrik</span>
        </div>
        <nav className="mt-[2.4cqw] flex flex-col gap-[0.6cqw] text-[1.3cqw]">
          {MENU.map((it, i) => (
            <span
              key={it}
              className="truncate rounded-[0.7cqw] px-[1.4cqw] py-[1cqw]"
              style={i === 0 ? { background: C.soft, color: C.ink } : { color: C.muted }}
            >
              {it}
            </span>
          ))}
        </nav>
        <span className="mt-auto text-[1.15cqw]" style={{ color: C.faint }}>WB · Ozon · Реклама</span>
      </aside>

      <main className="flex flex-1 flex-col px-[2.6cqw] py-[2.4cqw]">
        <div className="flex items-center justify-between">
          <span className="text-[2cqw] font-semibold tracking-[-0.03em]">Юнит-экономика</span>
          <span className="whitespace-nowrap rounded-[0.7cqw] border px-[1.5cqw] py-[0.7cqw] text-[1.2cqw]" style={{ borderColor: C.line, color: C.muted }}>
            Март 2026
          </span>
        </div>

        <div className="mt-[2cqw] grid grid-cols-4 gap-[1.4cqw]">
          {KPIS.map(([label, value]) => (
            <div key={label} className="overflow-hidden rounded-[1cqw] border p-[1.5cqw]" style={{ borderColor: C.line, background: C.panel }}>
              <div className="truncate text-[1.1cqw]" style={{ color: C.muted }}>{label}</div>
              <div className="truncate text-[2.1cqw] font-bold tracking-[-0.05cqw] tabular-nums">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-[1.8cqw] rounded-[1cqw] border p-[1.8cqw]" style={{ borderColor: C.line, background: C.panel }}>
          <div className="flex items-center justify-between text-[1.2cqw]" style={{ color: C.muted }}>
            <span>Маржа по дням</span>
            <span className="tabular-nums" style={{ color: C.ink }}>+9 п.п.</span>
          </div>
          <svg viewBox="0 0 100 34" preserveAspectRatio="none" className="mt-[1.4cqw] h-[9cqw] w-full" aria-hidden>
            {[8, 17, 26].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={C.lineSoft} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            ))}
            <polyline points={LINE} fill="none" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <div className="mt-[1.8cqw] overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
          {ROWS.map(([id, name, delta], i) => (
            <div
              key={id}
              className={`flex items-center justify-between px-[1.6cqw] py-[1.1cqw] text-[1.2cqw] ${i > 0 ? 'border-t' : ''}`}
              style={{ borderColor: C.lineSoft }}
            >
              <span className="shrink-0 tabular-nums" style={{ color: C.faint }}>{id}</span>
              <span className="min-w-0 flex-1 truncate px-[1.4cqw]">{name}</span>
              <span className="shrink-0 font-medium tabular-nums">{delta}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
