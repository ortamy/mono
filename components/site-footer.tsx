import Link from 'next/link';
import { NAV } from '@/lib/nav';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <Link href="/" className="site-logo">mono<span>.</span></Link>
        <nav aria-label="Навигация в футере">
          {NAV.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          <Link href="/privacy">Политика конфиденциальности</Link>
        </nav>
      </div>
      <div className="site-footer-bottom">
        <span>© mono. Все права защищены.</span>
        <a href="https://t.me/ortamy" target="_blank" rel="noreferrer">Telegram ↗</a>
      </div>
    </footer>
  );
}