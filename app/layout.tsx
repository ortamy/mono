import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'mono. — дизайн, который продаёт',
  description: 'Карточки WB / Ozon, сайты и брендинг. Дизайн, который повышает CTR и конверсию.',
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}