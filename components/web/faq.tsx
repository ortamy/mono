'use client';

import { useState } from 'react';
import Reveal from '@/components/reveal';
import type { FAQItem } from '@/lib/web-types';

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="web-faq" id="faq">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ ВОПРОСЫ О ЦЕНЕ</p>
          <h2>Честно<br /><em>о стоимости.</em></h2>
        </div>
      </Reveal>
      <div className="faq-list" role="region" aria-label="Частые вопросы о цене">
        {items.map((item, i) => (
          <Reveal key={i}>
            <div className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
              <button
                className="faq-question"
                aria-expanded={open === i}
                aria-controls={`faq-a-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
              </button>
              <div
                className="faq-answer"
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                hidden={open !== i}
              >
                <p>{item.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
