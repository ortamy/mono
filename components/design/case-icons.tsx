/**
 * SVG-иконки (Lucide) для кейсов и логотипов клиентов.
 *
 * Раньше нишу обозначал emoji — заменяем на единый набор линейных иконок:
 * он одинаково выглядит в обеих темах и не зависит от шрифтов системы.
 */
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Building2,
  Landmark,
  ShoppingBag,
  Smile,
  Sofa,
  Utensils,
} from 'lucide-react';
import type { PreviewKey } from '@/data/design-cases';

/** Иконка кейса — любой компонент Lucide. */
export type CaseIcon = LucideIcon;

export const CASE_ICONS: Record<PreviewKey, LucideIcon> = {
  furniture: Sofa,
  bank: Landmark,
  dashboard: BarChart3,
  dental: Smile,
  food: Utensils,
  b2b: Building2,
  mono: ShoppingBag,
  alephy: BookOpen,
};
