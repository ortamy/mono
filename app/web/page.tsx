import type { Metadata } from 'next';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import PageHero from '@/components/page-hero';
import Qualification from '@/components/web/qualification';
import Packages from '@/components/web/packages';
import Calculator from '@/components/web/calculator';
import FAQ from '@/components/web/faq';
import Process from '@/components/web/process';
import Guarantees from '@/components/web/guarantees';
import Cases from '@/components/web/cases';
import WebForm from '@/components/web/web-form';
import { loadJSON } from '@/lib/content';
import type {
  PricingContent,
  FAQItem,
  Guarantee,
  Case,
  CalculatorConfig,
  ProcessStep,
} from '@/lib/web-types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Сайты и лендинги с результатом в заявках — mono · от 25 000 ₽',
  description: 'Система привлечения клиентов с измеримым результатом. 3 пакета, ROI-калькулятор, гарантия срока и метрик. Окупаемость от 1 месяца.',
  openGraph: {
    title: 'Сайты и лендинги с результатом в заявках — mono',
    description: 'Не просто дизайн и вёрстка. Система привлечения клиентов с измеримым результатом. От 25 000 ₽.',
    images: [{ url: `${basePath}/og-web.png`, width: 1200, height: 630 }],
  },
};

export default function WebPage() {
  const pricing = loadJSON<PricingContent>('web/web_pricing.json');
  const faq = loadJSON<FAQItem[]>('web/web_faq.json');
  const guarantees = loadJSON<Guarantee[]>('web/web_guarantees.json');
  const cases = loadJSON<Case[]>('web/web_cases.json');
  const calculator = loadJSON<CalculatorConfig>('web/web_calculator.json');
  const process = loadJSON<ProcessStep[]>('web/web_process.json');

  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow={pricing.positioning.eyebrow}
        title={
          <>
            {pricing.positioning.h1[0]}<br />
            <span>{pricing.positioning.h1[1]}</span>
          </>
        }
        sub={pricing.positioning.sub}
        anchor={pricing.anchor}
        cta={{ href: '#calculator', label: 'Подобрать пакет', primary: true }}
        secondaryCta={{ href: '#cases', label: 'Смотреть кейсы' }}
      />

      <Qualification data={pricing.qualification} />
      <Packages packages={pricing.packages} priceDrivers={pricing.price_drivers} />
      <Calculator config={calculator} />
      <Process steps={process} />
      <Guarantees items={guarantees} />
      <FAQ items={faq} />
      <Cases cases={cases} />
      <WebForm />

      <SiteFooter />
    </main>
  );
}