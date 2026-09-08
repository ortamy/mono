/** @type {import('next').NextConfig} */

// Значение приходит из GitHub Actions (./github/workflows/deploy.yml),
// где configure-pages отдаёт /имя-репозитория (или пустую строку для user pages).
// Локально префикс пустой — сайт собирается как обычно.

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,

  // Статический экспорт: на выходе — папка ./out без сервера Node
  output: 'export',

  // Оптимизация изображений не работает без сервера — отключаем (страховка на будущее)
  images: {
    unoptimized: true,
  },

  // Префикс путей для публикации в под-каталоге GitHub Pages (например /mono)
  basePath: basePath || undefined,
  assetPrefix: isGithubActions && basePath ? `${basePath}/` : undefined,

  // Генерировать about/index.html вместо about.html — надёжнее для GitHub Pages
  trailingSlash: true,
};

export default nextConfig;