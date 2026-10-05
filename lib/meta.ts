import type { Metadata } from 'next';
import { pageUrl, assetUrl } from '@/lib/site';

// Картинка генерируется роутом /api/og (satori), а не лежит файлом: одна
// картинка на все страницы, всегда в актуальном стиле лендинга.
const OG_IMAGE = '/api/og/';

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
      images: [{ url: image, width: 1200, height: 630, alt: 'mono. — кастомные интернет-магазины с ИИ' }],
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
 * Описание отражает текущее позиционирование — магазины «под ключ», а не
 * дизайн-услуги, поэтому текст обновлён вместе с репозиторионированием.
 */
export const SITE_TITLE_DEFAULT = 'mono. — кастомные интернет-магазины без комиссий';
export const SITE_DESCRIPTION_DEFAULT =
  'Кастомные интернет-магазины с ИИ-автоматизацией. 0% комиссий маркетплейсов, запуск за 21 день, окупаемость 2–4 месяца.';