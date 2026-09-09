// Кит вёрстки: общие примитивы шаблонов слайдов (лейблы, чипы, заголовки
// с автоподбором, hairline-таблицы, фото-зона). Ничего не знает о нишах —
// всё содержимое и стиль приходят из контента товара и темы ниши.

import fs from 'node:fs';
import path from 'node:path';
import { measureText, wrapText, type FontStyle } from '../fonts';
import { caps, trackingFor, type Theme } from '../theme';
import type { Rect, TextRole } from '../svg';
import type { Tokens } from '../design';
import type { ProductContent, SlideContent } from '../types';
import { drawPlaceholder } from '../placeholders';

export interface Ctx {
  canvas: import('../svg').SlideCanvas;
  theme: Theme;
  product: ProductContent;
  content: SlideContent;
  tk: Tokens;
  W: number;
  H: number;
}

/** Лейбл-шапка слайда: контент.label, иначе словарь ниши labelKey. */
export function slideLabel(ctx: Ctx, labelKey: string): string {
  return ctx.content.label ?? ctx.theme.labels[labelKey] ?? '';
}

/** Капитель с трекингом (служебный текст поверх фона слайда). */
export function capsLabel(
  ctx: Ctx,
  x: number,
  y: number,
  text: string,
  opts: { color?: string; size?: number; weight?: number; role?: TextRole } = {},
): { width: number } {
  const size = opts.size ?? ctx.tk.label;
  return ctx.canvas.text({
    text: caps(text),
    x,
    y,
    size,
    style: { family: 'Inter', weight: opts.weight ?? 500 },
    tracking: trackingFor(ctx.theme, size),
    fill: opts.color ?? ctx.theme.colors.muted,
    bg: ctx.theme.colors.background,
    role: opts.role ?? 'label',
  });
}

/** Outline-чип: капитель + pill-обводка, без заливки. Возвращает прямоугольник. */
export function chip(
  ctx: Ctx,
  x: number,
  y: number,
  text: string,
  opts: { color?: string } = {},
): Rect {
  const tk = ctx.tk;
  const color = opts.color ?? ctx.theme.colors.accent;
  const style: FontStyle = { family: 'Inter', weight: 600 };
  const textW = measureText(caps(text), style, tk.chip, trackingFor(ctx.theme, tk.chip));
  const w = textW + tk.chipPadX * 2;
  const h = tk.chip + tk.chipPadY * 2;
  ctx.canvas.raw(
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="none" stroke="${color}" stroke-width="${tk.chipStroke}"/>`,
  );
  ctx.canvas.text({
    text: caps(text),
    x: x + tk.chipPadX,
    y: y + tk.chipPadY + tk.chip * 0.82,
    size: tk.chip,
    style,
    tracking: trackingFor(ctx.theme, tk.chip),
    fill: color,
    bg: ctx.theme.colors.background,
    role: 'chip',
  });
  return { x, y, w, h };
}

/** Заголовок с автоподбором кегля: от headlineMax вниз, пока строки влезают. */
export function headline(
  ctx: Ctx,
  x: number,
  y: number,
  maxW: number,
  maxLines: number,
  opts: { align?: 'left' | 'center'; text?: string } = {},
): { bottom: number; size: number; lines: string[] } {
  const tk = ctx.tk;
  const text = opts.text ?? ctx.content.hook ?? '';
  let size = tk.headlineMax;
  let lines: string[] = [];
  for (; size >= tk.headlineMin; size -= tk.s * 2) {
    lines = wrapText(text, ctx.theme.headline, size, 0, maxW);
    const widest = Math.max(...lines.map((l) => measureText(l, ctx.theme.headline, size, 0)));
    if (lines.length <= maxLines && widest <= maxW) break;
  }
  const lineHeight = 1.14;
  const baseline0 = y + size * 0.78;
  lines.forEach((line, i) => {
    const wpx = measureText(line, ctx.theme.headline, size, 0);
    const lx = opts.align === 'center' ? x + (maxW - wpx) / 2 : x;
    ctx.canvas.text({
      text: line,
      x: lx,
      y: baseline0 + i * size * lineHeight,
      size,
      style: ctx.theme.headline,
      fill: ctx.theme.colors.ink,
      bg: ctx.theme.colors.background,
      role: 'heading',
    });
  });
  return { bottom: baseline0 + (lines.length - 1) * size * lineHeight, size, lines };
}

/** Горизонтальная hairline-линия. */
export function hairline(ctx: Ctx, x: number, y: number, w: number, color?: string): void {
  ctx.canvas.raw(
    `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${color ?? ctx.theme.colors.ink}" stroke-opacity="0.22" stroke-width="${ctx.tk.hairline}"/>`,
  );
}

/** Подзаголовок/основной текст с переносом. */
export function bodyText(
  ctx: Ctx,
  x: number,
  y: number,
  maxW: number,
  text: string,
  opts: { color?: string; size?: number; weight?: number; role?: TextRole; maxLines?: number } = {},
): { bottom: number; lines: string[] } {
  const size = opts.size ?? ctx.tk.sub;
  const style: FontStyle = { family: 'Inter', weight: opts.weight ?? 400 };
  const maxLines = opts.maxLines ?? 3;
  const allLines = wrapText(text, style, size, 0, maxW);
  if (allLines.length > maxLines) {
    ctx.canvas.truncations.push({ slide: ctx.canvas.slideId, text, maxLines });
  }
  const lines = allLines.slice(0, maxLines);
  const baseline0 = y + size * 0.78;
  lines.forEach((line, i) => {
    ctx.canvas.text({
      text: line,
      x,
      y: baseline0 + i * size * 1.32,
      size,
      style,
      fill: opts.color ?? ctx.theme.colors.muted,
      bg: ctx.theme.colors.background,
      role: opts.role ?? 'sub',
    });
  });
  return { bottom: baseline0 + (lines.length - 1) * size * 1.32, lines };
}

/** Нумерованный список: индекс-цифра акцентом + строка, hairline-разделители. */
export function bulletRows(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  items: string[],
  startIndex = 0,
): number {
  const tk = ctx.tk;
  let cy = y;
  const indexStyle: FontStyle = { family: 'Inter', weight: 600 };
  items.forEach((item, i) => {
    const indexText = `0${startIndex + i + 1}`.slice(-2);
    const indexW = measureText(indexText, indexStyle, tk.indexNumeral, trackingFor(ctx.theme, tk.indexNumeral));
    const textX = x + indexW + tk.gapMd;
    const res = bodyText(ctx, textX, cy, x + w - textX, item, {
      color: ctx.theme.colors.ink,
      size: tk.body,
      role: 'body',
      maxLines: 2,
    });
    ctx.canvas.text({
      text: indexText,
      x,
      y: cy + tk.body * 0.78,
      size: tk.indexNumeral,
      style: indexStyle,
      tracking: trackingFor(ctx.theme, tk.indexNumeral),
      fill: ctx.theme.colors.accent,
      bg: ctx.theme.colors.background,
      role: 'numeral',
    });
    cy = res.bottom + tk.gapMd;
    if (i < items.length - 1) hairline(ctx, x, cy - tk.gapMd / 2, w);
  });
  return cy;
}

/** Пары «лейбл — значение» на hairlines: капитель слева, значение справа. */
export function specRows(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  rows: [string, string][],
  opts: { gap?: number } = {},
): number {
  const tk = ctx.tk;
  let cy = y;
  const gap = opts.gap ?? tk.gapMd;
  const labelStyle: FontStyle = { family: 'Inter', weight: 500 };
  const valueStyle: FontStyle = { family: 'Inter', weight: 500 };
  rows.forEach(([label, value], i) => {
    const valueW = measureText(value, valueStyle, tk.specValue, 0);
    ctx.canvas.text({
      text: caps(label),
      x,
      y: cy + tk.specValue * 0.82,
      size: tk.specLabel,
      style: labelStyle,
      tracking: trackingFor(ctx.theme, tk.specLabel),
      fill: ctx.theme.colors.muted,
      bg: ctx.theme.colors.background,
      role: 'label',
    });
    ctx.canvas.text({
      text: value,
      x: x + w - valueW,
      y: cy + tk.specValue * 0.82,
      size: tk.specValue,
      style: valueStyle,
      fill: ctx.theme.colors.ink,
      bg: ctx.theme.colors.background,
      role: 'value',
    });
    cy += tk.specValue + gap;
    if (i < rows.length - 1) hairline(ctx, x, cy - gap / 2, w);
  });
  return cy;
}

/**
 * Фото-зона: сплошной фон photoBg + реальное фото (cover-кроп) либо
 * демо-плейсхолдер с пометкой DEMO. id уникален по позиции — без коллизий.
 */
export function photoFrame(
  ctx: Ctx,
  rect: Rect,
  slot: 'hero' | 'macro' | 'scenario',
  opts: { radius?: number } = {},
): void {
  const { canvas, theme, product, tk } = ctx;
  const radius = opts.radius ?? tk.radius;
  const clipId = `${ctx.canvas.slideId}-${slot}-${Math.round(rect.x)}-${Math.round(rect.y)}`;
  canvas.raw(
    `<rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="${radius}" fill="${theme.colors.photoBg}"/>`,
  );
  const relPath = product.photos[slot];
  const absPath = relPath ? path.resolve(process.cwd(), relPath) : null;
  const ext = absPath ? path.extname(absPath).toLowerCase() : '';
  const supported = ['.png', '.jpg', '.jpeg'];
  if (absPath && fs.existsSync(absPath) && supported.includes(ext)) {
    const data = fs.readFileSync(absPath).toString('base64');
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    canvas.raw(
      `<clipPath id="${clipId}"><rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="${radius}"/></clipPath>`,
    );
    canvas.raw(
      `<image href="data:${mime};base64,${data}" x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})"/>`,
    );
    canvas.registerPhoto({ ...rect, bg: null, placeholder: false });
  } else {
    drawPlaceholder({ canvas, theme, tk }, rect, product.placeholder, clipId);
    canvas.registerPhoto({ ...rect, bg: theme.colors.photoBg, placeholder: true });
  }
}

/** Стрелка CTA: длинная линия + шеврон одним акцентом. */
export function ctaArrow(ctx: Ctx, x: number, y: number, w: number): void {
  const tk = ctx.tk;
  const color = ctx.theme.colors.accent;
  const head = tk.gapMd;
  ctx.canvas.raw(
    `<line x1="${x}" y1="${y}" x2="${x + w - head}" y2="${y}" stroke="${color}" stroke-width="${Math.max(2, tk.hairline * 1.5)}"/>`,
  );
  ctx.canvas.raw(
    `<path d="M ${x + w - head} ${y - head * 0.6} L ${x + w} ${y} L ${x + w - head} ${y + head * 0.6}" fill="none" stroke="${color}" stroke-width="${Math.max(2, tk.hairline * 1.5)}" stroke-linecap="round" stroke-linejoin="round"/>`,
  );
}

