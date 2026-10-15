/**
 * Шапка лендинга /agents: якорная навигация по блокам страницы.
 *
 * Не переиспользует пункты /design — клиент приходит купить агента,
 * а не смотреть дизайн-портфолио. Визуал тот же (тема, бургер, Telegram),
 * меняются только ссылки.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Menu, Moon, Send, Sun, X } from 'lucide-react';
import type { DesignTheme } from '@/components/design/design-shell';
import Logo from '@/components/logo';

const TELEGRAM = 'https://t.me/ortamy';

/** Якоря блоков /agents. На страницах кейсов путь префиксируется `/agents/`. */
const SECTION_LINKS = [
  { label: 'Возможности', href: '#chatbot' },
  { label: 'Кейсы', href: '#work' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Заявка', href: '#contact' },
];

interface Props {
  theme: DesignTheme;
  onToggleTheme: () => void;
}

function isAgentsWorkPath(pathname: string): boolean {
  // trailingSlash: /agents/work/slug/ — проверяем и со слэшем, и без.
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return path.includes('/agents/work/');
}

export default function AgentsHeader({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '';
  const onWorkPage = isAgentsWorkPath(pathname);

  // На /agents — чистые якоря (плавный скролл на месте).
  // На /agents/work/* — переход на лендинг + якорь.
  const links = SECTION_LINKS.map((l) => ({
    ...l,
    href: onWorkPage ? `/agents/${l.href}` : l.href,
  }));

  return (
    <header className="d-card sticky top-0 z-50 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 sm:px-8">
        <Link href="/agents/" className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.6px] text-[var(--d-ink)]" aria-label="mono. / agents — на лендинг агентов">
          <Logo section="agents" mutedClassName="d-faint" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Разделы">
          {onWorkPage ? (
            <Link href="/agents/" className="inline-flex items-center gap-1.5 text-[13px] d-muted transition-colors hover:text-[var(--d-ink)]">
              <ArrowLeft size={14} strokeWidth={1.5} aria-hidden /> Назад к агентам
            </Link>
          ) : null}
          {links.map((l) => (
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
          <a href={TELEGRAM} target="_blank" rel="noreferrer" className="d-btn d-btn-primary h-auto whitespace-nowrap px-3 py-2 text-sm md:h-9 md:px-4 md:text-[13px]">
            <Send size={14} strokeWidth={1.5} className="md:hidden" aria-hidden /> Написать
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a href={TELEGRAM} target="_blank" rel="noreferrer" className="d-btn d-btn-primary h-10 whitespace-nowrap px-4 py-0 text-sm">
            <Send size={14} strokeWidth={1.5} aria-hidden /> Написать
          </a>
          <button type="button" onClick={onToggleTheme} className="d-icon-btn h-10 w-10" aria-label={theme === 'light' ? 'Включить чёрную тему' : 'Включить белую тему'}>
            {theme === 'light' ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            className="d-icon-btn h-10 w-10"
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
          {onWorkPage ? (
            <Link href="/agents/" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 border-b border-[var(--d-line)] py-3 text-[15px] text-[var(--d-ink)]">
              <ArrowLeft size={15} strokeWidth={1.5} aria-hidden /> Назад к агентам
            </Link>
          ) : null}
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-[var(--d-line)] py-3 text-[15px] text-[var(--d-ink)]">
              {l.label}
            </a>
          ))}
          <a href={TELEGRAM} target="_blank" rel="noreferrer" className="d-btn d-btn-primary mt-4 w-full whitespace-nowrap">
            Написать
          </a>
        </div>
      </nav>
    </header>
  );
}
