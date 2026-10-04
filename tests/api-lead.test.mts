// Интеграционная проверка app/api/lead/route.ts: импортирует настоящий роут и
// подменяет глобальный fetch, поэтому Telegram/Supabase не трогаются. Секреты
// в окружении — фиктивные; проверяется логика роута, а не сеть.
import { createServer } from 'node:http';

process.env.TELEGRAM_BOT_TOKEN = 'test123:FAKE';
process.env.TELEGRAM_CHAT_ID = '-100999';
process.env.SUPABASE_URL = 'https://fake.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'fake-key';

const captured = { telegram: [], supabase: [] };

const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes('api.telegram.org')) {
    const body = JSON.parse(init.body);
    captured.telegram.push(body);
    return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), { status: 200 });
  }
  if (url.includes('supabase')) {
    captured.supabase.push({ url, body: init.body });
    return new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  return realFetch(input, init);
};

const { POST } = await import('../app/api/lead/route.ts');

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/lead/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.1', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  }) as any;
}

let pass = 0;
let fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'ok   ' : 'FAIL ') + name + (extra ? '  ' + extra : ''));
  ok ? pass++ : fail++;
};

const VALID = {
  name: 'Иван', phone: '+79991234567', turnover: '1-3M',
  marketplaces: ['WB', 'Ozon'], product: 'Косметика',
};

// 1. Успешный путь
let res = await POST(req(VALID));
let json = await res.json();
check('valid lead -> 200 ok', res.status === 200 && json.ok === true, `status=${res.status}`);
check('telegram sent', captured.telegram.length === 1);
check('supabase sent', captured.supabase.length === 1);

const tg = captured.telegram[0];
const sb = JSON.parse(captured.supabase[0].body);
check('telegram chat_id', tg.chat_id === '-100999', String(tg.chat_id));
check('telegram has name/phone', tg.text.includes('Иван') && tg.text.includes('+79991234567'));
check('telegram marketplaces', tg.text.includes('WB, Ozon'));
check('telegram economics 1-3M = 2 400 000', tg.text.includes('2') && tg.text.includes('400') && tg.text.includes('000'));
check('supabase savings int', sb.calculated_savings === 2400000, String(sb.calculated_savings));
check('supabase row shape', sb.name === 'Иван' && sb.turnover === '1-3M' && Array.isArray(sb.marketplaces));

// 2. Все диапазоны оборота из формы дают верную экономию
const EXPECT: Record<string, number> = {
  '100-500k': 300000, '500k-1M': 900000, '1-3M': 2400000,
  '3-10M': 7800000, '10M+': 18000000,
};
for (const [turnover, savings] of Object.entries(EXPECT)) {
  const before = captured.supabase.length;
  await POST(req({ ...VALID, turnover }, { 'x-forwarded-for': '10.0.0.9' }));
  const row = JSON.parse(captured.supabase[before].body);
  check(`savings ${turnover}`, row.calculated_savings === savings, `${row.calculated_savings}`);
}

// 3. Экранирование HTML в parse_mode: 'HTML'
await POST(req({ ...VALID, name: '<b>hack</b>', product: '<i>x</i>' }, { 'x-forwarded-for': '10.0.0.8' }));
const escaped = captured.telegram[captured.telegram.length - 1].text;
check('html escaped in telegram', escaped.includes('&lt;b&gt;hack&lt;/b&gt;') && !escaped.includes('<b>hack'), '');

// 4. Валидация
const cases: Array<[string, unknown, number]> = [
  ['short name -> 400', { ...VALID, name: 'A' }, 400],
  ['missing name -> 400', { phone: '+79991234567', turnover: '1-3M' }, 400],
  ['short phone -> 400', { ...VALID, phone: '123' }, 400],
  ['empty turnover -> 400', { ...VALID, turnover: '' }, 400],
  ['bad email -> 400', { ...VALID, email: 'не-почта' }, 400],
  ['malformed json -> 400', '{oops', 400],
];
for (const [name, body, want] of cases) {
  const r = await POST(req(body, { 'x-forwarded-for': `10.1.0.${Math.floor(Math.random() * 250) + 1}` }));
  check(name, r.status === want, `got ${r.status}`);
}

// 5. Опциональные поля: пустой email допустим
const r2 = await POST(req({ name: 'Анна', phone: '+79990001122', turnover: '500k-1M', email: '' }, { 'x-forwarded-for': '10.2.0.1' }));
check('empty email accepted', r2.status === 200);

// 6. Rate limit: 5 запросов с одного IP проходят, 6-й отклоняется
let rateStatus = 0;
for (let i = 0; i < 6; i++) {
  const r = await POST(req({ ...VALID, name: 'Лид' + i }, { 'x-forwarded-for': '10.3.0.1' }));
  rateStatus = r.status;
}
check('6th lead from same IP -> 429', rateStatus === 429, `got ${rateStatus}`);

console.log(`\npass=${pass} fail=${fail}`);
if (fail > 0) process.exitCode = 1;