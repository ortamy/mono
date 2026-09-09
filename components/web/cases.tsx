import Reveal from '@/components/reveal';
import type { Case } from '@/lib/web-types';

export default function Cases({ cases }: { cases: Case[] }) {
  if (cases.length === 0) {
    return (
      <section className="web-cases web-cases--empty" id="cases">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">/ КЕЙСЫ</p>
            <h2>Кейсы<br /><em>в работе.</em></h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="cases-empty">
            <p className="cases-empty-text">
              Покажем первые результаты в [КВАРТАЛ/ГОД]. Хочу увидеть кейс первым — оставьте контакт.
            </p>
            <a className="button button-light" href="#contact">
              Узнать первым <span className="arrow">↗</span>
            </a>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="web-cases" id="cases">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ КЕЙСЫ</p>
          <h2>Результаты<br /><em>в цифрах.</em></h2>
        </div>
      </Reveal>
      <div className="cases-grid">
        {cases.map((c) => (
          <Reveal key={c.slug}>
            <article className="case-card">
              {c.cover && <div className="case-cover" style={{ backgroundImage: `url(${c.cover})` }} />}
              <div className="case-meta">
                <span>{c.client}</span>
                <span>{c.niche}</span>
                <span>{c.year}</span>
              </div>
              <table className="case-metrics">
                <tbody>
                  {c.metrics.map((m) => (
                    <tr key={m.label}>
                      <td>{m.label}</td>
                      <td>{m.before}</td>                      <td>{m.after}</td>
                      <td className="case-delta">{m.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {c.quote && <blockquote className="case-quote">«{c.quote}»</blockquote>}
              <p className="case-period">Период измерения: {c.period}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
