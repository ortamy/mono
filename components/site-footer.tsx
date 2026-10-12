import Link from 'next/link';
import { NAV } from '@/lib/nav';
import Logo from '@/components/logo';

/**
 * Подвал тёмных страниц (web, brand, about, contact, privacy).
 * Сетка как у shop/design: полоса на всю ширину, контент max-w-[1100px],
 * три колонки → одна на узком экране, нижняя полоса копирайта.
 */
export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="site-logo whitespace-nowrap" aria-label="mono. — на главную">
              <Logo />
            </Link>
            <p className="mt-3 max-w-[320px] text-[13px] leading-[1.6] text-[var(--muted)]">
              Продуктовый дизайн и ИИ-автоматизация для e-commerce и SaaS. Интерфейсы, которые считаются в метриках.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#77777e]">Разделы</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[14px] text-[var(--muted)] transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#77777e]">Связь</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="https://t.me/ortamy" target="_blank" rel="noreferrer" className="text-[14px] text-[var(--muted)] transition-colors hover:text-white">
                  Telegram @ortamy
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-[14px] text-[var(--muted)] transition-colors hover:text-white">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[14px] text-[var(--muted)] transition-colors hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-[12px] text-[#66666d] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} mono. Все права защищены.</span>
          <div className="flex items-center gap-5">
            <a href="https://t.me/ortamy" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Telegram</a>
            <Link href="/privacy" className="transition-colors hover:text-white">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
