'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  FileSearch,
  Plug,
  Quote,
  Rocket,
  Settings,
  ShieldCheck,
  TestTube,
} from 'lucide-react';

/** Стоимость проекта «под ключ» для расчёта окупаемости поддержки. */
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

function clamp(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

const TIMELINE = [
  { day: 'День 1–3', title: 'Аудит и база знаний', desc: 'Разбираем сценарии, статьи и тон ответов магазина.', icon: FileSearch },
  { day: 'День 4–7', title: 'Интеграции', desc: 'Подключаем 1С, WhatsApp, Telegram и чат на сайте.', icon: Plug },
  { day: 'День 8–12', title: 'Обучение на диалогах', desc: 'Гоняем агента на реальных вопросах, правим порог уверенности.', icon: Settings },
  { day: 'День 13–14', title: 'Тест с оператором', desc: 'Сверяем эскалации и фиксируем приёмку качества.', icon: TestTube },
  { day: 'День 15', title: 'Запуск 24/7', desc: 'Агент отвечает сам, спорное уходит оператору с контекстом.', icon: Rocket },
];

const FLOW = [
  { t: 'Триггер', d: 'Клиент пишет в WhatsApp, Telegram или чат на сайте.' },
  { t: 'Обработка', d: 'RAG ищет ответ в статьях магазина и статусе заказа из 1С.' },
  { t: 'Действие', d: 'Агент отвечает за 8 секунд и ставит ссылку на источник.' },
  { t: 'Проверка', d: 'Ниже порога уверенности диалог уходит оператору.' },
  { t: 'Мониторинг', d: 'Журнал, оценка и топ тем — на дашборде качества.' },
];

const COMPARE = [
  {
    label: 'Стоимость',
    agent: '150К разово, затем поддержка',
    operator: '80–120К ₽/мес + налоги',
    bot: 'дешевле, но не закрывает задачу',
  },
  {
    label: 'Скорость',
    agent: '8 секунд, 24/7',
    operator: '10–15 минут в рабочее время',
    bot: 'мгновенно, если попал в меню',
  },
  {
    label: 'Закрытие',
    agent: '74% без человека',
    operator: 'один диалог за раз',
    bot: 'в 40% случаев ведёт к оператору',
  },
  {
    label: 'Действия',
    agent: 'статус из 1С, эскалация с контекстом',
    operator: 'всё вручную',
    bot: 'отвечает, но ничего не делает',
  },
  {
    label: 'Память',
    agent: 'вся история в CRM',
    operator: 'уходит вместе с сотрудником',
    bot: 'не помнит предыдущий диалог',
  },
  {
    label: 'Окупаемость',
    agent: '1,6 мес при потоке обращений',
    operator: 'нет: расход каждый месяц',
    bot: 'нет: теряет клиентов ночью',
  },
];

export default function SupportRoi() {
  const [requests, setRequests] = useState(800);
  const [minutes, setMinutes] = useState(12);
  const [rate, setRate] = useState(800);

  const { loss, savings, payback } = useMemo(() => {
    const r = clamp(requests, 100, 5000, 800);
    const m = clamp(minutes, 5, 30, 12);
    const h = clamp(rate, 500, 3000, 800);
    const computedLoss = r * (m / 60) * h;
    const computedSavings = computedLoss * AUTO_RATE;
    return {
      loss: computedLoss,
      savings: computedSavings,
      payback: computedSavings > 0 ? PROJECT_COST / computedSavings : NaN,
    };
  }, [requests, minutes, rate]);

  const pct = ((clamp(requests, 100, 5000, 800) - 100) / 4900) * 100;

  return (
    <section aria-labelledby="sf-roi-title" className="d-card mt-3 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
          <Calculator size={19} strokeWidth={1.6} />
        </span>
        <div>
          <h2 id="sf-roi-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
            Сколько вы теряете на поддержке?
          </h2>
          <p className="mt-0.5 text-[13px] leading-[1.55] d-muted">Посчитайте за 20 секунд. Агент забирает 74% диалогов.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="sf-roi-requests" className="d-label text-sm font-medium">
                Обращений в месяц
              </label>
              <span className="text-[15px] font-bold tabular-nums text-[var(--d-ink)]" aria-live="polite">
                {clamp(requests, 100, 5000, 800).toLocaleString('ru-RU')}
              </span>
            </div>
            <input
              id="sf-roi-requests"
              type="range"
              min={100}
              max={5000}
              step={50}
              value={clamp(requests, 100, 5000, 800)}
              onChange={(e) => setRequests(Number(e.target.value))}
              className="calc-slider mt-3 h-12 w-full"
              style={{ background: `linear-gradient(to right, #0A0A0A ${pct}%, #E5E5E5 ${pct}%)` }}
            />
            <div className="mt-1 flex justify-between text-[12px] d-faint tabular-nums">
              <span>100</span>
              <span>5 000</span>
            </div>
          </div>
          <div>
            <label htmlFor="sf-roi-minutes" className="d-label text-sm font-medium">
              Среднее время на ответ, мин (5–30)
            </label>
            <input
              id="sf-roi-minutes"
              type="number"
              min={5}
              max={30}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="d-input mt-2 h-12 w-full py-4 text-base"
            />
          </div>
          <div>
            <label htmlFor="sf-roi-rate" className="d-label text-sm font-medium">
              Ставка оператора, ₽/час (500–3000)
            </label>
            <input
              id="sf-roi-rate"
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
          <p className="mt-4 text-[12px] leading-[1.55] d-faint">Ориентир: 74% диалогов без человека, проект — 150 000 ₽ (кейсовая вилка).</p>
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

export { SupportRoi };

export function SupportQuote() {
  return (
    <figure className="d-card mt-3 p-4 sm:p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
        <Quote size={19} strokeWidth={1.6} />
      </span>
      <blockquote className="mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-[var(--d-ink)]">
        «Раньше два оператора отвечали по 10–15 минут, ночью и в выходные — тишина. Теперь агент закрывает 74% диалогов за 8 секунд, а человек берёт только спорное.»
      </blockquote>
      <figcaption className="mt-3 text-[13px] d-muted">
        — Анна С., владелец «Мебель-Дом» · <span className="d-faint">пример из практики (концепт)</span>
      </figcaption>
    </figure>
  );
}

export function SupportTimeline() {
  return (
    <section aria-labelledby="sf-tl-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="sf-tl-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Внедрение за 15 дней
      </h2>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {TIMELINE.map((s) => (
          <li key={s.day} className="d-card p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
              <s.icon size={17} strokeWidth={1.6} />
            </span>
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] d-faint tabular-nums">{s.day}</p>
            <p className="mt-1 text-[14px] font-semibold text-[var(--d-ink)]">{s.title}</p>
            <p className="mt-1 text-[13px] leading-[1.55] d-muted">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SupportDataProof() {
  return (
    <section aria-labelledby="sf-tech-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="sf-tech-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Как идёт диалог: технический путь
      </h2>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {FLOW.map((s, i) => (
          <li key={s.t} className="d-card p-4">
            <p className="text-[12px] font-semibold tabular-nums d-faint">Шаг {i + 1}</p>
            <p className="mt-1 text-[14px] font-semibold text-[var(--d-ink)]">{s.t}</p>
            <p className="mt-1 text-[13px] leading-[1.55] d-muted">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 font-mono text-[12px] leading-[1.6] d-faint">WhatsApp / сайт → RAG + 1С → GPT-4o → оператор при эскалации</p>
    </section>
  );
}

export function SupportGuarantee() {
  return (
    <section aria-labelledby="sf-g-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="sf-g-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Гарантия: риск — на мне
      </h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        <li className="d-card p-4">
          <p className="text-[14px] font-semibold text-[var(--d-ink)]">Возврат 50% за 30 дней</p>
          <p className="mt-1 text-[13px] leading-[1.55] d-muted">если агент не обрабатывает 40% обращений.</p>
        </li>
        <li className="d-card p-4">
          <p className="text-[14px] font-semibold text-[var(--d-ink)]">Первый месяц поддержки — бесплатно</p>
          <p className="mt-1 text-[13px] leading-[1.55] d-muted">правки базы знаний и сценариев включены.</p>
        </li>
        <li className="d-card p-4">
          <p className="text-[14px] font-semibold text-[var(--d-ink)]">Данные и код — ваши</p>
          <p className="mt-1 text-[13px] leading-[1.55] d-muted">уйти можно в любой момент.</p>
        </li>
      </ul>
    </section>
  );
}

export function SupportCompare() {
  return (
    <section aria-labelledby="sf-cmp-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="sf-cmp-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Агент поддержки vs оператор и чат-бот
      </h2>
      <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--d-line)]">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px] leading-[1.55]">
          <thead>
            <tr className="bg-[var(--d-soft)]">
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Критерий</th>
              <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Агент поддержки</th>
              <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Оператор</th>
              <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Чат-бот</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label} className="border-t border-[var(--d-line)]">
                <td className="px-4 py-3 font-semibold text-[var(--d-ink)]">{row.label}</td>
                <td className="border-l border-[var(--d-line)] px-4 py-3 font-semibold text-[var(--d-ink)]">{row.agent}</td>
                <td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">{row.operator}</td>
                <td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">{row.bot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a
        href="/agents/#contact"
        className="d-btn d-btn-ghost mt-4 inline-flex h-12 min-h-[48px] items-center gap-2 px-6 py-3 text-[15px] font-semibold"
      >
        <ShieldCheck size={16} strokeWidth={1.5} aria-hidden /> Обсудить под мой магазин <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
      </a>
    </section>
  );
}

