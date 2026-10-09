import type { Metadata } from 'next';
import { pageUrl, assetUrl } from '@/lib/site';

// Картинка генерируется роутом /api/og (satori), а не лежит файлом: одна
// картинка на все страницы, всегда в актуальном стиле лендинга.
//
// В статическом экспорте для GitHub Pages роута по этому адресу нет: Next
// выкладывает обработчик файлом без расширения (out/api/og), а краулеры читают
// Content-Type из расширения. Поэтому scripts/build-static.mjs кладёт ту же
// картинку в /og.png и подставляет сюда NEXT_PUBLIC_OG_IMAGE.
export const OG_IMAGE = process.env.NEXT_PUBLIC_OG_IMAGE || '/api/og/';

/** Подпись OG-картинки: одна на весь сайт, для соцсетей и скринридеров. */
export const OG_ALT = 'mono. — продуктовый дизайн и ИИ-автоматизация для e-commerce и SaaS';

export interface PageMeta {
  title: string;
  description: string;
  /** Путь страницы с ведущим слэшем, например '/web'. Используется для canonical и og:url. */
  path?: string;
}

/**
 * Единый builder метаданных страницы: canonical, openGraph и twitter-карточка
 * с абсолютными URL. metadataBase задаётся в корневом layout.
 */
export function buildMetadata({ title, description, path = '/' }: PageMeta): Metadata {
  const url = pageUrl(path);
  const image = assetUrl(OG_IMAGE);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'mono.',
      images: [{ url: image, width: 1200, height: 630, alt: OG_ALT }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Значения по умолчанию для страниц, которые не задают свои (app/about и т.д.).
 * Описание отражает текущее позиционирование — продуктовый дизайн и
 * ИИ-автоматизация для e-commerce и SaaS, а не только магазины «под ключ».
 */
export const SITE_TITLE_DEFAULT = 'mono. — продуктовый дизайн и ИИ-автоматизация';
export const SITE_DESCRIPTION_DEFAULT =
  'Проектирую интерфейсы, которые приносят прибыль, и автоматизирую рутину с помощью ИИ. E-commerce, SaaS, маркетплейсы.';