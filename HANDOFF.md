# HANDOFF — проект `mono.`

> Документ-контекст для передачи проекта человеку или ИИ-ассистенту.
> Описывает, **что это за продукт, зачем он, на чём построен, как устроен и
> что важно не сломать**. Актуально на дату коммита `feat(stack): страница /stack + тизер на /agents, единый источник data/stack.ts`.

---

## 1. Что это за проект (в двух абзацах)

`mono.` — сайт небольшой **дизайн-студии / digital-студии одного специалиста**,
которая занимается четырьмя направлениями:

1. **E-commerce** — карточки товаров для маркетплейсов (Wildberries, Ozon):
   обложки, визуальные воронки до 8 слайдов, A/B-тесты.
2. **Web** — лендинги и сайты с измеримым результатом (заявки, конверсия,
   ROI-калькулятор, прозрачный процесс и гарантии).
3. **Brand** — айдентика, логотипы, фирменный стиль, гайдлайны.
4. **AI-агенты** — сборка агентов под процесс клиента (оркестрация, LLM, RAG,
   наблюдаемость). Услуга `/agents`, справочник по стеку — `/stack`.

Репозиторий — это **монорепозиторий из двух независимых частей**, живущих в
одной папке:

- **основной сайт** (`app/`, `components/`, `lib/`, `content/`, `data/`) — на
  Next.js 16 (App Router), с серверными API-роутами для приёма лидов;
- **`wbgen/`** — отдельный офлайн-CLI-инструмент на Node.js/TypeScript,
  который **генерирует комплекты карточек для WB** (SVG → PNG) из JSON-конфигов
  ниш и товаров, с автоматическим QA. Он не связан с рантаймом сайта и имеет
  собственный `tsconfig.json`.

Смысловая «ось» главной страницы — **продажа идеи «свой кастомный интернет-магазин
вместо маркетплейса»**: селлеры отдают WB/Ozon 20–35% выручки комиссии, а студия
делает отдельный магазин за 21 день с 0% комиссии и ИИ-автоматизацией.

---

## 2. Технологический стек

### Основной сайт

| Слой | Технология |
|---|---|
| Фреймворк | **Next.js 16.3.4** (App Router, Server Components, Route Handlers) |
| UI | **React 18.3.1** |
| Язык | **TypeScript 5.5.4** (strict, `target: es5`) |
| Стили | **Tailwind CSS 3.4.7** + PostCSS + Autoprefixer; плюс ручной глобальный CSS |
| Иконки | `lucide-react` |
| Анимации | `framer-motion` (частично) |
| Графики | `recharts` (графики в портфолио/превью) |
| Валидация | **zod 4** |
| БД (лиды) | **Supabase** (`@supabase/supabase-js`) — таблица `landing_leads` |
| Уведомления | **Telegram Bot API** (server-side fetch) |
| OG-картинки | `next/og` (**satori**) — динамический PNG 1200×630 |
| Аналитика | Яндекс.Метрика (опц.), `dataLayer`-события |
| Хелперы | `clsx`, `tailwind-merge` (`cn()`), `class-variance-authority` |
| Радикс | `@radix-ui/react-dialog` |
| Dev-инструмент | `agentation` — тулбар визуальной обратной связи для ИИ-агентов |
| Тесты | `tsx` (запуск TS-тестов напрямую) |

### `wbgen/` (генератор карточек)

| Слой | Технология |
|---|---|
| Рантайм | Node.js + `tsx` (запуск TS без сборки) |
| SVG → PNG | `@resvg/resvg-js` |
| Метрики текста | `opentype.js` |
| Шрифты | Inter + Prata (SIL OFL, лежат в `wbgen/assets/fonts`) |
| Данные | JSON-конфиги ниш и товаров |

### `skills-lock.json`

Зафиксирован один skill: `redesign-existing-projects` из `Leonxlnx/taste-skill`
(файл `.agents/skills/redesign-existing-projects/SKILL.md`).


---

## 3. Маршруты (страницы) сайта

| URL | Файл | Что это |
|---|---|---|
| `/` | `app/page.tsx` | Главная: «продуктовый дизайн и ИИ-автоматизация для e-commerce и SaaS». Светлая mono-тема, палитра `agentos.*`; сразу под hero — блок ИИ-услуг (видео, карточки, автоворонки). |
| `/audit` | `app/audit/page.tsx` | Лид-магнит: «Бесплатный UX-аудит за 15 минут» с формой (`components/audit/audit-form.tsx` → POST `/api/lead` с `source: 'audit'`). |
| `/web` | `app/web/page.tsx` | Направление Web. Контент целиком из `content/web/*.json`. |
| `/mono` | `app/mono/page.tsx` | Направление E-commerce (карточки WB/Ozon). |
| `/wbdesign` | `app/wbdesign/page.tsx` | Алиас-редирект на `/mono` (переиспользует его компонент). |
| `/brand` | `app/brand/page.tsx` | Направление Brand (логотип, стиль, гайдлайны, упаковка). |
| `/about` | `app/about/page.tsx` | «Обо мне»: принципы работы, инструменты. |
| `/contact` | `app/contact/page.tsx` | Контакты, кнопка в Telegram `@ortamy`. |
| `/privacy` | `app/privacy/page.tsx` | Политика конфиденциальности из `data/policy.json`. |
| `/design` | `app/design/page.tsx` | **Отдельное портфолио UX/UI-дизайнера** (своя оболочка, light/dark, свой CSS). |
| `/design/work/[slug]` | `app/design/work/[slug]/page.tsx` | Страница кейса портфолио, SSG из `DESIGN_CASES`. |
| `/agents` | `app/agents/page.tsx` | Услуга «AI-агенты»: метрики, 6 типов агентов, кейсы, 5 шагов внедрения, тарифы, FAQ, тизер стека и форма (`AgentContactForm` → POST `/api/lead/`). |
| `/agents/work/[slug]` | `app/agents/work/[slug]/page.tsx` | Кейс агента, SSG из `AGENT_CASES` (`data/agent-cases.ts`): архитектура, экраны и блоки «Стек и интеграции» и «Архитектура агента». |
| `/stack` | `app/stack/page.tsx` | Справочник по стеку сборки агентов: 4 группы инструментов из `data/stack.ts`, принципы, «ситуация → минимальный стек», что это даёт бизнесу. |
| `/404` | `app/not-found.tsx` | Страница «не найдено». |
| `/robots.txt` | `app/robots.ts` | Генерируется. |
| `/sitemap.xml` | `app/sitemap.ts` | Генерируется. |
| `/api/lead` | `app/api/lead/route.ts` | Приём лидов лендинга. |
| `/api/design-lead` | `app/api/design-lead/route.ts` | Приём заявок портфолио. |
| `/api/og` | `app/api/og/route.tsx` | Динамическая OG-картинка. |

✅ **Актуально:** пункт `{ label: 'Аудит', href: '/audit' }` вернулся в `lib/nav.ts`
вместе с реальной страницей `app/audit` (Фаза 3 — техдолг и переориентация
главной). До этого страницы не было, ссылка вела на 404 и её убирали (Фаза 0).
`data/site.json` перестал быть вторым источником навигации: его блок `nav`
удалён (файл и так не читался ни одним модулем). Единственный источник
навигации — `lib/nav.ts`. `/design` по-прежнему вне навигации (страницу
отправляют по прямой ссылке клиенту).

✅ **Актуально (коммит `feat(stack)`):** добавлены услуга `/agents` с 5 кейсами
(`/agents/work/*`) и справочник `/stack`; пункты «AI-агенты» и «Стек» есть
в `lib/nav.ts`, URL `/agents/` и `/stack/` — в `app/sitemap.ts` (состав карты
менялся позже: кейсы и хаб `/design` добавлены 10.10.2026 — см. раздел 11).

---

## 4. Архитектура и ключевые решения

### 4.1 Два независимых подпроекта

- **Сайт** компилируется корневым `tsconfig.json` (в `exclude` лежит `wbgen`,
  чтобы движок генератора не ломал typecheck сайта).
- **wbgen** компилируется/запускается своим `wbgen/tsconfig.json` через `tsx`.
- Между ними нет импортов.

### 4.2 Контент отделён от кода

- **`content/`** — контент, который правится без разработчика (страница `/web`).
- **`data/`** — конфигурация сайта (навигация, форма, аналитика, политика, кейсы).
- Загрузчики `loadJSON()` / `loadDataJSON()` читают файлы с диска в рантайме
  (`fs.readFileSync`), поэтому серверные страницы должны быть динамическими,
  чтобы правки JSON подхватывались без пересборки (в истории использовали
  `force-dynamic`/`revalidate = 0`).
- **Правило:** цены, пакеты, FAQ, кейсы, шаги процесса НЕ хардкодятся в
  компонентах — только в JSON.

### 4.3 Приём лидов (самое чувствительное место)

- Формы клиентские (`'use client'`), но **секреты живут только на сервере**.
- `POST /api/lead/` (runtime `nodejs`):
  - zod-валидация (`safeParse`, чтобы ошибки пользователя не превращались в 500);
  - мягкий rate-limit: **один IP — не более 5 заявок за 10 минут** (in-memory `Map`);
  - **экранирование HTML** перед подстановкой в Telegram `parse_mode: 'HTML'`;
  - пишет в Supabase таблицу `landing_leads` **и** шлёт в Telegram;
  - в БД пишет `source` (`landing` | `audit`) и `calculated_savings`: для
    заявок с `/audit` экономия маркетплейса не считается и пишется `NULL`;
  - **Telegram — основной канал**: если он падает → 502; падение Supabase —
    только `console.error`, пользователю не мешает;
  - экономия считается через `lib/turnover.ts` (`savingsForBand`).
- `POST /api/design-lead/`: отдельная схема (name/contact/task/budget), только
  Telegram (своей таблицы под портфолио пока нет).
- ⚠️ **Слэш в конце URL обязателен** (`/api/lead/`): из-за `trailingSlash: true`
  без него будет 308-редирект, который теряет тело POST и превращается в 405.
- ⚠️ Rate-limit хранится **в памяти процесса** — на serverless (Vercel) он
  нестабилен между инстансами; для продакшена понадобится внешний стор (Redis и т.п.).

### 4.4 Тёмная и светлая темы

- **`app/globals.css`** — тёмная тема (`--bg:#09090b`) для главной и обычных
  страниц. Шрифты Inter + DM Mono подключены через Google Fonts `@import`.
  Много ручных CSS-классов (`.hero`, `.page-hero`, `.liquid-orb`, `.mini-card`,
  `.contact-grid`, `.site-footer` и т.д.) — там, где не используется Tailwind.
- **Светлый лендинг главной** (`components/shop/*`) использует Tailwind-палитру
  `agentos.*` из `tailwind.config.ts`: `bg #FAFAFA`, `card #FFFFFF`,
  `line #E5E5E5`, `ink #0A0A0A`, `muted #737373`, `faint #A3A3A3`,
  `soft #F5F5F5`, `graphite #404040`, плюс семантические `up #16A34A` /
  `down #DC2626` (только для дельт метрик). Радиусы: `agentos` 10px, `control` 6px.
- **Портфолио `/design`** имеет собственный scope: `app/design/design.css` +
  `DesignShell` с атрибутом `data-theme` (`light`/`dark`) и переключением через
  `useSyncExternalStore` (без hydration mismatch; SSR всегда отдаёт `light`,
  сохранённое значение применяется на клиенте; слушается `storage`-событие).

### 4.5 SEO / метаданные

- `lib/site.ts`: `siteUrl` (из `NEXT_PUBLIC_SITE_URL`, дефолт
  `https://ortamy.github.io/mono`), `basePath`, `pageUrl()`, `assetUrl()`.
- **Иконка сайта — файл `app/icon.svg`**, а не поле `icons` в метаданных: Next сам
  печатает `<link rel="icon">` с учётом `basePath` и хешем для сброса кэша.
  Собранный вручную `assetUrl('/favicon.svg')` давал абсолютный URL из `siteUrl`,
  поэтому на локальном сервере, в превью и на любом хостинге, кроме указанного в
  `NEXT_PUBLIC_SITE_URL`, иконка не грузилась. `public/favicon.svg` оставлен как
  отдельный файл — на прямые ссылки вида `/favicon.svg` смотрят закладки и боты.
- `lib/meta.ts`: `buildMetadata({title, description, path})` — единый builder
  canonical + OpenGraph + Twitter с абсолютными URL. `metadataBase` задаётся
  в корневом layout.
- `app/api/og/route.tsx` — динамическая OG-картинка 1200×630 (satori,
  `runtime = 'nodejs'`; шрифт не подключается файлом — системный sans).
- `app/sitemap.ts`, `app/robots.ts` — генерируются от `siteUrl`. С 10.10.2026 в
  карте и хаб `/design` (priority 0.8), и все кейсы `/agents/work/*` +
  `/design/work/*` (priority 0.6; списки берутся из `AGENT_CASES` и
  `DESIGN_CASES`). В навигации `/design` нет, но страница публична: доступ по
  прямой ссылке для клиентов, индексация разрешена — см. §11 п.4–5.
  `/agentos` и `/api/` закрыты в robots.
- В корневом layout — разметка Schema.org (`Service`, цена 150k–700k ₽)
  с экранированием `<` при сериализации.

### 4.6 Аналитика

- Два независимых механизма:
  - **Яндекс.Метрика** (`lib/metrika.ts`) — скрипт в layout подключается только
    если задан `NEXT_PUBLIC_METRIKA_ID`; цели-константы: `lead_submit`,
    `cta_click`, `calculator_used` (`GOALS`), отправка через `trackGoal()`
    (ошибки глушатся, аналитика не ломает UI).
  - **dataLayer-события** (`lib/analytics.ts`, `lib/track.ts`) — включаются
    флагом `enabled` в `data/analytics.json` (`events`: `cta_click`,
    `direction_click`, `case_open`, `form_submit`).
- События эмитятся из компонентов: `package_view`, `calc_run`, `faq_open`,
  `form_submit` и др.


---

## 5. API-роуты и контракты данных

### `POST /api/lead/`

Приём заявки с лендинга (`components/shop/lead-form.tsx`).

**Тело (JSON):** проверяется zod-схемой (`safeParse`).
Ожидаемые поля: имя, контакт (Telegram/телефон), диапазон оборота (`turnover`),
цель по выручке, ссылка на сайт, флаг согласия.
- `turnover` валидируется против списка диапазонов из `lib/turnover.ts`.
- Экономия считается через `savingsForBand(band)`.

**Ответы:**
- `200` — заявка принята (ушла в Telegram, попытка записи в Supabase).
- `400` — ошибка валидации (некорректные поля).
- `429` — превышен rate-limit (>5 заявок / 10 мин с одного IP).
- `502` — Telegram недоступен (основной канал).

**Побочные эффекты:** запись в `landing_leads` (Supabase) + сообщение в Telegram
(`parse_mode: 'HTML'`, значения экранированы).

### `POST /api/design-lead/`

Приём заявки с портфолио (`components/design/design-contact-form.tsx`).
Схема отдельная: имя, контакт, тип задачи, бюджет, комментарий. Только Telegram.

### `GET /api/og`

Динамическая OG-картинка (satori). Принимает параметры (например `title`),
возвращает `image/png` 1200×630. Используется как `og:image` в `buildMetadata`.

---

## 6. Слой данных и контента

### 6.1 Бэкенд — Supabase

- DDL: `supabase/landing_leads.sql` (выполнить один раз в SQL Editor проекта);
  инкрементальные изменения — `supabase/migrations/*.sql` по номеру.
- Таблица **`landing_leads`**: заявки главной и `/audit` (имя, контакт, оборот,
  продукт, `source`, `calculated_savings`, статус, created_at). Воронки
  разделяются колонкой **`source`** (`landing` | `audit`) —
  `supabase/migrations/001_add_source.sql`.
- ⚠️ **Порядок деплоя:** сначала миграция, потом код — `/api/lead` пишет `source`
  в каждой заявке, и без колонки вставка в Supabase падает (заявка всё равно
  уходит в Telegram, но в БД не попадает: в логах `[lead] supabase insert failed`).
- Клиент создаётся на сервере с `SUPABASE_SERVICE_KEY` (**service_role**,
  обходит RLS) — ключ НИКОГДА не попадает в клиент.
- Падение записи в БД не влияет на ответ пользователю (логируется).

### 6.2 `data/` — конфигурация сайта

| Файл | Назначение |
|---|---|
| `data/site.json` | Конфиг сайта: мета, контакты (Telegram `@ortamy`), hero, ИИ-услуги (`ai_services`), метрики, направления, CTA. ⚠️ Нигде не читается — «мёртвый» файл; блок `nav` удалён, навигация живёт в `lib/nav.ts`. |
| `data/form.json` | Провайдер формы: `telegram` \| `web3forms` \| `off`. |
| `data/analytics.json` | `enabled`, `ga_id`, список событий. |
| `data/policy.json` | Текст политики конфиденциальности (оператор, данные, цели, сроки, права). |
| `data/cases.json` | Кейсы e-commerce (на текущий момент — концепты, без фейковых метрик). |
| `data/design-cases.ts` | **10 кейсов портфолио `/design`** (типизированный TS, не JSON). |
| `data/agent-cases.ts` | **Кейсы AI-агентов `/agents`** (TS, не JSON): архитектура, экраны и группы стека `StackCategory[]`; страницы кейсов — SSG. |
| `data/stack.ts` | **Единый источник стека сборки агентов** (`STACK_GROUPS`: Оркестрация, LLM, RAG / Векторы, Наблюдаемость). Читают тизер на `/agents` (`AgentStackTeaser`) и страница `/stack`; имя инструмента = ключ марки в `components/agents/agent-stack-logos.tsx`. |

Типы для JSON — в `lib/data-types.ts`; загрузка — `loadDataJSON()` из `lib/content.ts`.

### 6.3 `content/web/` — контент страницы `/web`

| Файл | Назначение |
|---|---|
| `web_pricing.json` | Позиционирование, квалификация (кому подходит/не подходит), пакеты, «цена-драйверы». |
| `web_faq.json` | FAQ, массив `{q, a}`. |
| `web_guarantees.json` | Гарантии, `{title, text}`. |
| `web_cases.json` | Кейсы с метриками (изначально `[]` — наполнять по мере появления). |
| `web_calculator.json` | Поля ROI-калькулятора, шаблон результата, дисклеймер, `growth_price`. |
| `web_process.json` | Шаги процесса `{num, title, term, artifact}`. |

Типы — в `lib/web-types.ts`; загрузка — `loadJSON()` из `lib/content.ts`.

### 6.4 `data/design-cases.ts` — 10 кейсов портфолио

Каждый кейс: `slug`, `title`, `category`, метрики, палитра, список экранов
(`screens`) и ключ `preview`, который ведёт к мини-макету в
`components/design/previews/*`. Палитра монохромная (near-black / near-white)
у каждого кейса — различается только тон и контраст.

Слаги: `mono-store`, `versta-furniture`, `nordbank-business`,
`metrik-unit-economics`, `levin-dental`, `ukus-delivery`, `ferro-equipment`,
`alephy-platform`, `traq-observability`, `base-api-console`.

Ключи превью: `mono`, `lookbook`, `bank`, `dashboard`, `slots`, `map`,
`specsheet`, `alephy`, `traq`, `base` — у каждого кейса свой архетип первого
экрана (калькулятор, лукбук, стопка карт, app-shell, сетка слотов, карта
курьера, чертёж, редакционная типографика, терминал, docs API).

Тип `PreviewKey` расширяем аккуратно: новый кейс = запись в массиве +
компонент превью + строка в картах `PREVIEWS`/`DOMAINS`
(`components/design/case-screenshot.tsx`) и `CASE_ICONS`
(`components/design/case-icons.tsx`). Страница кейса генерируется статически
(`/design/work/[slug]`).

---

## 7. `wbgen/` — генератор карточек Wildberries

Отдельный офлайн-CLI. Назначение: из JSON-конфига ниши и товара собрать
**готовый комплект карточек** (SVG → PNG) с автоматическим контролем качества.

### Как устроено

- **Ниши** — `wbgen/content/niches/*.json`: палитра, типографика, «голос»
  (лимиты длин hook/bullet/badge), подписи. Новая ниша = один файл, код не правится.
- **Товары** — `wbgen/content/products/<ниша>/*.json`: обязателен `niche` и
  ровно `SLIDE_ORDER.length` слайдов воронки (8), типы слайдов строго по порядку.
- **Валидация** (`wbgen/src/configs.ts`): проверяются hex-цвета палитры,
  положительные лимиты длин, наличие ниши товара, порядок и число слайдов
  (понятные русские сообщения об ошибках).
- **Движок** (`wbgen/src/`): `design`/`render`/`slides`/`typography` собирают
  SVG, `@resvg/resvg-js` рендерит PNG, `opentype.js` меряет текст, `qa`
  проверяет результат, `preview` и `cli` — точка входа.
- **Вывод** — `wbgen/output/<ниша>/<товар>/` (коммитится, чтобы можно было
  смотреть результат без локального запуска).

### Команды

Точный синтаксис — в `wbgen/README.md` и `wbgen/src/cli.ts`. Запуск движка —
через `tsx` из папки `wbgen` (свой `tsconfig.json`).

⚠️ `wbgen` **исключён** из корневого `tsconfig.json`, чтобы движок не ломал
typecheck сайта. Не добавляйте импорты между `wbgen` и сайтом.

---

## 8. Переменные окружения

Шаблон — `.env.example`; локальный (не в git) — `.env.local`.

| Переменная | Назначение |
|---|---|
| `SUPABASE_URL` | URL проекта Supabase (Project Settings → Data API). |
| `SUPABASE_SERVICE_KEY` | **service_role** ключ (обходит RLS). НЕ anon. Только сервер. |
| `TELEGRAM_BOT_TOKEN` | Токен бота от `@BotFather`. |
| `TELEGRAM_CHAT_ID` | chat_id получателя (узнать через `getUpdates`). |
| `NEXT_PUBLIC_SITE_URL` | Публичный корень сайта **вместе с подкаталогом деплоя** (дефолт `https://ortamy.github.io/mono`). В CI приходит из `configure-pages` (`base_url`). |
| `NEXT_PUBLIC_BASE_PATH` | Подкаталог для маршрутизации Next (`/mono`); в CI — из `configure-pages` (`base_path`). В метаданные **не** подмешивается: подкаталог должен быть внутри `NEXT_PUBLIC_SITE_URL`, иначе в canonical/OG получается `/mono/mono/...`. |
| `NEXT_PUBLIC_OG_IMAGE` | Путь OG-картинки для статического экспорта (`/og.png`). Ставит `scripts/build-static.mjs`; в серверной сборке не нужен — там картинку отдаёт роут `/api/og`. |
| `NEXT_PUBLIC_METRIKA_ID` | ID Яндекс.Метрики (если пусто — счётчик не подключается). |

⚠️ Next.js читает env **на старте** — после правки `.env.local` перезапустите
`npm run dev`.

---

## 9. Сборка и деплой

### Скрипты (`package.json`)

| Скрипт | Что делает |
|---|---|
| `npm run dev` | `next dev` — дев-сервер. |
| `npm run build` | `next build` — прод-сборка (серверный режим, НЕ static export). |
| `npm run build:static` | `node scripts/build-static.mjs` — статический экспорт в `./out`; его публикует GitHub Pages. |
| `npm start` | `next start` — запуск прод-сборки (нужен Node-рантайм). |
| `npm run lint` | `set ESLINT_USE_FLAT_CONFIG=true && eslint .` (flat-config). |
| `npm run typecheck` | `tsc --noEmit` — проверка типов сайта. |
| `npm run test` | `tsx tests/api-lead.test.mts` — интеграционный тест `/api/lead`. |
| `npm run wbgen` | `tsx wbgen/src/cli.ts` — генератор карточек (см. раздел 7). |
| `npm run wbgen:render` | `tsx wbgen/src/cli.ts render --all` — рендер всех карточек. |
| `npm run wbgen:typecheck` | `tsc -p wbgen/tsconfig.json` — типы генератора. |

### `next.config.mjs`

- `output: 'export'` включается **только** флагом `STATIC_EXPORT=true` — его ставит
  `scripts/build-static.mjs`, из которого собирается GitHub Pages. Обычный
  `npm run build` остаётся серверным: `app/api/lead` держит секреты Supabase и
  Telegram и требует Node-рантайма. Подробности — в «CI/CD и деплой» ниже.
- `reactStrictMode: true`.
- `trailingSlash: true` — все URL со слэшем (важно для API-вызовов: см. 4.3).
- `images: { unoptimized: true, remotePatterns: [images.unsplash.com] }` —
  превью кейсов `/design` используют фото с Unsplash, хост разрешён.
- `basePath` / `assetPrefix` — из `NEXT_PUBLIC_BASE_PATH` для публикации в
  подкаталоге (на Pages это `/mono`). Отвечают только за маршрутизацию и ассеты;
  абсолютные URL в метаданных собирает `lib/site.ts` из `NEXT_PUBLIC_SITE_URL`.
- В статическом экспорте POST-роуты `app/api/*` Next помечает как Dynamic и не
  выкладывает — выносить каталог не нужно, сборка не падает.

### CI/CD и деплой

- **GitHub Pages — рабочий деплой.** `.github/workflows/deploy.yml` на каждый пуш
  в `main` (кроме правок только `.md`) делает: `npm ci` → `configure-pages`
  (`base_url` → `NEXT_PUBLIC_SITE_URL`, `base_path` → `NEXT_PUBLIC_BASE_PATH`) →
  `npm run build:static` → `upload-pages-artifact ./out` → `deploy-pages`.
  Сайт: https://ortamy.github.io/mono/ (репозиторий `ortamy/mono`, источник Pages —
  GitHub Actions).
- Особенности статического экспорта:
  - серверных роутов нет: `POST /api/lead` и `/api/design-lead` не выкладываются.
    Формы показывают запасную ссылку «Написать в Telegram», лиды в Supabase и
    Telegram **не уходят**;
  - метаданные-роуты (`app/robots.ts`, `app/sitemap.ts`, `app/api/og/route.tsx`)
    помечены `export const dynamic = 'force-static'`: без этого `next build` с
    `output: 'export'` падает на «Collecting page data», а в серверной сборке это
    no-op — роуты и так статические;
  - роут `/api/og` экспортируется файлом без расширения, поэтому
    `scripts/build-static.mjs` перекладывает его в `out/og.png`, а в метаданные
    подставляется `NEXT_PUBLIC_OG_IMAGE=/og.png`.
  - `/agents`, `/agents/work/*` и `/stack` — обычные статические страницы (SSG):
    в экспорт попадают как есть, серверных зависимостей у них нет.
- **Для продакшена с приёмом заявок** нужен хостинг с Node-рантаймом (**Vercel /
  Render / Railway / Fly.io**): там собирается обычный `npm run build`, работает
  `/api/lead`, а env из `.env.example` (Supabase + Telegram) не попадают в
  клиентский бандл. SQL для таблицы лидов — `supabase/landing_leads.sql` плюс миграции в `supabase/migrations/`.

---

## 10. Соглашения и правила разработки

- **Язык интерфейса и комментариев — русский.** Все тексты для пользователя,
  комментарии в коде и сообщения об ошибках пишутся по-русски.
- **Комментарии объясняют «почему»**, а не «что». В коде много развёрнутых
  комментариев-обоснований (зачем убран тот или иной подход) — это сознательный
  стиль проекта, его стоит поддерживать.
- **Данные — в JSON/`data/`, не в компонентах.** Любые цены/тексты/FAQ/кейсы
  редактируются контент-менеджером без разработчика.
- **Секреты — только на сервере.** Ключи Supabase/Telegram используются
  исключительно в `app/api/*` (server). Никогда не префиксить их `NEXT_PUBLIC_`.
- **Метаданные — через `buildMetadata()`** (`lib/meta.ts`), не собирать
  вручную в каждой странице.
- **Стили:** Tailwind для главной/shop-компонентов (палитра `agentos.*`),
  глобальный CSS (`globals.css`) для тёмных страниц, отдельный
  `design.css` (scope `data-theme`) только для `/design`. Не смешивать scope-ы.
- **Классы** объединяются через `cn()` (`lib/utils.ts`, clsx + tailwind-merge).
- **Формы**: клиентский компонент → `fetch('/api/...')` **со слэшем в конце**.
- **Структура веток/git:** основная ветка `main`; история — коммитами вида
  `feat(scope): ...`. Последние: `38984cf` (фаза 4 — единое позиционирование),
  `e03aee5` (раздел AI-агентов), `feat(stack): страница /stack + тизер на
  /agents, единый источник data/stack.ts` (см. `git log --oneline -3`).

### Золотые правила

- ⚠️ **Никогда не запускать `npm run build` при работающем `next start` / `next dev`.**
  Порядок: стоп → `Remove-Item -Recurse -Force .next` → `build` → старт. Инцидент
  2026-10-09: зомби-сервер отдавал HTML со ссылкой на уже удалённый CSS-чанк —
  страница теряла стили.
- ⚠️ **Все правки делать CRLF-safe.** В репозитории файлы с `\r\n`; многострочные
  замены выполнять скриптом с нормализацией `\r\n` (иначе `replace` молча не
  срабатывает и правка не применяется). Редактор, который ищет текст по `\n`,
  многострочную замену в таких файлах не находит.

---

## 11. Известные пробелы, риски и TODO

**Перед запуском трафика:**

1. **Кастомный домен не подключён.** Сайт живёт на `https://ortamy.github.io/mono/`
   (Pages, подкаталог `basePath`). Для трафика нужен свой домен:
   `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_BASE_PATH`, далее DNS/CNAME на Pages
   либо переезд на хостинг с Node-рантаймом (тогда заявки снова идут в Supabase).
2. **Playwright не в зависимостях.** Вёрстка проверялась Playwright из кэша —
   в `package.json` его нет ни в `dependencies`, ни в `devDependencies`. Нужен
   `npm i -D playwright` (+ `npx playwright install chromium`), иначе проверки
   не воспроизводятся с чистой машины.
3. **Кейс «Nexus AI» не собран.** В `AGENT_CASES` (`data/agent-cases.ts`) сейчас
   5 кейсов (`support-furniture`, `sales-agent-b2b`, `wb-content-agent`,
   `marketplace-analyst`, `competitive-research`) — «Nexus AI» среди них нет.
   Добавление = запись в массив + папка `app/agents/work/<slug>/`.

**Прочее (известные ограничения):**

4. **`/design` нет в навигации, но он публичен с 10.10.2026.** URL есть в
   `app/sitemap.ts` (priority 0.8) и в `alternates.canonical` самой страницы,
   запрета индексации нет. В навигацию страницу не добавляем: клиентам уходит
   прямая ссылка, а для поиска достаточно карты сайта.
5. **Кейсы в sitemap с 10.10.2026.** `/agents/work/*` и `/design/work/*` включены
   в карту (priority 0.6, списки берутся из `AGENT_CASES` и `DESIGN_CASES`).
   У кейсов дизайна с той же даты есть canonical через
   `buildMetadata({ path: '/design/work/<slug>' })` — как у кейсов агентов.
   Кейсы идут в карте после верхнеуровневых страниц: это отдельные проекты,
   а не точки входа.
6. **Rate-limit `/api/lead` — in-memory** → на serverless нестабилен.
   Для прод-нагрузки нужен внешний стор.
7. **`web_cases.json` стартово пуст** — кейсы страницы `/web` ещё не наполнены.
8. **`data/cases.json`** — концепты без реальных метрик (сознательно, чтобы не
   публиковать неподтверждённые цифры; см. комментарий в `components/shop/cases.tsx`).
9. **Supabase-таблица одна на две воронки** (`landing_leads`): заявки с
   главной и с `/audit` различаются колонкой `source` (см. 6.1); заявки с
   `/design` в БД не сохраняются (только Telegram).
10. **`seo.og_image` в `data/site.json`** (`/og.svg`) не используется и такого
    файла нет: OG-картинку отдаёт `/api/og` (сервер) или `/og.png` (статический
    экспорт, см. `lib/meta.ts`). Либо удалить поле, либо связать с `OG_IMAGE`.
11. **OG-картинка в статике рендерится на этапе сборки** (satori). Если раннер не
    достанет шрифт для кириллицы, картинка отрисуется системным фолбэком, а в
    логах будет `Failed to download dynamic font` — сборка при этом проходит.

> Ранее закрыто: `/audit` (страница + пункт в навигации), дубль навигации в
> `data/site.json`, деплой на GitHub Pages, `*.log` в `.gitignore`.

---

## 12. Текущее состояние git

- Ветка: `main`. Коммиты деплоя: `266407b` («fix(nav): убрать пункт «Аудит»») и
  `e153134` («ci(pages): публикация статического экспорта на GitHub Pages»);
  оба запушены, прогон «Deploy to GitHub Pages» зелёный. Последний коммит —
  `2f722f8` («feat(design): фаза 2 — кейсы на данных, общие рендеры без хардкода»).
- **Фаза 3 закоммичена** (`feat: фаза 3 — аудит-лид-магнит, локальный favicon,
  обновление hero (продуктовый дизайн + ИИ)`): `app/audit/**`,
  `components/audit/**`, `app/icon.svg`, правки `app/page.tsx`, `app/layout.tsx`,
  `app/api/lead/route.ts`, `app/sitemap.ts`, `components/shop/shop-header.tsx`,
  `components/shop/shop-footer.tsx`, `lib/meta.ts`, `lib/nav.ts`, `data/site.json`,
  `tests/api-lead.test.mts`, `HANDOFF.md` и миграция БД
  `supabase/migrations/001_add_source.sql` (колонка `source` в `landing_leads`).
- ⚠️ **Этот коммит ещё не запушен** (`git push origin main` вручную). Перед первым
  деплоем Фазы 3 примените `supabase/migrations/001_add_source.sql` — иначе
  заявки перестанут доходить до Supabase (Telegram продолжит работать).
- ⚠️ Если правите что-то новое, сверяйтесь с `git status --short` и `git diff`,
  чтобы не смешать незавершённую задачу с готовой.
- ⚠️ **10.10.2026 — `origin/main` переписан.** Ранее на remote лежал `3fb07d6`:
  та же работа «раздел AI-агентов», но с `agents-case.png`, `agents-full.png`
  и `start-server.cmd` — локально эти файлы убрали правкой того же коммита,
  поэтому хеши разошлись. Пуш сделан через `git push --force-with-lease`
  (lease на `3fb07d6`), теперь `origin/main == 99ba586` (`feat(stack)`).
  Если работаете из другого клона — сначала `git fetch && git reset --hard
  origin/main`, иначе git будет требовать merge/rebase.

---

## 13. Быстрый старт (шпаргалка)

```bash
# 1. Установка зависимостей
npm install

# 2. Скопировать env и заполнить значения
copy .env.example .env.local     # Windows (в PowerShell)
# затем вписать SUPABASE_URL, SUPABASE_SERVICE_KEY,
# TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NEXT_PUBLIC_METRIKA_ID

# 3. Выполнить SQL в Supabase: supabase/landing_leads.sql (один раз),
#    затем миграции supabase/migrations/*.sql по номеру

# 4. Дев-сервер
npm run dev                       # http://localhost:3000

# Проверки
npm run lint
npm run typecheck
npm run test                      # тест /api/lead

# Генератор карточек WB
npm run wbgen:render              # отрендерить все карточки в wbgen/output/
npm run wbgen:typecheck
```

**Важно помнить при правках:**

- после изменения `.env.local` — перезапустить `npm run dev`;
- вызовы форм — на `/api/lead/` **со слэшем**;
- `wbgen` — изолированный инструмент, у него свой `tsconfig` и свои команды;
- и API-роуты, и Яндекс.Метрика требуют **server-рантайма** — на чистой статике
  они не работают.
