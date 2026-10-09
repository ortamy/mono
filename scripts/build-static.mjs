/**
 * Сборка статического экспорта сайта в ./out — из него публикуется GitHub Pages
 * (см. .github/workflows/deploy.yml).
 *
 * Почему обёртка, а не `STATIC_EXPORT=true next build` в package.json:
 *   - переменную окружения так не поставить кросс-платформенно (в cmd.exe
 *     `VAR=value команда` не работает, а проект собирается и на Windows, и на
 *     раннере ubuntu);
 *   - после сборки нужно переложить OG-картинку (см. publishOgImage).
 *
 * Next вызывается по явному пути из node_modules, а не через `next` из PATH:
 * скрипт должен работать и при прямом `node scripts/build-static.mjs`, когда npm
 * не добавил node_modules/.bin в PATH.
 */
import { copyFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');

/** Путь до CLI Next (entrypoint, а не шим из node_modules/.bin). */
function resolveNextCli() {
  const require = createRequire(import.meta.url);
  return join(dirname(require.resolve('next/package.json')), 'dist', 'bin', 'next');
}

/**
 * Экспорт GET-роута /api/og Next кладёт файлом БЕЗ расширения (out/api/og), а
 * соцсети и мессенджеры читают Content-Type из расширения — такой файл они
 * игнорируют. Поэтому перекладываем его в out/og.png: тот же путь подставляется
 * в метаданные через NEXT_PUBLIC_OG_IMAGE (lib/meta.ts).
 *
 * Нет файла или это не PNG — падаем: выложить сайт с нерабочей OG-картинкой
 * хуже, чем упасть на сборке.
 */
function publishOgImage() {
  const source = join(outDir, 'api', 'og');
  const target = join(outDir, 'og.png');

  if (!existsSync(source)) {
    throw new Error(
      "Не найден экспорт роута /api/og (out/api/og). Проверьте, что в app/api/og/route.tsx есть export const dynamic = 'force-static'.",
    );
  }

  const png = readFileSync(source);
  if (png.subarray(0, 8).toString('latin1') !== '\x89PNG\r\n\x1a\n') {
    throw new Error('Экспорт /api/og не является PNG — отдавать его как /og.png нельзя.');
  }

  copyFileSync(source, target);
  // out/api в статике не нужен: рабочие URL у серверных роутов там не появляются,
  // а лишний файл без расширения только путает.
  rmSync(join(outDir, 'api'), { recursive: true, force: true });
  console.log('OG-картинка: out/api/og -> out/og.png');
}

const result = spawnSync(process.execPath, [resolveNextCli(), 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    // Читает next.config.mjs: добавляет output: 'export'.
    STATIC_EXPORT: 'true',
    // Путь относительный — абсолютный URL собирает assetUrl() из siteUrl.
    NEXT_PUBLIC_OG_IMAGE: process.env.NEXT_PUBLIC_OG_IMAGE || '/og.png',
  },
});

if (result.status !== 0) process.exit(result.status ?? 1);

publishOgImage();
