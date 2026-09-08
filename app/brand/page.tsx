import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Reveal from '@/components/reveal';
import PageHero from '@/components/page-hero';

const SERVICES = [
  { num: '01', title: 'Логотип', desc: 'Знак, который легко узнать и запомнить в любой среде.' },
  { num: '02', title: 'Фирменный стиль', desc: 'Цвета, типографика и графика — единый визуальный язык.' },
  { num: '03', title: 'Гайдлайны', desc: 'Правила использования айдентики, чтобы стиль оставался целостным.' },
  { num: '04', title: 'Упаковка', desc: 'Дизайн упаковки, которая выделяется на полке и в кадре.' },
];

export default function BrandPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="/ Brand"
        title={<>Бренд,<br /><span>который запоминают</span></>}
        sub="Айдентика и фирменный стиль — единый образ, который вызывает доверие."
        cta={{ href: '/contact', label: 'Обсудить проект', primary: true }}
      />

      <section className="page-cards">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">/ Что я делаю</p>
            <h2>Образ,<br /><em>который остаётся с вами.</em></h2>
          </div>
        </Reveal>
        <div className="card-grid">
          {SERVICES.map((s) => (
            <Reveal key={s.num}>
              <div className="mini-card">
                <span className="card-number">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <Reveal><h2>Построим бренд?</h2></Reveal>
        <Reveal><a className="button button-light" href="/contact">Обсудить проект <span className="arrow">↗</span></a></Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}