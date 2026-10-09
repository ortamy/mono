-- Миграция 001: колонка source в landing_leads (Фаза 3 — аудит-лид-магнит).
--
-- Заявки с главной и со страницы /audit пишут в одну таблицу (landing_leads),
-- поэтому без колонки их не разделить в дашборде. Скрипт идемпотентный:
-- повторный запуск безопасен, а на свежей базе (полный DDL уже применён) он
-- не ломает ничего.
--
-- Порядок применения: сначала эта миграция, потом деплой Фазы 3 — роут
-- /api/lead пишет source в каждой заявке, и без колонки вставка в Supabase
-- падает: заявка уходит в Telegram, но в БД не попадает.

ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'landing';
CREATE INDEX IF NOT EXISTS idx_landing_leads_source ON public.landing_leads(source);
