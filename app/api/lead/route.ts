import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { savingsForBand, turnoverLabel } from '@/lib/turnover';

/**
 * Приём лидов с лендинга.
 *
 * Токен Telegram бота и ключ Supabase читаются из окружения сервера и никогда не
 * попадают в клиентский бандл — в отличие от NEXT_PUBLIC_* переменных, которые
 * Next.js инлайнит в JavaScript и любой посетитель может посмотреть в исходниках.
 */

export const runtime = 'nodejs';

// Telegram отклоняет весь запрос, если разметка не сойдётся, поэтому
// пользовательский ввод экранируется до подстановки в parse_mode: 'HTML'.
// Без этого имя вида "<b>" ломает сообщение, а больше — позволяет разметить
// произвольную ссылку в уведомлении.
const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const schema = z.object({
  name: z.string().trim().min(2, 'Укажите имя').max(255),
  phone: z.string().trim().min(10, 'Укажите телефон').max(50),
  email: z.union([z.email('Некорректный email'), z.literal('')]).optional().default(''),
  telegram: z.string().trim().max(100).optional().default(''),
  turnover: z.string().trim().min(1, 'Выберите оборот'),
  marketplaces: z.array(z.string().trim().max(50)).max(10).optional().default([]),
  product: z.string().trim().max(1000).optional().default(''),
});

/** Мягкое ограничение частоты: один IP — не чаще 5 заявок в 10 минут. */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  // Периодически подчищаем протухшие записи, чтобы карта не росла бесконечно.
  // forEach вместо for...of: проект компилируется под ES5, где обход Map
  // итератором требует downlevelIteration и не собирается.
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      const fresh = times.some((t) => now - t < RATE_LIMIT.windowMs);
      if (!fresh) hits.delete(key);
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

async function saveToSupabase(row: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return { ok: false, error: 'SUPABASE_URL / SUPABASE_SERVICE_KEY не заданы' };

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase.from('landing_leads').insert(row);
    if (error) return { ok: false, error: error.message };
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

  // safeParse, а не parse: parse бросает исключение и превращает обычную
  // ошибку пользователя в 500 с деталями реализации в логах.
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? 'Проверьте поля формы' },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const savings = savingsForBand(data.turnover);

  const [supabase, telegram] = await Promise.all([
    saveToSupabase({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      telegram: data.telegram || null,
      turnover: data.turnover,
      marketplaces: data.marketplaces,
      product: data.product || null,
      calculated_savings: savings,
    }),
    sendToTelegram(
      [
        '<b>🔥 Новая заявка с лендинга mono</b>',
        '',
        `Имя: ${escapeHtml(data.name)}`,
        `Телефон: ${escapeHtml(data.phone)}`,
        `Telegram: ${data.telegram ? escapeHtml(data.telegram) : '—'}`,
        `Email: ${data.email ? escapeHtml(data.email) : '—'}`,
        `Оборот: ${escapeHtml(turnoverLabel(data.turnover))}`,
        `Маркетплейсы: ${data.marketplaces.length ? escapeHtml(data.marketplaces.join(', ')) : '—'}`,
        `Товар: ${data.product ? escapeHtml(data.product) : '—'}`,
        '',
        `💰 Потенциальная экономия: ~${savings.toLocaleString('ru-RU')} ₽/год`,
      ].join('\n'),
    ),
  ]);

  // Telegram — основной канал: без него заявку никто не увидит. Supabase
  // держим как дубль, поэтому его падение не должно отказывать пользователю.
  if (!telegram.ok) {
    console.error('[lead] telegram failed:', telegram.error, { supabase: supabase.error });
    return NextResponse.json({ ok: false, error: 'Не удалось отправить заявку' }, { status: 502 });
  }
  if (!supabase.ok) console.error('[lead] supabase insert failed:', supabase.error);

  return NextResponse.json({ ok: true });
}