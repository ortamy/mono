'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Главная', href: '/', end: true },
  { label: 'E-commerce', href: '/wbdesign' },
  { label: 'Web', href: '/web' },
  { label: 'Brand', href: '/brand' },
  { label: 'Обо мне', href: '/about' },
  { label: 'Контакты', href: '/contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string, end?: boolean) =>
    end ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e: MouseEvent) => {
      if (open && rootRef.current && e.target instanceof Node && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner" ref={rootRef}>
        <Link href="/" className="site-logo" aria-label="mono. — главная">mono<span>.</span></Link>

        <nav className="site-nav" aria-label="Основное меню">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href, n.end) ? 'active' : ''}>{n.label}</Link>
          ))}
        </nav>

        <button type="button" className="burger-btn" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="site-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="site-panel-inner">
                <nav className="site-panel-nav" aria-label="Меню разделов">
                  {NAV.map((n) => (
                    <Link key={n.href} href={n.href} className={isActive(n.href, n.end) ? 'active' : ''} onClick={() => setOpen(false)}>
                      <span>{n.label}</span><i className="arrow">↗</i>
                    </Link>
                  ))}
                </nav>
                <div className="site-panel-meta">
                  <a href="https://t.me/ortamy" target="_blank" rel="noreferrer"><span>Telegram</span><span className="arrow">↗</span></a>
                  <div className="site-panel-status"><span className="status-dot" />Открыт к проектам</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}