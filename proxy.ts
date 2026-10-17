import { NextResponse, type NextRequest } from 'next/server';

/**
 * Defensive-guard от цикла редиректов (ERR_TOO_MANY_REDIRECTS) при
 * trailingSlash: true (см. next.config.mjs).
 *
 * При trailingSlash: true Next сам отдаёт 308-редирект `/X` → `/X/`. Если в
 * цепочку попадает RSC-запрос клиентской навигации (prefetch со знаком `_rsc`
 * в query), в отдельных сборках/браузерах редирект зацикливается и Chrome
 * падает с ERR_TOO_MANY_REDIRECTS. Пропускаем такие запросы напрямую,
 * минуя нормализацию trailing slash и любые условные редиректы.
 *
 * В Next.js 16 конвенция `middleware` устарела — файл называется proxy.ts,
 * а функция экспортируется как `proxy`. В статическом экспорте (GitHub Pages,
 * output: 'export') proxy отключён, поэтому защита действует только на
 * серверном рантайме (npm start на Vercel/Render/Railway и локально).
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.searchParams.has('_rsc')) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  // Не трогаем статику: чанки, картинки и favicon мимо proxy.
  matcher: ['/((?!_next/static|_next/image|favicon\\.svg).*)'],
};
