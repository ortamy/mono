/** @type {import('next').NextConfig} */

// Значение приходит из GitHub Actions (.github/workflows/deploy.yml),
// где configure-pages отдаёт /имя-репозитория (или пустую строку для user pages).
// Локально префикс пустой — сайт собирается как обычно.

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Статический экспорт в ./out включается флагом STATIC_EXPORT=true: его ставит
// scripts/build-static.mjs, из которого собирается GitHub Pages (см. воркфлоу
// .github/workflows/deploy.yml). Обычная сборка (`npm run build`) остаётся
// серверной, чтобы app/api/lead могла работать на хостинге с Node (Vercel /
// Render / Railway): в статике серверных роутов нет, и лиды уходят только в
// запасной канал «Написать в Telegram».
//
// Каталог app/api при экспорте трогать не нужно: POST-роуты Next не выкладывает
// (в отчёте сборки они помечены как Dynamic) и сборка не падает. А вот роуты
// метаданных и OG-картинка экспортируются, поэтому им нужен явный
// `export const dynamic = 'force-static'` — см. app/robots.ts, app/sitemap.ts,
// app/api/og/route.tsx.
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,

  ...(isStaticExport ? { output: 'export' } : {}),

  // Оптимизация изображений отключена: на экспорте не работала, в серверном
  // режиме оставляем как есть до отдельного решения.
  images: {
    unoptimized: true,
    // Внутри превью кейсов на /design стоят фото с Unsplash — разрешаем хост.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },

  // Префикс путей для публикации в под-каталоге GitHub Pages (например /mono)
  basePath: basePath || undefined,
  assetPrefix: isGithubActions && basePath ? `${basePath}/` : undefined,

  // Генерировать about/index.html вместо about.html — надёжнее для GitHub Pages
  trailingSlash: true,
};

export default nextConfig;