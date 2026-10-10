import type { Metadata } from 'next';
import './design.css';
import DesignShell from '@/components/design/design-shell';
import { pageUrl } from '@/lib/site';

/**
 * Маршрут портфолио UX/UI-дизайнера.
 *
 * Своя оболочка (header/footer/темы) — оффер отличается от главной mono,
 * поэтому shop-header/shop-footer не переиспользуются.
 *
 * title — с absolute: корневой layout задаёт шаблон '%s | mono.', а
 * пользователю нужен ровно «UX/UI дизайнер | Портфолио» без суффикса.
 *
 * Страница доступна для индексации с 10.10.2026: URL есть в sitemap.xml
 * (см. app/sitemap.ts), canonical задаётся ниже. В навигации её при этом нет —
 * доступ по прямой ссылке для клиентов, но поисковики её видят.
 */
export const metadata: Metadata = {
  title: { absolute: 'UX/UI дизайнер | Портфолио' },
  description: 'Дизайн сайтов и приложений. Figma, AI-инструменты.',
  // canonical нужен именно потому, что страница теперь в карте сайта: без него
  // варианты адреса с utm-хвостом или иным регистром пути выглядят дублями.
  alternates: { canonical: pageUrl('/design') },
  // Запрет индексации не ставим: прямая ссылка должна открываться у клиента
  // без роботов-заглушек.
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