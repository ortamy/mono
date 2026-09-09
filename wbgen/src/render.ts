// Рендер: сборка полного SVG слайда и растеризация в PNG через resvg.
// Шрифты берутся только из wbgen/assets/fonts — рендер детерминирован
// и не зависит от системных шрифтов машины или CI.

import { Resvg } from '@resvg/resvg-js';
import { allFontFiles } from './fonts';
import { buildSlideCanvas } from './slides';
import type { SlideCanvas } from './svg';
import { FORMATS, type FormatId, type NicheConfig, type ProductContent, type SlideContent } from './types';

export function slideSvg(
  product: ProductContent,
  niche: NicheConfig,
  content: SlideContent,
  format: FormatId,
): string {
  const { w, h } = FORMATS[format];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${buildSlideCanvas(product, niche, content, format).body()}</svg>`;
}

export function renderPng(svg: string): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'original' },
    font: {
      fontFiles: allFontFiles(),
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',
    },
  });
  return Buffer.from(resvg.render().asPng());
}

export function renderSlide(
  product: ProductContent,
  niche: NicheConfig,
  content: SlideContent,
  format: FormatId,
): { svg: string; png: Buffer; canvas: SlideCanvas } {
  const canvas = buildSlideCanvas(product, niche, content, format);
  const { w, h } = FORMATS[format];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${canvas.body()}</svg>`;
  return { svg, png: renderPng(svg), canvas };
}
