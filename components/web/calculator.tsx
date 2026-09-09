'use client';

import { useState } from 'react';
import Reveal from '@/components/reveal';
import type { CalculatorConfig } from '@/lib/web-types';

export default function Calculator({ config }: { config: CalculatorConfig }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const check = Number(values.check) || 0;
  const clients = Number(values.clients) || 0;
  const revenue = check * clients;
  const growthPrice = 80000;
  const payback = revenue > 0 ? (growthPrice / revenue).toFixed(1) : '—';
  const showOutput = check > 0 && clients > 0;

  const formattedRevenue = revenue.toLocaleString('ru-RU');

  return (
    <section className="web-calculator" id="calculator">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ КАЛЬКУЛЯТОР ROI</p>
          <h2>Посчитайте,<br /><em>как вернутся инвестиции.</em></h2>
        </div>
      </Reveal>
      <Reveal>
        <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
          {config.fields.map((field) => (
            <div className="field" key={field.id}>
              <label htmlFor={`calc-${field.id}`}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={`calc-${field.id}`}
                  value={values[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                >
                  <option value="">Выберите...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={`calc-${field.id}`}
                  type="number"
                  placeholder={field.placeholder}
                  value={values[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </form>
      </Reveal>
      {showOutput && (
        <Reveal>
          <div className="calc-output">
            <p className="calc-result">
              Прогноз: {clients} клиентов × {check.toLocaleString('ru-RU')} ₽ = {formattedRevenue} ₽/мес дополнительной выручки.
            </p>
            <p className="calc-result">
              Окупаемость пакета «Рост» — {payback} мес.
            </p>
          </div>
        </Reveal>
      )}
      <Reveal>
        <p className="calc-disclaimer">{config.disclaimer}</p>
      </Reveal>
    </section>
  );
}
