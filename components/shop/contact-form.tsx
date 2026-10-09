/**
 * Форма заявки главной страницы.
 *
 * Отправляет на POST /api/design-lead — тот же роут, что и портфолио: у главной
 * и портфолио одинаковый набор полей (имя, контакт, бюджет, задача). Старая
 * форма лендинга (components/shop/lead-form.tsx) собирала оборот и
 * маркетплейсы под «свой магазин вместо WB» — противоречило позиционированию
 * «продуктовый дизайн + ИИ» и удалена.
 *
 * При ошибке лид не теряется: показываем ссылку на Telegram.
 */
'use client';

import { useState } from 'react';

const HANDLE = 'ortamy';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const BUDGETS = ['до 25 000 ₽', '25 000–60 000 ₽', '60 000–150 000 ₽', '150 000+ ₽', 'не определён'];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [task, setTask] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const fallbackUrl = `https://t.me/${HANDLE}?text=${encodeURIComponent(
    ['Заявка с главной', `Имя: ${name || '—'}`, `Контакт: ${contact || '—'}`, `Задача: ${task || '—'}`].join('\n'),
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
      <div className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8" role="status">
        <h3 className="text-[18px] font-semibold tracking-[-0.4px] text-agentos-ink">Спасибо! Отвечу в течение дня.</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-agentos-muted">
          Напишу в указанный контакт и обсудим задачу, сроки и бюджет.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-agentos border border-agentos-line bg-agentos-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="cf-name" className="block text-[12px] font-medium text-agentos-ink">
            Имя
          </label>
          <input
            id="cf-name" name="name" type="text" required value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="mt-1.5 w-full rounded-control border border-agentos-line bg-agentos-bg px-3 py-2.5 text-[14px] text-agentos-ink outline-none transition-colors focus:border-agentos-ink"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-contact" className="block text-[12px] font-medium text-agentos-ink">
            Telegram или телефон
          </label>
          <input
            id="cf-contact" name="contact" type="text" required value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="@username / +7…"
            className="mt-1.5 w-full rounded-control border border-agentos-line bg-agentos-bg px-3 py-2.5 text-[14px] text-agentos-ink outline-none transition-colors focus:border-agentos-ink"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-budget" className="block text-[12px] font-medium text-agentos-ink">
            Бюджет
          </label>
          <select
            id="cf-budget" name="budget" value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1.5 w-full rounded-control border border-agentos-line bg-agentos-bg px-3 py-2.5 text-[14px] text-agentos-ink outline-none transition-colors focus:border-agentos-ink"
          >
            <option value="">Не определён</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-task" className="block text-[12px] font-medium text-agentos-ink">
            Задача
          </label>
          <textarea
            id="cf-task" name="task" value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Продукт, сайт, редизайн, ИИ-автоматизация…"
            className="mt-1.5 min-h-[110px] w-full rounded-control border border-agentos-line bg-agentos-bg px-3 py-2.5 text-[14px] leading-[1.5] text-agentos-ink outline-none transition-colors focus:border-agentos-ink"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-control bg-agentos-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-agentos-graphite disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
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
