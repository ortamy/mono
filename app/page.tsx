import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Reveal from '@/components/reveal';

const DIRECTIONS = [
  {
    num: '01',
    tag: 'E-commerce',
    title: 'Карточки WB / Ozon',
    desc: 'Обложки, воронки и визуал, который повышает CTR и конверсию.',
    href: '/wbdesign',
  },
  {
    num: '02',
    tag: 'Web',
    title: 'Сайты',
    desc: 'Лендинги и интерфейсы, которые продают и интересно рассказывают о продукте.',
    href: '/web',
  },
  {
    num: '03',
    tag: 'Brand',
    title: 'Брендинг',
    desc: 'Логотип, фирменный стиль и гайдлайны — единый, узнаваемый образ.',
    href: '/brand',
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="liquid-orb" aria-hidden="true"><div className="orb-shine" /></div>
        <div className="hero-content">
          <p className="eyebrow"><i /> Дизайн-студия для брендов</p>
          <h1>Дизайн,<br /><span>который продаёт</span></h1>
          <p className="hero-subtitle">Карточки, сайты, брендинг.</p>
          <div className="hero-actions wide">
            <a className="button button-light" href="/wbdesign">Смотреть карточки <span className="arrow">↗</span></a>
            <a className="button button-ghost" href="/contact">Обсудить проект <span className="arrow">↗</span></a>
          </div>
        </div>
        <div className="hero-note">/ 00<br /><span>E-COMMERCE · WEB · BRAND</span></div>
      </section>

      <section className="section directions-section">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">/ Направления</p>
            <h2>Одна задача.<br /><em>Три подхода.</em></h2>
          </div>
        </Reveal>
        <div className="directions">
          {DIRECTIONS.map((d) => (
            <Reveal key={d.num}>
              <a className="direction-card" href={d.href}>
                <span className="card-number">{d.num}</span>
                <p className="direction-tag">{d.tag}</p>
                <h3>{d.title}</h3>
                <p className="direction-desc">{d.desc}</p>
                <span className="direction-more">Смотреть направление <span className="arrow">↗</span></span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="metrics section-line">
        <div><strong>+30%</strong><span>средний рост CTR</span></div>
        <div><strong>+20%</strong><span>к конверсии в заказ</span></div>
        <div><strong>8</strong><span>слайдов в одной воронке</span></div>
        <div><strong>48<span className="unit">ч</span></strong><span>срок первой концепции</span></div>
      </Reveal>

      <section className="section about-section">
        <Reveal><div className="about-shape">W<span>.</span></div></Reveal>
        <Reveal>
          <div className="about-copy">
            <p className="eyebrow">/ Обо мне</p>
            <h2>Просто —<br /><em>не значит скучно.</em></h2>
            <p>Дизайн — это не украшение, а инструмент. Помогаю брендам выглядеть уверенно, говорить ясно и продавать больше.</p>
            <div className="tags"><span>Figma</span><span>Маркетплейсы</span><span>Инфографика</span><span>Нейросети</span></div>
            <a className="button button-ghost about-link" href="/about">Подробнее <span className="arrow">↗</span></a>
          </div>
        </Reveal>
      </section>

      <section className="contact section-line contact-hp">
        <Reveal>
          <div className="contact-main">
            <p className="eyebrow">/ Начнём?</p>
            <h2>Сделаем ваш<br /><em>продукт сильнее.</em></h2>
            <p>Расскажите о задаче — отвечу в течение рабочего дня.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="contact-links">
            <a href="https://t.me/ortamy" target="_blank" rel="noreferrer">Telegram <span className="arrow">↗</span></a>
          </div>
        </Reveal>
        <a className="button button-light contact-btn" href="https://t.me/ortamy" target="_blank" rel="noreferrer">Написать в Telegram <span className="arrow">↗</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}