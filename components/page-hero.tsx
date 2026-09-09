import type { ReactNode } from 'react';

export default function PageHero({
  eyebrow,
  title,
  sub,
  anchor,
  cta,
  secondaryCta,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  anchor?: string;
  cta?: { href: string; label: string; primary?: boolean };
  secondaryCta?: { href: string; label: string };
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-sub">{sub}</p>
      {anchor && <p className="hero-anchor">{anchor}</p>}
      <div className="hero-actions">
        {cta && (
          <a className={`button ${cta.primary ? 'button-light' : 'button-ghost'}`} href={cta.href}>
            {cta.label} <span className="arrow">↗</span>
          </a>
        )}
        {secondaryCta && (
          <a className="button button-ghost" href={secondaryCta.href}>
            {secondaryCta.label} <span className="arrow">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}