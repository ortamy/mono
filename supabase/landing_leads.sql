-- Таблица лидов mono: заявки с главной и со страницы /audit (колонка source).
-- Выполнить один раз в Supabase SQL Editor; точечные правки — в supabase/migrations/.
--
-- RLS включаем: сервер ходит с service_role, который RLS обходит, поэтому
-- запись продолжит работать. Если таблицу читать из браузера не планируется,
-- политик для anon не нужно — таблица останется недоступной снаружи.

create table if not exists public.landing_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  telegram VARCHAR(100),
  turnover VARCHAR(50),
  marketplaces JSONB,
  product TEXT,
  -- Экономия маркетплейса для заявок с главной. Для /audit — NULL: площадок у
  -- такой заявки нет, и число в колонке только портило бы аналитику.
  calculated_savings INT,
  -- Источник заявки: 'landing' (главная) или 'audit' (/audit). Обе воронки
  -- пишут в одну таблицу, поэтому без колонки их не разделить в дашборде.
  source TEXT DEFAULT 'landing',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Колонка source появилась в Фазе 3 вместе с аудит-лид-магнитом. Конструкция
-- create table if not exists на уже созданной таблице ничего не делает, поэтому
-- колонка добавляется отдельным ALTER — идемпотентно и для свежей базы, и для
-- существующей. Тот же скрипт лежит отдельно: supabase/migrations/001_add_source.sql
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'landing';

alter table public.landing_leads enable row level security;

-- Индексы под типовые запросы в дашборде: свежие лиды и фильтр по статусу.
create index if not exists landing_leads_created_at_idx
  on public.landing_leads (created_at desc);
create index if not exists landing_leads_status_idx
  on public.landing_leads (status);

-- Фильтр «только заявки с /audit» в дашборде — выборка по source.
create index if not exists idx_landing_leads_source
  on public.landing_leads (source);

-- created_at защищён от подделки на уровне БД: сервер может забыть поле,
-- а клиент подставить 1970 год и испортить всю воронку.
alter table public.landing_leads
  alter column created_at set default now();