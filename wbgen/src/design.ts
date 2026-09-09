// Токены дизайн-системы минимализма. Все значения заданы на базовой сетке 1080
// и масштабируются коэффициентом s = min(W, H) / 1080, поэтому квадрат 1080x1080
// и вертикаль 900x1200 строятся из одних и тех же пропорций.

import type { Rect } from './svg';

export const BASE = 1080;

export interface Tokens {
  s: number;
  t: (v: number) => number;
  /** внешние поля сетки */
  margin: number;
  /** радиус угловых сервисных зон маркетплейса — текст в них не заходит */
  cornerR: number;
  hairline: number;
  /** радиус фото-рамки */
  radius: number;
  // типо-шкала (базовые единицы 1080, брать через t())
  label: number;
  chip: number;
  body: number;
  sub: number;
  headlineMin: number;
  headlineMax: number;
  numeral: number;
  cta: number;
  quote: number;
  specLabel: number;
  specValue: number;
  indexNumeral: number;
  // чип
  chipPadX: number;
  chipPadY: number;
  chipStroke: number;
  chipRadius: number;
  // отступы
  gapLg: number;
  gapMd: number;
  gapSm: number;
}

export function getTokens(W: number, H: number): Tokens {
  const s = Math.min(W, H) / BASE;
  const t = (v: number) => v * s;
  return {
    s,
    t,
    margin: t(88),
    cornerR: t(112),
    hairline: Math.max(1, Math.round(2 * s)),
    radius: t(28),
    label: t(24),
    chip: t(31),
    body: t(30),
    sub: t(36),
    headlineMin: t(60),
    headlineMax: t(96),
    numeral: t(250),
    cta: t(62),
    quote: t(44),
    specLabel: t(24),
    specValue: t(32),
    indexNumeral: t(26),
    chipPadX: t(24),
    chipPadY: t(13),
    chipStroke: Math.max(1.5, t(2.2)),
    chipRadius: t(999),
    gapLg: t(56),
    gapMd: t(32),
    gapSm: t(18),
  };
}

/** Прямоугольник безопасной зоны: весь текст обязан лежать внутри него. */
export function safeRect(W: number, H: number, tk: Tokens): Rect {
  return { x: tk.margin, y: tk.margin, w: W - tk.margin * 2, h: H - tk.margin * 2 };
}

/** Круги сервисных бейджей маркетплейса в углах — текст не должен в них попадать. */
export function cornerCircles(W: number, H: number, tk: Tokens): Rect[] {
  const r = tk.cornerR;
  return [
    { x: 0, y: 0, w: r, h: r },
    { x: W - r, y: 0, w: r, h: r },
    { x: 0, y: H - r, w: r, h: r },
    { x: W - r, y: H - r, w: r, h: r },
  ];
}
