'use client';

import { useState } from 'react';
import Reveal from '@/components/reveal';

const TURNOVER_OPTIONS = [
  { value: '<200k', label: '< 200k ₽/мес' },
  { value: '200-500k', label: '200–500k ₽/мес' },
  { value: '500k-3M', label: '500k–3M ₽/мес' },
  { value: '3M+', label: '3M+ ₽/мес' },
];

const QUALIFICATION_RESPONSE = 'Ваш оборот пока ниже порога наших основных пакетов. Предлагаю пакет Быстрый старт за 25k ₽ или партнёрский вариант. Напишите, обсудим.';

export default function WebForm() {
  const [turnover, setTurnover] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="web-form-section" id="contact">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ ЗАЯВКА</p>
          <h2>Расскажите<br /><em>о проекте.</em></h2>
        </div>
      </Reveal>
      <Reveal>
        {turnover === '<200k' && !submitted ? (
          <div className="qualification-response">
            <p>{QUALIFICATION_RESPONSE}</p>
          </div>
        ) : submitted ? (
          <div className="form-success">
            <p>Заявка принята. Свяжусь с вами в течение рабочего дня.</p>
          </div>
        ) : (
          <form className="web-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="wf-name">Имя *</label>
              <input id="wf-name" name="name" type="text" required />
            </div>
            <div className="field">
              <label htmlFor="wf-tg">Telegram *</label>
              <input id="wf-tg" name="telegram" type="text" placeholder="@username" required />
            </div>
            <div className="field">
              <label htmlFor="wf-turnover">Оборот бизнеса *</label>
              <select
                id="wf-turnover"
                name="turnover"
                required
                value={turnover}
                onChange={(e) => setTurnover(e.target.value)}
              >
                <option value="">Выберите диапазон...</option>
                {TURNOVER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="wf-goal">Цель по выручке на год</label>
              <input id="wf-goal" name="goal" type="text" placeholder="Например, 5M ₽" />
            </div>
            <div className="field">
              <label htmlFor="wf-site">Ссылка на текущий сайт</label>
              <input id="wf-site" name="site" type="url" placeholder="https://..." />
            </div>
            <div className="field field-checkbox">
              <input id="wf-consent" name="consent" type="checkbox" required />
              <label htmlFor="wf-consent">Согласен на обработку данных *</label>
            </div>
            <button type="submit" className="button button-light submit-btn">
              Отправить заявку <span className="arrow">↗</span>
            </button>
            <p className="form-note">Направление: Web · Предоплата 50%</p>
          </form>
        )}
      </Reveal>
    </section>
  );
}
