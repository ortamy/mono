import type { Metadata } from 'next';
import { pageUrl, assetUrl } from '@/lib/site';

const OG_IMAGE = '/og.svg';

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
      images: [{ url: image, width: 1200, height: 630, alt: 'mono. — дизайн, который продаёт' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** Шаблон заголовков для страниц, где нужно суффиксальное «| mono». */
export const SITE_TITLE_DEFAULT = 'mono. — дизайн, который продаёт';
export const SITE_DESCRIPTION_DEFAULT =
  'Карточки WB / Ozon, сайты и брендинг. Дизайн, который повышает CTR и конверсию.';