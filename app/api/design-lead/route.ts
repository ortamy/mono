import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

/**
 * Приём заявок с портфолио (/design).
 *
 * Отдельный роут, а не /api/lead: та форма собирает данные лендинга
 * (оборот, маркетплейсы), их здесь нет — а смешивать схемы значит
 * либо врать в БД, либо ломать валидацию основной формы.
 *
 * Токен Telegram читается только на сервере и не попадает в бандл.
 * Supabase здесь не используется: таблица landing_leads имеет колонки
 * лендинга (turnover, marketplaces), под портфолио нужна своя — она
 * добавляется отдельно, а пока Telegram остаётся основным каналом.
 */

export const runtime = 'nodejs';

// Telegram отклоняет весь запрос, если разметка не сойдётся, поэтому
// пользовательский ввод экранируется до подстановки в parse_mode: 'HTML'.
const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const schema = z.object({
  name: z.string().trim().min(2, 'Укажите имя').max(255),
  contact: z.string().trim().min(2, 'Укажите контакт').max(255),
  task: z.string().trim().max(2000).optional().default(''),
  budget: z.string().trim().max(100).optional().default(''),
});

/** Мягкое ограничение частоты: один IP — не чаще 5 заявок в 10 минут. */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  // forEach, а не for...of: проект компилируется под ES5, где обход Map
  // итератором требует downlevelIteration.
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      const fresh = times.filter((t) => now - t < RATE_LIMIT.windowMs);
      if (fresh.length) hits.set(key, fresh);
      else hits.delete(key);
    });
  }
  return recent.length > RATE_LIMIT.max;
}

function ipOf(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

async function sendToTelegram(text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, error: 'TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы' };

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    if (!response.ok) return { ok: false, error: `Telegram ${response.status}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'сетевая ошибка' };
  }
}

export async function POST(req: NextRequest) {
  const ip = ipOf(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Слишком много заявок. Попробуйте позже.' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный JSON' }, { status: 400 });
  }

  // safeParse, а не parse: parse бросает исключение и превращает ошибку
  // пользователя в 500 с деталями реализации в логах.
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? 'Проверьте поля формы' },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const telegram = await sendToTelegram(
    [
      '<b>🎨 Заявка с портфолио /design</b>',
      '',
      `Имя: ${escapeHtml(data.name)}`,
      `Контакт: ${escapeHtml(data.contact)}`,
      `Бюджет: ${data.budget ? escapeHtml(data.budget) : '—'}`,
      `Задача: ${data.task ? escapeHtml(data.task) : '—'}`,
    ].join('\n'),
  );

  if (!telegram.ok) {
    console.error('[design-lead] telegram failed:', telegram.error);
    return NextResponse.json({ ok: false, error: 'Не удалось отправить заявку' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}