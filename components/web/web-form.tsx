'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/reveal';
import { track } from '@/lib/track';
import type { FormConfig } from '@/lib/data-types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function WebForm({ config, analyticsEnabled = false }: { config: FormConfig; analyticsEnabled?: boolean }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [qualified, setQualified] = useState(false);
  const message = useMemo(() => [`🎯 ${config.form_title}`, config.direction_note, ...config.fields.map((field) => { const value = values[field.id]; const label = field.options?.find((option) => option.value === value)?.label || value; return value ? `${field.label}: ${label}` : ''; }).filter(Boolean)].join('\n'), [config, values]);
  const telegramUrl = `https://t.me/${config.telegram_handle.replace(/^@/, '')}?text=${encodeURIComponent(message)}`;
  function update(id: string, value: string) { setValues((previous) => ({ ...previous, [id]: value })); if (id === 'turnover') setQualified(value === config.qualification.threshold); }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!consent) return; setStatus('sending');
    try {
      // Отправка идёт через /api/lead, а не напрямую в Telegram: бот-токен
      // не должен попадать в клиентский бандл. Поля страницы /web отличаются
      // от лендинга, поэтому они упаковываются в общий формат заявки.
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name ?? '',
          phone: values.telegram ?? values.phone ?? '',
          telegram: values.telegram ?? '',
          turnover: values.turnover ?? '',
          marketplaces: [],
          product: values.goal ?? values.site ?? '',
        }),
      });
      if (!response.ok) throw new Error('lead api rejected the request');
      setStatus('sent'); track(analyticsEnabled, 'form_submit', { turnover: values.turnover || 'unknown' });
    } catch { setStatus('error'); }
  }
  return <section className="web-form-section" id="contact"><Reveal><div className="section-heading"><p className="eyebrow">/ ЗАЯВКА</p><h2>Расскажите<br /><em>о проекте.</em></h2></div></Reveal><Reveal>{qualified && status === 'idle' ? <div className="qualification-response"><p>{config.qualification.message}</p><button className="button button-ghost" type="button" onClick={() => setQualified(false)}>{config.qualification.back_label}</button></div> : status === 'sent' ? <div className="form-success"><h3>{config.messages.success_title}</h3><p>{config.messages.success_text}</p></div> : <form className="web-form" onSubmit={handleSubmit}>{config.fields.map((field) => <div className="field" key={field.id}><label htmlFor={`wf-${field.id}`}>{field.label}{field.required ? ' *' : ''}</label>{field.type === 'select' ? <select id={`wf-${field.id}`} value={values[field.id] || ''} required={field.required} onChange={(event) => update(field.id, event.target.value)}><option value="">Выберите диапазон...</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input id={`wf-${field.id}`} name={field.id} type={field.type} required={field.required} placeholder={field.placeholder} autoComplete={field.autocomplete} value={values[field.id] || ''} onChange={(event) => update(field.id, event.target.value)} />}</div>)}<div className="field field-checkbox"><input id="wf-consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><label htmlFor="wf-consent">{config.privacy_label} · <Link href={config.privacy_href}>политика</Link></label></div>{status === 'error' && <div className="form-error"><h3>{config.messages.error_title}</h3><p>{config.messages.error_text}</p><a className="button button-ghost" href={telegramUrl} target="_blank" rel="noreferrer">{config.messages.fallback_cta} <span className="arrow">↗</span></a></div>}<button type="submit" className="button button-light submit-btn" disabled={status === 'sending' || !consent}>{status === 'sending' ? config.messages.sending : config.submit_label} <span className="arrow">↗</span></button><p className="form-note">{config.direction_note}</p></form>}</Reveal></section>;
}