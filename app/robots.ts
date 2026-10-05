import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

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