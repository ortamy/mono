import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

const rootDir = cwd();

/** Загружает JSON из каталога content/ (редактируемый контент страниц). */
export function loadJSON<T>(relativePath: string): T {
  const fullPath = join(rootDir, 'content', relativePath);
  const raw = readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

/** Загружает JSON из каталога data/ (конфигурация сайта: навигация, формы, политика). */
export function loadDataJSON<T>(relativePath: string): T {
  const fullPath = join(rootDir, 'data', relativePath);
  const raw = readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}
