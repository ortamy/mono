'use client';

import type { ReactNode } from 'react';
import { GOALS, trackGoal } from '@/lib/metrika';

/**
 * Клиентская обёртка для CTA-ссылки.
 *
 * Сам MidCta остаётся серверным компонентом: аналитика нужна только здесь,
 * на клике. Так в бандер не попадает разметка всей секции с клиентским кодом.
 * onClick не мешает обычному поведению ссылки — переход по href сохраняется.
 */
export default function TrackedCtaLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className} onClick={() => trackGoal(GOALS.ctaClick, { cta: 'mid' })}>
      {children}
    </a>
  );
}