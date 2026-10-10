import type { Metadata } from 'next';
import '../design/design.css';
import DesignShell from '@/components/design/design-shell';
import { buildMetadata } from '@/lib/meta';

/**
 * Оболочка /agents: та же, что у /design (DesignShell — две темы интерфейса,
 * header/footer портфолио), потому что услуга — продолжение дизайн-портфолио.
 * Общие стили темы переиспользуются из app/design/design.css.
 *
 * Страница в sitemap с 10.10.2026 (см. app/sitemap.ts), поэтому метаданные
 * собираются обычным buildMetadata с canonical, а не absolute-заголовком.
 */
export const metadata: Metadata = buildMetadata({
  title: 'AI-агенты: сборка под задачи бизнеса',
  description:
    'AI-агенты поддержки, продаж, контента и аналитики: пилот за 2 недели, продакшен за месяц. Кейсы, тарифы и процесс внедрения.',
  path: '/agents',
});

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}
