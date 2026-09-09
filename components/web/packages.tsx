import Reveal from '@/components/reveal';
import type { Package } from '@/lib/web-types';

export default function Packages({ packages, priceDrivers }: { packages: Package[]; priceDrivers: string }) {
  return (
    <section className="web-packages" id="packages">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">/ ПАКЕТЫ</p>
          <h2>Формат,<br /><em>который решает задачи.</em></h2>
        </div>
      </Reveal>
      <div className="packages-grid">
        {packages.map((pkg) => (
          <Reveal key={pkg.id}>
            <div className={`package-card${pkg.id === 'growth' ? ' package-card--featured' : ''}`}>
              {pkg.badge && <span className="package-badge">{pkg.badge}</span>}
              <h3 className="package-name">{pkg.name}</h3>
              <p className="package-price">{pkg.price}</p>
              <p className="package-for">{pkg.for}</p>
              <ul className="package-includes">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="package-roi">
                <span className="package-roi-label">ROI</span>
                <p>{pkg.roi}</p>
              </div>
              <div className="package-meta">
                <span>{pkg.term}</span>
              </div>
              <a className="button button-light package-cta" href="#contact">
                {pkg.cta} <span className="arrow">↗</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="price-drivers">{priceDrivers}</p>
      </Reveal>
    </section>
  );
}
