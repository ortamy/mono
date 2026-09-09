'use client';

import { useEffect, useState } from 'react';
import Reveal from '@/components/reveal';
import { track } from '@/lib/track';
import type { CalculatorConfig } from '@/lib/web-types';

export default function Calculator({ config, analyticsEnabled = false }: { config: CalculatorConfig; analyticsEnabled?: boolean }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const check = Number(values.check) || 0; const clients = Number(values.clients) || 0; const revenue = check * clients; const showOutput = check > 0 && clients > 0;
  useEffect(() => { if (showOutput) track(analyticsEnabled, 'calc_run'); }, [analyticsEnabled, showOutput]);
  return <section className="web-calculator" id="calculator"><Reveal><div className="section-heading"><p className="eyebrow">/ КАЛЬКУЛЯТОР ROI</p><h2>Посчитайте,<br /><em>как вернутся инвестиции.</em></h2></div></Reveal><Reveal><form className="calc-form" onSubmit={(event) => event.preventDefault()}>{config.fields.map((field) => <div className="field" key={field.id}><label htmlFor={`calc-${field.id}`}>{field.label}</label>{field.type === 'select' ? <select id={`calc-${field.id}`} value={values[field.id] || ''} onChange={(event) => setValues((previous) => ({ ...previous, [field.id]: event.target.value }))}><option value="">Выберите...</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input id={`calc-${field.id}`} type="number" placeholder={field.placeholder} value={values[field.id] || ''} onChange={(event) => setValues((previous) => ({ ...previous, [field.id]: event.target.value }))} />}</div>)}</form></Reveal>{showOutput && <Reveal><div className="calc-output"><p className="calc-result">Прогноз: {clients} клиентов × {check.toLocaleString('ru-RU')} ₽ = {revenue.toLocaleString('ru-RU')} ₽/мес дополнительной выручки.</p><p className="calc-result">Окупаемость пакета «Рост» — {(config.growth_price / revenue).toFixed(1)} мес.</p></div></Reveal>}<Reveal><p className="calc-disclaimer">{config.disclaimer}</p></Reveal></section>;
}