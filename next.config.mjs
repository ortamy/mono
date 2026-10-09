/** @type {import('next').NextConfig} */

// Значение приходит из GitHub Actions (./github/workflows/deploy.yml),
// где configure-pages отдаёт /имя-репозитория (или пустую строку для user pages).
// Локально префикс пустой — сайт собирается как обычно.

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,

  // РАНЬШЕ ЗДЕСЬ БЫЛО output: 'export' — статический экспорт в ./out для
  // GitHub Pages. Убрано, потому что app/api/lead держит секреты (токен
  // Telegram бота, ключ Supabase) и в статике исполняться не может.
  //
  // ВНИМАНИЕ: GitHub Pages не умеет запускать Node-сервер. Сборка больше не
  // попадёт в ./out, и workflow .github/workflows/deploy.yml (upload ./out)
  // упадёт. Нужен хостинг с server-рантаймом: Vercel, Render, Railway, Fly.io.
  // До переезда /api/lead будет отдавать 404, а форма покажет запасную
  // ссылку на Telegram — лиды не теряются, но не попадут в CRM.

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