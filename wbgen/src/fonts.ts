// Шрифтовой движок: загрузка шрифтов из wbgen/assets/fonts, измерение и перенос строк.
// Измерение — посимвольно (advance + кернинг), чтобы не зависеть от шейпера resvg:
// раскладку строк мы считаем сами, поэтому QA переполнений детерминирован.

import fs from 'node:fs';
import path from 'node:path';
import { parse, type Font } from 'opentype.js';

export interface FontStyle {
  family: string;
  weight: number;
}

export const HEADLINE = 'Inter';
export const ACCENT_SERIF = 'Prata';

const fontsDir = path.resolve(__dirname, '..', 'assets', 'fonts');

let cache: Map<string, Font> | null = null;

/** Все файлы шрифтов в ассетах — отдаются resvg при растеризации. */
export function allFontFiles(): string[] {
  return fs
    .readdirSync(fontsDir)
    .filter((f) => /\.(otf|ttf)$/i.test(f))
    .map((f) => path.join(fontsDir, f));
}

function registry(): Map<string, Font> {
  if (cache) return cache;
  cache = new Map();
  for (const file of allFontFiles()) {
    const font = parse(fs.readFileSync(file).buffer as ArrayBuffer);
    cache.set(key(fontMeta(path.basename(file))), font);
  }
  return cache;
}

/** Семейство и вес определяем по имени файла (Inter-Medium.otf → Inter/500). */
function fontMeta(basename: string): FontStyle {
  const stem = basename.replace(/\.(otf|ttf)$/i, '');
  const weightWords: Record<string, number> = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
  };
  let weight = 400;
  let family = stem;
  for (const [word, w] of Object.entries(weightWords)) {
    if (stem.endsWith(`-${word}`)) {
      weight = w;
      family = stem.slice(0, -word.length - 1);
      break;
    }
  }
  return { family, weight };
}

const key = (s: FontStyle) => `${s.family}:${s.weight}`;

function lookup(style: FontStyle): Font {
  const reg = registry();
  const exact = reg.get(key(style));
  if (exact) return exact;
  // ближайший вес того же семейства
  const sameFamily = [...reg.entries()].filter(([k]) => k.startsWith(`${style.family}:`));
  if (sameFamily.length === 0) {
    throw new Error(`Шрифт не найден в wbgen/assets/fonts: ${style.family}`);
  }
  sameFamily.sort(
    (a, b) => Math.abs(Number(a[0].split(':')[1]) - style.weight) - Math.abs(Number(b[0].split(':')[1]) - style.weight),
  );
  return sameFamily[0][1];
}

/** Ширина строки в px при данном размере; trackingPx добавляется между символами. */
export function measureText(text: string, style: FontStyle, size: number, trackingPx = 0): number {
  const font = lookup(style);
  const upm = font.unitsPerEm;
  const chars = Array.from(text);
  let units = 0;
  for (let i = 0; i < chars.length; i++) {
    const glyph = font.charToGlyph(chars[i]);
    units += glyph && glyph.advanceWidth ? glyph.advanceWidth : 0;
    if (i < chars.length - 1) {
      try {
        units += font.getKerningValue(font.charToGlyph(chars[i]), font.charToGlyph(chars[i + 1]));
      } catch {
        // кернинга для пары нет — ок
      }
    }
  }
  return (units / upm) * size + trackingPx * Math.max(0, chars.length - 1);
}

/** Жадный перенос по словам с учётом явных \n. Одно слово шире строки — вернётся как есть (поймает QA). */
export function wrapText(
  text: string,
  style: FontStyle,
  size: number,
  trackingPx: number,
  maxWidth: number,
): string[] {
  const out: string[] = [];
  for (const rawLine of text.split('\n')) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    let cur = '';
    for (const word of words) {
      const candidate = cur ? `${cur} ${word}` : word;
      if (!cur || measureText(candidate, style, size, trackingPx) <= maxWidth) {
        cur = candidate;
      } else {
        out.push(cur);
        cur = word;
      }
    }
    out.push(cur);
  }
  return out;
}
