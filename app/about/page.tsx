import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Reveal from '@/components/reveal';

const PRINCIPLES = [
  { num: '01', title: 'Понятная задача', desc: 'Сначала разбираюсь в продукте, конкуренции и аудитории — затем берусь за дизайн.' },
  { num: '02', title: 'Быстрые итерации', desc: 'Показываю промежуточные варианты и корректирую их по вашей обратной связи.' },
  { num: '03', title: 'Правки включены', desc: 'Довожу результат до точного соответствия задаче без доплат за мелочи.' },
  { num: '04', title: 'Честные сроки', desc: 'Называю реалистичные дедлайны и держу их — предсказуемость важнее громких обещаний.' },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />

      <section className="page-hero about-hero">
        <p className="eyebrow">/ Обо мне</p>
        <h1>Дизайн — это<br /><span>не украшение.</span></h1>
        <p className="page-sub">Я соединяю насмотренность, маркетинг и внимание к деталям, чтобы каждая работа решала конкретную задачу: привлекала внимание, объясняла продукт и вела к покупке.</p>
      </section>

      <section className="page-cards">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">/ Принципы</p>
            <h2>Как я работаю.</h2>
          </div>
        </Reveal>
        <div className="card-grid">
          {PRINCIPLES.map((p) => (
            <Reveal key={p.num}>
              <div className="mini-card">
                <span className="card-number">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="tools-line">
            <p className="eyebrow">/ Инструменты</p>
            <div className="tags"><span>Figma</span><span>Маркетплейсы</span><span>Инфографика</span><span>Нейросети</span><span>Прототипирование</span><span>А/Б-тесты</span></div>
          </div>
        </Reveal>
      </section>

      <section className="cta-strip">
        <Reveal><h2>Хотите работать вместе?</h2></Reveal>
        <Reveal><a className="button button-light" href="/contact">Связаться <span className="arrow">↗</span></a></Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}