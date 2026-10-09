/**
 * Форма заявки на сборку AI-агента (/agents).
 *
 * Роут тот же, что у главной и /audit (POST /api/lead): отдельный API не
 * нужен. Отличие — поле source: 'agents'. По нему роут помечает воронку и не
 * подставляет в уведомление «потенциальную экономию маркетплейса», которая к
 * агентам не относится.
 */
'use client';

import { useState } from 'react';
import { TURNOVER_BANDS } from '@/lib/turnover';
import { GOALS, trackGoal } from '@/lib/metrika';

/** Telegram-хэндл для запасного канала: заявка не должна потеряться, если API упал. */
const HANDLE = 'ortamy';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function AgentContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [turnover, setTurnover] = useState('');
  const [task, setTask] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const fallbackUrl = `https://t.me/${HANDLE}?text=${encodeURIComponent(
    [
      'Заявка на AI-агента (/agents)',
      `Имя: ${name || '—'}`,
      `Контакт: ${phone || telegram || '—'}`,
      `Задача: ${task || '—'}`,
    ].join('\n'),
  )}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorText('');

    try {
      // Слэш в конце обязателен: next.config.mjs держит trailingSlash. Без него
      // Next отвечает 308, а редирект теряет тело POST — заявка превращается
      // в 405, поэтому адрес указываем ровно таким.
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, telegram, turnover, product: task, source: 'agents' }),
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
      trackGoal(GOALS.leadSubmit, { source: 'agents' });
    } catch {
      setStatus('error');
      setErrorText('Ошибка. Попробуйте ещё раз или напишите в Telegram.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="d-card p-6 sm:p-8" role="status">
        <h3 className="text-[18px] font-semibold tracking-[-0.4px] text-[var(--d-ink)]">
          Заявка у меня. Отвечу в течение дня.
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] d-muted">
          Напишу в указанный контакт и предложу сценарий агента, сроки и оценку — до оплаты диагностики.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="d-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="ag-name" className="d-label">Имя</label>
          <input
            id="ag-name" name="name" type="text" required value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="d-input"
          />
        </div>

        <div>
          <label htmlFor="ag-phone" className="d-label">Телефон</label>
          <input
            id="ag-phone" name="phone" type="tel" required value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7…"
            className="d-input"
          />
        </div>

        <div>
          <label htmlFor="ag-telegram" className="d-label">Telegram</label>
          <input
            id="ag-telegram" name="telegram" type="text" value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            className="d-input"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ag-turnover" className="d-label">Оборот или команда</label>
          <select
            id="ag-turnover" name="turnover" required value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className="d-input"
          >
            <option value="">Выберите диапазон</option>
            {TURNOVER_BANDS.map((band) => <option key={band.value} value={band.value}>{band.label}</option>)}
          </select>
          <p className="mt-1.5 text-[12px] leading-[1.5] d-faint">
            Нужен, чтобы понять масштаб: сколько обращений, лидов или SKU агент будет обслуживать.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ag-task" className="d-label">Какой агент нужен</label>
          <textarea
            id="ag-task" name="task" value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Например: агент поддержки для магазина, отвечает в Telegram и на сайте"
            className="d-input"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="d-btn d-btn-primary mt-5 w-full disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Обсудить агента'}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-[12px] leading-[1.5] d-muted" role="alert">
          {errorText}{' '}
          <a href={fallbackUrl} target="_blank" rel="noreferrer" className="text-[var(--d-ink)] underline underline-offset-2">
            Написать в Telegram
          </a>
        </p>
      )}
    </form>
  );
}
