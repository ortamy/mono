/**
 * Шапка лендинга интернет-магазинов: светлая монохромная версия.
 * Отдельный компонент, чтобы не ломать тёмную шапку остальных страниц.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { label: 'Кейсы', href: '#cases' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

interface ShopHeaderProps {
  /** Пункты меню. По умолчанию — якоря секций главной. */
  links?: { label: string; href: string }[];
  /** Куда ведёт кнопка действия. На /audit — форма аудита, а не форма расчёта. */
  requestHref?: string;
  /** Подпись кнопки действия. */
  requestLabel?: string;
}

export default function ShopHeader({
  links = LINKS,
  requestHref = '#request',
  requestLabel = 'Рассчитать экономию',
}: ShopHeaderProps = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-agentos-line bg-agentos-card">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-[17px] font-semibold tracking-[-0.6px] text-agentos-ink" aria-label="mono — главная">
          mono<span className="text-agentos-faint">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Разделы">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-agentos-muted transition-colors hover:text-agentos-ink">
              {l.label}
            </a>
          ))}
          <a
            href={requestHref}
            className="inline-flex h-9 items-center rounded-control bg-agentos-ink px-4 text-[13px] font-medium text-white transition-colors hover:bg-agentos-graphite"
          >
            {requestLabel}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-agentos-line text-agentos-ink md:hidden"
        >
          {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
        </button>
      </div>

      <div className={cn('overflow-hidden border-t border-agentos-line bg-agentos-card md:hidden', open ? 'block' : 'hidden')}>
        <nav className="mx-auto flex max-w-[1160px] flex-col px-5 py-4 sm:px-8" aria-label="Мобильное меню">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-agentos-line py-3 text-[15px] text-agentos-ink">
              {l.label}
            </a>
          ))}
          <a
            href={requestHref}
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-control bg-agentos-ink px-4 text-[14px] font-medium text-white"
          >
            {requestLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
