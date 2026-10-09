import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Check,
  Clock,
  Code,
  Image as ImageIcon,
  LineChart,
  Radar,
  Sparkles,
  Video,
  Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import ShopHeader from '@/components/shop/shop-header';
import ShopFooter from '@/components/shop/shop-footer';
import ContactForm from '@/components/shop/contact-form';
import { loadDataJSON } from '@/lib/content';
import type { SiteConfig } from '@/lib/data-types';
import { DESIGN_CASES } from '@/data/design-cases';
import { buildMetadata } from '@/lib/meta';

export const metadata: Metadata = buildMetadata({
  title: 'Продуктовый дизайн и ИИ-автоматизация для e-commerce и SaaS',
  description:
    'Проектирую интерфейсы, которые приносят прибыль, и автоматизирую рутину с помощью ИИ. Первый шаг — бесплатный UX-аудит за 15 минут.',
  path: '/',
});

const site = loadDataJSON<SiteConfig>('site.json');

const SERVICE_ICONS: Record<string, LucideIcon> = {
  video: Video,
  cards: ImageIcon,
  funnels: Bot,
};

const COMPETENCY_ICONS: Record<string, LucideIcon> = {
  research: Radar,
  product: Layers,
  ai: Sparkles,
  system: Boxes,
  frontend: Code,
  growth: LineChart,
};

function SectionHead({ label, title, lead }: { label: string; title: React.ReactNode; lead?: string }) {
  return (
    <div className="max-w-[760px]">
      <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">{label}</p>
      <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] tracking-[-1.4px] text-agentos-ink sm:text-[42px]">
        {title}
      </h2>
      {lead && <p className="mt-5 text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">{lead}</p>}
    </div>
  );
}

export default function HomePage() {
  const { hero, ai_services, competencies, process, pricing, faq, metrics, directions, about, cta } = site;

  return (
    <div className="min-h-screen bg-agentos-bg font-agentos text-agentos-ink antialiased">
      <ShopHeader requestHref="#request" requestLabel="Обсудить проект" />

      <main id="main-content">
        {/* 1. HERO */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-agentos-line bg-agentos-card px-3 py-1.5 text-[12px] text-agentos-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-agentos-ink" aria-hidden="true" />
                {hero.eyebrow}
              </span>

              <h1 className="mt-7 text-[36px] font-semibold leading-[1.05] tracking-[-1.8px] text-agentos-ink sm:text-[54px] lg:text-[60px]">
                {hero.title_top}
                <span className="block text-agentos-muted">{hero.title_bottom}</span>
              </h1>

              <p className="mt-6 max-w-[540px] text-[15px] leading-[1.65] text-agentos-muted sm:text-[17px]">{hero.subtitle}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={hero.primary_cta.href}
                  className="inline-flex h-12 items-center justify-center rounded-control bg-agentos-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite"
                >
                  {hero.primary_cta.label}
                </Link>
                <a
                  href={hero.secondary_cta.href}
                  className="inline-flex h-12 items-center justify-center rounded-control border border-agentos-line bg-agentos-card px-6 text-[15px] font-medium text-agentos-ink transition-colors hover:bg-agentos-soft"
                >
                  {hero.secondary_cta.label}
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {hero.badges.map((b) => (
                  <li key={b} className="rounded-full border border-agentos-line bg-agentos-card px-3 py-1.5 text-[12px] text-agentos-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Метрики правой колонкой вместо мока магазина: продаём экспертизу, не «свой магазин вместо WB». */}
            <div className="rounded-agentos border border-agentos-line bg-agentos-card">
              <div className="flex items-center justify-between border-b border-agentos-line px-5 py-4">
                <span className="text-[12px] uppercase tracking-[0.1em] text-agentos-faint">Результаты</span>
                <span className="rounded-control bg-agentos-ink px-2 py-1 text-[10px] font-medium text-white">PD · AI</span>
              </div>
              <ul className="divide-y divide-agentos-line">
                {metrics.items.map((m) => (
                  <li key={m.label} className="flex items-baseline justify-between gap-4 px-5 py-4">
                    <span className="text-[24px] font-semibold tracking-[-0.8px] text-agentos-ink tabular-nums">{m.value}</span>
                    <span className="text-right text-[13px] leading-snug text-agentos-muted">{m.label}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-agentos-line px-5 py-4 text-[11px] leading-snug text-agentos-faint">{metrics.source}</p>
            </div>
          </div>
        </section>

        {/* 2. ИИ-УСЛУГИ */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead
              label={ai_services.eyebrow}
              title={
                <>
                  {ai_services.heading_a}
                  <br className="hidden sm:block" /> {ai_services.heading_b}
                </>
              }
              lead={ai_services.note}
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {ai_services.items.map((service) => {
                const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
                return (
                  <article key={service.id} className="flex flex-col rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-agentos-line text-agentos-ink" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                      <span className="text-[11px] text-agentos-faint">{service.term}</span>
                    </div>
                    <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.4px] text-agentos-ink">{service.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{service.desc}</p>
                    <a href="#request" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-agentos-ink">
                      Обсудить задачу
                      <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. КОМПЕТЕНЦИИ */}
        <section id="competencies" className="scroll-mt-20 border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead
              label={competencies.eyebrow}
              title={
                <>
                  {competencies.heading_a}
                  <br className="hidden sm:block" /> {competencies.heading_b}
                </>
              }
              lead={competencies.lead}
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-agentos border border-agentos-line bg-agentos-line sm:grid-cols-2 lg:grid-cols-3">
              {competencies.items.map((c) => {
                const Icon = COMPETENCY_ICONS[c.id] ?? Sparkles;
                return (
                  <article key={c.id} className="bg-agentos-card p-6 sm:p-7">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-agentos-line text-agentos-ink" aria-hidden="true">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.3px] text-agentos-ink">{c.title}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-agentos-faint">{c.tech}</p>
                    <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{c.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. КАК МЫ РАБОТАЕМ */}
        <section id="process" className="scroll-mt-20 border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label={process.eyebrow} title={process.heading} lead={process.lead} />

            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {process.steps.map((step) => (
                <li key={step.num} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium tabular-nums text-agentos-faint">{step.num}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-agentos-line bg-agentos-bg px-2.5 py-1 text-[11px] text-agentos-muted">
                      <Clock size={11} strokeWidth={1.5} aria-hidden="true" />
                      {step.term}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.5px] text-agentos-ink">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. КЕЙСЫ */}
        <section id="cases" className="scroll-mt-20 border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead
              label="/ Кейсы"
              title="Проекты, где дизайн считается в метриках"
              lead="Часть портфолио: от e-commerce и дашбордов SaaS до айдентики. Каждый кейс — с задачей, решением и результатом."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DESIGN_CASES.slice(0, 6).map((item) => (
                <Link
                  key={item.slug}
                  href={`/design/work/${item.slug}/`}
                  className="group flex flex-col rounded-agentos border border-agentos-line bg-agentos-bg p-6 transition-colors hover:border-agentos-ink"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.08em] text-agentos-faint">{item.category}</span>
                    <span className="text-[11px] tabular-nums text-agentos-faint">{item.year}</span>
                  </div>
                  <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.4px] text-agentos-ink">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-agentos-muted">{item.summary}</p>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-agentos-ink">
                      {item.metrics[0]?.value}
                      <span className="font-normal text-agentos-faint">{item.metrics[0]?.label}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="text-agentos-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-agentos-ink"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/design"
              className="mt-10 inline-flex items-center gap-1.5 text-[14px] font-medium text-agentos-ink underline underline-offset-4"
            >
              Смотреть все кейсы
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* МЕТРИКИ — короткая полоса результатами, ведёт в кейсы */}
        <section className="border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-12 sm:px-8 sm:py-16">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-agentos border border-agentos-line bg-agentos-line lg:grid-cols-4">
              {metrics.items.map((m) => (
                <div key={m.label} className="bg-agentos-bg px-5 py-6 text-center">
                  <dd className="text-[28px] font-semibold leading-none tracking-[-1px] text-agentos-ink tabular-nums">{m.value}</dd>
                  <dt className="mt-2 text-[13px] text-agentos-muted">{m.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[12px] text-agentos-faint">{metrics.source}</p>
          </div>
        </section>

        {/* 6. НАПРАВЛЕНИЯ */}
        <section id="directions" className="scroll-mt-20 border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead
              label={directions.eyebrow}
              title={
                <>
                  {directions.heading_a}
                  <br className="hidden sm:block" /> {directions.heading_b}
                </>
              }
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-agentos border border-agentos-line bg-agentos-line md:grid-cols-3">
              {directions.items.map((d) => (
                <article key={d.id} className="flex flex-col bg-agentos-card p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium tabular-nums text-agentos-faint">{d.num}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-agentos-faint">
                      {d.term.replace('срок: ', '')}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex w-fit rounded-full border border-agentos-line bg-agentos-bg px-2.5 py-1 text-[11px] text-agentos-muted">
                    {d.tag}
                  </span>
                  <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.5px] text-agentos-ink">{d.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{d.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {d.includes.map((inc) => (
                      <li key={inc} className="flex gap-2.5 text-[14px] leading-[1.5] text-agentos-muted">
                        <Check size={14} strokeWidth={2} className="mt-1 shrink-0 text-agentos-ink" aria-hidden="true" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={d.href} className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-agentos-ink">
                    Подробнее
                    <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. ОБО МНЕ */}
        <section id="about" className="scroll-mt-20 border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center sm:py-24">
            <div>
              <SectionHead
                label={about.eyebrow}
                title={
                  <>
                    {about.heading_a} {about.heading_b}
                  </>
                }
                lead={about.text}
              />
              <ul className="mt-8 flex flex-wrap gap-2">
                {about.tags.map((t) => (
                  <li key={t} className="rounded-full border border-agentos-line bg-agentos-bg px-3 py-1.5 text-[12px] text-agentos-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href={about.more_href}
                className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-agentos-ink underline underline-offset-4"
              >
                {about.more_label}
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>

            <dl className="grid gap-px overflow-hidden rounded-agentos border border-agentos-line bg-agentos-line">
              {about.stats.map((s) => (
                <div key={s.label} className="bg-agentos-bg px-6 py-5">
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-agentos-faint">{s.label}</dt>
                  <dd className="mt-1 text-[24px] font-semibold tracking-[-0.8px] text-agentos-ink tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 8. ТАРИФЫ */}
        <section id="pricing" className="scroll-mt-20 border-b border-agentos-line">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label={pricing.eyebrow} title={pricing.heading} lead={pricing.lead} />

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {pricing.plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`flex flex-col rounded-agentos border bg-agentos-card p-6 sm:p-7 ${
                    plan.popular ? 'border-agentos-ink' : 'border-agentos-line'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-agentos-ink">{plan.name}</h3>
                    {plan.popular && (
                      <span className="rounded-full bg-agentos-ink px-2.5 py-1 text-[11px] font-medium text-white">Популярный</span>
                    )}
                  </div>

                  <p className="mt-6 text-[30px] font-semibold leading-none tracking-[-1.2px] text-agentos-ink tabular-nums sm:text-[32px]">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-[12px] text-agentos-faint">{plan.term}</p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14px] leading-[1.5] text-agentos-muted">
                        <Check size={14} strokeWidth={2} className="mt-1 shrink-0 text-agentos-ink" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#request"
                    className={`mt-8 inline-flex h-11 items-center justify-center rounded-control px-5 text-[14px] font-medium transition-colors ${
                      plan.popular
                        ? 'bg-agentos-ink text-white hover:bg-agentos-graphite'
                        : 'border border-agentos-line text-agentos-ink hover:bg-agentos-soft'
                    }`}
                  >
                    Обсудить
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-[640px] text-[13px] leading-[1.6] text-agentos-faint">{pricing.note}</p>
          </div>
        </section>

        {/* 9. FAQ — нативный details, без клиентского JS */}
        <section id="faq" className="scroll-mt-20 border-b border-agentos-line bg-agentos-card">
          <div className="mx-auto max-w-[760px] px-5 py-20 sm:px-8 sm:py-24">
            <SectionHead label="/ FAQ" title="Частые вопросы" />

            <div className="mt-10 divide-y divide-agentos-line border-y border-agentos-line">
              {faq.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-agentos-ink">
                    {item.q}
                    <span
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-agentos-line text-agentos-muted transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[14px] leading-[1.6] text-agentos-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. ЗАЯВКА / CTA */}
        <section id="request" className="scroll-mt-20">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start sm:py-24">
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">{cta.eyebrow}</p>
              <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] tracking-[-1.4px] text-agentos-ink sm:text-[42px]">
                {cta.heading_a}
                <span className="block text-agentos-muted">{cta.heading_b}</span>
              </h2>
              <p className="mt-5 text-[17px] font-medium leading-[1.5] text-agentos-ink">{cta.offer_title}</p>
              <p className="mt-3 max-w-[520px] text-[15px] leading-[1.65] text-agentos-muted">{cta.offer_text}</p>

              <ul className="mt-8 space-y-3">
                {cta.audit_steps.map((s) => (
                  <li key={s} className="flex gap-3 text-[14px] leading-[1.5] text-agentos-muted">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-agentos-ink" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 max-w-[520px] text-[13px] leading-[1.6] text-agentos-faint">{cta.audit_outcome}</p>
              <a
                href={site.contacts.telegram}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-agentos-ink underline underline-offset-4"
              >
                {cta.telegram_label}
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  );
}
