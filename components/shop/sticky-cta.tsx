/**
 * Липкая кнопка «Рассчитать экономию» на мобильных: появляется после первого
 * экрана и прячется, когда форма уже видна, чтобы не перекрывать контент.
 */
'use client';

import { useEffect, useState } from 'react';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById('request');
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      const formTop = form?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const formVisible = formTop < window.innerHeight;
      setVisible(pastHero && !formVisible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-agentos-line bg-agentos-card px-4 py-3 sm:hidden">
      <a
        href="#request"
        className="inline-flex h-12 w-full items-center justify-center rounded-control bg-agentos-ink text-[15px] font-medium text-white"
      >
        Рассчитать экономию
      </a>
    </div>
  );
}