import {
  ArrowRight,
  BarChart3,
  Boxes,
  Briefcase,
  FileSearch,
  Megaphone,
  Plug,
  Quote,
  Rocket,
  Settings,
  ShieldCheck,
  TestTube,
} from 'lucide-react';

const TIMELINE = [
  { day: 'День 1–3', title: 'Аудит конкурентов', desc: 'Собираем список сайтов и согласуем приоритеты: цены, SKU, акции.', icon: FileSearch },
  { day: 'День 4–7', title: 'Настройка парсинга', desc: 'API там, где он есть; Playwright — где нет. Прокси, лимиты, ретраи.', icon: Plug },
  { day: 'День 8–12', title: 'Обучение на ваших данных', desc: 'Агент учится отличать значимое изменение от шума и писать в вашем тоне.', icon: Settings },
  { day: 'День 13–14', title: 'Тестирование на 5 сайтах', desc: 'Сверяем с ручной проверкой, фиксируем точность и приёмку.', icon: TestTube },
  { day: 'День 15', title: 'Запуск + мониторинг', desc: 'Дайджест в 9:00, алерты по критичным изменениям, обходы под контролем.', icon: Rocket },
];

const FLOW = [
  { t: 'Триггер', d: 'Расписание каждый час плюс кнопка «проверить сейчас» в Telegram.' },
  { t: 'Парсинг', d: 'Playwright обходит страницы, API — где доступен; backoff на лимиты.' },
  { t: 'Анализ', d: 'LLM сравнивает снимок с прошлым и отсекает шум: важна цена, SKU, акция.' },
  { t: 'Дайджест', d: 'Сводка на 4 минуты чтения со ссылками на источник — в Telegram в 9:00.' },
  { t: 'Мониторинг', d: 'PostgreSQL хранит историю и метрики обходов: сбой виден сразу.' },
];

const COMPARE = [
  { label: 'Стоимость', agent: '100К + 30К/мес', freelancer: '500 ₽/сайт', staff: '80 000 ₽/мес' },
  { label: 'Скорость', agent: 'каждый час', freelancer: 'раз в неделю', staff: 'раз в день' },
  { label: 'Работает', agent: '24/7', freelancer: 'по ТЗ', staff: '8 часов, 5/2' },
  { label: 'Масштаб', agent: 'не ограничен', freelancer: 'нужен новый фрилансер', staff: 'нужен новый сотрудник' },
  { label: 'Окупаемость', agent: '1,5 мес', freelancer: '—', staff: '—' },
];

const TEAM = [
  {
    role: 'Основатель',
    icon: Briefcase,
    points: [
      'Ценовое давление видно в день изменения, а не через месяц',
      'Решения по цене — на данных, а не на интуиции',
      '30К/мес вместо ставки отдельного аналитика',
    ],
  },
  {
    role: 'Маркетолог',
    icon: Megaphone,
    points: [
      'Утро начинается с дайджеста на 4 минуты',
      '−90% рутины: обход сайтов вместо копипаста',
      'Акции конкурентов — раньше, чем их заметят клиенты',
    ],
  },
  {
    role: 'Продакт',
    icon: Boxes,
    points: [
      'Новые SKU и разделы конкурентов — в одном списке',
      'Сравнение ассортимента и УТП по фактам',
      'Приоритизация фич по реальному рынку',
    ],
  },
  {
    role: 'Аналитик',
    icon: BarChart3,
    points: [
      'История изменений в PostgreSQL — есть база для графиков',
      'Цены, скидки и наличие в одном формате',
      'Выгрузка в BI без ручного сбора',
    ],
  },
];

export function CompetitiveResearchQuote() {
  return (
    <figure className="d-card mt-3 p-4 sm:p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
        <Quote size={19} strokeWidth={1.6} />
      </span>
      <blockquote className="mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-[var(--d-ink)]">
        «Раньше маркетолог обходил 12 сайтов вручную раз в неделю. Скидки конкурентов замечали через месяц — когда уже
        поздно. Теперь агент обходит каждый час и присылает дайджест в 9:00. Мы первыми видим ценовое давление.»
      </blockquote>
      <figcaption className="mt-3 text-[13px] d-muted">
        — Ольга М., маркетолог, e-commerce · <span className="d-faint">пример из практики (концепт)</span>
      </figcaption>
    </figure>
  );
}

export function CompetitiveResearchTimeline() {
  return (
    <section aria-labelledby="cr-tl-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="cr-tl-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
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

export function CompetitiveResearchGuarantee() {
  return (
    <section aria-labelledby="cr-g-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="cr-g-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Гарантия: риск — на мне
      </h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        <li className="d-card p-4">
          <p className="text-[14px] font-semibold text-[var(--d-ink)]">Возврат 50% за 30 дней</p>
          <p className="mt-1 text-[13px] leading-[1.55] d-muted">если агент не мониторит 80% сайтов из согласованного списка.</p>
        </li>
        <li className="d-card p-4">
          <p className="text-[14px] font-semibold text-[var(--d-ink)]">Первый месяц поддержки — бесплатно</p>
          <p className="mt-1 text-[13px] leading-[1.55] d-muted">правки парсеров и добавление сайтов включены.</p>
        </li>
        <li className="d-card p-4">
          <p className="text-[14px] font-semibold text-[var(--d-ink)]">Данные и код — ваши</p>
          <p className="mt-1 text-[13px] leading-[1.55] d-muted">история в PostgreSQL и парсеры остаются у вас.</p>
        </li>
      </ul>
    </section>
  );
}

export function CompetitiveResearchCompare() {
  return (
    <section aria-labelledby="cr-cmp-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="cr-cmp-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Research-агент vs фрилансер и штатный маркетолог
      </h2>
      <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--d-line)]">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px] leading-[1.55]">
          <thead>
            <tr className="bg-[var(--d-soft)]">
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Критерий</th>
              <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Research-агент</th>
              <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Фрилансер</th>
              <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Штатный маркетолог</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label} className="border-t border-[var(--d-line)]">
                <td className="px-4 py-3 font-semibold text-[var(--d-ink)]">{row.label}</td>
                <td className="border-l border-[var(--d-line)] px-4 py-3 font-semibold text-[var(--d-ink)]">{row.agent}</td>
                <td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">{row.freelancer}</td>
                <td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">{row.staff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a
        href="/agents/#contact"
        className="d-btn d-btn-ghost mt-4 inline-flex h-12 min-h-[48px] items-center gap-2 px-6 py-3 text-[15px] font-semibold"
      >
        <ShieldCheck size={16} strokeWidth={1.5} aria-hidden /> Обсудить под мой рынок <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
      </a>
    </section>
  );
}

export function CompetitiveResearchTeam() {
  return (
    <section aria-labelledby="cr-team-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="cr-team-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Ценность для команды
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((c) => (
          <article key={c.role} className="d-card p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden>
              <c.icon size={17} strokeWidth={1.6} />
            </span>
            <h3 className="mt-3 text-[14px] font-semibold text-[var(--d-ink)]">{c.role}</h3>
            <ul className="mt-2 space-y-1.5 border-t border-[var(--d-line)] pt-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13px] leading-[1.55] d-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--d-faint)]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CompetitiveResearchTechProof() {
  return (
    <section aria-labelledby="cr-tech-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="cr-tech-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">
        Как идёт обход: технический путь
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
      <p className="mt-3 font-mono text-[12px] leading-[1.6] d-faint">Playwright → LLM → PostgreSQL → Telegram</p>
    </section>
  );
}
