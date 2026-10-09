/**
 * SVG-иконки (Lucide) для кейсов и логотипов клиентов.
 *
 * Раньше нишу обозначал emoji — заменяем на единый набор линейных иконок:
 * он одинаково выглядит в обеих темах и не зависит от шрифтов системы.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BarChart3,
  Bike,
  BookOpen,
  Braces,
  CalendarClock,
  Factory,
  Landmark,
  ShoppingBag,
  Sofa,
} from 'lucide-react';
import type { PreviewKey } from '@/data/design-cases';

/** Иконка кейса — любой компонент Lucide. */
export type CaseIcon = LucideIcon;

export const CASE_ICONS: Record<PreviewKey, LucideIcon> = {
  mono: ShoppingBag,
  lookbook: Sofa,
  bank: Landmark,
  dashboard: BarChart3,
  slots: CalendarClock,
  map: Bike,
  specsheet: Factory,
  alephy: BookOpen,
  traq: Activity,
  base: Braces,
};
