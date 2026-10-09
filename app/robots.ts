import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// В статическом экспорте (output: 'export', см. scripts/build-static.mjs) Next
// требует явной директивы для роутов метаданных: без неё он считает robots.txt
// динамическим и валит сборку на этапе «Collecting page data». Для серверной
// сборки это no-op — robots.txt и так отдаётся статически.
export const dynamic = 'force-static';

/**
 * robots.txt. Ссылка на карту сайта строится от того же siteUrl, что и сам
 * sitemap, иначе Яндекс и Google получают разные host и начинают отбрасывать
 * файл.
 *
 * /agentos — внутренний дашборд, он закрыт от индексации.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/agentos', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}