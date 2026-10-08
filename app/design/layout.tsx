import type { Metadata } from 'next';
import './design.css';
import DesignShell from '@/components/design/design-shell';

/**
 * Маршрут портфолио UX/UI-дизайнера.
 *
 * Своя оболочка (header/footer/темы) — оффер отличается от главной mono,
 * поэтому shop-header/shop-footer не переиспользуются.
 *
 * title — с absolute: корневой layout задаёт шаблон '%s | mono.', а
 * пользователю нужен ровно «UX/UI дизайнер | Портфолио» без суффикса.
 *
 * /design намеренно НЕ попадает в sitemap.xml (см. app/sitemap.ts):
 * страницу отправляют клиентам по ссылке, индексировать её не нужно.
 */
export const metadata: Metadata = {
  title: { absolute: 'UX/UI дизайнер | Портфолио' },
  description: 'Дизайн сайтов и приложений. Figma, AI-инструменты.',
  // /design вне sitemap, но запрет индексации не ставим: прямая ссылка
  // должна открываться у клиента без роботов-заглушек.
  openGraph: {
    title: 'UX/UI дизайнер | Портфолио',
    description: 'Дизайн сайтов и приложений. Figma, AI-инструменты.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UX/UI дизайнер | Портфолио',
    description: 'Дизайн сайтов и приложений. Figma, AI-инструменты.',
  },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}