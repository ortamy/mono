'use client';

import dynamic from 'next/dynamic';

/**
 * Тулбар agentation — визуальная обратная связь для ИИ-агентов.
 *
 * Кликаешь элемент на странице, пишешь замечание и копируешь готовую
 * разметку с селектором, позицией и текстом рядом — по ней агент находит
 * точный файл и строку. Вместо «синяя кнопка в сайдбаре» получается
 * `.sidebar > button.primary` плюс сам комментарий.
 *
 * Особенности интеграции:
 * - пакет рендерится через ReactPortal в document.body, поэтому грузим его
 *   только на клиенте (ssr: false) — на сервере портала не существует;
 * - в продакшене компонент не рендерится: посетители сайта тулбар не увидят,
 *   а сам чанк не запрашивается, разметка страниц не меняется;
 * - обычный режим — замечания копятся в localStorage и копируются в буфер
 *   (вставляются в чат агенту). Если запущен MCP-сервер
 *   (`npx -y agentation-mcp server`), задайте
 *   NEXT_PUBLIC_AGENTATION_ENDPOINT=http://localhost:4747 — тулбар отправит
 *   разметку агенту сам, без копирования руками.
 * - NEXT_PUBLIC_AGENTATION=off полностью отключает тулбар в dev, если мешает.
 */
const Agentation = dynamic(() => import('agentation').then((mod) => mod.Agentation), {
  ssr: false,
});

const enabled =
  process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_AGENTATION !== 'off';

// Не задан — тулбар работает автономно, на localStorage.
const endpoint = process.env.NEXT_PUBLIC_AGENTATION_ENDPOINT;

export default function DevAgentation() {
  if (!enabled) return null;

  return <Agentation appName="mono." {...(endpoint ? { endpoint } : {})} />;
}
