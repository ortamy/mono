'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';

/** Внедрение «под ключ» — нижняя оценка вилки 200–500К. */
const PROJECT_COST = 100000;
/** Доля рутины, которую агент забирает у маркетолога. */
const SAVINGS_RATE = 0.8;

function formatRub(value: number): string {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`;
}

function formatPayback(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return '—';
  if (months < 1) return 'меньше месяца';
  return `${months.toFixed(1).replace('.', ',')} мес.`;
}

function clamp(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/**
 * ROI-калькулятор кейса competitive-research: сколько стоит ручной обход
 * сайтов конкурентов и за сколько окупается агент.
 */
export default function CompetitiveResearchRoi() {
  const [sites, setSites] = useState(12);
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(1500);

  const { loss, savings, payback } = useMemo(() => {
    const s = clamp(sites, 5, 100, 12);
    const h = clamp(hours, 1, 8, 4);
    const r = clamp(rate, 500, 3000, 1500);
    const computedLoss = s * h * r;
    const computedSavings = computedLoss * SAVINGS_RATE;
    return {
      loss: computedLoss,
      savings: computedSavings,
      payback: computedSavings > 0 ? PROJECT_COST / computedSavings : NaN,
    };
  }, [sites, hours, rate]);

  const pct = ((clamp(sites, 5, 100, 12) - 5) / 95) * 100;

  return (
    <section aria-labelledby="cr-roi-title" className="d-card mt-3 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
          <Calculator size={19} strokeWidth={1.6} />
        </span>
        <div>
          <h2 id="cr-roi-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
            Сколько вы теряете на ручном мониторинге?
          </h2>
          <p className="mt-0.5 text-[13px] leading-[1.55] d-muted">Посчитайте за 20 секунд. Агент забирает 80% рутины.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="cr-roi-sites" className="d-label text-sm font-medium">
                Сайтов под наблюдением
              </label>
              <span className="text-[15px] font-bold tabular-nums text-[var(--d-ink)]" aria-live="polite">
                {clamp(sites, 5, 100, 12).toLocaleString('ru-RU')}
              </span>
            </div>
            <input
              id="cr-roi-sites"
              type="range"
              min={5}
              max={100}
              step={1}
              value={clamp(sites, 5, 100, 12)}
              onChange={(e) => setSites(Number(e.target.value))}
              className="calc-slider mt-3 h-12 w-full"
              style={{ background: `linear-gradient(to right, #0A0A0A ${pct}%, #E5E5E5 ${pct}%)` }}
            />
            <div className="mt-1 flex justify-between text-[12px] d-faint tabular-nums">
              <span>5</span>
              <span>100</span>
            </div>
          </div>
          <div>
            <label htmlFor="cr-roi-hours" className="d-label text-sm font-medium">
              Время на ручной мониторинг, ч/сайт в месяц (1–8)
            </label>
            <input
              id="cr-roi-hours"
              type="number"
              min={1}
              max={8}
              step={0.5}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="d-input mt-2 h-12 w-full py-4 text-base"
            />
          </div>
          <div>
            <label htmlFor="cr-roi-rate" className="d-label text-sm font-medium">
              Ставка маркетолога, ₽/час (500–3000)
            </label>
            <input
              id="cr-roi-rate"
              type="number"
              min={500}
              max={3000}
              step={50}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="d-input mt-2 h-12 w-full py-4 text-base"
            />
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-[var(--d-soft)] p-5 sm:p-6" aria-live="polite">
          <dl className="space-y-4">
            <div className="border-b border-[var(--d-line)] pb-4">
              <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Вы теряете</dt>
              <dd className="mt-1 text-[clamp(24px,3.5vw,30px)] font-bold tabular-nums text-[var(--d-ink)]">{formatRub(loss)}/мес</dd>
            </div>
            <div className="border-b border-[var(--d-line)] pb-4">
              <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">С агентом сэкономите</dt>
              <dd className="mt-1 text-[clamp(24px,3.5vw,30px)] font-bold tabular-nums text-agentos-up">{formatRub(savings)}/мес</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Окупаемость</dt>
              <dd className="mt-1 text-[clamp(24px,3.5vw,30px)] font-bold tabular-nums text-[var(--d-ink)]">{formatPayback(payback)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-[12px] leading-[1.55] d-faint">
            Формула: сайты × время × ставка. Агент забирает 80% рутины; внедрение — 100 000 ₽ (вилка 200–500К).
          </p>
          <a
            href="/agents/#contact"
            className="d-btn d-btn-primary mt-5 inline-flex h-14 min-h-[56px] w-full items-center justify-center gap-2 whitespace-nowrap px-8 py-4 text-base font-semibold"
          >
            Получить расчёт и план <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

