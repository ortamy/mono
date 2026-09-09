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

export interface SiteConfig {
  meta: {
    site_url: string;
    title: string;
    description: string;
    og_image: string;
  };
  nav: NavItem[];
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
    index: string;
    index_sub: string;
  };
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
    ai_note: string;
    more_href: string;
    more_label: string;
  };
  cta: {
    eyebrow: string;
    heading_a: string;
    heading_b: string;
    offer_title: string;
    offer_text: string;
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