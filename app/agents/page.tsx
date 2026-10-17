import { ArrowRight, Award, BarChart3, Bot, Calculator, CheckCircle, Database, FileJson, Mail, MessageCircle, PenTool, Play, Rocket, Search, Send, Settings, Shield, ShieldCheck, Sparkles, Target, TrendingUp, UserCheck, XCircle, Zap } from 'lucide-react';
import { AGENT_CASES } from '@/data/agent-cases';
import AgentCaseCard from '@/components/agents/agent-case-card';
import AgentContactForm from '@/components/agents/agent-contact-form';
import AgentRoiCalculator from '@/components/agents/agent-roi-calculator';
import AgentStackTeaser from '@/components/agents/agent-stack-teaser';
import JevRagCompare from '@/components/agents/jev-rag-compare';
import { loadDataJSON } from '@/lib/content';
import type { AgentsHeroVariant, SiteConfig } from '@/lib/data-types';
import { connection } from 'next/server';

/* ---------- Динамический hero /agents ---------- */

const site = loadDataJSON<SiteConfig>('site.json');

/** Варианты hero-заголовка /agents: 5 вариантов, ротация по дню недели. */
const HERO_VARIANTS: AgentsHeroVariant[] = site.agents_hero_variants;

/**
 * Выбирает вариант hero по номеру дня недели (0 — воскресенье … 6 — суббота):
 * `variants[dayOfWeek % variants.length]` — циклически, без границы длины массива.
 * Без аргумента берёт текущий день недели на сервере.
 */
function getHeroVariant(dayOfWeek?: number): AgentsHeroVariant {
  const day = dayOfWeek ?? new Date().getDay();
  const index = ((day % HERO_VARIANTS.length) + HERO_VARIANTS.length) % HERO_VARIANTS.length;
  return HERO_VARIANTS[index];
}

/** Цифры и метрики в hero-заголовке: жирнее, tabular-nums, цвет --d-ink. */
const TITLE_METRIC_SPLIT = /(\d[\d\s]*%|\d[\d\s]*₽\/мес|\d+\s+(?:часов|секунд(?:ы)?|недели))/;
const TITLE_METRIC_FULL = /^(?:\d[\d\s]*%|\d[\d\s]*₽\/мес|\d+\s+(?:часов|секунд(?:ы)?|недели))$/;

function renderTitleWithMetrics(title: string) {
  return title.split(TITLE_METRIC_SPLIT).map((part, i) => {
    if (!part) return null;
    if (TITLE_METRIC_FULL.test(part)) {
      return (
        <span
          key={i}
          className="font-extrabold tabular-nums !text-[var(--d-ink)]"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

/* ---------- Данные секций ---------- */

/** Сводные метрики по кейсам. */
const METRICS = [
  { value: '−68%', label: 'ручных операций' },
  { value: '×3', label: 'быстрее ответ клиенту' },
  { value: '24/7', label: 'агент не уходит на обед' },
  { value: '14 дней', label: 'до первого агента в проде' },
  { value: '74%', label: 'обращений агент закрывает без человека' },
];

/** Сравнение «проблема чат-бота → решение агента». */
const CHATBOT_PROBLEMS = [
  {
    problem: '«Я вас не понял. Выберите пункт меню»',
    title: 'Понимает естественный язык',
    desc: 'даже с ошибками и опечатками',
  },
  {
    problem: 'Отвечает, но ничего не делает',
    title: 'Выполняет действия',
    desc: 'оформляет заказы, обновляет CRM, отправляет письма',
  },
  {
    problem: 'Не помнит предыдущий диалог',
    title: 'Помнит всю историю',
    desc: 'возвращается к клиенту через месяц с контекстом',
  },
  {
    problem: 'Работает только в одном канале',
    title: 'Работает везде',
    desc: 'сайт, Telegram, WhatsApp, Instagram DM, почта',
  },
  {
    problem: 'Приводит к оператору в 40% случаев',
    title: 'Закрывает 74% диалогов без человека',
    desc: 'оставшиеся 26% идут с полным контекстом',
  },
];

/** Уровни контроля галлюцинаций LLM: RAG с Jev, формат, содержание, человек. */
const HALLUCINATION_CONTROLS = [
  {
    icon: Database,
    title: 'RAG + Jev (Контроль качества)',
    desc: 'Двухуровневая система: Reranker находит самые точные куски текста, а Semantic Gate отсекает мусор. Бот не выдумывает ответы.',
  },
  {
    icon: FileJson,
    title: 'Structured Output — контроль формата',
    desc: 'Агент обязан вернуть ответ по заданной схеме. Если не может — падает с ошибкой, а не выдумывает.',
  },
  {
    icon: Shield,
    title: 'Guardrails — контроль содержания',
    desc: 'Перед показом клиенту ответ валидируется. Запрещённые слова, неверные цифры — блокируются.',
  },
  {
    icon: UserCheck,
    title: 'Human-in-the-loop — контроль решений',
    desc: 'Для критичных задач агент готовит черновик, а решение принимает человек.',
  },
];

/** Метрики контроля: честная картина работы системы. */
const HALLUCINATION_METRICS = [
  { value: '74%', label: 'обращений агент закрывает без человека' },
  { value: '26%', label: 'с полным контекстом оператору' },
  { value: '0%', label: 'выдуманных ответов, если данных нет в базе знаний' },
];

/** Кому агент подходит. */
const FIT_FOR = [
  'E-commerce с большим потоком однотипных вопросов',
  'SaaS с onboarding-задачами',
  'Услуги (клиники, салоны, юристы) с записью и квалификацией',
  'Бизнесы с чат-ботом, который не справляется',
  'Компании с базой знаний, которую нужно обслуживать',
];

/** Кому агент не подходит. */
const FIT_AGAINST = [
  'Стартапы на pre-seed (нет бюджета и данных)',
  'Бизнесы без digital-процессов',
  'Задачи, требующие только человеческого суждения',
  'Разовые задачи (не окупятся)',
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

/** Сравнение «найм оператора vs агент»: таблица под тарифами. */
const HIRE_VS_AGENT = [
  { label: 'Расходы в месяц', hire: '80 000–120 000 ₽ + налоги', agent: '50 000 ₽, окупается экономией' },
  { label: 'Скорость ответа', hire: '5–15 минут в рабочее время', agent: '8 секунд, 24/7 без выходных' },
  { label: 'Масштаб', hire: 'Один человек — один диалог', agent: 'Сотни диалогов параллельно' },
  { label: 'Память о клиенте', hire: 'Забывает, уходит вместе с сотрудником', agent: 'Помнит всю историю в CRM' },
  { label: 'Рост потока ×2', hire: 'Нанимать и обучать второго', agent: 'Тот же агент, ноль найма' },
];

/** Гарантия после тарифов: снимает риск чека 250–500К. */
const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'Возврат 50% за 30 дней',
    desc: 'Если агент не обрабатывает 40% обращений — возвращаю половину оплаты. Риск на мне, а не на вас.',
  },
  {
    icon: Settings,
    title: 'Первый месяц поддержки — бесплатно',
    desc: 'Держу агента в форме: мониторю качество, обновляю базу знаний. Платите только со второго месяца.',
  },
  {
    icon: UserCheck,
    title: 'Данные и код — ваши',
    desc: 'Уйти можно в любой момент: база знаний, сценарии и интеграции остаются у вас. Без заложников.',
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

/** Карточка тарифа. Блоки why/savings заполняются только у поддержки (ретейнера). */
interface Package {
  title: string;
  price: string;
  term: string;
  desc: string;
  points: string[];
  /** Блок «Почему это важно» — только у ретейнера. */
  why?: string;
  /** Строка экономии — только у ретейнера. */
  savings?: string;
}

/** Тарифы: от диагностики до поддержки агента. */
const PACKAGES: Package[] = [
  {
    title: 'Диагностика',
    price: '15 000 ₽',
    term: '3 дня',
    desc: 'Разбираем процесс и показываем, где агент даст измеримый эффект.',
    points: ['Сценарии и метрика успеха', 'Прототип диалога', 'Оценка сроков и стоимости'],
  },
  {
    title: 'Пилот',
    price: '60 000 ₽',
    term: '2 недели',
    desc: 'Один агент на узкий сценарий в тестовом контуре — до боевого потока.',
    points: ['Сборка агента', 'Одна интеграция', 'Тесты на ваших данных'],
    savings: 'Экономия с первого месяца — от 40 000 ₽. Окупаемость — 1,5 месяца.',
  },
  {
    title: 'Агент под ключ',
    price: '150 000 ₽ + 50 000 ₽/мес',
    term: '3–4 недели',
    desc: 'Полный цикл: сценарии, интеграции, продакшен и дашборд качества.',
    points: ['База знаний и RAG', 'Интеграции с CRM и сайтом', 'Мониторинг и алерты'],
    savings: 'Экономия — 80 000 ₽/мес. ROI за год — 350%.',
  },
  {
    title: 'Поддержка агента (ретейнер)',
    price: '50 000 ₽/мес',
    term: 'помесячно',
    desc: 'Держу агента в форме: слежу за качеством, обновляю базу знаний и расширяю сценарии.',
    points: [
      'Мониторинг качества ответов (ежедневно)',
      'Обновление базы знаний (ежемесячно)',
      'Добавление 1–2 новых сценариев в месяц',
      'Фикс багов и интеграционных проблем',
      'Ежемесячный отчёт по метрикам',
    ],
    why: 'AI-агент деградирует без обновлений. Базы знаний устаревают, модели меняются, новые сценарии не появляются. Без ретейнера через 3 месяца агент начнёт ошибаться.',
    savings: 'Экономия клиента: ~40 часов/мес × ставка = 100 000 ₽. Ретейнер окупается ×2.',
  },
];

/** Жизненный цикл агента после запуска: четыре этапа. */
const LIFECYCLE = [
  {
    icon: Rocket,
    period: 'День 0–30',
    action: 'Запуск, обучение, мониторинг',
    result: 'Работающий агент + бесплатная поддержка',
    savings: '30 000 ₽/мес',
  },
  {
    icon: TrendingUp,
    period: 'Месяц 2–3',
    action: 'Обновление базы знаний, добавление сценариев',
    result: 'Агент обрабатывает больше запросов',
    savings: '60 000 ₽/мес',
  },
  {
    icon: Zap,
    period: 'Месяц 4–6',
    action: 'Обновление LLM, оптимизация промптов',
    result: 'Качество растёт, стоимость токенов падает',
    savings: '80 000 ₽/мес',
  },
  {
    icon: Award,
    period: 'Месяц 7–12',
    action: 'Интеграция с новыми системами, масштабирование',
    result: 'Агент становится центральным инструментом',
    savings: '90 000 ₽/мес',
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
    q: 'А что, если агент ошибётся и скажет клиенту неверное?',
    a: 'Галлюцинации ограничены четырьмя уровнями контроля. RAG + Jev — агент ищет ответ в ваших документах, reranker выбирает самые точные куски, а gate отсекает мусор: если данных нет, бот честно говорит «не знаю», а не выдумывает. Structured Output — ответ возвращается строго по заданной схеме: не сошёлся формат — запрос падает с ошибкой, а не доходит до клиента. Guardrails — перед показом ответ валидируется: запрещённые темы и неверные цифры блокируются. Human-in-the-loop — для критичных сценариев агент готовит черновик, а финальное решение принимает человек. Я не обещаю 100% точности — так не работает ни одна LLM. Я обещаю контролируемую систему: ошибки ограничены, видны на дашборде и исправимы.',
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
    a: 'Диагностика — 15 000 ₽, пилот — 60 000 ₽ (окупаемость 1,5 месяца), агент под ключ — 150 000 ₽ + 50 000 ₽/мес (экономия 80 000 ₽/мес, ROI за год — 350%). Точная оценка — после первого созвона.',
  },
  {
    q: 'А что, если я захочу уйти от вас?',
    a: 'Код, база знаний и данные — ваши. Передаю репозиторий, сценарии и доступы: уйти можно в любой момент, агент продолжит работать без меня.',
  },
  {
    q: 'Сколько стоит поддержка после запуска?',
    a: '50 000 ₽/мес: мониторю качество, обновляю базу знаний и добавляю 1–2 сценария в месяц. Окупается уже с 10 сэкономленных часов операторов.',
  },
  {
    q: 'А если агент не справится?',
    a: 'Возвращаю 50% оплаты в течение 30 дней, если агент не обрабатывает 40% обращений. Плюс первый месяц поддержки — бесплатно.',
  },
  {
    q: 'Что будет, если я не возьму поддержку?',
    a: 'Агент продолжит работать, но через 2–3 месяца начнёт ошибаться: база знаний устареет, модели обновятся, новые сценарии не будут обработаны. Перезапуск после простоя обойдётся дороже, чем год поддержки.',
  },
];

/**
 * Видео-демо скрыто, пока нет записи Loom.
 * JSX блока не удалять: включить SHOW_VIDEO_DEMO = true, когда ролик готов.
 * См. HANDOFF.md §11.
 */
const SHOW_VIDEO_DEMO = false;

/* ---------- Страница ---------- */

interface AgentsPageProps {
  /** Тестовый оверрайд: /agents?day=2 — эмуляция конкретного дня недели (0–6). */
  searchParams?: Promise<{ day?: string | string[] }>;
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  // В статическом экспорте (STATIC_EXPORT=true, GitHub Pages) страница рендерится
  // статически на сборке: вариант hero — по дате сборки, а доступ к searchParams
  // делает страницу динамической и роняет output: 'export'. В обычной серверной
  // сборке (dev / next start) принудительно делаем рендер динамическим: вариант
  // и `?day=` считаются на каждый запрос.
  if (process.env.STATIC_EXPORT !== 'true') {
    await connection();
  }
  // Тестовый оверрайд: /agents?day=2 — эмуляция конкретного дня недели (0–6).
  let dayOverride: string | undefined;
  if (process.env.STATIC_EXPORT !== 'true' && searchParams) {
    const params = await searchParams.catch(() => null);
    const raw = params?.day;
    dayOverride = Array.isArray(raw) ? raw[0] : raw;
  }
  const hero =
    dayOverride !== undefined && /^[0-6]$/.test(dayOverride)
      ? getHeroVariant(Number(dayOverride))
      : getHeroVariant();

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-5 pb-10 pt-10 sm:px-8 sm:pb-16 sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-ink)]" aria-hidden />
          Открыт для проектов — октябрь 2026
        </span>

        <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.15] tracking-[-1px] text-[var(--d-ink)] sm:text-4xl lg:text-5xl lg:leading-[1.06] lg:tracking-[-1.8px]">
          {renderTitleWithMetrics(hero.title)}
        </h1>

        <p className="mt-6 max-w-[36rem] text-lg leading-[1.45] text-[var(--d-muted)] max-sm:text-[14.5px] max-sm:tracking-[-0.02em] sm:text-xl">
          {hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#roi" className="d-btn d-btn-primary h-14 min-h-[56px] w-full whitespace-nowrap px-8 py-4 text-base font-semibold sm:w-auto sm:min-w-[240px]">
            <Calculator size={16} strokeWidth={1.5} aria-hidden /> Посчитать экономию
          </a>
          <a href="#contact" className="d-btn d-btn-ghost h-14 min-h-[56px] w-full whitespace-nowrap px-8 py-4 text-base font-semibold sm:w-auto sm:min-w-[240px]">
            <Send size={16} strokeWidth={1.5} aria-hidden /> Обсудить
          </a>
        </div>
      </section>

      <AgentRoiCalculator />

      {/* У ВАС УЖЕ ЕСТЬ ЧАТ-БОТ? */}
      <section id="chatbot" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-10 sm:px-8 sm:py-16">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
          <Bot size={19} strokeWidth={1.6} />
        </span>
        <h2 className="mt-4 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          У вас уже есть чат-бот? Тогда вы знаете, что не работает.
        </h2>
        <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
          Каждый бизнес, который приходит ко мне с чат-ботом, называет одни и те же
          проблемы. Агент решает их все.
        </p>

        <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-0 sm:overflow-hidden sm:rounded-xl sm:border sm:border-[var(--d-line)]">
          <div className="hidden border-b border-[var(--d-line)] bg-[var(--d-soft)] sm:grid sm:grid-cols-2">
            <div className="px-5 py-3 text-[11px] uppercase tracking-[0.08em] d-faint">
              Проблема с чат-ботом
            </div>
            <div className="border-l border-[var(--d-line)] px-5 py-3 text-[11px] uppercase tracking-[0.08em] d-faint">
              Что делает агент
            </div>
          </div>
          {CHATBOT_PROBLEMS.map((row) => (
            <div
              key={row.problem}
              className="grid gap-0 rounded-xl border border-[var(--d-line)] sm:grid-cols-2 sm:rounded-none sm:border-0 sm:border-b sm:last:border-b-0"
            >
              <div className="flex items-start gap-3 px-5 py-4">
                <XCircle size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 d-faint" aria-hidden />
                <span className="text-[14px] leading-[1.55] d-muted">
                  <span className="font-semibold text-[var(--d-ink)] sm:hidden">Проблема: </span>
                  {row.problem}
                </span>
              </div>
              <div className="flex items-start gap-3 border-t border-[var(--d-line)] px-5 py-4 sm:border-l sm:border-t-0">
                <CheckCircle size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--d-ink)]" aria-hidden />
                <span className="text-[14px] leading-[1.55] text-[var(--d-ink)]">
                  <span className="font-semibold sm:hidden">Решение: </span>
                  <strong className="font-semibold">{row.title}</strong> — {row.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[14px] leading-[1.6] d-muted">
          Не нужно выбрасывать то, что есть. Агент встраивается поверх вашего чат-бота
          и превращает его в работающий инструмент.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a href="#contact" className="d-btn d-btn-primary h-14 min-h-[56px] w-full whitespace-nowrap px-8 py-4 text-base font-semibold sm:w-auto sm:min-w-[240px]">
            Показать демо
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </a>
          <p className="max-w-[420px] text-[13px] d-faint">
            Бесплатный разбор вашего чат-бота — где он теряет клиентов и что можно
            исправить.
          </p>
        </div>
      </section>

      {/* КОНТРОЛЬ ГАЛЛЮЦИНАЦИЙ — ключевое позиционирование */}
      <section id="anti-hallucination" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
            <ShieldCheck size={19} strokeWidth={1.6} />
          </span>
          <h2 className="mt-4 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            LLM ошибаются. Я делаю так, чтобы это не стало вашей проблемой.
          </h2>
          <p className="mt-3 max-w-[620px] text-[14px] leading-[1.6] d-muted">
            Все LLM галлюцинируют — это фундаментальное свойство технологии. Разница между
            плохим и хорошим агентом — в том, что делает разработчик, чтобы ограничить ошибки.
          </p>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {HALLUCINATION_CONTROLS.map((c) => (
              <article key={c.title} className="d-card d-hover-line p-4 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
                  <c.icon size={19} strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold leading-[1.35] text-[var(--d-ink)]">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] d-muted">{c.desc}</p>
              </article>
            ))}
          </div>

          <JevRagCompare />

          <div className="mt-8 sm:mt-10 rounded-xl border border-[var(--d-line)] bg-[var(--d-soft)] p-6 sm:p-7">
            <p className="text-[15px] font-medium leading-[1.65] text-[var(--d-ink)]">
              Я не обещаю 100% точности — так не работает ни одна LLM. Я обещаю контролируемую
              систему: ошибки ограничены, видны и исправимы.
            </p>
          </div>

          <dl className="mt-8 sm:mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {HALLUCINATION_METRICS.map((m) => (
              <div key={m.label} className="d-card p-5">
                <dd className="text-[clamp(26px,4vw,34px)] font-bold tabular-nums text-[var(--d-ink)]">{m.value}</dd>
                <dt className="mt-2 text-[13px] leading-[1.5] d-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* МЕТРИКИ */}
      <section className="d-surface border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Метрики</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Что дают агенты в цифрах
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-5 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5">
            {METRICS.map((m) => (
              <div key={m.label} className="d-card p-5">
                <dt className="text-[11px] uppercase tracking-[0.05em] d-faint">{m.label}</dt>
                <dd className="mt-2 text-3xl font-bold tabular-nums text-[var(--d-ink)] sm:text-4xl">{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[12px] d-faint">По кейсам ниже, 2025–2026.</p>
        </div>
      </section>

      {/* ТИПЫ АГЕНТОВ */}
      <section id="types" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Возможности</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Каких агентов я собираю
        </h2>
        <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
          Один агент — один сценарий с измеримым результатом. Начать можно с пилота
          и расширяться: следующий агент подключается к уже собранной базе знаний.
        </p>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
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

          <div className="mt-8 grid items-stretch gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {AGENT_CASES.map((item) => (
              <AgentCaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section id="process" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Процесс</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Как проходит внедрение
        </h2>
        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* ВИДЕО-ДЕМО: 60 секунд — как агент закрывает диалог без человека */}
      {SHOW_VIDEO_DEMO ? (
      <section aria-labelledby="demo-title" className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
          <Play size={19} strokeWidth={1.6} />
        </span>
        <h2 id="demo-title" className="mt-4 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Смотрите, как агент работает
        </h2>
        <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
          60 секунд: клиент пишет в чат — агент отвечает по базе знаний, оформляет заявку и передаёт оператору только сложное.
        </p>
        <div className="d-card mt-8 sm:mt-10 flex aspect-video flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
            <Play size={22} strokeWidth={1.6} />
          </span>
          <p className="text-[15px] font-semibold text-[var(--d-ink)]">Видео-демо — 60 секунд</p>
          <p className="max-w-[420px] text-[13px] leading-[1.6] d-muted">
            Записываю через Loom: живой диалог агента поддержки — от первого сообщения до закрытой заявки. Видео появится здесь.
          </p>
        </div>
      </section>
      ) : null}

      {/* ТАРИФЫ */}
      <section id="pricing" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Тарифы</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Сколько стоит внедрение
          </h2>
          <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
            Стоимость и сроки фиксируются до старта. Пилот — самый короткий способ
            проверить эффект: если метрика не двигается, останавливаемся.
          </p>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2">
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
                {pkg.why ? (
                  <div className="mt-4 rounded-lg bg-[var(--d-soft)] p-4">
                    <p className="text-[11px] uppercase tracking-[0.06em] d-faint">Почему это важно</p>
                    <p className="mt-2 text-[13px] leading-[1.6] d-muted">{pkg.why}</p>
                  </div>
                ) : null}
                {pkg.savings ? (
                  <p className="mt-4 border-t border-[var(--d-line)] pt-4 text-[13px] font-semibold leading-[1.6] text-[var(--d-ink)]">
                    {pkg.savings}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 overflow-hidden rounded-xl border border-[var(--d-line)]">
            <div className="hidden border-b border-[var(--d-line)] bg-[var(--d-soft)] sm:grid sm:grid-cols-3">
              <div className="px-5 py-3 text-[11px] uppercase tracking-[0.08em] d-faint">Критерий</div>
              <div className="border-l border-[var(--d-line)] px-5 py-3 text-[11px] uppercase tracking-[0.08em] d-faint">Найм оператора</div>
              <div className="border-l border-[var(--d-line)] px-5 py-3 text-[11px] uppercase tracking-[0.08em] d-faint">Агент</div>
            </div>
            {HIRE_VS_AGENT.map((row) => (
              <div key={row.label} className="grid gap-0 border-b border-[var(--d-line)] last:border-b-0 sm:grid-cols-3">
                <div className="px-5 py-4 text-[14px] font-semibold text-[var(--d-ink)]">{row.label}</div>
                <div className="border-t border-[var(--d-line)] px-5 py-4 text-[14px] leading-[1.55] d-muted sm:border-l sm:border-t-0">{row.hire}</div>
                <div className="border-t border-[var(--d-line)] px-5 py-4 text-[14px] font-semibold leading-[1.55] text-[var(--d-ink)] sm:border-l sm:border-t-0">{row.agent}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГАРАНТИЯ — снимает риск чека 250–500К */}
      <section aria-labelledby="guarantee-title" className="mx-auto max-w-[1100px] px-5 pb-10 pt-10 sm:px-8 sm:pb-16 sm:pt-16">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Гарантия</p>
        <h2 id="guarantee-title" className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Риск — на мне, а не на вас
        </h2>
        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-3">
          {GUARANTEES.map((g) => (
            <article key={g.title} className="d-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
                <g.icon size={19} strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold text-[var(--d-ink)]">{g.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] d-muted">{g.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ПОСЛЕ ЗАПУСКА */}
      <section id="lifecycle" className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">После запуска</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Что происходит после запуска
        </h2>
        <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
          AI-агент — это не сайт. Он живёт, обучается и развивается.
        </p>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE.map((s) => (
            <article key={s.period} className="d-card p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
                  <s.icon size={19} strokeWidth={1.6} />
                </span>
                <span className="text-[13px] font-semibold tabular-nums d-faint">{s.period}</span>
              </div>
              <dl className="mt-5 space-y-3 border-t border-[var(--d-line)] pt-4">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Что делаю</dt>
                  <dd className="mt-1 text-[13px] leading-[1.55] d-muted">{s.action}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Что получает клиент</dt>
                  <dd className="mt-1 text-[13px] leading-[1.55] text-[var(--d-ink)]">{s.result}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.06em] d-faint">Экономия</dt>
                  <dd className="mt-1 text-[13px] font-semibold tabular-nums text-agentos-up">{s.savings}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* КОМУ ПОДХОДИТ */}
      <section id="fit" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Кому подходит</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Когда агент уместен, а когда — нет
          </h2>
          <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
            Честно: агент окупается не в каждом бизнесе. Ниже — где он приносит
            результат и где браться не стоит.
          </p>

          <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-2">
            <div className="d-card p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <Sparkles size={18} strokeWidth={1.6} className="text-[var(--d-ink)]" aria-hidden />
                <h3 className="text-[17px] font-semibold text-[var(--d-ink)]">Кому подходит</h3>
              </div>
              <ul className="mt-4 space-y-2 border-t border-[var(--d-line)] pt-4">
                {FIT_FOR.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[14px] leading-[1.55] d-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--d-faint)]" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-card p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <XCircle size={18} strokeWidth={1.6} className="d-faint" aria-hidden />
                <h3 className="text-[17px] font-semibold text-[var(--d-ink)]">Кому не подходит</h3>
              </div>
              <ul className="mt-4 space-y-2 border-t border-[var(--d-line)] pt-4">
                {FIT_AGAINST.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[14px] leading-[1.55] d-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--d-faint)]" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">FAQ</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Частые вопросы
          </h2>
          <div className="mt-8 max-w-[800px] space-y-3">
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

      {/* ОБО МНЕ */}
      <section id="about" className="mx-auto max-w-[800px] scroll-mt-20 px-5 py-10 text-center sm:px-8 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Обо мне</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,32px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Собираю агентов, которые закрывают рутину
        </h2>
        <p className="mt-5 text-[16px] leading-[1.65] d-muted">
          Один специалист: сценарии, стек, интеграции и запуск. Без команды
          подрядчиков и без «давайте ещё подумаем».
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-8">
          <div>
            <div className="text-[clamp(24px,4vw,32px)] font-bold tabular-nums text-[var(--d-ink)]">14 дней</div>
            <div className="mt-1 text-[12px] uppercase tracking-[0.05em] d-faint">до прода</div>
          </div>
          <div>
            <div className="text-[clamp(24px,4vw,32px)] font-bold tabular-nums text-[var(--d-ink)]">5</div>
            <div className="mt-1 text-[12px] uppercase tracking-[0.05em] d-faint">агентов в кейсах</div>
          </div>
          <div>
            <div className="text-[clamp(24px,4vw,32px)] font-bold tabular-nums text-[var(--d-ink)]">1</div>
            <div className="mt-1 text-[12px] uppercase tracking-[0.05em] d-faint">специалист</div>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contact" className="scroll-mt-20 border-t border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-16">
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
                <a href="https://t.me/ortamy" target="_blank" rel="noreferrer" className="d-btn d-btn-ghost flex h-14 min-h-[56px] w-full items-center gap-2 whitespace-nowrap px-8 py-4 text-base font-semibold sm:w-auto sm:min-w-[240px]">
                  <Send size={16} strokeWidth={1.5} aria-hidden /> Написать
                </a>
                <a href="mailto:hamaschiah@proton.me" className="d-btn d-btn-ghost flex h-14 min-h-[56px] w-full items-center gap-2 whitespace-nowrap px-8 py-4 text-base font-semibold sm:w-auto sm:min-w-[240px]">
                  <Mail size={16} strokeWidth={1.5} aria-hidden /> hamaschiah@proton.me
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
