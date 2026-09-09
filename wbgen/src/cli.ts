// CLI генератора:
//   npm run wbgen -- list
//   npm run wbgen -- render --product <ниша>/<товар>
//   npm run wbgen -- render --all
// Результат продукта: wbgen/output/<ниша>/<товар>/ — 8 слайдов в каждой
// пропорции (square/vertical) + contact-sheet.png.

import fs from 'node:fs';
import path from 'node:path';
import { loadNiches, loadProducts } from './configs';
import { renderSlide } from './render';
import { contactSheetPng, contactSheetSvg } from './contact-sheet';
import { FORMATS, SLIDE_ORDER, type FormatId, type ProductContent, type NicheConfig } from './types';
import type { SlideCanvas } from './svg';

const OUT_DIR = path.resolve(__dirname, '..', 'output');

interface Args {
  cmd: string;
  product?: string;
  all?: boolean;
}

function parseArgs(argv: string[]): Args {
  const cmd = argv[0] ?? 'help';
  const args: Args = { cmd };
  for (let i = 1; i < argv.length; i++) {
    if (argv[i] === '--product') args.product = argv[++i];
    if (argv[i] === '--all') args.all = true;
  }
  return args;
}

export interface RenderResult {
  product: ProductContent;
  niche: NicheConfig;
  outDir: string;
  canvases: Record<FormatId, SlideCanvas[]>;
  files: string[];
}

/** Рендерит комплект одного товара: 8 слайдов × 2 пропорции + контактный лист. */
export function renderProduct(
  product: ProductContent,
  niches: Map<string, NicheConfig>,
): RenderResult {
  const niche = niches.get(product.niche);
  if (!niche) throw new Error(`Ниша "${product.niche}" не найдена`);
  const outDir = path.join(OUT_DIR, niche.id, product.id);
  const canvases: Record<FormatId, SlideCanvas[]> = { square: [], vertical: [] };
  const files: string[] = [];

  for (const format of ['square', 'vertical'] as FormatId[]) {
    const dir = path.join(outDir, format);
    fs.mkdirSync(dir, { recursive: true });
    for (const slide of product.slides) {
      const idx = SLIDE_ORDER.indexOf(slide.type) + 1;
      const { png, canvas } = renderSlide(product, niche, slide, format);
      const file = `${String(idx).padStart(2, '0')}-${slide.type}.png`;
      fs.writeFileSync(path.join(dir, file), png);
      files.push(path.join(format, file));
      canvases[format].push(canvas);
    }
  }

  const sheet = contactSheetSvg(product.title, niche.title, canvases);
  fs.writeFileSync(path.join(outDir, 'contact-sheet.png'), contactSheetPng(sheet));

  return { product, niche, outDir, canvases, files };
}

function list(): void {
  const niches = loadNiches();
  console.log('Ниши (wbgen/content/niches):');
  for (const n of niches.values()) console.log(`  ${n.id.padEnd(12)} ${n.title}`);
  console.log('\nТовары (wbgen/content/products/<ниша>/<товар>.json):');
  for (const p of loadProducts(niches)) console.log(`  ${p.niche}/${p.id}`);
}

function render(args: Args): number {
  const niches = loadNiches();
  const products = loadProducts(niches);
  if (products.length === 0) {
    console.error('Нет товаров: положите JSON в wbgen/content/products/<ниша>/');
    return 1;
  }
  let targets = products;
  if (!args.all) {
    if (!args.product) {
      console.error('Укажите --product <ниша>/<товар> или --all');
      return 1;
    }
    const [nicheId, productId] = args.product.split('/');
    targets = products.filter((p) => p.niche === nicheId && p.id === productId);
    if (targets.length === 0) {
      console.error(`Товар не найден: ${args.product} (см. npm run wbgen -- list)`);
      return 1;
    }
  }
  for (const t of targets) {
    const res = renderProduct(t, niches);
    const rel = path.relative(process.cwd(), res.outDir);
    console.log(
      `✓ ${t.niche}/${t.id}: ${res.files.length} слайдов (${FORMATS.square.w}×${FORMATS.square.h}, ${FORMATS.vertical.w}×${FORMATS.vertical.h}) + contact-sheet.png → ${rel}`,
    );
  }
  return 0;
}

async function main(): Promise<number> {
  const args = parseArgs(process.argv.slice(2));
  switch (args.cmd) {
    case 'list':
      list();
      return 0;
    case 'render':
      return render(args);
    default:
      console.log('Использование:');
      console.log('  npm run wbgen -- list');
      console.log('  npm run wbgen -- render --product <ниша>/<товар>');
      console.log('  npm run wbgen -- render --all');
      return 0;
  }
}

main()
  .then((code) => process.exit(code))
  .catch((e: Error) => {
    console.error(`ОШИБКА: ${e.message}`);
    process.exit(1);
  });
