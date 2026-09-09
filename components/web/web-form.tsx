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
      if (config.provider === 'telegram') { const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN; if (!token || !config.telegram_chat_id) throw new Error('Telegram provider is not configured'); const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ chat_id: config.telegram_chat_id, text: message }) }); if (!response.ok) throw new Error('Telegram rejected the request'); }
      else if (config.provider === 'web3forms') { const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY; if (!key) throw new Error('Web3Forms provider is not configured'); const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_key: key, subject: config.form_title, ...values }) }); if (!response.ok) throw new Error('Web3Forms rejected the request'); }
      else throw new Error('Form provider is disabled');
      setStatus('sent'); track(analyticsEnabled, 'form_submit', { turnover: values.turnover || 'unknown' });
    } catch { setStatus('error'); }
  }
  return <section className="web-form-section" id="contact"><Reveal><div className="section-heading"><p className="eyebrow">/ ЗАЯВКА</p><h2>Расскажите<br /><em>о проекте.</em></h2></div></Reveal><Reveal>{qualified && status === 'idle' ? <div className="qualification-response"><p>{config.qualification.message}</p><button className="button button-ghost" type="button" onClick={() => setQualified(false)}>{config.qualification.back_label}</button></div> : status === 'sent' ? <div className="form-success"><h3>{config.messages.success_title}</h3><p>{config.messages.success_text}</p></div> : <form className="web-form" onSubmit={handleSubmit}>{config.fields.map((field) => <div className="field" key={field.id}><label htmlFor={`wf-${field.id}`}>{field.label}{field.required ? ' *' : ''}</label>{field.type === 'select' ? <select id={`wf-${field.id}`} value={values[field.id] || ''} required={field.required} onChange={(event) => update(field.id, event.target.value)}><option value="">Выберите диапазон...</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input id={`wf-${field.id}`} name={field.id} type={field.type} required={field.required} placeholder={field.placeholder} autoComplete={field.autocomplete} value={values[field.id] || ''} onChange={(event) => update(field.id, event.target.value)} />}</div>)}<div className="field field-checkbox"><input id="wf-consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><label htmlFor="wf-consent">{config.privacy_label} · <Link href={config.privacy_href}>политика</Link></label></div>{status === 'error' && <div className="form-error"><h3>{config.messages.error_title}</h3><p>{config.messages.error_text}</p><a className="button button-ghost" href={telegramUrl} target="_blank" rel="noreferrer">{config.messages.fallback_cta} <span className="arrow">↗</span></a></div>}<button type="submit" className="button button-light submit-btn" disabled={status === 'sending' || !consent}>{status === 'sending' ? config.messages.sending : config.submit_label} <span className="arrow">↗</span></button><p className="form-note">{config.direction_note}</p></form>}</Reveal></section>;
}