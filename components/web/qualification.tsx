import Reveal from '@/components/reveal';
import type { Qualification } from '@/lib/web-types';

export default function Qualification({ data }: { data: Qualification }) {
  return (
    <section className="web-qualification">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ КОМУ ЭТО ПОДХОДИТ</p>
          <p className="qualification-intro">{data.intro}</p>
        </div>
      </Reveal>
      <div className="qualification-grid">
        {data.ideal.map((card) => (
          <Reveal key={card.label}>
            <div className="qualification-card">
              <span className="qualification-label">{card.label}</span>
              <span className="qualification-min">{card.min}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="qualification-notfit">{data.not_fit}</p>
      </Reveal>
    </section>
  );
}
