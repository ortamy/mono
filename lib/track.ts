'use client';

export function track(enabled: boolean, event: string, data?: Record<string, string | number>): void {
  if (!enabled || typeof window === 'undefined') return;
  const layer = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  layer?.push?.({ event, ...(data || {}) });
}