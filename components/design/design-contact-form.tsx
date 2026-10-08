/**
 * Форма контактов портфолио.
 *
 * Отправляет заявку на POST /api/design-lead (секреты только на сервере).
 * При ошибке лид не теряется: показывается ссылка на Telegram.
 */
'use client';

import { useState } from 'react';

const HANDLE = 'mono_studio';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function DesignContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [task, setTask] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const fallbackUrl = `https://t.me/${HANDLE}?text=${encodeURIComponent(
    ['Заявка с портфолио', `Имя: ${name || '—'}`, `Контакт: ${contact || '—'}`, `Задача: ${task || '—'}`].join('\n'),
  )}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorText('');

    try {
      // Слэш в конце обязателен: next.config.mjs держит trailingSlash.
      const response = await fetch('/api/design-lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, task, budget }),
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
      <div className="d-card p-6 sm:p-8" role="status">
        <h3 className="text-[18px] font-semibold tracking-[-0.4px] text-[var(--d-ink)]">
          Спасибо! Отвечу в течение дня.
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] d-muted">
          Напишу в указанный контакт и обсудим задачу, сроки и бюджет.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="d-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="dc-name" className="d-label">Имя</label>
          <input
            id="dc-name" name="name" type="text" required value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="d-input"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dc-contact" className="d-label">Telegram или телефон</label>
          <input
            id="dc-contact" name="contact" type="text" required value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="@username / +7…"
            className="d-input"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dc-budget" className="d-label">Бюджет</label>
          <select
            id="dc-budget" name="budget" value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="d-input"
          >
            <option value="">Не определён</option>
            <option value="до 100 000 ₽">до 100 000 ₽</option>
            <option value="100–300 000 ₽">100–300 000 ₽</option>
            <option value="300 000+ ₽">300 000+ ₽</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dc-task" className="d-label">Задача</label>
          <textarea
            id="dc-task" name="task" value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Сайт, приложение, редизайн…"
            className="d-input"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="d-btn d-btn-primary mt-5 w-full disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
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