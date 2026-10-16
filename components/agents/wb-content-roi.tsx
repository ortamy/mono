'use client';
import { useMemo, useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
const PROJECT_COST = 300000;
const AUTO_RATE = 0.7;
function formatRub(v: number): string { return `${Math.round(v).toLocaleString('ru-RU')} ₽`; }
function formatPayback(m: number): string {
  if (!Number.isFinite(m) || m <= 0) return '—';
  if (m < 1) return 'меньше месяца';
  return `${m.toFixed(1).replace('.', ',')} мес.`;
}
function clamp(v: number, min: number, max: number, fb: number): number {
  if (!Number.isFinite(v)) return fb;
  return Math.min(max, Math.max(min, v));
}
export default function WbContentRoi() {
  const [sku, setSku] = useState(100);
  const [hours, setHours] = useState(3);
  const [rate, setRate] = useState(1000);
  const { loss, savings, payback } = useMemo(() => {
    const s = clamp(sku, 10, 500, 100);
    const h = clamp(hours, 1, 8, 3);
    const r = clamp(rate, 500, 3000, 1000);
    const l = s * h * r;
    const sv = l * AUTO_RATE;
    return { loss: l, savings: sv, payback: sv > 0 ? PROJECT_COST / sv : NaN };
  }, [sku, hours, rate]);
  const pct = ((clamp(sku, 10, 500, 100) - 10) / 490) * 100;
  return (
    <section aria-labelledby="wb-roi-title" className="d-card mt-3 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
          <Calculator size={19} strokeWidth={1.6} />
        </span>
        <div>
          <h2 id="wb-roi-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">Сколько вы теряете на карточках?</h2>
          <p className="mt-0.5 text-[13px] leading-[1.55] d-muted">Посчитайте за 20 секунд. Агент забирает ~70% рутины.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="wb-roi-sku" className="d-label text-sm font-medium">SKU в месяц</label>
              <span className="text-[15px] font-bold tabular-nums text-[var(--d-ink)]" aria-live="polite">{clamp(sku, 10, 500, 100).toLocaleString('ru-RU')}</span>
            </div>
            <input id="wb-roi-sku" type="range" min={10} max={500} step={10} value={clamp(sku, 10, 500, 100)} onChange={(e) => setSku(Number(e.target.value))} className="calc-slider mt-3 h-12 w-full" style={{ background: `linear-gradient(to right, #0A0A0A ${pct}%, #E5E5E5 ${pct}%)` }} />
            <div className="mt-1 flex justify-between text-[12px] d-faint tabular-nums"><span>10</span><span>500</span></div>
          </div>
          <div>
            <label htmlFor="wb-roi-hours" className="d-label text-sm font-medium">Часов на карточку (1–8)</label>
            <input id="wb-roi-hours" type="number" min={1} max={8} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="d-input mt-2 h-12 w-full py-4 text-base" />
          </div>
          <div>
            <label htmlFor="wb-roi-rate" className="d-label text-sm font-medium">Ставка контент-менеджера, ₽/час (500–3000)</label>
            <input id="wb-roi-rate" type="number" min={500} max={3000} step={50} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="d-input mt-2 h-12 w-full py-4 text-base" />
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
          <p className="mt-4 text-[12px] leading-[1.55] d-faint">Ориентир: −70% рутины, проект — 300 000 ₽ (середина вилки 200–500К).</p>
          <a href="/agents/#contact" className="d-btn d-btn-primary mt-5 inline-flex h-14 min-h-[56px] w-full items-center justify-center gap-2 whitespace-nowrap px-8 py-4 text-base font-semibold">Получить расчёт и план <ArrowRight size={16} strokeWidth={1.5} aria-hidden /></a>
        </div>
      </div>
    </section>
  );
}
