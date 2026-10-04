import type { Metadata } from 'next';
import {
  BarChart3, Blocks, Bot, Check, Clock, FileText, MessagesSquare, Plug, Radar,
  Search, Sparkles, TrendingUp, X,
} from 'lucide-react';

import ShopHeader from '@/components/shop/shop-header';
import ShopFooter from '@/components/shop/shop-footer';
import StoreMock from '@/components/shop/store-mock';
import SavingsCalculator from '@/components/shop/savings-calculator';
import LeadForm from '@/components/shop/lead-form';
import ShopFaq from '@/components/shop/shop-faq';
import StickyCta from '@/components/shop/sticky-cta';
import { buildMetadata } from '@/lib/meta';

export const metadata: Metadata = buildMetadata({
  title: 'Кастомный интернет-магазин без комиссий — mono',
  description: 'Свой магазин с ИИ за 21 день. 0% комиссий маркетплейсов. Полный контроль.',
  path: '/',
});

/* ---------- Данные секций ---------- */

const HERO_BADGES = ['0% комиссий', '21 день запуск', 'ИИ внутри', 'Под ключ'];

const PAIN = [
  'Комиссия 25–35% с каждой продажи',
  'Конкуренция по цене → демпинг',
  'Не знаете своих клиентов',
  'Зависите от правил платформы',
  'Нельзя сделать уникальный опыт',
  'Клиенты — не ваши, а маркетплейса',
];

const GAIN = [
  '0% комиссий — вся выручка ваша',
  'Ваш бренд, ваша цена',
  'База клиентов и их данные у вас',
  'Полная свобода в дизайне и функциях',
  'ИИ: рекомендации, поддержка, аналитика',
  'Клиенты возвращаются именно к вам',
];

const SOLUTION = [
  { icon: Blocks, title: 'Кастомная разработка', tech: 'Next.js + Supabase', desc: 'Не шаблон, а магазин под ваш бренд и процессы.' },
  { icon: Bot, title: 'ИИ-автоматизация', tech: 'LLM + векторный поиск', desc: 'Умный поиск, рекомендации, чат-поддержка 24/7.' },
  { icon: Plug, title: 'Интеграции', tech: '1С · МойСклад · СДЭК', desc: 'Подключаем 1С, МойСклад, СДЭК, ЮKassa и вашу CRM.' },
  { icon: BarChart3, title: 'Аналитика и рост', tech: 'Дашборд 24/7', desc: 'Воронка, конверсия и отчёты без ручной рутины.' },
];

const STEPS = [
  { num: '01', title: 'Аудит', days: '2 дня', desc: 'Разбираем ваш ассортимент, анализируем маркетплейсы, считаем экономию.' },
  { num: '02', title: 'Разработка', days: '14 дней', desc: 'Дизайн, вёрстка, интеграции, ИИ-фичи. Демо показываем на 7-й день.' },
  { num: '03', title: 'Запуск', days: '5 дней', desc: 'Переносим товары, тестируем, обучаем команду. Сайт работает, продажи идут.' },
];

const AI_FEATURES = [
  { icon: Search, title: 'Умный поиск', desc: 'Понимает запросы на естественном языке.' },
  { icon: Sparkles, title: 'Персональные рекомендации', desc: 'Каждый покупатель видит своё.' },
  { icon: MessagesSquare, title: 'Чат-поддержка 24/7', desc: 'Отвечает на 80% вопросов без человека.' },
  { icon: FileText, title: 'Автогенерация описаний', desc: 'Описания для тысяч товаров за часы.' },
  { icon: TrendingUp, title: 'Прогноз спроса', desc: 'Что закупить и когда — по истории продаж.' },
  { icon: Radar, title: 'Анализ конкурентов', desc: 'Мониторинг цен и акций на площадках.' },
];

const CASES = [
  { niche: 'Косметика ручной работы', was: 'WB, оборот 800k ₽/мес, комиссия 28%', now: 'Свой магазин, оборот 1.2M ₽/мес', result: '224k ₽/мес', resultLabel: 'экономия только на комиссии' },
  { niche: 'Товары для дома', was: 'Ozon, комиссия 22%', now: 'Свой магазин + интеграция с 1С', result: '×3', resultLabel: 'повторные покупки' },
  { niche: 'Спортивное питание', was: '3 маркетплейса, комиссии 30%', now: 'Свой магазин, 0% комиссий', result: '×2', resultLabel: 'чистая прибыль' },
];

const PLANS = [
  {
    name: 'Старт', price: '150 000 ₽', popular: false, term: 'Срок: 21 день',
    features: ['Магазин на Next.js + Supabase', 'Каталог до 500 товаров', 'ЮKassa / СБП', 'Базовые интеграции (СДЭК, Почта)', 'Умный поиск'],
  },
  {
    name: 'Бизнес', price: '350 000 ₽', popular: true, term: 'Срок: 30 дней',
    features: ['Всё из «Старт»', 'До 5000 товаров', 'Интеграция с 1С / МойСклад', 'ИИ-чат поддержки 24/7', 'Персональные рекомендации', 'Личный кабинет клиента', 'Программа лояльности'],
  },
  {
    name: 'Премиум', price: '700 000 ₽', popular: false, term: 'Срок: 45–60 дней',
    features: ['Всё из «Бизнес»', 'Неограниченный каталог', 'Мультивалютность / мультиязычность', 'Мобильное приложение', 'Прогноз спроса (ML)', 'Аналитика и BI-дашборд', 'Персональный менеджер'],
  },
];

/* ---------- Структурные блоки ---------- */

function SectionHead({ label, title, lead }: { label: string; title: React.ReactNode; lead?: string }) {
  return (
    <div className="max-w-[760px]">
      <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">{label}</p>
      <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] tracking-[-1.4px] text-agentos-ink sm:text-[42px]">{title}</h2>
      {lead && <p className="mt-5 text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">{lead}</p>}
    </div>
  );
}

function ListColumn({ tone, title, items }: { tone: 'bad' | 'good'; title: string; items: string[] }) {
  const good = tone === 'good';
  return (
    <div className={`rounded-agentos border p-6 sm:p-8 ${good ? 'border-agentos-ink bg-agentos-card' : 'border-agentos-line bg-agentos-card'}`}>
      <div className="flex items-center gap-2.5">
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${good ? 'border-agentos-ink bg-agentos-ink text-white' : 'border-agentos-line text-agentos-muted'}`} aria-hidden="true">
          {good ? <Check size={12} strokeWidth={2.5} /> : <X size={12} strokeWidth={2.5} />}
        </span>
        <h3 className="text-[15px] font-semibold tracking-[-0.3px] text-agentos-ink">{title}</h3>
      </div>
      <ul className="mt-6 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[14px] leading-[1.55] text-agentos-muted">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-agentos-faint" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-agentos-bg font-agentos text-agentos-ink antialiased">
      <ShopHeader />

      <main id="main-content">
        {/* 1. HERO */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-agentos-line bg-agentos-card px-3 py-1.5 text-[12px] text-agentos-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-agentos-ink" aria-hidden="true" />
                Для тех, кто устал от комиссий WB и Ozon
              </span>

              <h1 className="mt-7 text-[36px] font-semibold leading-[1.05] tracking-[-1.8px] text-agentos-ink sm:text-[54px] lg:text-[60px]">
                Забирайте 100% выручки.
                <span className="block text-agentos-muted">Свой интернет-магазин за 21 день.</span>
              </h1>

              <p className="mt-6 max-w-[540px] text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">
                Делаем кастомные магазины с ИИ-автоматизацией. Без комиссий, без ограничений маркетплейсов,
                полный контроль над клиентами и данными.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#request" className="inline-flex h-12 items-center justify-center rounded-control bg-agentos-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite">
                  Рассчитать экономию
                </a>
                <a href="#cases" className="inline-flex h-12 items-center justify-center rounded-control border border-agentos-line bg-agentos-card px-6 text-[15px] font-medium text-agentos-ink transition-colors hover:bg-agentos-soft">
                  Посмотреть кейсы
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {HERO_BADGES.map((b) => (
                  <li key={b} className="rounded-full border border-agentos-line bg-agentos-card px-3 py-1.5 text-[12px] text-agentos-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <StoreMock />
          </div>
        </section>

        {/* 2. БОЛЬ */}
        <section className="border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead
              label="/ Боль"
              title={<>Маркетплейс забирает вашу выручку.<br className="hidden sm:block" /> Свой магазин — не забирает.</>}
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <ListColumn tone="bad" title="Маркетплейсы (WB / Ozon)" items={PAIN} />
              <ListColumn tone="good" title="Свой магазин (с mono)" items={GAIN} />
            </div>

            <div className="mt-14 grid gap-8 border-t border-agentos-line pt-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ Считаем</p>
                <h3 className="mt-4 text-[24px] font-semibold leading-[1.2] tracking-[-1px] text-agentos-ink sm:text-[30px]">
                  Селлер с оборотом 1 000 000 ₽/мес отдаёт маркетплейсу ~300 000 ₽/мес.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-agentos-muted">
                  За год — 3 600 000 ₽. Свой магазин окупается за 2–4 месяца.
                </p>
              </div>
              <SavingsCalculator />
            </div>
          </div>
        </section>

        {/* 3. РЕШЕНИЕ */}
        <section id="solution" className="border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead
              label="/ Решение"
              title="Свой магазин с ИИ — за 21 день"
              lead="Работаем под ваш бизнес, а не под шаблон. Четыре слоя, из которых собирается готовый канал продаж."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {SOLUTION.map((item) => (
                <article key={item.title} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-7">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-agentos-line text-agentos-ink" aria-hidden="true">
                    <item.icon size={18} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.4px] text-agentos-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[12px] text-agentos-faint">{item.tech}</p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. КАК ЭТО РАБОТАЕТ */}
        <section className="border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label="/ Процесс" title="Как это работает" lead="Три этапа, 21 день, один результат — работающий канал продаж." />

            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.num} className="rounded-agentos border border-agentos-line bg-agentos-bg p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium tabular-nums text-agentos-faint">{step.num}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-agentos-line bg-agentos-card px-2.5 py-1 text-[11px] text-agentos-muted">
                      <Clock size={11} strokeWidth={1.5} aria-hidden="true" />
                      {step.days}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.5px] text-agentos-ink">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. ИИ-ФИШКИ */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label="/ Внутри" title="Что уже встроено в магазин" lead="ИИ-слой входит в каждый пакет — не как отдельная услуга." />

            <div className="mt-12 grid gap-px overflow-hidden rounded-agentos border border-agentos-line bg-agentos-line sm:grid-cols-2 lg:grid-cols-3">
              {AI_FEATURES.map((f) => (
                <article key={f.title} className="bg-agentos-card p-6 sm:p-7">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-agentos-line text-agentos-ink" aria-hidden="true">
                    <f.icon size={16} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.3px] text-agentos-ink">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-agentos-muted">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

{/* 6. КЕЙСЫ */}
        <section id="cases" className="border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label="/ Кейсы" title="Селлеры, которые уже ушли с маркетплейсов" />

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {CASES.map((c) => (
                <article key={c.niche} className="flex flex-col rounded-agentos border border-agentos-line bg-agentos-bg p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-agentos-faint">{c.niche}</p>

                  <dl className="mt-6 space-y-3 text-[13px] leading-[1.5]">
                    <div>
                      <dt className="text-agentos-faint">Было</dt>
                      <dd className="mt-1 text-agentos-muted">{c.was}</dd>
                    </div>
                    <div>
                      <dt className="text-agentos-faint">Стало</dt>
                      <dd className="mt-1 text-agentos-ink">{c.now}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto border-t border-agentos-line pt-6">
                    <p className="text-[26px] font-semibold tracking-[-1px] text-agentos-ink tabular-nums">{c.result}</p>
                    <p className="mt-1 text-[12px] text-agentos-muted">{c.resultLabel}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
{/* 7. ТАРИФЫ */}
        <section id="pricing" className="border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label="/ Тарифы" title="Три пакета" lead="Цена фиксируется после аудита. Всё включено: разработка, интеграции, запуск." />

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <article key={plan.name} className={`flex flex-col rounded-agentos border bg-agentos-card p-6 sm:p-7 ${plan.popular ? 'border-agentos-ink' : 'border-agentos-line'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-agentos-ink">{plan.name}</h3>
                    {plan.popular && <span className="rounded-full bg-agentos-ink px-2.5 py-1 text-[11px] font-medium text-white">Популярный</span>}
                  </div>

                  <p className="mt-6 text-[32px] font-semibold leading-none tracking-[-1.4px] text-agentos-ink tabular-nums">{plan.price}</p>
                  <p className="mt-2 text-[12px] text-agentos-faint">{plan.term}</p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14px] leading-[1.5] text-agentos-muted">
                        <Check size={14} strokeWidth={2} className="mt-1 shrink-0 text-agentos-ink" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#request" className={`mt-8 inline-flex h-11 items-center justify-center rounded-control text-[14px] font-medium transition-colors ${plan.popular ? 'bg-agentos-ink text-white hover:bg-agentos-graphite' : 'border border-agentos-line text-agentos-ink hover:bg-agentos-soft'}`}>
                    Получить расчёт
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-4 rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.3px] text-agentos-ink">Подписка после запуска</h3>
                <p className="mt-1.5 text-[14px] text-agentos-muted">Поддержка, обновления, интеграции и оптимизация.</p>
              </div>
              <p className="text-[24px] font-semibold tracking-[-0.8px] text-agentos-ink tabular-nums sm:whitespace-nowrap">
                30 000 ₽<span className="text-[14px] font-normal text-agentos-muted">/мес</span>
              </p>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label="/ FAQ" title="Частые вопросы" />
            <div className="mt-12">
              <ShopFaq />
            </div>
          </div>
        </section>

        {/* 9. CTA */}
        <section id="request" className="border-b border-agentos-line">
          <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ Заявка</p>
              <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] tracking-[-1.4px] text-agentos-ink sm:text-[42px]">
                Считайте. Ваши 25% комиссии<span className="text-agentos-muted"> — это ваши деньги.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">
                Оставьте заявку — пришлём расчёт экономии для вашего бизнеса за 1 день.
              </p>

              <ul className="mt-10 space-y-3.5">
                {[
                  'Расчёт по вашей номенклатуре и реальным ставкам комиссий',
                  'Смета по пакетам: «Старт», «Бизнес» или «Премиум»',
                  'План переноса товаров и номенклатуры с маркетплейсов',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-[1.55] text-agentos-muted">
                    <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-agentos-ink" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <LeadForm />
          </div>
        </section>
      </main>

      <ShopFooter />
      <StickyCta />
    </div>
  );
}
