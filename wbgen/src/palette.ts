// Цветовая математика: hex -> RGB, WCAG-контраст. Используется авто-QA
// для проверки «контраст текста к подложке не ниже 4.5:1».

import type { HexColor, Rgb } from './types';

export function hexToRgb(hex: HexColor): Rgb {
  const h = hex.replace('#', '').trim();
  if (h.length !== 3 && h.length !== 6) throw new Error(`Некорректный hex-цвет: "${hex}"`);
  const full = h.length === 3
    ? h.split('').map((c) => c + c).join('')
    : h;
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) throw new Error(`Некорректный hex-цвет: "${hex}"`);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Относительная светимость по WCAG 2.x. */
export function luminance(rgb: Rgb): number {
  const ch = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/** Контраст двух цветов (WCAG), 1..21. */
export function contrast(a: HexColor | Rgb, b: HexColor | Rgb): number {
  const la = luminance(typeof a === 'string' ? hexToRgb(a) : a);
  const lb = luminance(typeof b === 'string' ? hexToRgb(b) : b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
