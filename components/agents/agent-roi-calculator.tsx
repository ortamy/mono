'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';

/** Стоимость проекта «под ключ» для расчёта окупаемости. */
const PROJECT_COST = 150000;
/** Доля диалогов, которые агент закрывает без человека. */
const AUTO_RATE = 0.74;

function formatRub(value: number): string {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`;
}

function formatPayback(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return '—';
  if (months < 1) return 'меньше месяца';
  return `${months.toFixed(1).replace('.', ',')} мес.`;
}

export default function AgentRoiCalculator() {
  const [requests, setRequests] = useState(800);
  const [minutes, setMinutes] = useState(12);
  const [rate, setRate] = useState(800);

  const { loss, savings, payback } = useMemo(() => {
    const r = Math.min(5000, Math.max(100, requests || 0));
    const m = Math.min(30, Math.max(5, minutes || 0));
    const h = Math.min(3000, Math.max(500, rate || 0));
    const computedLoss = r * (m / 60) * h;
    const computedSavings = computedLoss * AUTO_RATE;
    return { loss: computedLoss, savings: computedSavings, payback: computedSavings > 0 ? PROJECT_COST / computedSavings : NaN };
  }, [requests, minutes, rate]);

  return (
    <section id="roi" aria-labelledby="roi-title" className="d-surface scroll-mt-20 border-b border-[var(--d-line)]">
      <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
          <Calculator size={19} strokeWidth={1.6} />
        </span>
        <h2 id="roi-title" className="mt-4 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Сколько вы теряете на рутине?
        </h2>
        <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
          Посчитайте за 20 секунд. Агент забирает 74% диалогов — остальное уходит оператору с полным контекстом.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="d-card p-6 sm:p-7">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="roi-requests" className="d-label">Обращений в месяц</label>
                <span className="text-[15px] font-bold tabular-nums text-[var(--d-ink)]" aria-live="polite">
                  {requests.toLocaleString('ru-RU')}
                </span>
              </div>
              <input id="roi-requests" type="range" min={100} max={5000} step={50} value={requests} onChange={(e) => setRequests(Number(e.target.value))} className="mt-3 w-full" />
              <div className="mt-1 flex justify-between text-[12px] d-faint tabular-nums"><span>100</span><span>5 000</span></div>
            </div>
            <div className="mt-6">
              <label htmlFor="roi-minutes" className="d-label">Среднее время на ответ, мин (5–30)</label>
              <input id="roi-minutes" type="number" min={5} max={30} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="d-input" />
            </div>
            <div className="mt-4">
              <label htmlFor="roi-rate" className="d-label">Ставка оператора, ₽/час (500–3 000)</label>
              <input id="roi-rate" type="number" min={500} max={3000} step={50} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="d-input" />
            </div>
          </div>
          <div className="d-card flex flex-col p-6 sm:p-7" aria-live="polite">
            <dl className="space-y-4">
              <div className="border-b border-[var(--d-line)] pb-4">
                <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Вы теряете</dt>
                <dd className="mt-1 text-[clamp(26px,4vw,34px)] font-bold tabular-nums text-[var(--d-ink)]">{formatRub(loss)}/мес</dd>
              </div>
              <div className="border-b border-[var(--d-line)] pb-4">
                <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">С агентом сэкономите</dt>
                <dd className="mt-1 text-[clamp(26px,4vw,34px)] font-bold tabular-nums text-[var(--d-ink)]">{formatRub(savings)}/мес</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Окупаемость проекта</dt>
                <dd className="mt-1 text-[clamp(26px,4vw,34px)] font-bold tabular-nums text-[var(--d-ink)]">{formatPayback(payback)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-[12px] leading-[1.55] d-faint">Расчёт ориентировочный: 74% диалогов без человека, проект — 150 000 ₽. Точную цифру фиксируем после диагностики.</p>
            <a href="#contact" className="d-btn d-btn-primary mt-6 w-full">Получить расчёт и план экономии <ArrowRight size={16} strokeWidth={1.5} aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
