import type { MetadataRoute } from 'next';
import { AGENT_CASES } from '@/data/agent-cases';
import { DESIGN_CASES } from '@/data/design-cases';
import { pageUrl, siteUrl } from '@/lib/site';

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
 *
 * Страницы кейсов (/agents/work/* и /design/work/*) собираются из данных —
 * AGENT_CASES и DESIGN_CASES, — чтобы карта не расходилась с кодом при
 * добавлении нового кейса.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    // /audit — лид-магнит с формой, поэтому приоритет выше остальных разделов:
    // это второй по важности вход на сайт после главной.
    { url: `${siteUrl}/audit/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    // /agents — услуга по сборке AI-агентов: самостоятельный вход в портфолио,
    // в отличие от /design страница индексируется.
    { url: `${siteUrl}/agents/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    // /stack — справочник по стеку сборки агентов: на него ссылается блок
    // «Стек» на /agents, поэтому страница индексируется вместе с услугой.
    { url: `${siteUrl}/stack/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    // Страницы кейсов AI-агентов (/agents/work/*): решение от 10.10.2026 —
    // кейсы индексируем. Приоритет ниже самого раздела /agents: это отдельные
    // проекты, а не точки входа. Список берётся из AGENT_CASES, чтобы новый
    // кейс не пришлось вписывать в карту руками дважды.
    ...AGENT_CASES.map(
      (item): MetadataRoute.Sitemap[number] => ({
        url: pageUrl(`/agents/work/${item.slug}`),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
    // Страницы кейсов портфолио (/design/work/*): решение от 10.10.2026 — в
    // карту входят только сами кейсы. Хаб /design остаётся вне sitemap: его
    // отправляют клиентам по ссылке (см. app/design/layout.tsx), поэтому
    // асимметрия «кейсы внутри, хаб снаружи» здесь намеренная.
    ...DESIGN_CASES.map(
      (item): MetadataRoute.Sitemap[number] => ({
        url: pageUrl(`/design/work/${item.slug}`),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
    { url: `${siteUrl}/web/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/mono/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/brand/`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];
}