/**
 * Кейс «Мобильный банк» — мокап iPhone с экраном приложения.
 * Телефон объявлен своим container-ом, поэтому все размеры внутри него —
 * в cqw ширины телефона, а не всего превью.
 */

const TX = [
  { name: 'Кофейня', sum: '−340 ₽' },
  { name: 'Метро', sum: '−56 ₽' },
  { name: 'Зарплата', sum: '+72 000 ₽' },
];

const BARS = [40, 62, 35, 78, 52, 88, 46, 70];

export default function BankPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Полу-прозрачные панели и свечение — глубина сцены. */}
      <div className="absolute left-[8cqw] top-[16%] h-[62%] w-[16%] rounded-[1.6cqw] bg-white/5" aria-hidden />
      <div className="absolute right-[8cqw] top-[12%] h-[72%] w-[16%] rounded-[1.6cqw] bg-white/5" aria-hidden />
      <div className="absolute h-[70%] w-[38%] rounded-full bg-[#2563EB]/25 blur-[7cqw]" aria-hidden />

      <div className="relative flex h-[92%] aspect-[9/19] flex-col overflow-hidden rounded-[3.4cqw] bg-[#111113] px-[4cqw] py-[4.4cqw] ring-[0.2cqw] ring-white/10 [container-type:inline-size]">
        {/* Статус-строка */}
        <div className="flex items-center justify-between text-[3.6cqw] text-white/55">
          <span>9:41</span>
          <span className="h-[2.2cqw] w-[8cqw] rounded-full bg-white/25" />
        </div>

        {/* Пользователь */}
        <div className="mt-[7cqw] flex items-center gap-[3.4cqw]">
          <span className="flex h-[11cqw] w-[11cqw] items-center justify-center rounded-full bg-[#2563EB] text-[4.4cqw] font-semibold text-white">
            АК
          </span>
          <div className="leading-[1.35]">
            <div className="text-[3.8cqw] font-medium text-white">Алексей К.</div>
            <div className="text-[3.2cqw] text-white/50">Личный счёт</div>
          </div>
        </div>

        {/* Баланс */}
        <div className="mt-[7cqw]">
          <div className="text-[3.2cqw] text-white/50">Баланс</div>
          <div className="text-[9.5cqw] font-bold tracking-[-0.3cqw] text-white">124 560 ₽</div>
        </div>

        {/* Действия */}
        <div className="mt-[6cqw] grid grid-cols-3 gap-[3cqw] text-[3.1cqw] text-white">
          {['Перевести', 'Оплатить', 'История'].map((b) => (
            <span key={b} className="rounded-[2.4cqw] bg-[#2563EB] py-[3.4cqw] text-center">
              {b}
            </span>
          ))}
        </div>

        {/* Расходы за месяц */}
        <div className="mt-[6cqw] text-[3.2cqw] text-white/50">Расходы за месяц</div>
        <div className="mt-[3cqw] flex h-[20cqw] items-end gap-[2cqw]">
          {BARS.map((h, i) => (
            <span key={i} className="flex-1 rounded-[1cqw] bg-[#2563EB]" style={{ height: `${h}%` }} />
          ))}
        </div>

        {/* Последние транзакции */}
        <div className="mt-[6cqw] space-y-[3.2cqw]">
          {TX.map((t) => (
            <div key={t.name} className="flex items-center justify-between text-[3.2cqw]">
              <span className="text-white/70">{t.name}</span>
              <span className={t.sum.startsWith('+') ? 'text-[#34d399]' : 'text-white'}>{t.sum}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
