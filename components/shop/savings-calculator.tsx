/**
 * Калькулятор экономии: ползунок оборота → сколько уходит комиссии маркетплейса
 * в месяц и в год, и срок окупаемости магазина.
 */
'use client';

import { useMemo, useState } from 'react';

const TURNOVER = { min: 200_000, max: 10_000_000, step: 50_000, initial: 1_000_000 };
const COMMISSION = 0.3;
const PRICE = 350_000;

const money = (value: number) => `${Math.round(value).toLocaleString('ru-RU')} ₽`;

export default function SavingsCalculator() {
  const [turnover, setTurnover] = useState(TURNOVER.initial);

  const { perMonth, perYear, months } = useMemo(() => {
    const monthly = turnover * COMMISSION;
    const yearly = monthly * 12;
    return { perMonth: monthly, perYear: yearly, months: Math.max(1, Math.ceil(PRICE / monthly)) };
  }, [turnover]);

  const progress = ((turnover - TURNOVER.min) / (TURNOVER.max - TURNOVER.min)) * 100;

  return (
    <div className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <label htmlFor="shop-turnover" className="text-[13px] font-medium text-agentos-ink">Оборот на маркетплейсах, ₽/мес</label>
        <output htmlFor="shop-turnover" className="text-[20px] font-semibold tracking-[-0.5px] text-agentos-ink tabular-nums">
          {money(turnover)}
        </output>
      </div>

      <input
        id="shop-turnover"
        type="range"
        min={TURNOVER.min}
        max={TURNOVER.max}
        step={TURNOVER.step}
        value={turnover}
        onChange={(e) => setTurnover(Number(e.target.value))}
        aria-valuetext={money(turnover)}
        className="mt-6 h-1 w-full cursor-pointer appearance-none rounded-full bg-agentos-soft accent-agentos-ink"
        style={{ background: `linear-gradient(to right, #0A0A0A ${progress}%, #F5F5F5 ${progress}%)` }}
      />
      <div className="mt-2 flex justify-between text-[11px] text-agentos-faint">
        <span>{money(TURNOVER.min)}</span>
        <span>{money(TURNOVER.max)}</span>
      </div>

      <dl className="mt-8 grid gap-px overflow-hidden rounded-control border border-agentos-line bg-agentos-line sm:grid-cols-3">
        {[
          { label: 'Комиссия в месяц', value: money(perMonth) },
          { label: 'За год', value: money(perYear) },
          { label: 'Окупаемость', value: `~${months} мес` },
        ].map((cell) => (
          <div key={cell.label} className="bg-agentos-card px-4 py-5">
            <dt className="text-[11px] uppercase tracking-[0.06em] text-agentos-faint">{cell.label}</dt>
            <dd className="mt-2 text-[20px] font-semibold tracking-[-0.5px] text-agentos-ink tabular-nums">{cell.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[12px] leading-[1.6] text-agentos-muted">
        Расчёт при средней комиссии 30% и пакете «Бизнес» за 350 000 ₽. Точную экономию посчитаем по вашей номенклатуре.
      </p>
    </div>
  );
}