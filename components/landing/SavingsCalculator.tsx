'use client';

import { useMemo, useRef, useState } from 'react';
import { GOALS, trackGoal } from '@/lib/metrika';

/**
 * Калькулятор экономии на комиссиях маркетплейсов.
 *
 * Логика: из оборота вычитается комиссия выбранной площадки, годовая сумма —
 * умножение на 12, окупаемость — цена пакета «Бизнес» (350 000 ₽), делённая на
 * месячную потерю. Округление окупаемости идёт вверх: 1.4 месяца честнее
 * показывать как «~2 мес», чем как «1 мес».
 */

type Platform = 'wb' | 'ozon' | 'both';

const PLATFORMS: Record<Platform, { label: string; commission: number }> = {
  wb: { label: 'WB', commission: 0.25 },
  ozon: { label: 'Ozon', commission: 0.22 },
  both: { label: 'Оба', commission: 0.235 },
};

const TURNOVER = { min: 100_000, max: 10_000_000, step: 100_000, initial: 1_000_000 };

/** Цена пакета «Бизнес» — от неё считаем окупаемость. */
const STORE_PRICE = 350_000;

/** 1 500 000 ₽ — неразрывные пробелы, чтобы число не рвалось при переносе. */
const money = (value: number) => `${Math.round(value).toLocaleString('ru-RU').replace(/\u0020/g, '\u00A0')} ₽`;

export default function SavingsCalculator() {
  const [turnover, setTurnover] = useState(TURNOVER.initial);
  const [platform, setPlatform] = useState<Platform>('both');

  // Цель «калькулятор использован» ставится один раз за сессию: иначе перебор
  // id элемента на каждом шаге ползунка засорял бы отчёт.
  const tracked = useRef(false);
  const onTurnoverChange = (value: number) => {
    setTurnover(value);
    if (!tracked.current) {
      tracked.current = true;
      trackGoal(GOALS.calculatorUsed, { turnover: value });
    }
  };

  const { perMonth, perYear, months } = useMemo(() => {
    const monthly = turnover * PLATFORMS[platform].commission;
    return {
      perMonth: monthly,
      perYear: monthly * 12,
      months: Math.max(1, Math.ceil(STORE_PRICE / monthly)),
    };
  }, [turnover, platform]);

  // Заливка трека активной частью через inline-gradient: у нативного range нет
  // псевдоэлемента для заливки, а задавать цвет трека из JS дороже.
  const progress = ((turnover - TURNOVER.min) / (TURNOVER.max - TURNOVER.min)) * 100;
  const track = `linear-gradient(to right, #0A0A0A 0%, #0A0A0A ${progress}%, #E5E5E5 ${progress}%, #E5E5E5 100%)`;

  return (
    <div className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8">
      <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.7px] text-agentos-ink sm:text-[26px]">
        Сколько вы теряете на маркетплейсах?
      </h3>

      {/* Текущее значение оборота — крупно над ползунком */}
      <div className="mt-8">
        <label htmlFor="calc-turnover" className="block text-[13px] font-medium text-agentos-muted">
          Оборот на маркетплейсах в месяц
        </label>
        <output
          htmlFor="calc-turnover"
          className="mt-2 block text-[32px] font-semibold leading-none tracking-[-1.2px] text-agentos-ink tabular-nums"
        >
          {money(turnover)}
        </output>
      </div>

      <input
        id="calc-turnover"
        type="range"
        className="calc-slider mt-6 w-full"
        min={TURNOVER.min}
        max={TURNOVER.max}
        step={TURNOVER.step}
        value={turnover}
        onChange={(e) => onTurnoverChange(Number(e.target.value))}
        style={{ background: track }}
        aria-valuetext={money(turnover)}
        aria-label="Оборот на маркетплейсах в месяц"
      />
      <div className="mt-2 flex justify-between text-[11px] text-agentos-faint tabular-nums">
        <span>{money(TURNOVER.min)}</span>
        <span>{money(TURNOVER.max)}</span>
      </div>

      {/* Выбор площадки */}
      <fieldset className="mt-8">
        <legend className="mb-3 text-[13px] font-medium text-agentos-muted">Площадка</legend>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(PLATFORMS) as Platform[]).map((key) => {
            const active = platform === key;
            const { label, commission } = PLATFORMS[key];
            return (
              <label
                key={key}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-control border px-3 py-3 text-center transition-colors ${
                  active
                    ? 'border-agentos-ink bg-agentos-ink text-white'
                    : 'border-agentos-line bg-agentos-card text-agentos-ink hover:bg-agentos-soft'
                }`}
              >
                <input
                  type="radio"
                  name="calc-platform"
                  value={key}
                  checked={active}
                  onChange={() => setPlatform(key)}
                  className="sr-only"
                />
                <span className="text-[14px] font-medium">{label}</span>
                <span className={`text-[11px] tabular-nums ${active ? 'text-white/70' : 'text-agentos-faint'}`}>
                  {Math.round(commission * 100)}%
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Результат */}
      <dl className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Комиссия в месяц', value: money(perMonth) },
          { label: 'За год', value: money(perYear) },
          { label: 'Окупаемость', value: `~${months} мес` },
        ].map((cell) => (
          <div key={cell.label} className="rounded-[10px] bg-agentos-soft px-4 py-5">
            <dt className="text-[11px] uppercase tracking-[0.06em] text-agentos-faint">{cell.label}</dt>
            <dd className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.8px] text-agentos-ink tabular-nums">
              {cell.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-[12px] leading-[1.6] text-agentos-muted">
        Расчёт приблизительный. Точный — после аудита вашего бизнеса.
      </p>

      <a
        href="#request"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-control bg-agentos-ink text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite"
      >
        Хочу свой магазин →
      </a>
    </div>
  );
}