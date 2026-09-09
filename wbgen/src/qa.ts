// Авто-QA после рендера. Провал любой проверки — понятная причина в отчёте
// и остановка комплекта (CLI завершается с ошибкой), без тихих прогонов.
//
// Проверки на слайд:
//   1) контраст текста к подложке ≥ 4.5:1 (WCAG);
//   2) отсутствие переполнений/обрезок текста (границы слайда, лимиты строк);
//   3) читаемость в превью 300px: заголовок и ключевой чип;
//   4) безопасные угловые зоны маркетплейса + поля сетки;
//   5) текст не лежит на реальном фото (только на фонах);
//   6) лимит смыслов на слайд и отсутствие взаимных наложений текстов.
// Проверки контента: лимиты длин ниши, слова-воды, восклицания,
// обязательные элементы ниши, существование файлов фото.

import fs from 'node:fs';
import path from 'node:path';
import { contrast } from './palette';
import { MEANING_CAP } from './slides';
import type { PhotoRect, SlideCanvas, TextBox } from './svg';
import { getTokens } from './design';
import type { FormatId, NicheConfig, ProductContent, SlideContent } from './types';

export interface QaIssue {
  check: string;
  message: string;
}

export interface QaSlideReport {
  slide: string;
  slideType: string;
  format: FormatId;
  pass: boolean;
  issues: QaIssue[];
}

export interface QaProductReport {
  product: string;
  niche: string;
  pass: boolean;
  slides: QaSlideReport[];
  contentIssues: QaIssue[];
  warnings: QaIssue[];
}

const CONTRAST_MIN = 4.5;
const PREVIEW_W = 300;
/** минимальный размер заголовка и чипа в превью 300px, px */
const PREVIEW_HEADING_MIN = 15;
const PREVIEW_CHIP_MIN = 8;

/** Проверки одного отрендеренного слайда. */
export function qaSlide(
  canvas: SlideCanvas,
  content: SlideContent,
  format: FormatId,
): QaSlideReport {
  const issues: QaIssue[] = [];
  const tk = getTokens(canvas.W, canvas.H);
  const scale = PREVIEW_W / canvas.W;
  const C = canvas.slideType;

  // 1) контраст текста к подложке
  for (const t of canvas.texts) {
    const ratio = contrast(t.color, t.bg);
    if (ratio < CONTRAST_MIN) {
      issues.push(
        issue('contrast', `«${t.text.slice(0, 30)}» контраст ${ratio.toFixed(2)}:1 < ${CONTRAST_MIN}:1 (${t.color} на ${t.bg})`),
      );
    }
  }

  // 2) переполнения и обрезки
  for (const t of canvas.texts) {
    if (t.x < -0.5 || t.y < -0.5 || t.x + t.w > canvas.W + 0.5 || t.y + t.h > canvas.H + 0.5) {
      issues.push(issue('overflow', `«${t.text.slice(0, 30)}» выходит за край слайда`));
    }
  }
  for (const tr of canvas.truncations) {
    issues.push(
      issue('overflow', `текст «${tr.text.slice(0, 40)}» не влез в ${tr.maxLines} строк — сократите текст`),
    );
  }

  // 3) читаемость в превью 300px: заголовок и ключевой чип
  for (const t of canvas.texts) {
    const previewPx = t.fontPx * scale;
    if (t.role === 'heading' && previewPx < PREVIEW_HEADING_MIN) {
      issues.push(issue('preview300', `заголовок ${t.fontPx.toFixed(0)}px → ${previewPx.toFixed(1)}px в превью (< ${PREVIEW_HEADING_MIN}px)`));
    }
    if (t.role === 'chip' && previewPx < PREVIEW_CHIP_MIN) {
      issues.push(issue('preview300', `чип «${t.text}» ${t.fontPx.toFixed(0)}px → ${previewPx.toFixed(1)}px в превью (< ${PREVIEW_CHIP_MIN}px)`));
    }
  }

  // 4) безопасные зоны: поля сетки + угловые сервисные круги маркетплейса
  const margin = tk.margin;
  const corners: [number, number][] = [
    [0, 0],
    [canvas.W, 0],
    [0, canvas.H],
    [canvas.W, canvas.H],
  ];
  for (const t of canvas.texts) {
    // DEMO-метка плейсхолдера — сервисный элемент, безопасные зоны для неё не проверяем
    if (t.role === 'label' && t.text === 'DEMO') continue;
    const inside =
      t.x >= margin - 0.5 &&
      t.y >= margin - 0.5 &&
      t.x + t.w <= canvas.W - margin + 0.5 &&
      t.y + t.h <= canvas.H - margin + 0.5;
    if (!inside) {
      issues.push(issue('safe-zone', `«${t.text.slice(0, 30)}» нарушает поле сетки ${margin.toFixed(0)}px`));
      continue;
    }
    for (const [cx, cy] of corners) {
      // ближайшая к углу точка бокса (clamp центра круга на прямоугольник)
      const nearestX = Math.min(Math.max(cx, t.x), t.x + t.w);
      const nearestY = Math.min(Math.max(cy, t.y), t.y + t.h);
      const dist = Math.hypot(cx - nearestX, cy - nearestY);
      if (dist < tk.cornerR) {
        issues.push(issue('safe-zone', `«${t.text.slice(0, 30)}» попадает в угловую сервисную зону маркетплейса`));
        break;
      }
    }
  }

  // 5) текст поверх реального фото (на плейсхолдере разрешена только DEMO-метка)
  for (const t of canvas.texts) {
    for (const p of canvas.photoRects) {
      if (!intersects(t, p)) continue;
      const allowed = p.placeholder && t.bg === p.bg;
      if (!allowed) {
        issues.push(issue('photo-overlap', `«${t.text.slice(0, 30)}» лежит на фото — перенесите текст на фон`));
      }
    }
  }

  // 6) лимит смыслов и взаимные наложения текстов
  const cap = MEANING_CAP[C];
  if (canvas.meanings.length > cap) {
    issues.push(
      issue('meanings', `${canvas.meanings.length} смысловых единиц > ${cap} на слайде «${C}»: ${canvas.meanings.join(', ')}`),
    );
  }
  for (let i = 0; i < canvas.texts.length; i++) {
    for (let j = i + 1; j < canvas.texts.length; j++) {
      if (intersects(canvas.texts[i], canvas.texts[j])) {
        issues.push(
          issue('text-overlap', `тексты накладываются: «${canvas.texts[i].text.slice(0, 20)}» и «${canvas.texts[j].text.slice(0, 20)}»`),
        );
      }
    }
  }

  return { slide: canvas.slideId, slideType: C, format, pass: issues.length === 0, issues };
}


function issue(check: string, message: string): QaIssue {
  return { check, message };
}

function intersects(a: TextBox, b: PhotoRect | TextBox): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}


/** Контентные проверки: лимиты ниши, слова-воды, обязательные элементы, файлы фото. */
export function qaContent(
  product: ProductContent,
  niche: NicheConfig,
): { issues: QaIssue[]; warnings: QaIssue[] } {
  const issues: QaIssue[] = [];
  const warnings: QaIssue[] = [];
  const v = niche.voice;
  const banned = v.bannedWords.map((w) => w.toLowerCase());

  const checkText = (slideType: string, field: string, text: string, max: number): void => {
    if (text.length > max) {
      issues.push(issue('voice-limit', `${slideType}.${field}: ${text.length} симв. > ${max} — «${text.slice(0, 40)}»`));
    }
    const low = text.toLowerCase();
    for (const w of banned) {
      if (low.includes(w)) issues.push(issue('banned-word', `${slideType}.${field}: слово-вода «${w}»`));
    }
    if (v.noExclaims && text.includes('!')) {
      issues.push(issue('voice-limit', `${slideType}.${field}: восклицательный знак запрещён тоном ниши`));
    }
  };

  for (const s of product.slides) {
    if (s.hook) checkText(s.type, 'hook', s.hook, v.hookMax);
    if (s.sub) checkText(s.type, 'sub', s.sub, v.subMax);
    (s.bullets ?? []).forEach((b, i) => checkText(s.type, `bullets[${i}]`, b, v.bulletMax));
    (s.badges ?? []).forEach((b, i) => checkText(s.type, `badges[${i}]`, b, v.badgeMax));
    (s.rows ?? []).forEach(([label, val], i) => {
      checkText(s.type, `rows[${i}].value`, val, v.rowValueMax);
    });
    if (s.cta) checkText(s.type, 'cta', s.cta, v.hookMax);
    if (s.quote) checkText(s.type, 'quote', s.quote, v.quoteMax);
    if (s.compare) {
      s.compare.rows.forEach(([feature, a, b], i) => {
        checkText(s.type, `compare[${i}].feature`, feature, v.rowValueMax);
        checkText(s.type, `compare[${i}].ours`, a, v.rowValueMax);
        checkText(s.type, `compare[${i}].alt`, b, v.rowValueMax);
      });
    }
  }

  // обязательные элементы ниши
  for (const req of niche.requirements) {
    const slide = product.slides.find((s) => s.type === req.slide);
    if (!slide) {
      issues.push(issue('niche-requirement', `нет слайда «${req.slide}» для обязательных элементов ниши`));
      continue;
    }
    for (const key of req.specRowKeys ?? []) {
      const label = niche.labels[key];
      if (!label) {
        issues.push(issue('niche-requirement', `в словаре ниши нет ключа «${key}»`));
        continue;
      }
      const found = (slide.rows ?? []).some(([l]) => l === label);
      if (!found) {
        issues.push(issue('niche-requirement', `слайд «${req.slide}»: обязательная строка «${label}» не найдена`));
      }
    }
    if (req.badgeContains) {
      const needle = req.badgeContains.toLowerCase();
      const found = (slide.badges ?? []).some((b) => b.toLowerCase().includes(needle));
      if (!found) {
        issues.push(issue('niche-requirement', `слайд «${req.slide}»: бейдж с «${req.badgeContains}» не найден`));
      }
    }
  }

  // файлы фото: заданы, но не найдены — предупреждение, верстку не ломает
  for (const [slot, rel] of Object.entries(product.photos)) {
    if (!rel) continue;
    const abs = path.resolve(process.cwd(), rel);
    if (!fs.existsSync(abs)) {
      warnings.push(issue('photo-file', `photos.${slot}: файл не найден (${rel}) — используется демо-плейсхолдер`));
    } else if (!/\.(png|jpe?g)$/i.test(abs)) {
      warnings.push(issue('photo-file', `photos.${slot}: поддерживаются PNG/JPEG (${rel}) — используется демо-плейсхолдер`));
    }
  }

  return { issues, warnings };
}

/** Полный QA-прогон комплекта товара по готовым канвасам. */
export function qaProduct(
  product: ProductContent,
  niche: NicheConfig,
  canvases: Record<'square' | 'vertical', SlideCanvas[]>,
): QaProductReport {
  const slides: QaSlideReport[] = [];
  product.slides.forEach((content, i) => {
    slides.push(qaSlide(canvases.square[i], content, 'square'));
    slides.push(qaSlide(canvases.vertical[i], content, 'vertical'));
  });
  const { issues, warnings } = qaContent(product, niche);
  return {
    product: product.id,
    niche: niche.id,
    pass: slides.every((s) => s.pass) && issues.length === 0,
    slides,
    contentIssues: issues,
    warnings,
  };
}
