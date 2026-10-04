/**
 * Лид-форма лендинга.
 *
 * Отправляет заявку на POST /api/lead. Секретов в клиентском бандле нет: токен
 * Telegram бота и ключ Supabase читаются только на сервере (см. app/api/lead).
 * Если API недоступен, лид не теряется — показывается ссылка на Telegram.
 */
'use client';

import { useState } from 'react';
import { TURNOVER_BANDS } from '@/lib/turnover';

const HANDLE = 'mono_studio';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [turnover, setTurnover] = useState('');
  const [product, setProduct] = useState('');
  const [marketplaces, setMarketplaces] = useState<string[]>(['WB', 'Ozon']);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const fallbackUrl = `https://t.me/${HANDLE}?text=${encodeURIComponent(
    ['Заявка с сайта mono', `Имя: ${name || '—'}`, `Телефон: ${phone || '—'}`, `Оборот: ${turnover || '—'}`].join('\n'),
  )}`;

  function toggleMarketplace(value: string) {
    setMarketplaces((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    setStatus('sending');
    setErrorText('');

    try {
      // Слэш в конце обязателен: next.config.mjs держит trailingSlash, и без
      // него Next отвечает 308. Браузер редиректит POST, но теряет тело и
      // превращает заявку в 405 — поэтому адрес указываем ровно таким.
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, telegram, turnover, marketplaces, product }),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !result?.ok) {
        setStatus('error');
        setErrorText(result?.error ?? 'Ошибка. Попробуйте ещё раз или напишите в Telegram.');
        return;
      }
      setStatus('sent');
    } catch {
      setStatus('error');
      setErrorText('Ошибка. Попробуйте ещё раз или напишите в Telegram.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-agentos border border-agentos-line bg-agentos-card p-8">
        <h3 className="text-[18px] font-semibold tracking-[-0.4px] text-agentos-ink">Спасибо! Расчёт придёт в течение дня.</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-agentos-muted">
          Мы посчитаем экономию по вашому обороту и свяжемся с вами.
        </p>
      </div>
    );
  }

  const inputClass =
    'h-11 w-full rounded-control border border-agentos-line bg-agentos-card px-3 text-[14px] text-agentos-ink placeholder:text-agentos-faint focus:border-agentos-ink focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="lf-name" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Имя</label>
          <input
            id="lf-name" name="name" type="text" required minLength={2} autoComplete="name" value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться" className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lf-phone" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Телефон</label>
          <input
            id="lf-phone" name="phone" type="tel" required minLength={10} autoComplete="tel" value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 900 000-00-00" className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lf-telegram" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Telegram</label>
          <input
            id="lf-telegram" name="telegram" type="text" value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username" className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lf-turnover" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Оборот на маркетплейсах</label>
          <select
            id="lf-turnover" name="turnover" required value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className={inputClass}
          >
            <option value="">Выберите диапазон</option>
            {TURNOVER_BANDS.map((band) => <option key={band.value} value={band.value}>{band.label}</option>)}
          </select>
        </div>

        <fieldset>
          <legend className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Площадки</legend>
          <div className="flex gap-2">
            {['WB', 'Ozon'].map((item) => {
              const active = marketplaces.includes(item);
              return (
                <label
                  key={item}
                  className={`flex h-11 flex-1 cursor-pointer items-center justify-center rounded-control border text-[14px] transition-colors ${
                    active ? 'border-agentos-ink bg-agentos-ink text-white' : 'border-agentos-line text-agentos-ink hover:bg-agentos-soft'
                  }`}
                >
                  <input type="checkbox" value={item} checked={active} onChange={() => toggleMarketplace(item)} className="sr-only" />
                  {item}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="lf-product" className="mb-1.5 block text-[13px] font-medium text-agentos-ink">Товар или ниша</label>
          <input
            id="lf-product" name="product" type="text" value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Косметика, спортпит…" className={inputClass}
          />
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
          {errorText}{' '}
          <a href={fallbackUrl} target="_blank" rel="noreferrer" className="text-agentos-ink underline underline-offset-2">
            Написать в Telegram
          </a>
        </p>
      )}
    </form>
  );
}