import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// См. комментарий в app/robots.ts: в статическом экспорте директива обязательна,
// иначе Next валит сборку. lastModified при force-static — это время сборки.
export const dynamic = 'force-static';

/**
 * Карта сайта. Хост берётся из NEXT_PUBLIC_SITE_URL, а не вписывается в код:
 * на Render в переменной лежит реальный домен, иначе поисковик получил бы
 * ссылки на чужой host.
 *
 * Якоря вида /#cases в карту не включаем: фрагмент не уходит на сервер, все
 * такие URL для краулера неотличимы от корня и выглядят как дубли.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/web/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/mono/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/brand/`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];
}