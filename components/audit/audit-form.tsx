/**
 * Форма заявки на бесплатный UX-аудит (/audit).
 *
 * Роут тот же, что у лендинга главной (/api/lead): отдельный API не нужен.
 * Отличие — поле source: 'audit'. По нему роут понимает, что это заявка на
 * разбор, а не на расчёт экономии магазина, и не подставляет в уведомление
 * «потенциальную экономию» маркетплейса.
 */
'use client';

import { useState } from 'react';
import { TURNOVER_BANDS } from '@/lib/turnover';
import { GOALS, trackGoal } from '@/lib/metrika';

/** Telegram-хэндл для запасного канала: заявка не должна потеряться, если API упал. */
const HANDLE = 'ortamy';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function AuditForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [turnover, setTurnover] = useState('');
  const [product, setProduct] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const fallbackUrl = `https://t.me/${HANDLE}?text=${encodeURIComponent(
    ['Заявка на бесплатный UX-аудит', `Имя: ${name || '—'}`, `Ссылка: ${product || '—'}`].join('\n'),
  )}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    setStatus('sending');
    setErrorText('');

    try {
      // Слэш в конце обязателен: next.config.mjs держит trailingSlash. Без него
      // Next отвечает 308, а редирект теряет тело POST — заявка превращается
      // в 405, поэтому адрес указываем ровно таким.
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, telegram, turnover, product, source: 'audit' }),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !result?.ok) {
        setStatus('error');
        setErrorText(result?.error ?? 'Ошибка. Попробуйте ещё раз или напишите в Telegram.');
        return;
      }
      setStatus('sent');
      // Цель ставим только после подтверждённого 200 от /api/lead, иначе в
      // статистику попадут отказы и перезагрузки страницы.
      trackGoal(GOALS.leadSubmit, { source: 'audit' });
    } catch {
      setStatus('error');
      setErrorText('Ошибка. Попробуйте ещё раз или напишите в Telegram.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8" role="status">
        <h2 className="text-[18px] font-semibold tracking-[-0.4px] text-agentos-ink">Заявка у меня.</h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-agentos-muted">
          Разбор пришлю в течение дня: 3 точки роста, один быстрый ход и план правок по приоритету.
        </p>
      </div>
    );
  }

  const inputClass =
    'h-11 w-full rounded-control border border-agentos-line bg-agentos-card px-3 text-[14px] text-agentos-ink placeholder:text-agentos-faint focus:border-agentos-ink focus:outline-none';
  const labelClass = 'mb-1.5 block text-[13px] font-medium text-agentos-ink';

  return (
    <form onSubmit={handleSubmit} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8">
      <h2 className="text-[18px] font-semibold tracking-[-0.4px] text-agentos-ink">Заявка на аудит</h2>
      <p className="mt-1.5 text-[13px] leading-[1.55] text-agentos-muted">
        Разбор делаю сам, без менеджеров и брифа на 40 вопросов.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="af-name" className={labelClass}>Имя</label>
          <input
            id="af-name" name="name" type="text" required value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться" className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="af-phone" className={labelClass}>Телефон</label>
          <input
            id="af-phone" name="phone" type="tel" required value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7…" className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="af-telegram" className={labelClass}>Telegram</label>
          <input
            id="af-telegram" name="telegram" type="text" value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username" className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="af-product" className={labelClass}>Ссылка на продукт</label>
          <input
            id="af-product" name="product" type="text" value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Сайт, приложение, лендинг или карточка товара" className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="af-turnover" className={labelClass}>Оборот в месяц</label>
          <select
            id="af-turnover" name="turnover" required value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className={inputClass}
          >
            <option value="">Выберите диапазон</option>
            {TURNOVER_BANDS.map((band) => <option key={band.value} value={band.value}>{band.label}</option>)}
          </select>
          <p className="mt-1.5 text-[12px] leading-[1.5] text-agentos-faint">
            Нужен, чтобы понимать масштаб: разбор делаю одинаково, но приоритеты правок зависят от объёма.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <input
          id="af-consent" type="checkbox" required checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded-control border border-agentos-line accent-agentos-ink"
        />
        <label htmlFor="af-consent" className="text-[12px] leading-[1.5] text-agentos-muted">
          Согласен на обработку персональных данных и получение разбора
        </label>
      </div>

      <button
        type="submit" disabled={status === 'sending'}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-control bg-agentos-ink text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Получить бесплатный аудит'}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-[12px] leading-[1.5] text-agentos-muted" role="alert">
          {errorText}{' '}
          <a href={fallbackUrl} target="_blank" rel="noreferrer" className="text-agentos-ink underline underline-offset-2">
            Написать в Telegram
          </a>
        </p>
      )}
    </form>
  );
}
