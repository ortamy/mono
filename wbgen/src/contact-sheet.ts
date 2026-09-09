// Контактный лист: обе пропорции комплекта на одном полотне для быстрого
// просмотра человеком. Собирается из готовых SVG-тел слайдов и рендерится
// одним PNG.

import type { SlideCanvas } from './svg';
import type { FormatId } from './types';
import { renderPng } from './render';
import { caps } from './theme';

const MARGIN = 64;
const GAP = 28;
const TILE_W = 300;
const LABEL_H = 56;
const COLS = 4;

export function contactSheetSvg(
  productTitle: string,
  nicheTitle: string,
  canvases: Record<FormatId, SlideCanvas[]>,
): string {
  const square = canvases.square;
  const vertical = canvases.vertical;
  const squareTileH = TILE_W; // 1080x1080
  const verticalTileH = Math.round((TILE_W * 1200) / 900); // 900x1200

  const width = MARGIN * 2 + COLS * TILE_W + (COLS - 1) * GAP;
  const squareBlockH = 2 * squareTileH + GAP;
  const verticalBlockH = 2 * verticalTileH + GAP;
  const titleH = 88;
  const height =
    MARGIN + titleH + LABEL_H + squareBlockH + GAP * 2 + LABEL_H + verticalBlockH + MARGIN;

  const parts: string[] = [];
  parts.push(`<rect width="${width}" height="${height}" fill="#FFFFFF"/>`);
  parts.push(
    `<text x="${MARGIN}" y="${MARGIN + 34}" font-family="Inter" font-weight="600" font-size="30" fill="#222222">${esc(productTitle)}</text>`,
  );
  parts.push(
    `<text x="${MARGIN}" y="${MARGIN + 70}" font-family="Inter" font-weight="400" font-size="22" fill="#888888">${esc(nicheTitle)} · контактный лист</text>`,
  );

  let y = MARGIN + titleH;
  y = drawBlock(parts, square, '1080×1080', squareTileH, y, width);
  y += GAP * 2;
  drawBlock(parts, vertical, '900×1200', verticalTileH, y, width);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${parts.join('\n')}</svg>`;
}

function drawBlock(
  parts: string[],
  slides: SlideCanvas[],
  label: string,
  tileH: number,
  y: number,
  width: number,
): number {
  parts.push(
    `<text x="${MARGIN}" y="${y + 34}" font-family="Inter" font-weight="600" font-size="24" letter-spacing="3" fill="#555555">${esc(label)}</text>`,
  );
  let cy = y + LABEL_H;
  slides.forEach((canvas, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const scale = TILE_W / canvas.W;
    const x = MARGIN + col * (TILE_W + GAP);
    const ty = cy + row * (tileH + GAP);
    parts.push(
      `<rect x="${x - 1}" y="${ty - 1}" width="${canvas.W * scale + 2}" height="${canvas.H * scale + 2}" fill="none" stroke="#DDDDDD"/>`,
    );
    parts.push(`<g transform="translate(${x} ${ty}) scale(${scale})">${canvas.body()}</g>`);
  });
  return cy + 2 * tileH + GAP;
}

export function contactSheetPng(svg: string): Buffer {
  return renderPng(svg);
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
