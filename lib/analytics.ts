import { loadDataJSON } from '@/lib/content';
import type { AnalyticsConfig } from '@/lib/data-types';

/** Конфигурация аналитики. Применяется и на сервере (инъекция gtag), и клиенте (события). */
export const analytics = loadDataJSON<AnalyticsConfig>('analytics.json');

/**
 * Отправка события в dataLayer (если аналитика включена на уровне конфига).
 * Безопасно вызывать из клиентских компонентов: без включённой аналитики ничего не делает.
 */
export function track(enabled: boolean, event: string, data?: Record<string, string | number>): void {
  if (!enabled || typeof window === 'undefined') return;
  const layer = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  layer?.push?.({ event, ...(data || {}) });
}