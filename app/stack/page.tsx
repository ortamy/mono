import Link from 'next/link';
import { ArrowLeft, ArrowRight, Send, X } from 'lucide-react';
import { STACK_GROUPS } from '@/data/stack';
import { StackIcon } from '@/components/agents/agent-stack-logos';

/**
 * /stack — полный разбор стека, на который ссылается компактный блок «Стек»
 * на /agents. Названия инструментов приходят из data/stack.ts, а марки — из
 * реестра components/agents/agent-stack-logos.tsx (StackIcon). Поэтому новый
 * инструмент добавляется в одном месте и сразу появляется и в блоке, и здесь.
 */

/** Принципы, по которым собирается стек. */
const PRINCIPLES = [
  {
    title: 'Open-source ядро',
    desc: 'Оркестрацию и векторный поиск держу на открытых решениях: их можно развернуть у вас и не зависеть от одного вендора.',
  },
  {
    title: 'Self-hosted по умолчанию',
    desc: 'Данные и модели по возможности остаются в вашем контуре. Облако — только там, где это осознанный выбор.',
  },
  {
    title: 'Меняем инструмент, а не сценарий',
    desc: 'Логика агента описана отдельно от модели и вендора: замена LLM или базы не ломает сценарий.',
  },
];

/**
 * Ситуация клиента → минимальный стек под неё. Показывает, что набор
 * инструментов — следствие задачи, а не самоцель: одна и та же услуга
 * собирается по-разному в зависимости от данных, бюджета и требований к контуру.
 */
const FIT_MATRIX = [
  {
    situation: 'Чат-бот поддержки на базе знаний',
    stack: 'Dify + pgvector + GPT-4o',
    why: 'Линейный сценарий: прототип собирается за вечер, продакшен — за недели, без своего бэкенда.',
  },
  {
    situation: 'Многошаговый агент с ветвлениями и памятью',
    stack: 'LangGraph + Claude + Qdrant',
    why: 'Ветки, циклы и human-in-the-loop требуют явного графа состояний, а не одного вызова модели.',
  },
  {
    situation: 'Связать агента с CRM, почтой и таблицами',
    stack: 'n8n + ByteChef + API',
    why: 'Интеграции собираются визуально и остаются в вашем контуре — без отдельной разработки на каждый сервис.',
  },
  {
    situation: 'Данные не должны уходить наружу',
    stack: 'Mistral (self-hosted) + Qdrant + PostgreSQL',
    why: 'Полностью локальный контур: и модель, и векторный поиск разворачиваются на вашем железе.',
  },
  {
    situation: 'Нужен контроль качества и стоимости',
    stack: 'LangSmith + Langfuse',
    why: 'Трейсинг шагов и метрики ответов: видно, где ломается сценарий и во сколько обходится ответ.',
  },
];

/** Что такой стек даёт бизнесу: не технологии, а результат. */
const VALUE = [
  {
    title: 'Запуск за недели, а не месяцы',
    desc: 'Прототип на конструкторе вы видите почти сразу, а не после нескольких спринтов разработки.',
  },
  {
    title: 'Ниже стоимость владения',
    desc: 'Open-source ядро вместо дорогих платформ: вы платите за интеграции, а не за лицензии по подписке.',
  },
  {
    title: 'Данные под контролем',
    desc: 'Self-hosted там, где это критично: переписка клиентов и база знаний не уходят в чужое облако.',
  },
];

/** Антипаттерны: что мешает проекту и чем я это заменяю. */
const ANTI_PATTERNS = [
  {
    bad: 'Агент ради агента',
    instead:
      'Сначала проверяю, не решает ли задачу обычная форма или сценарий на правилах. Если решает — агент не нужен.',
  },
  {
    bad: 'Один вендор на всё',
    instead:
      'Логика, модель и хранилище не связаны жёстко: замена любого слоя не требует переписать сценарий.',
  },
  {
    bad: 'Стек «про запас»',
    instead:
      'Беру минимум инструментов под текущую задачу: лишние сервисы — это лишний счёт, сложность и точки отказа.',
  },
];

export default function StackPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 text-[13px] d-muted transition-colors hover:text-[var(--d-ink)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden /> К услуге AI-агентов
        </Link>

        <h1 className="mt-6 text-[clamp(32px,5.2vw,56px)] font-bold leading-[1.06] tracking-[-1.8px] text-[var(--d-ink)]">
          Стек сборки агентов
        </h1>
        <p className="mt-6 max-w-[620px] text-[16px] leading-[1.65] d-muted">
          Ниже — инструменты, из которых я собираю агентов, и объяснение: зачем
          каждый нужен и в какой ситуации его выбираю. Набор не догма — под задачу
          беру минимально достаточный стек, а не всё сразу.
        </p>
      </section>

      {/* ГРУППЫ СТЕКА */}
      <section className="d-surface border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-5 sm:grid-cols-2">
            {STACK_GROUPS.map((group) => (
              <article key={group.title} className="d-card d-hover-line p-6 sm:p-7">
                <h2 className="text-[17px] font-semibold text-[var(--d-ink)]">{group.title}</h2>
                <p className="mt-2 text-[14px] leading-[1.6] d-muted">{group.blurb}</p>
                <ul className="mt-5 space-y-3 border-t border-[var(--d-line)] pt-5">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="flex gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--d-line)] text-[var(--d-ink)]"
                        aria-hidden
                      >
                        <StackIcon tech={tool.name} size="14px" />
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold text-[var(--d-ink)]">{tool.name}</p>
                        <p className="mt-0.5 text-[13px] leading-[1.6] d-muted">{tool.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ПРИНЦИПЫ */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Принципы</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Почему именно такая связка
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="d-card p-6">
              <h3 className="text-[16px] font-semibold text-[var(--d-ink)]">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] d-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* СИТУАЦИЯ → СТЕК */}
      <section id="fit" className="d-surface scroll-mt-20 border-y border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Подбор</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Какая задача — какой стек
          </h2>
          <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
            Стек выбирается под ситуацию, а не наоборот: под задачу беру минимально
            достаточный набор инструментов.
          </p>

          {/* На широком экране — таблица, на узком строка складывается в карточку. */}
          <div className="d-card mt-10 overflow-hidden">
            <div className="hidden border-b border-[var(--d-line)] px-6 py-4 text-[11px] uppercase tracking-[0.08em] d-faint sm:grid sm:grid-cols-[1.1fr_0.9fr_1.6fr] sm:gap-6">
              <span>Ситуация</span>
              <span>Минимальный стек</span>
              <span>Почему так</span>
            </div>
            <ul>
              {FIT_MATRIX.map((row, i) => (
                <li
                  key={row.situation}
                  className={`grid gap-3 px-5 py-5 sm:grid-cols-[1.1fr_0.9fr_1.6fr] sm:gap-6 sm:px-6 ${
                    i > 0 ? 'border-t border-[var(--d-line)]' : ''
                  }`}
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.08em] d-faint sm:hidden">
                      Ситуация
                    </span>
                    <p className="mt-1 text-[14px] font-semibold leading-[1.5] text-[var(--d-ink)] sm:mt-0">
                      {row.situation}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.08em] d-faint sm:hidden">
                      Минимальный стек
                    </span>
                    <p className="mt-1 text-[13px] leading-[1.5] d-muted sm:mt-0">{row.stack}</p>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.08em] d-faint sm:hidden">
                      Почему так
                    </span>
                    <p className="mt-1 text-[13px] leading-[1.6] d-muted sm:mt-0">{row.why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ЦЕННОСТЬ */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Что это даёт</p>
        <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
          Что бизнес получает от такого стека
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {VALUE.map((v, i) => (
            <article key={v.title} className="d-card p-6">
              <div className="text-[13px] font-semibold tabular-nums d-faint">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-3 text-[16px] font-semibold text-[var(--d-ink)]">{v.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] d-muted">{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* АНТИПАТТЕРНЫ */}
      <section className="d-surface border-t border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Чего я избегаю</p>
          <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Чего не будет в вашем проекте
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {ANTI_PATTERNS.map((a) => (
              <article key={a.bad} className="d-card p-6">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--d-line)] d-faint"
                  aria-hidden
                >
                  <X size={16} strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-[var(--d-ink)]">{a.bad}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] d-muted">{a.instead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d-surface border-t border-[var(--d-line)]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-[clamp(24px,3.4vw,32px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
            Не уверены, какой стек нужен под вашу задачу?
          </h2>
          <p className="mt-3 max-w-[560px] text-[15px] leading-[1.65] d-muted">
            На диагностике разберём процесс и подберём минимальный набор инструментов
            под ваши данные и бюджет.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/agents/#contact" className="d-btn d-btn-primary">
              Обсудить агента <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
            </Link>
            <a
              href="https://t.me/ortamy"
              target="_blank"
              rel="noreferrer"
              className="d-btn d-btn-ghost"
            >
              <Send size={15} strokeWidth={1.5} aria-hidden /> @ortamy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

