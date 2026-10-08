/**
 * Шапка портфолио: своя, не переиспользует shop-header лендинга mono —
 * там другой оффер (кастомные магазины) и другая навигация.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { DesignTheme } from './design-shell';

const LINKS = [
  { label: 'Работы', href: '/design/#work' },
  { label: 'Услуги', href: '/design/#services' },
  { label: 'Обо мне', href: '/design/#about' },
  { label: 'Контакты', href: '/design/#contact' },
];

interface Props {
  theme: DesignTheme;
  onToggleTheme: () => void;
}

export default function DesignHeader({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="d-card sticky top-0 z-50 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 sm:px-8">
        <Link href="/design/" className="text-[17px] font-semibold tracking-[-0.6px] text-[var(--d-ink)]" aria-label="UX/UI дизайнер — на главную портфолио">
          portfolio<span className="d-faint">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Разделы">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] d-muted transition-colors hover:text-[var(--d-ink)]">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            className="d-icon-btn"
            aria-label={theme === 'light' ? 'Включить чёрную тему' : 'Включить белую тему'}
            title={theme === 'light' ? 'Чёрная тема' : 'Белая тема'}
          >
            {theme === 'light' ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
          </button>
          <a href="https://t.me/mono_studio" target="_blank" rel="noreferrer" className="d-btn d-btn-primary h-9 px-4 text-[13px]">
            Написать в Telegram
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button type="button" onClick={onToggleTheme} className="d-icon-btn" aria-label={theme === 'light' ? 'Включить чёрную тему' : 'Включить белую тему'}>
            {theme === 'light' ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            className="d-icon-btn"
          >
            {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <nav
        className={`d-card border-x-0 border-t-0 rounded-none md:hidden ${open ? 'block' : 'hidden'}`}
        aria-label="Мобильное меню"
      >
        <div className="mx-auto flex max-w-[1100px] flex-col px-5 py-3 sm:px-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-[var(--d-line)] py-3 text-[15px] text-[var(--d-ink)]">
              {l.label}
            </a>
          ))}
          <a href="https://t.me/mono_studio" target="_blank" rel="noreferrer" className="d-btn d-btn-primary mt-4 w-full">
            Написать в Telegram
          </a>
        </div>
      </nav>
    </header>
  );
}