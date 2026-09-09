import { readFileSync } from 'fs';
import { join } from 'path';

const contentDir = join(process.cwd(), 'content');

export function loadJSON<T>(relativePath: string): T {
  const fullPath = join(contentDir, relativePath);
  const raw = readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}
