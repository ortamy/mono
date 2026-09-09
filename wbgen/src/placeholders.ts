// Демо-плейсхолдеры товара: минималистичные силуэты в стиле ниши, когда реального
// фото нет. Верстка от них не зависит — фото подставляется через конфиг товара
// (product.photos), плейсхолдер явно помечен капителью DEMO.

import type { SlideCanvas, Rect } from './svg';
import { r } from './svg';
import { caps, trackingFor, type Theme } from './theme';
import type { Tokens } from './design';

export interface PlaceholderCtx {
  canvas: SlideCanvas;
  theme: Theme;
  tk: Tokens;
}

export const PLACEHOLDER_KINDS = [
  'ring',
  'serum',
  'towel',
  'coffee-bag',
  'cardholder',
  'candle',
  'gift',
] as const;

/** Рисует силуэт товара в фото-зоне. Возвращает true, если вид известен. */
export function drawPlaceholder(ctx: PlaceholderCtx, rect: Rect, kind: string, clipId: string): boolean {
  const { canvas, theme, tk } = ctx;
  const { x, y, w, h } = rect;
  const ink = theme.colors.ink;
  const accent = theme.colors.accent;
  const sw = Math.max(2, Math.min(w, h) * 0.007); // толщина линии силуэта
  const cx = x + w / 2;
  const cy = y + h * 0.52;
  const u = Math.min(w, h); // базовая единица силуэта

  const stroke = () =>
    `fill="none" stroke="${ink}" stroke-opacity="0.75" stroke-width="${r(sw)}" stroke-linecap="round" stroke-linejoin="round"`;
  const accentStroke = () =>
    `fill="none" stroke="${accent}" stroke-width="${r(sw)}" stroke-linecap="round" stroke-linejoin="round"`;

  canvas.raw(`<g clip-path="url(#${clipId})">`);
  // мягкая тень под объектом (допустимый минимум)
  canvas.raw(
    `<filter id="soft-blur-${clipId}" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="${r(u * 0.012)}"/></filter>`,
  );
  canvas.raw(
    `<ellipse cx="${r(cx)}" cy="${r(y + h * 0.82)}" rx="${r(u * 0.26)}" ry="${r(u * 0.035)}" fill="${ink}" fill-opacity="0.08" filter="url(#soft-blur-${clipId})"/>`,
  );

  switch (kind) {
    case 'ring': {
      const band = u * 0.2;
      canvas.raw(`<circle cx="${r(cx)}" cy="${r(cy + band * 0.35)}" r="${r(band)}" ${stroke()}/>`);
      const st = band * 0.44;
      const sy = cy - band * 0.62;
      canvas.raw(
        `<rect x="${r(cx - st / 2)}" y="${r(sy - st / 2)}" width="${r(st)}" height="${r(st)}" rx="${r(st * 0.18)}" transform="rotate(45 ${r(cx)} ${r(sy)})" fill="${accent}" fill-opacity="0.9"/>`,
      );
      break;
    }
    case 'serum': {
      const bw = u * 0.26;
      const bh = u * 0.42;
      const bx = cx - bw / 2;
      const by = y + h * 0.36;
      canvas.raw(`<rect x="${r(bx)}" y="${r(by)}" width="${r(bw)}" height="${r(bh)}" rx="${r(bw * 0.16)}" ${stroke()}/>`);
      canvas.raw(`<rect x="${r(cx - bw * 0.12)}" y="${r(by - u * 0.09)}" width="${r(bw * 0.24)}" height="${r(u * 0.09)}" rx="${r(bw * 0.06)}" ${accentStroke()}/>`);
      canvas.raw(`<line x1="${r(cx)}" y1="${r(by + u * 0.03)}" x2="${r(cx)}" y2="${r(by + u * 0.16)}" ${stroke()}/>`);
      canvas.raw(
        `<path d="M ${r(cx)} ${r(by + bh * 0.45)} q ${r(u * 0.05)} ${r(u * 0.07)} 0 ${r(u * 0.12)} q ${r(-u * 0.05)} ${r(-u * 0.05)} 0 ${r(-u * 0.12)}" ${accentStroke()}/>`,
      );
      break;
    }
    case 'towel': {
      const fw = u * 0.56;
      let fy = y + h * 0.38;
      for (let i = 0; i < 3; i++) {
        const fh = u * 0.1;
        canvas.raw(`<rect x="${r(cx - fw / 2 + i * sw)}" y="${r(fy)}" width="${r(fw - i * sw * 2)}" height="${r(fh)}" rx="${r(u * 0.02)}" ${stroke()}/>`);
        fy += fh + u * 0.018;
      }
      canvas.raw(`<line x1="${r(cx - fw * 0.3)}" y1="${r(y + h * 0.38 + u * 0.05)}" x2="${r(cx + fw * 0.3)}" y2="${r(y + h * 0.38 + u * 0.05)}" ${accentStroke()} stroke-dasharray="${r(u * 0.015)} ${r(u * 0.012)}"/>`);
      break;
    }

    case 'coffee-bag': {
      const bw = u * 0.34;
      const bh = u * 0.46;
      const bx = cx - bw / 2;
      const by = y + h * 0.34;
      canvas.raw(`<path d="M ${r(bx)} ${r(by + u * 0.06)} L ${r(bx + bw * 0.06)} ${r(by + bh)} L ${r(bx + bw * 0.94)} ${r(by + bh)} L ${r(bx + bw)} ${r(by + u * 0.06)} Z" ${stroke()}/>`);
      canvas.raw(`<rect x="${r(bx - bw * 0.04)}" y="${r(by)}" width="${r(bw * 1.08)}" height="${r(u * 0.06)}" rx="${r(u * 0.015)}" ${stroke()}/>`);
      canvas.raw(`<circle cx="${r(bx + bw * 0.78)}" cy="${r(by + bh * 0.82)}" r="${r(u * 0.02)}" ${accentStroke()}/>`);
      break;
    }
    case 'cardholder': {
      const bw = u * 0.36;
      const bh = u * 0.28;
      const bx = cx - bw / 2;
      const by = y + h * 0.4;
      canvas.raw(`<rect x="${r(bx)}" y="${r(by)}" width="${r(bw)}" height="${r(bh)}" rx="${r(u * 0.035)}" ${stroke()}/>`);
      canvas.raw(`<line x1="${r(bx + bw * 0.14)}" y1="${r(by + bh * 0.72)}" x2="${r(bx + bw * 0.5)}" y2="${r(by + bh * 0.72)}" ${stroke()}/>`);
      canvas.raw(`<rect x="${r(bx + bw * 0.2)}" y="${r(by - u * 0.05)}" width="${r(bw * 0.6)}" height="${r(u * 0.06)}" rx="${r(u * 0.012)}" ${accentStroke()}/>`);
      break;
    }
    case 'candle': {
      const bw = u * 0.3;
      const bh = u * 0.34;
      const bx = cx - bw / 2;
      const by = y + h * 0.42;
      canvas.raw(`<rect x="${r(bx)}" y="${r(by)}" width="${r(bw)}" height="${r(bh)}" rx="${r(u * 0.04)}" ${stroke()}/>`);
      canvas.raw(`<line x1="${r(cx)}" y1="${r(by)}" x2="${r(cx)}" y2="${r(by - u * 0.045)}" ${stroke()}/>`);
      canvas.raw(
        `<path d="M ${r(cx)} ${r(by - u * 0.05)} c ${r(u * 0.03)} ${r(u * 0.03)} ${r(u * 0.025)} ${r(u * 0.06)} 0 ${r(u * 0.085)} c ${r(-u * 0.025)} ${r(-u * 0.025)} ${r(-u * 0.03)} ${r(-u * 0.055)} 0 ${r(-u * 0.085)}" fill="${accent}" fill-opacity="0.9"/>`,
      );
      break;
    }
    case 'gift': {
      const bw = u * 0.34;
      const bh = u * 0.28;
      const bx = cx - bw / 2;
      const by = y + h * 0.46;
      canvas.raw(`<rect x="${r(bx)}" y="${r(by)}" width="${r(bw)}" height="${r(bh)}" rx="${r(u * 0.02)}" ${stroke()}/>`);
      canvas.raw(`<rect x="${r(bx - u * 0.02)}" y="${r(by - u * 0.07)}" width="${r(bw + u * 0.04)}" height="${r(u * 0.07)}" rx="${r(u * 0.012)}" ${accentStroke()}/>`);
      canvas.raw(`<line x1="${r(cx)}" y1="${r(by - u * 0.07)}" x2="${r(cx)}" y2="${r(by + bh)}" ${accentStroke()}/>`);
      break;
    }
    default: {
      canvas.raw(
        `<rect x="${r(cx - u * 0.18)}" y="${r(cy - u * 0.18)}" width="${r(u * 0.36)}" height="${r(u * 0.36)}" rx="${r(u * 0.04)}" ${stroke()}/>`,
      );
      markDemo(ctx, rect);
      canvas.raw('</g>');
      return false;
    }
  }

  markDemo(ctx, rect);
  canvas.raw('</g>');
  return true;
}

/** Явная пометка демо-плейсхолдера: капитель DEMO в углу фото-зоны. */
function markDemo(ctx: PlaceholderCtx, rect: Rect): void {
  const { canvas, theme, tk } = ctx;
  const markSize = tk.label * 0.78;
  canvas.text({
    text: caps('DEMO'),
    x: rect.x + tk.gapMd,
    y: rect.y + rect.h - tk.gapMd,
    size: markSize,
    style: { family: 'Inter', weight: 500 },
    tracking: trackingFor(ctx.theme, markSize),
    fill: theme.colors.ink,
    bg: theme.colors.photoBg,
    role: 'label',
  });
}
