// HTML-превью комплекта: все слайды обеих пропорций, метаданные ниши,
// заметки к слайдам (хинты для будущей LLM-генерации) и итог QA.
// Открывается локально: wbgen/output/<ниша>/<товар>/preview.html

import fs from 'node:fs';
import path from 'node:path';
import type { FormatId, NicheConfig, ProductContent } from './types';
import type { QaProductReport } from './qa';

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function writePreview(
  outDir: string,
  product: ProductContent,
  niche: NicheConfig,
  qa: QaProductReport,
  files: string[],
): void {
  const html = buildHtml(product, niche, qa, files);
  fs.writeFileSync(path.join(outDir, 'preview.html'), html);
}

function buildHtml(
  product: ProductContent,
  niche: NicheConfig,
  qa: QaProductReport,
  files: string[],
): string {
  const p = niche.palette;
  const slideSections = ['square', 'vertical'].map((format) => {
    const fmt = format as FormatId;
    const label = fmt === 'square' ? '1080×1080 — доп. формат' : '900×1200 — основной формат WB';
    const tiles = product.slides
      .map((slide, i) => {
        const num = String(i + 1).padStart(2, '0');
        const file = `${fmt}/${num}-${slide.type}.png`;
        const note = slide.note ? `<p class="note">${esc(slide.note)}</p>` : '';
        const meanings = [slide.hook && 'хук', slide.sub && 'подзаголовок', ...(slide.bullets ?? []).map(() => 'буллет'), ...(slide.badges ?? []).map(() => 'бейдж'), slide.cta && 'cta'].filter(Boolean).join(' · ');
        return `<figure>
          <img src="${file}" alt="${esc(product.title)} — слайд ${num}, ${esc(slide.type)}" loading="lazy" width="300" />
          <figcaption><strong>${num}. ${esc(ruType(slide.type))}</strong><span>${esc(meanings)}</span>${note}</figcaption>
        </figure>`;
      })
      .join('\n');
    return `<section><h3>${label}</h3><div class="grid">${tiles}</div></section>`;
  });

  const failed = qa.slides.filter((s) => !s.pass);
  const qaSummary = qa.pass
    ? `<p class="ok">QA: ${qa.slides.length} слайд-проверок пройдено, контентные лимиты соблюдены.</p>`
    : `<p class="bad">QA провален (${failed.length} слайдов с ошибками + ${qa.contentIssues.length} контентных).</p>`;

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(product.title)} — комплект WB</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; font: 15px/1.5 system-ui, sans-serif; color: #222; background: #fafafa; }
  header { padding: 28px 32px 8px; }
  h1 { margin: 0 0 4px; font-size: 22px; }
  .sub { color: #777; margin: 0; }
  .badges { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 32px 0; }
  .badges span { border: 1px solid #ddd; border-radius: 999px; padding: 3px 12px; font-size: 12.5px; color: #555; }
  .ok { color: #1e7d3c; } .bad { color: #b23a20; } .note { color: #8a857c; font-size: 12.5px; margin: 4px 0 0; }
  main { padding: 8px 32px 40px; }
  section h3 { margin: 28px 0 12px; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; color: #666; }
  .grid { display: flex; flex-wrap: wrap; gap: 20px; }
  figure { margin: 0; width: 300px; }
  figure img { display: block; width: 300px; height: auto; border: 1px solid #e5e2dd; border-radius: 6px; background: #fff; }
  figcaption { font-size: 13px; margin-top: 6px; }
  figcaption span { display: block; color: #999; font-size: 11.5px; }
  footer { padding: 0 32px 32px; color: #999; font-size: 12.5px; }
</style>
</head>
<body>
<header>
  <h1>${esc(product.title)}</h1>
  <p class="sub">Ниша: ${esc(niche.title)} · комплект ${files.length} слайдов · ${esc(niche.photo.style)}</p>
  ${qaSummary}
</header>
<div class="badges">
  <span>фон ${esc(p.background)}</span><span>чернила ${esc(p.ink)}</span><span>акцент ${esc(p.accent)}</span>
  <span>гарнитуры: ${esc(niche.typography.primary)}${niche.typography.accent ? ' + ' + esc(niche.typography.accent) : ''}</span>
  <span>тон: ${esc(niche.voice.tone)}</span>
</div>
<main>
${slideSections.join('\n')}
</main>
<footer>
  Файлы комплекта: square/ · vertical/ · contact-sheet.png · qa-report.json.
  Заметки под слайдами — хинты для LLM-генерации текстов (в конфиге товара поле note).
</footer>
</body>
</html>
`;
}

function ruType(type: string): string {
  const map: Record<string, string> = {
    cover: 'обложка-хук',
    pain: 'боль и решение',
    benefits: 'преимущества',
    quality: 'материалы и качество',
    specs: 'характеристики',
    scenario: 'сценарий',
    proof: 'отзывы/сравнение',
    cta: 'CTA',
  };
  return map[type] ?? type;
}
