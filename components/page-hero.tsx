import type { ReactNode } from 'react';

export default function PageHero({
  eyebrow,
  title,
  sub,
  cta,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  cta?: { href: string; label: string; primary?: boolean };
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-sub">{sub}</p>
      {cta && (
        <a className={`button ${cta.primary ? 'button-light' : 'button-ghost'}`} href={cta.href}>
          {cta.label} <span className="arrow">↗</span>
        </a>
      )}
    </section>
  );
}