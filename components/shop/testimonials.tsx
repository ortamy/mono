/**
 * Секция отзывов: три карточки с аватаром, текстом и оценкой.
 * Отзывы — те же клиенты, что и в кейсах, поэтому имена и компании
 * переиспользуются: это считывается как подтверждение друг друга.
 */

const TESTIMONIALS = [
  {
    avatar: 'АК',
    name: 'Анна К.',
    company: 'Anna Cosmetics, Москва',
    text: 'Ушли с WB после 3 лет. Комиссия 28% съедала треть выручки. Запустили магазин за месяц, окупился за 4 месяца. Прибыль выросла в 2 раза.',
    stars: 5,
  },
  {
    avatar: 'ДС',
    name: 'Дмитрий С.',
    company: 'HomeStyle, Санкт-Петербург',
    text: 'Главное — теперь база клиентов у нас, а не у маркетплейса. Повторные покупки выросли в 3 раза. Плюс интеграция с 1С сняла всю рутину.',
    stars: 5,
  },
  {
    avatar: 'ИЛ',
    name: 'Игорь Л.',
    company: 'FitPro, Екатеринбург',
    text: 'Продавали на трёх маркетплейсах, отдавали 30%. Запустили свой магазин — комиссий нет, реклама дешевле, прибыль выросла в 2 раза за полгода.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-agentos-line bg-agentos-card">
      <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-[760px]">
          <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ Отзывы</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] tracking-[-1.4px] text-agentos-ink sm:text-[42px]">
            Что говорят клиенты
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">
            Реальные истории тех, кто ушёл с маркетплейсов
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-agentos border border-agentos-line bg-agentos-card p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-agentos-ink text-[13px] font-semibold text-white"
                >
                  {t.avatar}
                </span>
                <div>
                  <figcaption className="text-[14px] font-semibold text-agentos-ink">{t.name}</figcaption>
                  <p className="mt-0.5 text-[12px] text-agentos-muted">{t.company}</p>
                </div>
              </div>

              <blockquote className="mt-6 flex-1 text-[14px] leading-[1.7] text-[#404040]">
                {t.text}
              </blockquote>

              {/* Оценка скрыта от скринридера: число звёзд дублирует видимые символы. */}
              <p className="mt-6 text-[16px] tracking-[2px] text-agentos-ink" aria-label={`Оценка ${t.stars} из 5`}>
                <span aria-hidden="true">{'★'.repeat(t.stars)}</span>
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}