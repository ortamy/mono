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
 * Порядок записей: главная → /design → остальные точки входа → кейсы. На
 * индексацию порядок не влияет, но так файл читается сверху вниз: сначала
 * входы в сайт, потом отдельные проекты.
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
    // /design — витрина портфолио. Решение от 10.10.2026: страница публична.
    // В навигации её по-прежнему нет (клиентам уходит прямая ссылка), но URL
    // есть в карте и в canonical самой страницы, запрета индексации нет —
    // см. app/design/layout.tsx.
    { url: `${siteUrl}/design/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    // /agents — услуга по сборке AI-агентов: самостоятельный вход в портфолио.
    { url: `${siteUrl}/agents/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    // /stack — справочник по стеку сборки агентов: на него ссылается блок
    // «Стек» на /agents, поэтому страница индексируется вместе с услугой.
    { url: `${siteUrl}/stack/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/web/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/mono/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/brand/`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
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
    // Страницы кейсов портфолио (/design/work/*): идут сразу после агентских,
    // чтобы в файле все кейсы стояли вместе. Хаб /design индексируется с той же
    // даты, поэтому асимметрии «кейсы внутри, хаб снаружи» больше нет.
    ...DESIGN_CASES.map(
      (item): MetadataRoute.Sitemap[number] => ({
        url: pageUrl(`/design/work/${item.slug}`),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
  ];
}