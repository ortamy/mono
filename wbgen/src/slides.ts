// Композиционные шаблоны 8 слайдов воронки. Каждый решает одну задачу,
// одна мысль на слайд. Все шаблоны параметризованы токенами (tk.t), поэтому
// корректно перестраиваются под обе пропорции: 1080x1080 и 900x1200.

import { SlideCanvas } from './svg';
import { getTokens } from './design';
import { makeTheme } from './theme';
import type { FormatId, NicheConfig, ProductContent, SlideContent, SlideType } from './types';
import {
  bodyText,
  bulletRows,
  capsLabel,
  chip,
  ctaArrow,
  hairline,
  headline,
  photoFrame,
  slideLabel,
  specRows,
  type Ctx,
} from './slides/kit';
import { measureText, wrapText, type FontStyle } from './fonts';

/** Лимит смысловых единиц на шаблон (≤3 везде). */
export const MEANING_CAP: Record<SlideType, number> = {
  cover: 2,
  pain: 2,
  benefits: 3,
  quality: 3,
  specs: 1,
  scenario: 1,
  proof: 1,
  cta: 2,
};

type Template = (ctx: Ctx) => void;

const TEMPLATES: Record<SlideType, Template> = {
  cover: coverTemplate,
  pain: painTemplate,
  benefits: benefitsTemplate,
  quality: qualityTemplate,
  specs: specsTemplate,
  scenario: scenarioTemplate,
  proof: proofTemplate,
  cta: ctaTemplate,
};

/** Собирает канвас одного слайда. */
export function buildSlideCanvas(
  product: ProductContent,
  niche: NicheConfig,
  content: SlideContent,
  format: FormatId,
): SlideCanvas {
  const { w: W, h: H } = format === 'square' ? { w: 1080, h: 1080 } : { w: 900, h: 1200 };
  const canvas = new SlideCanvas(`${product.id}-${format}-${content.type}`, content.type, W, H);
  const ctx: Ctx = {
    canvas,
    theme: makeTheme(niche),
    product,
    content,
    tk: getTokens(W, H),
    W,
    H,
  };
  canvas.raw(`<rect width="${W}" height="${H}" fill="${ctx.theme.colors.background}"/>`);
  TEMPLATES[content.type](ctx);
  return canvas;
}

/* ---------------------------------- обложка --------------------------------- */

function coverTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const vertical = ctx.H > ctx.W;
  // один чип над фото
  const badge = ctx.content.badges?.[0];
  let cy = M;
  if (badge) {
    const ch = chip(ctx, M, cy, badge);
    cy = ch.y + ch.h + ctx.tk.gapMd;
  }
  // фото — главный герой
  const photoTop = cy;
  const photoH = vertical ? ctx.H * 0.54 : ctx.H * 0.52;
  photoFrame(ctx, { x: M, y: photoTop, w: cw, h: photoH - (photoTop - M) }, 'hero');
  // заголовок внизу
  const headTop = ctx.H - M - ctx.tk.headlineMax * 1.14 * 2;
  headline(ctx, M, headTop, cw, 2);
  ctx.canvas.addMeaning('hook');
  if (badge) ctx.canvas.addMeaning('badge');
}

/* ------------------------------ боль / решение ------------------------------ */

function painTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const label = slideLabel(ctx, 'labelPain');
  if (label) capsLabel(ctx, M, M + ctx.tk.label, label);
  const head = headline(ctx, M, M + ctx.tk.gapLg, cw, 2);
  hairline(ctx, M, head.bottom + ctx.tk.gapMd, cw * 0.32);
  if (ctx.content.sub) bodyText(ctx, M, head.bottom + ctx.tk.gapLg, cw, ctx.content.sub, { maxLines: 2 });
  ctx.canvas.addMeaning('hook');
  if (ctx.content.sub) ctx.canvas.addMeaning('sub');
  const photoH = ctx.H * 0.3;
  photoFrame(ctx, { x: M, y: ctx.H - M - photoH, w: cw, h: photoH }, 'hero');
}

/* -------------------------------- преимущества ------------------------------ */

function benefitsTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const label = slideLabel(ctx, 'labelBenefits');
  if (label) capsLabel(ctx, M, M + ctx.tk.label, label);
  const items = (ctx.content.bullets ?? []).slice(0, 3);
  const start = M + ctx.tk.gapLg * 1.6;
  const avail = ctx.H - M * 2 - (start - M);
  const rowH = avail / Math.max(1, items.length);
  items.forEach((item, i) => {
    bulletRows(ctx, M, start + i * rowH, cw, [item]);
  });
  items.forEach((_, i) => ctx.canvas.addMeaning(`bullet-${i}`));
}

/* --------------------------- материалы и качество --------------------------- */

function qualityTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const label = slideLabel(ctx, 'labelQuality');
  if (label) capsLabel(ctx, M, M + ctx.tk.label, label);
  const photoH = ctx.H * 0.4;
  photoFrame(ctx, { x: M, y: M + ctx.tk.gapLg * 1.4, w: cw, h: photoH }, 'macro');
  const rowsTop = M + ctx.tk.gapLg * 1.4 + photoH + ctx.tk.gapLg;
  const rows = (ctx.content.rows ?? []).slice(0, 3);
  specRows(ctx, M, rowsTop, cw, rows);
  rows.forEach((_, i) => ctx.canvas.addMeaning(`row-${i}`));
}

function m(ctx: Ctx): number {
  return ctx.tk.margin;
}

/* ------------------------------- характеристики ----------------------------- */

function specsTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const label = slideLabel(ctx, 'labelSpecs');
  if (label) capsLabel(ctx, M, M + ctx.tk.label, label);
  const rows = (ctx.content.rows ?? []).slice(0, 6);
  const rowGap = ctx.H * 0.055;
  specRows(ctx, M, M + ctx.tk.gapLg * 1.6, cw, rows, { gap: rowGap });
  ctx.canvas.addMeaning('specs-table');
}

/* ---------------------------------- сценарий -------------------------------- */

function scenarioTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  // фото во весь слайд, подпись — на чистой полосе фона снизу
  const strip = ctx.tk.sub * 2.2 + ctx.tk.gapLg;
  photoFrame(ctx, { x: 0, y: 0, w: ctx.W, h: ctx.H - strip }, 'scenario', { radius: 0 });
  const label = slideLabel(ctx, 'labelScenario');
  const labelY = ctx.H - strip + ctx.tk.gapSm + ctx.tk.label;
  if (label) capsLabel(ctx, M, labelY, label, { color: ctx.theme.colors.accent });
  if (ctx.content.sub) {
    bodyText(ctx, M, labelY + ctx.tk.label * 1.6, cw, ctx.content.sub, {
      color: ctx.theme.colors.ink,
      size: ctx.tk.sub,
      maxLines: 1,
    });
    ctx.canvas.addMeaning('caption');
  }
}

/* ----------------------------- отзывы / сравнение --------------------------- */

function proofTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const label = slideLabel(ctx, 'labelProof');
  if (label) capsLabel(ctx, M, M + ctx.tk.label, label);
  const cmp = ctx.content.compare;
  if (cmp) {
    drawCompare(ctx, M, M + ctx.tk.gapLg * 2, cw, cmp.columns, cmp.rows);
  } else if (ctx.content.quote) {
    drawQuote(ctx, M, M + ctx.tk.gapLg * 2.4, cw);
  }
  ctx.canvas.addMeaning('proof');
}

function drawCompare(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  columns: [string, string],
  rows: [string, string, string][],
): void {
  const tk = ctx.tk;
  const colFeature = w * 0.38;
  const colVal = (w - colFeature) / 2;
  // заголовки колонок
  ctx.canvas.text({
    text: columns[0],
    x: x + colFeature,
    y,
    size: tk.body,
    style: { family: 'Inter', weight: 600 },
    fill: ctx.theme.colors.ink,
    bg: ctx.theme.colors.background,
    role: 'value',
  });
  ctx.canvas.text({
    text: columns[1],
    x: x + colFeature + colVal,
    y,
    size: tk.body,
    style: { family: 'Inter', weight: 400 },
    fill: ctx.theme.colors.muted,
    bg: ctx.theme.colors.background,
    role: 'label',
  });
  let cy = y + tk.gapMd;
  hairline(ctx, x, cy, w);
  cy += tk.gapSm;
  rows.slice(0, 4).forEach(([feature, ours, alt]) => {
    capsLabel(ctx, x, cy + tk.body, feature, { size: tk.specLabel });
    ctx.canvas.text({
      text: ours,
      x: x + colFeature,
      y: cy + tk.body,
      size: tk.body,
      style: { family: 'Inter', weight: 500 },
      fill: ctx.theme.colors.ink,
      bg: ctx.theme.colors.background,
      role: 'value',
    });
    ctx.canvas.text({
      text: alt,
      x: x + colFeature + colVal,
      y: cy + tk.body,
      size: tk.body,
      style: { family: 'Inter', weight: 400 },
      fill: ctx.theme.colors.muted,
      bg: ctx.theme.colors.background,
      role: 'label',
    });
    cy += tk.gapMd + tk.body;
    hairline(ctx, x, cy, w);
    cy += tk.gapSm;
  });
}

function drawQuote(ctx: Ctx, x: number, y: number, w: number): void {
  const tk = ctx.tk;
  const quote = ctx.content.quote ?? '';
  const lines = wrapText(quote, ctx.theme.quote, tk.quote, 0, w).slice(0, 4);
  const baseline0 = y + tk.quote;
  lines.forEach((line, i) => {
    ctx.canvas.text({
      text: line,
      x,
      y: baseline0 + i * tk.quote * 1.3,
      size: tk.quote,
      style: ctx.theme.quote,
      fill: ctx.theme.colors.ink,
      bg: ctx.theme.colors.background,
      role: 'quote',
    });
  });
  if (ctx.content.source) {
    capsLabel(ctx, x, baseline0 + (lines.length - 1) * tk.quote * 1.3 + tk.gapLg, ctx.content.source);
  }
}

/* ------------------------------------ CTA ----------------------------------- */

function ctaTemplate(ctx: Ctx): void {
  const M = m(ctx);
  const cw = ctx.W - M * 2;
  const vertical = ctx.H > ctx.W;
  if (ctx.product.title) capsLabel(ctx, M, M + ctx.tk.label, ctx.product.title);
  const ctaTop = vertical ? ctx.H * 0.4 : ctx.H * 0.36;
  headline(ctx, M, ctaTop, cw, 2, { text: ctx.content.cta ?? '' });
  if (ctx.content.sub) {
    bodyText(ctx, M, ctaTop + ctx.tk.cta * 2.6, cw, ctx.content.sub, { maxLines: 2 });
  }
  ctaArrow(ctx, M, ctx.H - M - ctx.tk.gapSm, cw * 0.42);
  ctx.canvas.addMeaning('cta-line');
  if (ctx.content.sub) ctx.canvas.addMeaning('cta-sub');
}
