import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Разделы',
    links: [
      { label: 'Кейсы', href: '/#cases' },
      { label: 'Тарифы', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Решение', href: '/#solution' },
      { label: 'Бесплатный аудит', href: '/audit' },
    ],
  },
  {
    title: 'Связь',
    links: [
      { label: 'Telegram @mono_studio', href: 'https://t.me/mono_studio', external: true },
      { label: 'hello@mono.studio', href: 'mailto:hello@mono.studio', external: true },
    ],
  },
];

/** Подвал лендинга: логотип, навигация, контакты, копирайт. */
export default function ShopFooter() {
  return (
    <footer className="border-t border-agentos-line bg-agentos-card">
      <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-[18px] font-semibold tracking-[-0.6px] text-agentos-ink">
              mono<span className="text-agentos-faint">.</span>
            </Link>
            <p className="mt-3 max-w-[320px] text-[13px] leading-[1.6] text-agentos-muted">
              Кастомные интернет-магазины с ИИ-автоматизацией. Без комиссий маркетплейсов.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.08em] text-agentos-faint">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {'external' in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-[14px] text-agentos-muted transition-colors hover:text-agentos-ink">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={'href' in l ? l.href : '#'} className="text-[14px] text-agentos-muted transition-colors hover:text-agentos-ink">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-agentos-line pt-6 text-[12px] text-agentos-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} mono. Все права защищены.</span>
          <div className="flex items-center gap-5">
            <a href="https://t.me/mono_studio" target="_blank" rel="noreferrer" className="transition-colors hover:text-agentos-ink">Telegram</a>
            <Link href="/privacy" className="transition-colors hover:text-agentos-ink">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}