// Загрузка и валидация конфигов: ниши и товары читаются из JSON при запуске.
// Новая ниша = один файл в wbgen/content/niches, новый товар = один файл
// в wbgen/content/products/<ниша>/ — правки кода не нужны.

import fs from 'node:fs';
import path from 'node:path';
import { SLIDE_ORDER, type NicheConfig, type ProductContent } from './types';

const CONTENT_DIR = path.resolve(__dirname, '..', 'content');
const NICHES_DIR = path.join(CONTENT_DIR, 'niches');
const PRODUCTS_DIR = path.join(CONTENT_DIR, 'products');

function readJson(file: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    throw new Error(`Не удалось прочитать ${file}: ${(e as Error).message}`);
  }
}

function fail(file: string, msg: string): never {
  throw new Error(`Конфиг ${path.relative(process.cwd(), file)}: ${msg}`);
}

export function listNicheFiles(): string[] {
  if (!fs.existsSync(NICHES_DIR)) return [];
  return fs
    .readdirSync(NICHES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(NICHES_DIR, f));
}

export function listProductFiles(): string[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  const out: string[] = [];
  for (const dir of fs.readdirSync(PRODUCTS_DIR)) {
    const p = path.join(PRODUCTS_DIR, dir);
    if (!fs.statSync(p).isDirectory()) continue;
    for (const f of fs.readdirSync(p)) {
      if (f.endsWith('.json')) out.push(path.join(p, f));
    }
  }
  return out;
}

export function loadNiche(file: string): NicheConfig {
  const n = readJson(file) as NicheConfig;
  const rel = path.relative(process.cwd(), file);
  for (const key of ['id', 'title', 'palette', 'typography', 'voice', 'labels'] as const) {
    if (n[key] === undefined) fail(file, `нет поля "${key}"`);
  }
  for (const [name, hex] of Object.entries(n.palette)) {
    if (!/^#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}$/.test(hex)) fail(file, `палитра.${name}: не hex-цвет "${hex}"`);
  }
  if (n.voice.hookMax <= 0 || n.voice.bulletMax <= 0 || n.voice.badgeMax <= 0) {
    fail(file, 'voice: лимиты длин должны быть положительными');
  }
  return n;
}

export function loadNiches(): Map<string, NicheConfig> {
  const map = new Map<string, NicheConfig>();
  for (const file of listNicheFiles()) {
    const n = loadNiche(file);
    if (map.has(n.id)) fail(file, `дубль id ниши "${n.id}"`);
    map.set(n.id, n);
  }
  return map;
}

export function loadProduct(file: string, niches: Map<string, NicheConfig>): ProductContent {
  const p = readJson(file) as ProductContent;
  const rel = path.relative(process.cwd(), file);
  if (!p.id) fail(file, 'нет поля "id"');
  if (!niches.has(p.niche)) {
    fail(file, `ниша "${p.niche}" не найдена в wbgen/content/niches`);
  }
  if (!Array.isArray(p.slides)) fail(file, 'нет массива "slides"');
  if (p.slides.length !== SLIDE_ORDER.length) {
    fail(file, `слайдов ${p.slides.length}, ожидается ${SLIDE_ORDER.length} (воронка из 8)`);
  }
  p.slides.forEach((s, i) => {
    if (s.type !== SLIDE_ORDER[i]) {
      fail(file, `слайд ${i + 1}: тип "${s.type}", по воронке ожидается "${SLIDE_ORDER[i]}"`);
    }
  });
  return p;
}

export function loadProducts(niches: Map<string, NicheConfig>): ProductContent[] {
  return listProductFiles().map((f) => loadProduct(f, niches));
}
