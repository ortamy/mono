import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Reveal from '@/components/reveal';
import PageHero from '@/components/page-hero';

const SERVICES = [
  { num: '01', title: 'Лендинги', desc: 'Продающие одностраничники, собранные под конкретную задачу и аудиторию.' },
  { num: '02', title: 'Корпоративные сайты', desc: 'Многостраничные сайты с понятной структурой и сильной подачей продукта.' },
  { num: '03', title: 'Интернет-магазины', desc: 'Витрины и каталоги, где легко найти, сравнить и купить.' },
  { num: '04', title: 'Интерфейсы', desc: 'Прототипы и UI для сервисов, приложений и внутренних продуктов.' },
];

export default function WebPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="/ Web"
        title={<>Сайты,<br /><span>которые работают</span></>}
        sub="Лендинги, витрины и интерфейсы — дизайн, который помогает бизнесу расти."
        cta={{ href: '/contact', label: 'Обсудить проект', primary: true }}
      />

      <section className="page-cards">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">/ Что я делаю</p>
            <h2>Форма,<br /><em>которая решает задачи.</em></h2>
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
        <Reveal><h2>Нужен сайт?</h2></Reveal>
        <Reveal><a className="button button-light" href="/contact">Обсудить проект <span className="arrow">↗</span></a></Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}