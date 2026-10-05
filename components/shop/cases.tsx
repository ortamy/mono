/**
 * Секция кейсов.
 *
 * Раньше карточки были инлайном в app/page.tsx и показывали метрики без
 * контекста («224k ₽/мес» — откуда? чья это выручка?). Теперь у кейса есть
 * бренд, владелец и подписи «Было/Стало», поэтому цифра читается однозначно.
 */

const CASES = [
  {
    emoji: '💄',
    brand: 'Anna Cosmetics',
    author: 'Анна К., основатель',
    was: 'WB, 800 000 ₽/мес, комиссия 28%',
    now: 'Свой магазин, 1 200 000 ₽/мес',
    result: '+464 000 ₽/мес',
    resultLabel: 'чистая прибавка',
  },
  {
    emoji: '🏠',
    brand: 'HomeStyle',
    author: 'Дмитрий С., основатель',
    was: 'Ozon, комиссия 22%',
    now: 'Свой магазин + интеграция 1С',
    result: '×3',
    resultLabel: 'повторные покупки за 4 месяца',
  },
  {
    emoji: '💪',
    brand: 'FitPro',
    author: 'Игорь Л., основатель',
    was: '3 маркетплейса, комиссии 30%',
    now: 'Свой магазин, 0% комиссий',
    result: '×2',
    resultLabel: 'чистая прибыль за полгода',
  },
];

export default function Cases() {
  return (
    <section id="cases" className="border-b border-agentos-line">
      <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-[760px]">
          <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ Кейсы</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] tracking-[-1.4px] text-agentos-ink sm:text-[42px]">
            Селлеры, которые уже ушли с маркетплейсов
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.brand}
              className="flex flex-col rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-7"
            >
              {/* Шапка: эмодзи ниши, бренд и владелец */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-agentos-line text-[20px] leading-none"
                >
                  {c.emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-semibold tracking-[-0.3px] text-agentos-ink">
                    {c.brand}
                  </h3>
                  <p className="mt-0.5 truncate text-[12px] text-agentos-muted">{c.author}</p>
                </div>
              </div>

              {/* Метрики Было / Стало */}
              <dl className="mt-6 space-y-3 text-[13px] leading-[1.5]">
                <div className="flex gap-3">
                  <dt className="w-[46px] shrink-0 text-agentos-faint">Было:</dt>
                  <dd className="text-agentos-muted">{c.was}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-[46px] shrink-0 text-agentos-faint">Стало:</dt>
                  <dd className="text-agentos-ink">{c.now}</dd>
                </div>
              </dl>

              {/* Результат */}
              <div className="mt-auto border-t border-agentos-line pt-6">
                <p className="text-[26px] font-semibold tracking-[-1px] text-agentos-ink tabular-nums">
                  {c.result}
                </p>
                <p className="mt-1 text-[12px] text-agentos-muted">{c.resultLabel}</p>
              </div>

              {/* Демо-стенды клиентов закрыты, поэтому вместо них — переход
                  к расчёту: он ведёт туда же, куда и остальные CTA. */}
              <a
                href="#request"
                className="mt-6 text-[13px] font-medium text-agentos-ink underline underline-offset-4 transition-colors hover:text-agentos-graphite"
              >
                Смотреть магазин →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}