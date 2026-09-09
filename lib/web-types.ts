export interface Positioning {
  eyebrow: string;
  h1: [string, string];
  sub: string;
}

export interface QualificationCard {
  label: string;
  min: string;
}

export interface Qualification {
  intro: string;
  ideal: QualificationCard[];
  not_fit: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  badge: string | null;
  for: string;
  includes: string[];
  roi: string;
  term: string;
  cta: string;
}

export interface PricingContent {
  positioning: Positioning;
  anchor: string;
  qualification: Qualification;
  packages: Package[];
  price_drivers: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Guarantee {
  title: string;
  text: string;
}

export interface CaseMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
}

export interface Case {
  slug: string;
  client: string;
  niche: string;
  year: number;
  cover: string | null;
  metrics: CaseMetric[];
  quote: string | null;
  period: string;
}

export interface CalculatorField {
  id: string;
  type: 'select' | 'number';
  label: string;
  options?: string[];
  placeholder?: string;
}

export interface CalculatorConfig {
  fields: CalculatorField[];
  output_template: string;
  disclaimer: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  term: string;
  artifact: string;
}
