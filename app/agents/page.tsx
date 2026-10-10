import { ArrowRight, BarChart3, MessageCircle, PenTool, Search, Send, Settings, Target } from 'lucide-react';
import { AGENT_CASES } from '@/data/agent-cases';
import AgentCaseCard from '@/components/agents/agent-case-card';
import AgentContactForm from '@/components/agents/agent-contact-form';
import AgentStackTeaser from '@/components/agents/agent-stack-teaser';

/* ---------- Данные секций ---------- */

/** Сводные метрики по кейсам. */
const METRICS = [
  { value: '−68%', label: 'ручных операций' },
  { value: '×3', label: 'быстрее ответ клиенту' },
  { value: '24/7', label: 'агент не уходит на обед' },
  { value: '14 дней', label: 'до первого агента в проде' },
];

/** Типы агентов: шесть карточек с иконками Lucide. */
const AGENT_TYPES = [
  {
    icon: MessageCircle,
    title: 'Агент поддержки',
    desc: 'Отвечает клиентам 24/7 по вашей базе знаний, а спорное передаёт оператору.',
    points: ['Статусы заказа и возвраты', 'Подбор товара', 'Эскалация оператору'],
  },
  {
    icon: Target,
    title: 'Sales-агент',
    desc: 'Квалифицирует лиды по вашему ICP, ведёт диалог по скрипту и записывает на встречу.',
    points: ['Первый ответ за 40 секунд', 'Скрипт продаж', 'Запись в календарь'],
  },
  {
    icon: PenTool,
    title: 'Контент-агент',
    desc: 'Генерирует карточки, описания и посты партиями — в тоне голоса бренда.',
    points: ['Карточки WB и Ozon', 'Посты и рассылки', 'Проверка фактов по ТЗ'],
  },
  {
    icon: BarChart3,
    title: 'Аналитик',
    desc: 'Отвечает на вопросы о продажах цифрами и присылает сводки по расписанию.',
    points: ['Вопрос словами вместо SQL', 'Утренние сводки', 'Алерты по метрикам'],
  },
  {
    icon: Settings,
    title: 'Операционный агент',
    desc: 'Закрывает рутину между системами: CRM, 1С, таблицы, почта.',
    points: ['Перенос данных', 'Отчёты по расписанию', 'Согласование заявок'],
  },
  {
    icon: Search,
    title: 'Research-агент',
    desc: 'Следит за конкурентами, ценами и новостями рынка, готовит дайджест.',
    points: ['Мониторинг цен', 'Ежедневный дайджест', 'Сигналы о запусках'],
  },
];

/** Пять шагов внедрения. */
const STEPS = [
  { num: '01', title: 'Сценарий', desc: 'Разбираем процесс и данные, выбираем метрику успеха агента.' },
  { num: '02', title: 'Прототип', desc: 'Собираем диалог и логику на ваших реальных кейсах за 3 дня.' },
  { num: '03', title: 'Интеграции', desc: 'Подключаем CRM, сайт, мессенджеры и базу знаний.' },
  { num: '04', title: 'Тесты', desc: 'Гоняем на живых ситуациях и считаем долю правильных ответов.' },
  { num: '05', title: 'Запуск', desc: 'Выкатываем, следим за качеством и дообучаем на ошибках.' },
];

/** Тарифы: от диагностики до сопровождения. */
const PACKAGES = [
  {
    title: 'Диагностика',
    price: '15 000 ₽',
    term: '3 дня',
    desc: 'Разбираем процесс и показываем, где агент даст измеримый эффект.',
    points: ['Сценарии и метрика успеха', 'Прототип диалога', 'Оценка сроков и стоимости'],
  },
  {
    title: 'Пилот',
    price: 'от 60 000 ₽',
    term: '2 недели',
    desc: 'Один агент на узкий сценарий в тестовом контуре — до боевого потока.',
    points: ['Сборка агента', 'Одна интеграция', 'Тесты на ваших данных'],
  },
  {
    title: 'Агент под ключ',
    price: 'от 150 000 ₽',
    term: '3–4 недели',
    desc: 'Полный цикл: сценарии, интеграции, продакшен и дашборд качества.',
    points: ['База знаний и RAG', 'Интеграции с CRM и сайтом', 'Мониторинг и алерты'],
  },
  {
    title: 'Сопровождение',
    price: 'от 35 000 ₽/мес',
    term: 'помесячно',
    desc: 'Дообучение на новых кейсах, расширение сценариев и поддержка работы.',
    points: ['Еженедельные улучшения', 'Новые сценарии', 'Отчёт раз в месяц'],
  },
];

/** Частые вопросы. */
const FAQ = [
  {
    q: 'Сколько времени занимает запуск агента?',
    a: 'Пилот — 2 недели, продакшен-агент с интеграциями — 3–4 недели. Первый прототип диалога вы видите на 3-й день.',
  },
  {
    q: 'На каких данных работает агент?',
    a: 'На ваших: база знаний, CRM, сайт, 1С, таблицы. Данные не уходят в публичные обучающие выборки — модель получает только контекст запроса.',
  },
  {
    q: 'Что если агент ошибётся?',
    a: 'У каждого сценария есть порог уверенности: ниже него ответ уходит оператору. Все диалоги логируются, качество видно на дашборде.',
  },
  {
    q: 'Нужен ли свой разработчик?',
    a: 'Нет: я отвечаю за сценарии, сборку, интеграции и запуск. От вас — доступы и эксперт, который проверяет ответы на старте.',
  },
  {
    q: 'Интегрируетесь с нашей CRM и сайтом?',
    a: 'Да: Telegram и WhatsApp, amoCRM и Битрикс24, WordPress и самописные сайты, 1С и любые API с документацией.',
  },
  {
    q: 'Сколько это стоит?',
    a: 'Диагностика — 15 000 ₽, пилот — от 60 000 ₽, агент под ключ — от 150 000 ₽. Точная оценка — после первого созвона.',
  },
];

/* ---------- Страница ---------- */

export default function AgentsPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-ink)]" aria-hidden />
          Открыт для проектов — октябрь 2026
        </span>

        <h1 className="mt-6 text-[clamp(32px,5.2vw,56px)] font-bold leading-[1.06] tracking-[-1.8px] text-[var(--d-ink)]">
          Собираю AI-агентов,
          <br />
          <span className="d-faint">которые работают вместо рутины</span>
        </h1>

        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] d-muted">
          Агенты поддержки, продаж, контента и аналитики на ваших данных: от прототипа
          диалога до продакшена с мониторингом качества.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="d-btn d-btn-primary">
            Смотреть кейсы <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </a>
          <a href="#contact" className="d-btn d-btn-ghost">
            <Send size={15} strokeWidth={1.5} aria-hidden /> Обсудить агента
          </a>
        </div>
      </section>

      {/* МЕТРИКИ */}
      <section className="d-surface border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Метрики</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Что дают агенты в цифрах
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="d-card p-5">
                <dt className="text-[11px] uppercase tracking-[0.05em] d-faint">{m.label}</dt>
                <dd className="mt-2 text-[clamp(26px,4vw,34px)] font-bold tabular-nums text-[var(--d-ink)]">{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[12px] d-faint">По кейсам ниже, 2025–2026.</p>
        </div>
      </section>

      {/* ТИПЫ АГЕНТОВ */}
      <section id="types" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Возможности</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Каких агентов я собираю
        </h2>
        <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
          Один агент — один сценарий с измеримым результатом. Начать можно с пилота
          и расширяться: следующий агент подключается к уже собранной базе знаний.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_TYPES.map((t) => (
            <article key={t.title} className="d-card d-hover-line p-6 sm:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
                <t.icon size={19} strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold text-[var(--d-ink)]">{t.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] d-muted">{t.desc}</p>
              <ul className="mt-4 space-y-2 border-t border-[var(--d-line)] pt-4">
                {t.points.map((p) => (
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

      {/* КЕЙСЫ */}
      <section id="work" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Кейсы</p>
              <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
                Живые агенты в работе
              </h2>
            </div>
            <p className="max-w-[380px] text-[14px] leading-[1.6] d-muted">
              Пять агентов в проде: поддержка, продажи, контент, аналитика и разведка.
              У каждого — свои данные, интеграции и метрика, ради которой он собран.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AGENT_CASES.map((item) => (
              <AgentCaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section id="process" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Процесс</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Как проходит внедрение
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.num} className="d-card p-5">
              <div className="text-[13px] font-semibold tabular-nums d-faint">{s.num}</div>
              <h3 className="mt-3 text-[16px] font-semibold text-[var(--d-ink)]">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] d-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* СТЕК */}
      <AgentStackTeaser />

      {/* ТАРИФЫ */}
      <section id="pricing" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Тарифы</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Сколько стоит внедрение
          </h2>
          <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
            Стоимость и сроки фиксируются до старта. Пилот — самый короткий способ
            проверить эффект: если метрика не двигается, останавливаемся.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PACKAGES.map((pkg) => (
              <article key={pkg.title} className="d-card d-hover-line flex flex-col p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[17px] font-semibold text-[var(--d-ink)]">{pkg.title}</h3>
                  <span className="text-[16px] font-bold tabular-nums text-[var(--d-ink)]">{pkg.price}</span>
                </div>
                <p className="mt-1 text-[12px] d-faint">Срок: {pkg.term}</p>
                <p className="mt-3 text-[14px] leading-[1.6] d-muted">{pkg.desc}</p>
                <ul className="mt-4 space-y-2 border-t border-[var(--d-line)] pt-4">
                  {pkg.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13px] d-muted">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--d-faint)]" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[820px] px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">FAQ</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Частые вопросы
          </h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="d-card group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-[var(--d-ink)] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="d-faint transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-[14px] leading-[1.65] d-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contact" className="scroll-mt-20 border-t border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Заявка</p>
              <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
                Расскажите, какую рутину закрыть
              </h2>
              <p className="mt-4 max-w-[420px] text-[15px] leading-[1.65] d-muted">
                Отвечу в течение дня: предложу сценарий агента, метрику успеха и оценку
                пилота. Можно написать напрямую в Telegram — там быстрее.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href="https://t.me/ortamy" target="_blank" rel="noreferrer" className="d-btn d-btn-ghost w-full sm:w-auto">
                  <Send size={15} strokeWidth={1.5} aria-hidden /> @ortamy
                </a>
                <a href="mailto:hamaschiah@proton.me" className="text-[14px] d-muted transition-colors hover:text-[var(--d-ink)]">
                  hamaschiah@proton.me
                </a>
              </div>
            </div>
            <AgentContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
