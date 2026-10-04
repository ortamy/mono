/**
 * Лид-форма лендинга. Сайт собирается статически (output: 'export'), поэтому
 * заявка уходит напрямую в Telegram через Bot API; если токен/чат не заданы —
 * показывается запасная кнопка с предзаполненным текстом в Telegram.
 */
'use client';

import { useMemo, useState } from 'react';

const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '';
const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
const HANDLE = 'mono_studio';

const TURNOVER_OPTIONS = [
  { value: '500k-1M', label: '500 тыс — 1 млн ₽/мес' },
  { value: '1M-3M', label: '1 — 3 млн ₽/мес' },
  { value: '3M-10M', label: '3 — 10 млн ₽/мес' },
  { value: '10M+', label: 'больше 10 млн ₽/мес' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [turnover, setTurnover] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const fallbackText = useMemo(
    () =>
      ['Заявка с сайта mono', `Имя: ${name || '—'}`, `Телефон: ${phone || '—'}`, `Оборот: ${TURNOVER_OPTIONS.find((o) => o.value === turnover)?.label || '—'}`].join('\n'),
    [name, phone, turnover],
  );
  const fallbackUrl = `https://t.me/${HANDLE}?text=${encodeURIComponent(fallbackText)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    if (!TOKEN || !CHAT_ID) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ chat_id: CHAT_ID, text: fallbackText }),
      });
      if (!response.ok) throw new Error('telegram error');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-agentos border border-agentos-line bg-agentos-card p-8">
        <h3 className="text-[18px] font-semibold tracking-[-0.4px] text-agentos-ink">Заявка отправлена</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-agentos-muted">
          Свяжемся в течение рабочего дня и пришлём расчёт экономии по вашему обороту.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="lf-name" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Имя</label>
          <input
            id="lf-name" name="name" type="text" required autoComplete="name" value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="h-11 w-full rounded-control border border-agentos-line bg-agentos-card px-3 text-[14px] text-agentos-ink placeholder:text-agentos-faint focus:border-agentos-ink focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="lf-phone" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Телефон</label>
          <input
            id="lf-phone" name="phone" type="tel" required autoComplete="tel" value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 900 000-00-00"
            className="h-11 w-full rounded-control border border-agentos-line bg-agentos-card px-3 text-[14px] text-agentos-ink placeholder:text-agentos-faint focus:border-agentos-ink focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="lf-turnover" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Оборот на маркетплейсах</label>
          <select
            id="lf-turnover" name="turnover" required value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className="h-11 w-full rounded-control border border-agentos-line bg-agentos-card px-3 text-[14px] text-agentos-ink focus:border-agentos-ink focus:outline-none"
          >
            <option value="">Выберите диапазон</option>
            {TURNOVER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <input
          id="lf-consent" type="checkbox" required checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded-control border border-agentos-line accent-agentos-ink"
        />
        <label htmlFor="lf-consent" className="text-[12px] leading-[1.5] text-agentos-muted">
          Согласен на обработку персональных данных и получение расчёта
        </label>
      </div>

      <button
        type="submit" disabled={status === 'sending'}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-control bg-agentos-ink text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-[12px] leading-[1.5] text-agentos-muted">
          Не удалось отправить заявку автоматически.{' '}
          <a href={fallbackUrl} target="_blank" rel="noreferrer" className="text-agentos-ink underline underline-offset-2">
            Напишите нам в Telegram
          </a>
        </p>
      )}
    </form>
  );
}