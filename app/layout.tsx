import type { Metadata } from 'next';
import './globals.css';

// Префикс под-каталога GitHub Pages (например /mono); локально — пустая строка.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'mono. — дизайн, который продаёт',
  description: 'Карточки WB / Ozon, сайты и брендинг. Дизайн, который повышает CTR и конверсию.',
  icons: [{ rel: 'icon', url: `${basePath}/favicon.svg`, type: 'image/svg+xml' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}