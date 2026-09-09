/**
 * Публичный корень сайта и путь под-каталога деплоя.
 *
 * - siteUrl — публичный корень, где лежит сайт (для GitHub Pages это
 *   https://<user>.github.io/<repo>, потому что репозиторий называется mono).
 *   Задаётся переменной NEXT_PUBLIC_SITE_URL на сборке, по умолчанию — деплой mono.
 * - basePath — под-каталог относительно домена (тот же /<repo>), нужен для
 *   absolute-path ассетов (favicon, og), потому что Next НЕ переписывает
 *   произвольные строки в метаданных. Локально — пустая строка.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ortamy.github.io/mono').replace(/\/+$/, '');

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Абсолютный URL страницы: siteUrl + /path + trailing slash. */
export function pageUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${clean.replace(/\/?$/, '/')}`;
}

/** Абсолютный URL ассета из public/ (og, favicon и т.п.). */
export function assetUrl(assetPath: string): string {
  const clean = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${siteUrl}${basePath}${clean}`;
}