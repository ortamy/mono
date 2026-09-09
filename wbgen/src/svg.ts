// Канвас слайда: собирает SVG-разметку и параллельно регистрирует метаданные
// (текстовые боксы, фото-зоны, смысловые единицы) для авто-QA после рендера.

import { measureText, type FontStyle } from './fonts';

export type TextRole =
  | 'heading'
  | 'sub'
  | 'label'
  | 'chip'
  | 'body'
  | 'value'
  | 'numeral'
  | 'quote'
  | 'cta';

export interface TextBox {
  slide: string;
  slideType: string;
  role: TextRole;
  text: string;
  /** прямоугольник строки (x,y — левый верх) */
  x: number;
  y: number;
  w: number;
  h: number;
  fontPx: number;
  color: string;
  bg: string;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TextOpts {
  text: string;
  /** baseline */
  x: number;
  y: number;
  size: number;
  style: FontStyle;
  /** трекинг в px между символами */
  tracking?: number;
  fill: string;
  /** цвет подложки под текстом — для QA контраста */
  bg: string;
  role: TextRole;
  lineHeight?: number;
}

export class SlideCanvas {
  readonly parts: string[] = [];
  readonly texts: TextBox[] = [];
  readonly photoRects: Rect[] = [];
  readonly meanings: string[] = [];

  constructor(
    readonly slideId: string,
    readonly slideType: string,
    readonly W: number,
    readonly H: number,
  ) {}

  raw(svg: string): void {
    this.parts.push(svg);
  }

  /** Текст, выровненный по левому краю от x. Позиции считаем сами — без text-anchor. */
  text(opts: TextOpts): { width: number } {
    const tracking = opts.tracking ?? 0;
    const width = measureText(opts.text, opts.style, opts.size, tracking);
    const attrs = [
      `x="${r(opts.x)}"`,
      `y="${r(opts.y)}"`,
      `font-family="${opts.style.family}"`,
      `font-weight="${opts.style.weight}"`,
      `font-size="${r(opts.size)}"`,
      tracking ? `letter-spacing="${r(tracking)}"` : '',
      `fill="${opts.fill}"`,
    ]
      .filter(Boolean)
      .join(' ');
    this.parts.push(`<text ${attrs}>${escapeXml(opts.text)}</text>`);
    const box: TextBox = {
      slide: this.slideId,
      slideType: this.slideType,
      role: opts.role,
      text: opts.text,
      x: opts.x,
      y: opts.y - opts.size * 0.78,
      w: width,
      h: opts.size * (opts.lineHeight ?? 1),
      fontPx: opts.size,
      color: opts.fill,
      bg: opts.bg,
    };
    this.texts.push(box);
    return { width };
  }

  registerPhoto(rect: Rect): void {
    this.photoRects.push(rect);
  }

  addMeaning(id: string): void {
    this.meanings.push(id);
  }

  body(): string {
    return this.parts.join('\n');
  }
}

/** Многострочный текст: раскладка строк считается здесь (fonts.wrapText). */
export function drawLines(
  canvas: SlideCanvas,
  lines: string[],
  opts: Omit<TextOpts, 'text'>,
): number {
  const lineHeight = opts.lineHeight ?? 1.22;
  let lastBaseline = opts.y;
  lines.forEach((line, i) => {
    canvas.text({ ...opts, text: line, y: opts.y + i * opts.size * lineHeight });
    lastBaseline = opts.y + i * opts.size * lineHeight;
  });
  return lastBaseline;
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function r(n: number): number {
  return Math.round(n * 100) / 100;
}
