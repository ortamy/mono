import Reveal from '@/components/reveal';
import type { ProcessStep } from '@/lib/web-types';

export default function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="web-process" id="process">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ ПРОЦЕСС</p>
          <h2>Прозрачные<br /><em>этапы работы.</em></h2>
        </div>
      </Reveal>
      <div className="process-grid">
        {steps.map((step) => (
          <Reveal key={step.num}>
            <div className="process-step">
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p className="process-term">{step.term}</p>
              <p className="process-artifact">{step.artifact}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="process-note">Что нужно от вас: 30 минут на бриф и обратная связь на контрольных точках.</p>
      </Reveal>
    </section>
  );
}
