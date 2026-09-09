// Тема ниши: палитра + гарнитуры + словарь. Единственный источник стиля для
// шаблонов слайдов; сами шаблоны ничего не знают о конкретной нише.

import type { FontStyle } from './fonts';
import type { NicheConfig, NichePalette } from './types';

export interface Theme {
  niche: NicheConfig;
  colors: NichePalette;
  /** основной гротеск */
  sans: (weight: number) => FontStyle;
  /** акцентный сериф (если задан в нише) */
  serif: (weight: number) => FontStyle;
  headline: FontStyle;
  quote: FontStyle;
  trackingEm: number;
  labels: Record<string, string>;
  voice: NicheConfig['voice'];
}

const KNOWN_FAMILIES = ['Inter', 'Prata'];

export function makeTheme(niche: NicheConfig): Theme {
  const typo = niche.typography;
  const families = [typo.primary, typo.accent ?? ''].filter(Boolean);
  for (const f of families) {
    if (!KNOWN_FAMILIES.includes(f)) {
      throw new Error(
        `Ниша "${niche.id}": гарнитура "${f}" отсутствует в wbgen/assets/fonts (доступны: ${KNOWN_FAMILIES.join(', ')})`,
      );
    }
  }
  if (typo.headlineFont === 'accent' && !typo.accent) {
    throw new Error(`Ниша "${niche.id}": headlineFont=accent, но акцентный сериф не задан`);
  }
  if (typo.quoteFont === 'accent' && !typo.accent) {
    throw new Error(`Ниша "${niche.id}": quoteFont=accent, но акцентный сериф не задан`);
  }
  const family = (which: 'primary' | 'accent') =>
    which === 'accent' ? typo.accent! : typo.primary;
  return {
    niche,
    colors: niche.palette,
    sans: (weight) => ({ family: typo.primary, weight }),
    serif: (weight) => ({ family: typo.accent!, weight }),
    headline: { family: family(typo.headlineFont), weight: typo.headlineFont === 'accent' ? 400 : 600 },
    quote: { family: family(typo.quoteFont), weight: typo.quoteFont === 'accent' ? 400 : 500 },
    trackingEm: typo.capsTrackingEm,
    labels: niche.labels,
    voice: niche.voice,
  };
}

/** Трекинг капители в px для данного размера шрифта. */
export function trackingFor(theme: Theme, size: number): number {
  return theme.trackingEm * size;
}

/** Капитель с трекингом из словаря ниши или произвольной строки. */
export function caps(text: string): string {
  return text.toLocaleUpperCase('ru-RU');
}
