/**
 * Публичный корень сайта и хелперы абсолютных URL для метаданных.
 *
 * - siteUrl — публичный корень, ГДЕ ЛЕЖИТ САЙТ, вместе с подкаталогом деплоя:
 *   для GitHub Pages это https://<user>.github.io/<repo> (репозиторий называется
 *   mono), для хостинга в корне домена — просто https://example.com. Значение
 *   приходит из NEXT_PUBLIC_SITE_URL на сборке, дефолт — деплой mono на Pages.
 *
 * ⚠️ Подкаталог должен быть уже внутри siteUrl. Раньше assetUrl() добавлял к
 * siteUrl ещё и NEXT_PUBLIC_BASE_PATH — на Pages получалось /mono/mono/api/og,
 * то есть битые OG-картинка и favicon. NEXT_PUBLIC_BASE_PATH по-прежнему нужен
 * Next для маршрутизации (см. next.config.mjs), но в метаданные его подмешивать
 * нельзя: Next не переписывает произвольные строки в metadata.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ortamy.github.io/mono').replace(/\/+$/, '');

/** Абсолютный URL страницы: siteUrl + /path + trailing slash. */
export function pageUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${clean.replace(/\/?$/, '/')}`;
}

/** Абсолютный URL ассета из public/ (og, favicon и т.п.). */
export function assetUrl(assetPath: string): string {
  const clean = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${siteUrl}${clean}`;
}