/**
 * Секция отзывов: аватар с инициалами, имя, компания, текст и пять звёзд.
 * Ставится между кейсами и услугами — как социальное доказательство.
 */
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    initials: 'АК',
    name: 'Анна К.',
    company: 'Anna Cosmetics',
    text: 'Ушли с WB после 3 лет. Комиссия 28% съедала треть выручки. Прибыль выросла в 2 раза.',
  },
  {
    initials: 'ДС',
    name: 'Дмитрий С.',
    company: 'ФинБанк',
    text: 'Редизайн приложения. Конверсия выросла с 3.9% до 4.8%.',
  },
  {
    initials: 'ИЛ',
    name: 'Игорь Л.',
    company: 'Стома+',
    text: 'Аудит показал 12 проблем. Исправили 5 — записей стало в 2 раза больше.',
  },
];

export default function DesignTestimonials() {
  return (
    <section id="reviews" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
      <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Отзывы</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Что говорят клиенты
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="d-card flex flex-col p-6 sm:p-7">
              <div className="flex items-center gap-0.5 text-[var(--d-ink)]" aria-label="Оценка 5 из 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} className="fill-current" aria-hidden />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-[14px] leading-[1.65] d-muted">
                «{r.text}»
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--d-line)] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full d-soft text-[13px] font-semibold text-[var(--d-ink)]">
                  {r.initials}
                </span>
                <span className="text-[13px] leading-[1.35]">
                  <span className="block font-semibold text-[var(--d-ink)]">{r.name}</span>
                  <span className="mt-0.5 block d-faint">{r.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
