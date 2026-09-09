import Reveal from '@/components/reveal';
import type { Guarantee } from '@/lib/web-types';

export default function Guarantees({ items }: { items: Guarantee[] }) {
  return (
    <section className="web-guarantees" id="guarantees">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ ГАРАНТИИ</p>
          <h2>Не слова,<br /><em>а обязательства.</em></h2>
        </div>
      </Reveal>
      <div className="guarantees-grid">
        {items.map((g) => (
          <Reveal key={g.title}>
            <div className="guarantee-card">
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
