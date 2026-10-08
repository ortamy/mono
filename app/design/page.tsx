import { ArrowRight, Send } from 'lucide-react';
import { DESIGN_CASES } from '@/data/design-cases';
import CaseCard from '@/components/design/case-card';
import DesignContactForm from '@/components/design/design-contact-form';

/* ---------- Данные секций ---------- */

const SERVICES = [
  {
    title: 'Лендинг',
    price: 'от 60 000 ₽',
    term: '7–10 дней',
    desc: 'Одностраничник под запуск продукта или рекламную кампанию.',
    points: ['Структура и прототип', 'Дизайн в Figma', 'Адаптив под мобильные'],
  },
  {
    title: 'Сайт / интернет-магазин',
    price: 'от 150 000 ₽',
    term: '3–5 недель',
    desc: 'Многостраничный сайт с каталогом, фильтрами и формами.',
    points: ['UX-исследование', 'Дизайн-система', 'Макеты всех состояний'],
  },
  {
    title: 'Мобильное приложение',
    price: 'от 200 000 ₽',
    term: '4–6 недель',
    desc: 'iOS и Android: от онбординга до основного сценария.',
    points: ['User-flow', 'UI в Figma', 'Передача разработчикам'],
  },
  {
    title: 'UX-аудит',
    price: 'от 40 000 ₽',
    term: '5 дней',
    desc: 'Разбор текущего продукта с конкретными рекомендациями.',
    points: ['Юзабилити-тесты', 'Отчёт с приоритетами', 'Поддержка после внедрения'],
  },
];

const STATS = [
  { value: '7 лет', label: 'в дизайне' },
  { value: '60+', label: 'проектов' },
  { value: '14', label: 'специалистов' },
];

const STEPS = [
  { num: '01', title: 'Бриф и анализ', desc: 'Обсуждаем задачу, изучаю продукт и конкурентов.' },
  { num: '02', title: 'Прототип', desc: 'Структура, сценарии и кликабельный прототип в Figma.' },
  { num: '03', title: 'Дизайн', desc: 'Визуал, состояния, адаптив и дизайн-система.' },
  { num: '04', title: 'Передача', desc: 'Макеты, гайдлайны и сопровождение разработки.' },
];

/* ---------- Страница ---------- */

export default function DesignPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-ink)]" aria-hidden />
          Открыт для проектов — январь 2026
        </span>

        <h1 className="mt-6 text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] tracking-[-2px] text-[var(--d-ink)]">
          UX/UI дизайнер
          <br />
          <span className="d-faint">интерфейсов, которые продают</span>
        </h1>

        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] d-muted">
          Дизайн сайтов и приложений. Figma, AI-инструменты. Превращаю сложные
          продукты в понятные интерфейсы — от исследования до макета под разработку.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="d-btn d-btn-primary">
            Смотреть работы <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </a>
          <a href="#contact" className="d-btn d-btn-ghost">
            <Send size={15} strokeWidth={1.5} aria-hidden /> Обсудить проект
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-[var(--d-line)] pt-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="order-2 text-[12px] uppercase tracking-[0.05em] d-faint">{s.label}</dt>
              <dd className="text-[clamp(26px,4vw,32px)] font-bold tabular-nums text-[var(--d-ink)]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* РАБОТЫ */}
      <section id="work" className="d-surface border-y border-[var(--d-line)] scroll-mt-20">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Портфолио</p>
              <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
                Избранные работы
              </h2>
            </div>
            <p className="max-w-[380px] text-[14px] leading-[1.6] d-muted">
              Шесть проектов из разных ниш: e-commerce, fintech, аналитика,
              медицина, доставка и B2B.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGN_CASES.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Услуги</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Что делаю и сколько стоит
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.title} className="d-card d-hover-line flex flex-col p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[17px] font-semibold text-[var(--d-ink)]">{s.title}</h3>
                <span className="text-[16px] font-bold tabular-nums text-[var(--d-ink)]">{s.price}</span>
              </div>
              <p className="mt-1 text-[12px] d-faint">Срок: {s.term}</p>
              <p className="mt-3 text-[14px] leading-[1.6] d-muted">{s.desc}</p>
              <ul className="mt-4 space-y-2 border-t border-[var(--d-line)] pt-4">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13px] d-muted">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--d-faint)]" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* КАК РАБОТАЮ */}
      <section className="d-surface border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Процесс</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Как идёт работа
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.num} className="d-card p-6">
                <div className="text-[13px] font-semibold tabular-nums d-faint">{s.num}</div>
                <h3 className="mt-3 text-[16px] font-semibold text-[var(--d-ink)]">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] d-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОБО МНЕ */}
      <section id="about" className="mx-auto max-w-[800px] scroll-mt-20 px-5 py-20 text-center sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Обо мне</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,32px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Продуктовый дизайн с фокусом на бизнес
        </h2>
        <p className="mt-5 text-[16px] leading-[1.65] d-muted">
          7 лет проектирую интерфейсы для e-commerce, финтеха и SaaS. Работаю
          через исследование и метрики, а не через «красиво»: каждый макет
          решает конкретную задачу продукта. В работе — Figma и AI-инструменты
          для ускорения исследований и генерации вариантов.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-[clamp(24px,4vw,32px)] font-bold tabular-nums text-[var(--d-ink)]">{s.value}</div>
              <div className="mt-1 text-[12px] uppercase tracking-[0.05em] d-faint">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contact" className="d-surface scroll-mt-20 border-t border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Контакты</p>
              <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
                Расскажите о проекте
              </h2>
              <p className="mt-4 max-w-[420px] text-[15px] leading-[1.65] d-muted">
                Отвечу в течение дня, предложу сроки и смету. Можно написать
                напрямую в Telegram — там быстрее.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href="https://t.me/mono_studio" target="_blank" rel="noreferrer" className="d-btn d-btn-ghost w-full sm:w-auto">
                  <Send size={15} strokeWidth={1.5} aria-hidden /> @mono_studio
                </a>
                <a href="mailto:hello@mono.studio" className="text-[14px] d-muted transition-colors hover:text-[var(--d-ink)]">
                  hello@mono.studio
                </a>
              </div>
            </div>
            <DesignContactForm />
          </div>
        </div>
      </section>
    </>
  );
}