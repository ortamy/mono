'use client';

import { useEffect } from 'react';

const Arrow = () => <span className="arrow">↗</span>;
const Check = () => <span className="check">✓</span>;

export default function Home() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <main>
    <header className="header"><a href="#top" className="logo">mono<span>.</span></a><nav><a href="#work">Работы</a><a href="#services">Услуги</a><a href="#prices">Тарифы</a><a href="#contacts">Контакты</a></nav><a className="header-cta" href="#contacts">Обсудить проект <Arrow /></a><button className="menu" aria-label="Открыть меню">☰</button></header>

    <section id="top" className="hero"><div className="liquid-orb" aria-hidden="true"><div className="orb-shine" /></div><div className="hero-content reveal"><p className="eyebrow"><i /> Дизайн карточек маркетплейсов</p><h1>Продающие карточки<br /><span>для Wildberries и Ozon</span></h1><p className="hero-subtitle">Дизайн, который повышает CTR<br className="desktop" /> и конверсию в покупку.</p><div className="hero-actions"><a className="button button-light" href="#work">Смотреть работы <Arrow /></a><a className="button button-ghost" href="#contacts">Обсудить задачу <Arrow /></a></div></div><div className="hero-note">/ 01<br /><span>SCROLL TO EXPLORE</span></div></section>

    <section className="metrics section-line reveal"><div><strong>+30%</strong><span>средний рост CTR</span></div><div><strong>+20%</strong><span>к конверсии в заказ</span></div><div><strong>8</strong><span>слайдов в одной воронке</span></div><div><strong>48<span className="unit">ч</span></strong><span>срок первой концепции</span></div></section>

    <section id="services" className="section services"><div className="section-heading reveal"><p className="eyebrow">/ Услуги</p><h2>Дизайн, который<br /><em>работает на результат.</em></h2></div><div className="service-grid"><article className="service-card reveal"><span className="card-number">01</span><h3>Обложка</h3><p>Первое впечатление, которое останавливает скролл и ведёт к покупке.</p><a href="#contacts">Подробнее <Arrow /></a></article><article className="service-card reveal"><span className="card-number">02</span><h3>Воронка из 8 слайдов</h3><p>Последовательная история продукта: от внимания до уверенного решения.</p><a href="#contacts">Подробнее <Arrow /></a></article><article className="service-card reveal"><span className="card-number">03</span><h3>А/Б-тесты</h3><p>Проверяем гипотезы и находим визуальную подачу, которая даёт больше кликов.</p><a href="#contacts">Подробнее <Arrow /></a></article><article className="service-card reveal"><span className="card-number">04</span><h3>Редизайн</h3><p>Разбираем текущую карточку, устраняем слабые места и усиливаем конверсию.</p><a href="#contacts">Подробнее <Arrow /></a></article></div></section>

    <section id="work" className="section portfolio"><div className="section-heading reveal"><p className="eyebrow">/ Избранные работы</p><h2>Визуал, который<br /><em>говорит за продукт.</em></h2></div><div className="portfolio-grid"><Project num="01" title="Alba Skin" type="Уход за кожей" tone="peach" label="skin" /><Project num="02" title="Nord Coffee" type="Премиум кофе" tone="cream" label="coffee" /><Project num="03" title="Forma Home" type="Товары для дома" tone="blue" label="home" /><Project num="04" title="Ritual" type="Витамины и wellness" tone="green" label="ritual" /></div></section>

    <section className="section process"><div className="section-heading reveal"><p className="eyebrow">/ Процесс</p><h2>Чётко. Спокойно.<br /><em>По делу.</em></h2></div><div className="process-list"><div className="process-item reveal"><span>01</span><div><h3>Заявка и ТЗ</h3><p>Погружаемся в задачу, изучаем продукт и аудиторию.</p></div><b>↘</b></div><div className="process-item reveal"><span>02</span><div><h3>Текст и прототип</h3><p>Выстраиваем смысловую структуру каждого слайда.</p></div><b>↘</b></div><div className="process-item reveal"><span>03</span><div><h3>Дизайн и правки</h3><p>Собираем визуал и доводим его до точного результата.</p></div><b>↘</b></div><div className="process-item reveal"><span>04</span><div><h3>Сдача</h3><p>Передаём готовые файлы и рекомендации по запуску.</p></div><b>↗</b></div></div></section>

    <section id="prices" className="section pricing"><div className="section-heading reveal"><p className="eyebrow">/ Тарифы</p><h2>Выберите свой<br /><em>формат работы.</em></h2></div><div className="price-grid"><Price title="Обложка" price="2 000" desc="Для быстрого старта или обновления первого экрана." features={['1 главный слайд', '2 варианта концепции', 'Срок — 2 дня']} /><Price title="Воронка" price="8 000" desc="Полная упаковка карточки, которая ведёт к покупке." features={['8 слайдов', 'Прототип и тексты', '2 круга правок']} featured /><Price title="На месяц" price="60 000" desc="Дизайн-партнёрство для стабильного роста магазина." features={['До 30 слайдов', 'Приоритетные задачи', 'Еженедельная связь']} /></div></section>

    <section className="section about"><div className="about-shape reveal">W<span>.</span></div><div className="about-copy reveal"><p className="eyebrow">/ Обо мне</p><h2>Дизайн — это<br /><em>не украшение.</em></h2><p>Я помогаю брендам выглядеть уверенно и продавать больше. Соединяю насмотренность, маркетинг и внимание к деталям, чтобы каждая карточка решала свою задачу.</p><div className="tags"><span>Figma</span><span>Маркетплейсы</span><span>Инфографика</span><span>Нейросети</span></div></div></section>

    <section id="contacts" className="contact section-line"><div className="contact-main reveal"><p className="eyebrow">/ Начнём?</p><h2>Давайте сделаем<br /><em>ваш продукт сильнее.</em></h2><p>Расскажите о задаче — отвечу в течение рабочего дня.</p><a className="button button-light" href="#contacts">Обсудить проект <Arrow /></a></div><div className="contact-links reveal"><a href="https://t.me/ortamy" target="_blank">Telegram <Arrow /></a></div></section>
    <footer><a className="logo" href="#top">mono<span>.</span></a><span>© 2024 — дизайн карточек WB / Ozon</span><a href="#top">Наверх ↑</a></footer>
  </main>;
}

function Project({ num, title, type, tone, label }: { num: string; title: string; type: string; tone: string; label: string }) { return <article className={`project reveal ${tone}`}><div className="project-art"><span className="art-caption">{label === 'skin' ? 'ALBA' : label === 'coffee' ? 'NORD' : label === 'home' ? 'FORMA' : 'RITUAL'}</span><div className={`art-object ${label}`}><span>{label === 'coffee' ? 'N° 03' : label === 'ritual' ? 'RITUAL' : label === 'home' ? 'FORMA' : 'ALBA'}</span></div><small>CASE / {num}</small></div><div className="project-meta"><div><h3>{title}</h3><p>{type}</p></div><Arrow /></div></article> }
function Price({ title, price, desc, features, featured = false }: { title: string; price: string; desc: string; features: string[]; featured?: boolean }) { return <article className={`price-card reveal ${featured ? 'featured' : ''}`}><div><p className="price-label">{title}</p><h3>от {price} ₽</h3><p className="price-desc">{desc}</p></div><ul>{features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul><a href="#contacts">Выбрать тариф <Arrow /></a></article> }