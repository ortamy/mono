-- Таблица лидов с лендинга mono. Выполнить один раз в Supabase SQL Editor.
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
  calculated_savings INT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

alter table public.landing_leads enable row level security;

-- Индексы под типовые запросы в дашборде: свежие лиды и фильтр по статусу.
create index if not exists landing_leads_created_at_idx
  on public.landing_leads (created_at desc);
create index if not exists landing_leads_status_idx
  on public.landing_leads (status);

-- created_at защищён от подделки на уровне БД: сервер может забыть поле,
-- а клиент подставить 1970 год и испортить всю воронку.
alter table public.landing_leads
  alter column created_at set default now();