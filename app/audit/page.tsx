import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardCheck, Clock, Radar, Target, TrendingUp } from 'lucide-react';

import ShopHeader from '@/components/shop/shop-header';
import ShopFooter from '@/components/shop/shop-footer';
import AuditForm from '@/components/audit/audit-form';
import { buildMetadata } from '@/lib/meta';

/**
 * Лид-магнит: бесплатный UX-аудит.
 *
 * Пункт «Аудит» вернулся в lib/nav.ts вместе с этой страницей — до неё ссылка
 * вела на 404 и была убрана из меню (Фаза 0 предыдущего рефакторинга).
 *
 * Тема — светлая палитра `agentos.*`, как у главной: страница живёт в shop-ветке
 * компонентов, а не в тёмной оболочке остальных разделов. Форма отправляет
 * заявку на общий POST /api/lead с признаком source: 'audit'.
 */
export const metadata: Metadata = buildMetadata({
  // Суффикс «| mono.» подставляет title.template из app/layout.tsx, поэтому
  // в самой строке второй «mono» не нужен (иначе в выдаче «… — mono | mono.»).
  title: 'Бесплатный UX-аудит за 15 минут',
  description:
    'Пришлите ссылку на продукт — разберу воронку, найду, где теряются деньги, и покажу, что исправить первым. Бесплатно и без обязательств.',
  path: '/audit',
});

/** Меню внутри страницы: якоря разборов и выход в портфолио. */
const AUDIT_LINKS = [
  { label: 'Что входит', href: '#includes' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Кейсы', href: '/design' },
];

const BADGES = ['3 точки роста', 'Один быстрый ход', 'План правок', 'Бесплатно'];

const INCLUDES = [
  {
    icon: Radar,
    title: 'Диагноз первого экрана',
    desc: 'Понятно ли за 5 секунд, что вы продаёте, кому и почему вам можно верить.',
  },
  {
    icon: TrendingUp,
    title: 'Точки потери денег',
    desc: 'Где посетитель уходит: оффер, цена, доставка, форма, шаги оформления заказа.',
  },
  {
    icon: Target,
    title: 'Один быстрый ход',
    desc: 'Конкретная правка, которую можно внести сегодня и проверить на метрике.',
  },
  {
    icon: ClipboardCheck,
    title: 'План правок',
    desc: 'Список по приоритету: что чинить первым, что подождёт до следующей итерации.',
  },
];

const STEPS = [
  { num: '01', title: 'Присылаете ссылку', time: 'минута', desc: 'Сайт, приложение, лендинг SaaS или карточка товара — то, что есть сейчас.' },
  { num: '02', title: 'Разбираю 15 минут', time: '15 минут', desc: 'Прохожу путь пользователя как покупатель, смотрю воронку и фиксирую провалы.' },
  {
    num: '03',
    title: 'Получаете разбор',
    time: 'в течение дня',
    desc: '3 точки роста, план правок и оценка эффекта — без гарантий, но с конкретикой.',
  },
];

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-agentos-bg font-agentos text-agentos-ink antialiased">
      <ShopHeader links={AUDIT_LINKS} requestHref="#audit-form" requestLabel="Оставить заявку" />

      <main id="main-content">
        {/* 1. ГЕРОЙ И ФОРМА — форма выше сгиба: это лид-магнит, лишний шаг до неё не нужен. */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-agentos-line bg-agentos-card px-3 py-1.5 text-[12px] text-agentos-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-agentos-ink" aria-hidden="true" />
                Для e-commerce и SaaS
              </span>

              <h1 className="mt-7 text-[36px] font-semibold leading-[1.05] tracking-[-1.8px] text-agentos-ink sm:text-[54px] lg:text-[60px]">
                Бесплатный UX-аудит
                <span className="block text-agentos-muted">за 15 минут.</span>
              </h1>

              <p className="mt-6 max-w-[540px] text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">
                Пришлите ссылку на продукт — пройду путь пользователя, покажу, где теряется конверсия,
                и что исправить первым. Без обязательств и без «ну, в целом нормально».
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  'Диагноз первого экрана: понятно ли за 5 секунд, что вы продаёте',
                  'Где посетитель уходит: оффер, цена, форма, оформление заказа',
                  'Один быстрый ход и план правок по приоритету',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-[1.55] text-agentos-muted">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-agentos-faint" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#audit-form"
                  className="inline-flex h-12 items-center justify-center rounded-control bg-agentos-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite"
                >
                  Оставить заявку
                </a>
                <Link
                  href="/design"
                  className="inline-flex h-12 items-center justify-center rounded-control border border-agentos-line bg-agentos-card px-6 text-[15px] font-medium text-agentos-ink transition-colors hover:bg-agentos-soft"
                >
                  Посмотреть кейсы
                </Link>
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {BADGES.map((b) => (
                  <li key={b} className="rounded-full border border-agentos-line bg-agentos-card px-3 py-1.5 text-[12px] text-agentos-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* scroll-mt: у липкой шапки высота 64px, без отступа якорь прячет верх формы */}
            <div id="audit-form" className="scroll-mt-24">
              <AuditForm />
            </div>
          </div>
        </section>

        {/* 2. ЧТО ВХОДИТ */}
        <section id="includes" className="scroll-mt-20 border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ Что входит</p>
            <h2 className="mt-4 max-w-[720px] text-[28px] font-semibold leading-[1.15] tracking-[-1.2px] text-agentos-ink sm:text-[38px]">
              Разбор, после которого понятно, что делать
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.65] text-agentos-muted">
              Это вход в работу, а не вежливый ответ. Вы понимаете, что именно можно улучшить и в каком
              порядке — и уже после этого решаете, нужен ли пакет.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {INCLUDES.map((item) => (
                <article key={item.title} className="rounded-agentos border border-agentos-line bg-agentos-bg p-6 sm:p-7">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-agentos-line text-agentos-ink" aria-hidden="true">
                    <item.icon size={18} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.4px] text-agentos-ink">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. КАК ЭТО РАБОТАЕТ */}
        <section id="how" className="scroll-mt-20 border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ Процесс</p>
            <h2 className="mt-4 text-[28px] font-semibold leading-[1.15] tracking-[-1.2px] text-agentos-ink sm:text-[38px]">
              Три шага, ноль созвонов
            </h2>

            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.num} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium tabular-nums text-agentos-faint">{step.num}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-agentos-line bg-agentos-bg px-2.5 py-1 text-[11px] text-agentos-muted">
                      <Clock size={11} strokeWidth={1.5} aria-hidden="true" />
                      {step.time}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.5px] text-agentos-ink">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. ЗАПАСНОЙ КАНАЛ — тёмная плашка: часть людей формы не заполняет. */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-[720px] rounded-[12px] bg-agentos-ink px-6 py-12 text-center sm:px-12">
              <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.8px] text-white sm:text-[24px]">
                Не любите формы?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#A3A3A3]">
                Пришлите ссылку в Telegram — разберу в переписке, без анкет и брифа.
              </p>
              <a
                href="https://t.me/ortamy"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-[8px] bg-white px-6 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E5E5E5]"
              >
                Написать в Telegram ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  );
}
