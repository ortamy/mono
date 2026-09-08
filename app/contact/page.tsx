import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Reveal from '@/components/reveal';

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      <section className="page-hero">
        <p className="eyebrow">/ Контакты</p>
        <h1>Расскажите<br /><span>о задаче.</span></h1>
        <p className="page-sub">Отвечу в течение рабочего дня. Удобный формат — Telegram или короткий созвон.</p>
      </section>

      <section className="contact-grid">
        <Reveal>
          <div className="contact-info">
            <div className="contact-links">
              <a href="https://t.me/ortamy" target="_blank" rel="noreferrer">Telegram <span className="arrow">↗</span></a>
            </div>
            <div className="site-panel-status"><span className="status-dot" />Открыт к проектам</div>
          </div>
        </Reveal>
        <Reveal>
          <div className="contact-form-block">
            <p className="eyebrow">/ Связь</p>
            <h3 className="contact-big-title">Напишите<br />в Telegram</h3>
            <p className="contact-big-sub">Расскажите о задаче, приложите референсы— отвечу с планом работ.</p>
            <a className="button button-light big-btn" href="https://t.me/ortamy" target="_blank" rel="noreferrer">Написать в Telegram <span className="arrow">↗</span></a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}