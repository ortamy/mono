/** Типы для конфигурационных данных сайта (data/*.json). */

export interface NavItem {
  label: string;
  href: string;
  end?: boolean;
}

export interface Cta {
  label: string;
  href: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface DirectionItem {
  id: string;
  num: string;
  tag: string;
  title: string;
  desc: string;
  href: string;
  includes: string[];
  price: string;
  term: string;
}

/** ИИ-услуга главной. Иконка выбирается в коде по `id`: JSON не хранит компоненты. */
export interface AiServiceItem {
  id: string;
  title: string;
  term: string;
  desc: string;
}

export interface AiServicesConfig {
  eyebrow: string;
  heading_a: string;
  heading_b: string;
  note: string;
  items: AiServiceItem[];
}

/** Компетенция студии. Иконка — тоже по `id` в коде. */
export interface CompetencyItem {
  id: string;
  title: string;
  tech: string;
  desc: string;
}

export interface CompetenciesConfig {
  eyebrow: string;
  heading_a: string;
  heading_b: string;
  lead: string;
  items: CompetencyItem[];
}

export interface ProcessStep {
  num: string;
  title: string;
  term: string;
  desc: string;
}

export interface ProcessConfig {
  eyebrow: string;
  heading: string;
  lead: string;
  steps: ProcessStep[];
}

export interface PricingPlan {
  name: string;
  price: string;
  term: string;
  popular: boolean;
  features: string[];
}

export interface PricingConfig {
  eyebrow: string;
  heading: string;
  lead: string;
  plans: PricingPlan[];
  note: string;
}

/** Пункт FAQ главной. */
export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteConfig {
  meta: {
    site_url: string;
    title: string;
    description: string;
    og_image: string;
  };
  /* Навигация живёт в lib/nav.ts: дублировать её в site.json больше не нужно. */
  contacts: {
    telegram: string;
    telegram_handle: string;
    email: string;
  };
  hero: {
    eyebrow: string;
    title_top: string;
    title_bottom: string;
    subtitle: string;
    primary_cta: Cta;
    secondary_cta: Cta;
    /** Чипы под hero: «Продуктовый дизайн», «ИИ-автоматизация» и т.д. */
    badges: string[];
    index: string;
    index_sub: string;
  };
  ai_services: AiServicesConfig;
  competencies: CompetenciesConfig;
  process: ProcessConfig;
  pricing: PricingConfig;
  faq: FaqItem[];
  metrics: {
    source: string;
    items: MetricItem[];
  };
  directions: {
    eyebrow: string;
    heading_a: string;
    heading_b: string;
    items: DirectionItem[];
  };
  about: {
    eyebrow: string;
    heading_a: string;
    heading_b: string;
    text: string;
    tags: string[];
    stats: MetricItem[];
    /* Подпись про нейросети живёт в ai_services.note: одна мысль — одно место. */
    more_href: string;
    more_label: string;
  };
  cta: {
    eyebrow: string;
    heading_a: string;
    heading_b: string;
    offer_title: string;
    offer_text: string;
    /** Что будет после заявки — список шагов под заголовком. */
    audit_steps: string[];
    /** Итог для клиента: что он получает после разбора. */
    audit_outcome: string;
    telegram_label: string;
  };
  footer: {
    rights: string;
  };
}

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'url' | 'select';
  required?: boolean;
  placeholder?: string;
  autocomplete?: string;
  options?: FormFieldOption[];
}

export interface FormConfig {
  provider: 'telegram' | 'web3forms' | 'off';
  telegram_chat_id: string;
  telegram_handle: string;
  form_title: string;
  direction_note: string;
  submit_label: string;
  privacy_label: string;
  privacy_href: string;
  qualification: {
    threshold: string;
    message: string;
    back_label: string;
  };
  messages: {
    sending: string;
    success_title: string;
    success_text: string;
    error_title: string;
    error_text: string;
    fallback_cta: string;
  };
  fields: FormField[];
}

export interface DataCaseMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
}

export interface DataCase {
  slug: string;
  direction: 'ecommerce' | 'web' | 'brand';
  client: string;
  niche: string;
  year: number;
  concept: boolean;
  task: string;
  summary: string;
  cover: string;
  metrics: DataCaseMetric[] | null;
  review: string | null;
  solutions: string[];
}

export interface PrivacySection {
  heading: string;
  body: string;
}

export interface PrivacyConfig {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
}

export interface AnalyticsConfig {
  enabled: boolean;
  ga_id: string;
  events: string[];
}