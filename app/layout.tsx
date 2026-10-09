import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { assetUrl, siteUrl } from '@/lib/site';
import { SITE_DESCRIPTION_DEFAULT, SITE_TITLE_DEFAULT } from '@/lib/meta';
import { METRIKA_ID, metrikaEnabled } from '@/lib/metrika';
import DevAgentation from '@/components/dev/dev-agentation';

const OG_IMAGE = '/api/og';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE_TITLE_DEFAULT, template: '%s | mono.' },
  description: SITE_DESCRIPTION_DEFAULT,
  // Страницы задают собственный title/description/OG через buildMetadata
  // (app/page.tsx), а эти значения — запасные для остальных разделов сайта.
  keywords: [
    'интернет-магазин без комиссий',
    'кастомный интернет-магазин',
    'уйти с wildberries',
    'свой магазин вместо маркетплейса',
    'разработка интернет-магазина next.js',
    'ии интернет-магазин',
    'комиссия wb',
    'комиссия ozon',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'mono.',
    images: [{ url: assetUrl(OG_IMAGE), width: 1200, height: 630, alt: 'mono. — кастомные интернет-магазины с ИИ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Забирайте 100% выручки — свой магазин за 21 день',
    description: 'Селлеры отдают WB/Ozon 25–35% выручки. Мы делаем кастомные магазины с ИИ.',
    images: [assetUrl(OG_IMAGE)],
  },
  icons: [{ rel: 'icon', url: assetUrl('/favicon.svg'), type: 'image/svg+xml' }],
};

/**
 * Разметка Schema.org для поиска и блока услуг.
 *
 * Экранируем «<» при сериализации: иначе значение с тегом в данных (например,
 * в описании) способно закрыть тег script и сломать страницу.
 */
const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Кастомная разработка интернет-магазинов',
  provider: { '@type': 'Organization', name: 'mono', url: siteUrl },
  description: 'Разработка кастомных интернет-магазинов с ИИ-автоматизацией',
  areaServed: 'RU',
  serviceType: 'Разработка интернет-магазинов',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'RUB',
    lowPrice: '150000',
    highPrice: '700000',
    offerCount: '3',
  },
}).replace(/</g, '\\u003c');

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main-content">Перейти к содержанию</a>
        {children}
        <DevAgentation />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
        {metrikaEnabled && (
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${METRIKA_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`}
          </Script>
        )}
        {metrikaEnabled && (
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        )}
      </body>
    </html>
  );
}