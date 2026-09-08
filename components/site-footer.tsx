import Link from 'next/link';

const LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'E-commerce', href: '/wbdesign' },
  { label: 'Web', href: '/web' },
  { label: 'Brand', href: '/brand' },
  { label: 'Обо мне', href: '/about' },
  { label: 'Контакты', href: '/contact' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <Link href="/" className="site-logo">mono<span>.</span></Link>
        <nav aria-label="Навигация в футере">
          {LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
      </div>
      <div className="site-footer-bottom">
        <span>© mono.</span>
        <a href="https://t.me/ortamy" target="_blank" rel="noreferrer">Telegram ↗</a>
      </div>
    </footer>
  );
}