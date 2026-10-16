import { FileSearch, Plug, Quote, Rocket, Send, CheckCircle, Settings, TestTube, Users } from 'lucide-react';
const TIMELINE = [
  { day: 'День 1–3', title: 'Аудит и база знаний', desc: 'Разбираем ассортимент, собираем ТЗ бренда и тон.', icon: FileSearch },
  { day: 'День 4–7', title: 'Интеграция WB API', desc: 'Подключаем кабинет, Redis-очередь и S3.', icon: Plug },
  { day: 'День 8–12', title: 'Обучение на ваших SKU', desc: 'Гоняем агента на карточках, правим тон.', icon: Settings },
  { day: 'День 13–14', title: 'Тест на 10 SKU', desc: 'Проверяете партию, фиксируем приёмку.', icon: TestTube },
  { day: 'День 15', title: 'Запуск в продакшн', desc: 'Агент готовит партии, вы проверяете.', icon: Rocket },
];
const FLOW = [
  { t: 'Триггер', d: 'Задание в Telegram: «20 карточек новой линейки».' },
  { t: 'Обработка', d: 'LLM берёт факты из спецификации и ТЗ бренда.' },
  { t: 'Действие', d: 'Черновики в Redis, медиа — в S3.' },
  { t: 'Проверка', d: 'Фактчек состава, тон по гайду.' },
  { t: 'Мониторинг', d: 'Публикация через WB API, CTR в дашборде.' },
];
export function WbContentQuote() {
  return (
    <figure className="d-card mt-3 p-4 sm:p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden><Quote size={19} strokeWidth={1.6} /></span>
      <blockquote className="mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-[var(--d-ink)]">«Раньше контент-менеджер собирал 3–4 карточки в день. Теперь агент делает 20+, а человек только проверяет. Мы закрыли запуск новой линейки за 2 дня вместо 2 недель.»</blockquote>
      <figcaption className="mt-3 text-[13px] d-muted">— Иван К., владелец магазина мебели · <span className="d-faint">пример из практики (концепт)</span></figcaption>
    </figure>
  );
}
export function WbContentTimeline() {
  return (
    <section aria-labelledby="wb-tl-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="wb-tl-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">Внедрение за 15 дней</h2>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {TIMELINE.map((s) => (
          <li key={s.day} className="d-card p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden><s.icon size={17} strokeWidth={1.6} /></span>
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] d-faint tabular-nums">{s.day}</p>
            <p className="mt-1 text-[14px] font-semibold text-[var(--d-ink)]">{s.title}</p>
            <p className="mt-1 text-[13px] leading-[1.55] d-muted">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
const TEAM = [
  { role: 'Владелец', icon: Users, points: ['Запуск линейки за дни, а не недели', 'Экономия в ₽/мес уже в первый месяц', 'Процесс не зависит от копирайтера'] },
  { role: 'Контент-менеджер', icon: FileSearch, points: ['Проверка партии за 30 минут вместо рутины', 'Единый тон без переписываний', 'Очередь задач в Telegram'] },
  { role: 'Маркетолог', icon: CheckCircle, points: ['CTR растёт: тексты по данным', 'Быстрые A/B правок заголовков'] },
  { role: 'SMM', icon: Send, points: ['Посты из тех же фактов, что карточки', 'План без срывов дедлайнов'] },
];
export function WbContentTeam() {
  return (
    <section aria-labelledby="wb-team-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="wb-team-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">Ценность для команды</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((c) => (
          <article key={c.role} className="d-card p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink)]" aria-hidden><c.icon size={17} strokeWidth={1.6} /></span>
            <h3 className="mt-3 text-[14px] font-semibold text-[var(--d-ink)]">{c.role}</h3>
            <ul className="mt-2 space-y-1.5 border-t border-[var(--d-line)] pt-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13px] leading-[1.55] d-muted"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--d-faint)]" aria-hidden />{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export function WbContentTechProof() {
  return (
    <section aria-labelledby="wb-tech-title" className="border-b border-[var(--d-line)] py-5">
      <h2 id="wb-tech-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">Как идёт задача: технический путь</h2>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {FLOW.map((s, i) => (
          <li key={s.t} className="d-card p-4">
            <p className="text-[12px] font-semibold tabular-nums d-faint">Шаг {i + 1}</p>
            <p className="mt-1 text-[14px] font-semibold text-[var(--d-ink)]">{s.t}</p>
            <p className="mt-1 text-[13px] leading-[1.55] d-muted">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 font-mono text-[12px] leading-[1.6] d-faint">WB API → LLM → Redis → S3 → WB API</p>
    </section>
  );
}
