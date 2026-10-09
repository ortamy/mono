/**
 * Кейс «SaaS-дашборд» — тёмный сайдбар слева, рабочая область справа:
 * KPI-карточки, линейный график и таблица заказов.
 */

const MENU = ['Обзор', 'Отчёты', 'Клиенты', 'Настройки'];

const KPIS: [string, string][] = [
  ['Выручка', '4,28 млн ₽'],
  ['Заказы', '12 940'],
  ['Конверсия', '3,1%'],
];

const ROWS: [string, string, string][] = [
  ['#4821', 'Анна К.', 'оплачен'],
  ['#4820', 'ИП Соколов', 'отправлен'],
  ['#4819', 'ООО «Вектор»', 'оплачен'],
];

export default function DashboardPreview() {
  return (
    <div className="flex h-full w-full bg-[#f6f6f7] text-[#0f172a]">
      <aside className="flex w-[23%] flex-col bg-[#0f0f10] px-[2.2cqw] py-[2.6cqw] text-white">
        <div className="flex items-center gap-[1.2cqw]">
          <span className="flex h-[3.2cqw] w-[3.2cqw] items-center justify-center rounded-[0.9cqw] bg-[#6366f1] text-[1.6cqw] font-bold">
            А
          </span>
          <span className="text-[1.8cqw] font-semibold">АналитикПро</span>
        </div>
        <div className="mt-[2.4cqw] flex flex-col gap-[0.8cqw] text-[1.4cqw]">
          {MENU.map((it, i) => (
            <span
              key={it}
              className={`rounded-[0.8cqw] px-[1.4cqw] py-[1.1cqw] ${i === 0 ? 'bg-white/10 text-white' : 'text-white/50'}`}
            >
              {it}
            </span>
          ))}
        </div>
      </aside>

      <main className="flex-1 px-[2.8cqw] py-[2.6cqw]">
        <div className="flex items-center justify-between">
          <span className="text-[2.1cqw] font-semibold">Обзор</span>
          <span className="rounded-[0.8cqw] border border-black/10 bg-white px-[1.6cqw] py-[0.8cqw] text-[1.25cqw] text-[#64748b]">
            30 дней
          </span>
        </div>

        <div className="mt-[2cqw] grid grid-cols-3 gap-[1.6cqw]">
          {KPIS.map(([label, value]) => (
            <div key={label} className="rounded-[1cqw] border border-black/10 bg-white p-[1.7cqw]">
              <div className="text-[1.2cqw] text-[#64748b]">{label}</div>
              <div className="text-[2.5cqw] font-bold tracking-[-0.06cqw]">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-[1.8cqw] rounded-[1cqw] border border-black/10 bg-white p-[1.9cqw]">
          <div className="flex items-center justify-between text-[1.25cqw] text-[#64748b]">
            <span>Продажи по дням</span>
            <span className="text-[#6366f1]">+18%</span>
          </div>
          <svg viewBox="0 0 100 34" preserveAspectRatio="none" className="mt-[1.6cqw] h-[9cqw] w-full">
            <polyline
              points="0,28 12,22 24,25 36,15 48,19 60,9 72,13 84,5 100,8"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="mt-[1.8cqw] overflow-hidden rounded-[1cqw] border border-black/10 bg-white">
          {ROWS.map(([id, who, status], i) => (
            <div
              key={id}
              className={`flex items-center justify-between px-[1.7cqw] py-[1.2cqw] text-[1.25cqw] ${i > 0 ? 'border-t border-black/5' : ''}`}
            >
              <span className="text-[#64748b]">{id}</span>
              <span className="flex-1 px-[1.4cqw]">{who}</span>
              <span className="text-[#16a34a]">{status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
