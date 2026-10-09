import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { assetUrl, siteUrl } from '@/lib/site';
import { OG_ALT, OG_IMAGE, SITE_DESCRIPTION_DEFAULT, SITE_TITLE_DEFAULT } from '@/lib/meta';
import { METRIKA_ID, metrikaEnabled } from '@/lib/metrika';
import DevAgentation from '@/components/dev/dev-agentation';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE_TITLE_DEFAULT, template: '%s | mono.' },
  description: SITE_DESCRIPTION_DEFAULT,
  // Страницы задают собственный title/description/OG через buildMetadata
  // (app/page.tsx), а эти значения — запасные для остальных разделов сайта.
  keywords: [
    'продуктовый дизайн',
    'ux/ui дизайн',
    'дизайн интерфейсов',
    'ии автоматизация',
    'дизайн для e-commerce',
    'saas дизайн',
    'дизайн-система',
    'лендинг под ключ',
    'next.js разработка',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'mono.',
    images: [{ url: assetUrl(OG_IMAGE), width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION_DEFAULT,
    images: [assetUrl(OG_IMAGE)],
  },
  // Поля icons здесь нет намеренно: иконка задаётся файлом app/icon.svg, и Next
  // сам печатает <link rel="icon"> с учётом basePath и с хешем для сброса кэша.
  // Через metadata иконку приходилось собирать вручную (assetUrl('/favicon.svg'))
  // — получался абсолютный URL из siteUrl, поэтому на локальной машине, в превью
  // и на любом хостинге, кроме указанного в NEXT_PUBLIC_SITE_URL, ссылка вела в
  // никуда: браузер запрашивал иконку у чужого домена или получал 404.
};

/**
 * Разметка Schema.org для поиска и блока услуг.
 *
 * Экранируем «<» при сериализации: иначе значение с тегом в данных (например,
 * в описании) способно закрыть тег script и сломать страницу.
 *
 * Позиционирование — продуктовый дизайн + ИИ-автоматизация для e-commerce и
 * SaaS. Границы цен соответствуют тарифам из data/site.json (UX-аудит от
 * 15 000 ₽, «Продукт под ключ» от 180 000 ₽).
 */
const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Продуктовый дизайн и ИИ-автоматизация для e-commerce и SaaS',
  provider: { '@type': 'Organization', name: 'mono', url: siteUrl },
  description: 'Проектирование интерфейсов, которые приносят прибыль, и автоматизация рутины с помощью ИИ',
  areaServed: 'RU',
  serviceType: 'Продуктовый дизайн и ИИ-автоматизация',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'RUB',
    lowPrice: '15000',
    highPrice: '180000',
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