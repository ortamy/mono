/** Подвал портфолио: контакты, разделы, ссылка на основной сайт mono. */
import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Разделы',
    links: [
      { label: 'Работы', href: '/design/#work' },
      { label: 'Услуги', href: '/design/#services' },
      { label: 'Обо мне', href: '/design/#about' },
      { label: 'Контакты', href: '/design/#contact' },
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

export default function DesignFooter() {
  return (
    <footer className="d-surface border-t border-[var(--d-line)]">
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-9 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.6px] text-[var(--d-ink)]">
              portfolio<span className="d-faint">.</span>
            </p>
            <p className="mt-3 max-w-[300px] text-[13px] leading-[1.6] d-muted">
              UX/UI-дизайнер: сайты, приложения и интерфейсы. Figma, AI-инструменты, дизайн-системы.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.08em] d-faint">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {'external' in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-[14px] d-muted transition-colors hover:text-[var(--d-ink)]">
                        {l.label}
                      </a>
                    ) : (
                      <a href={'href' in l ? l.href : '#'} className="text-[14px] d-muted transition-colors hover:text-[var(--d-ink)]">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--d-line)] pt-5 text-[12px] d-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} UX/UI дизайнер. Все права защищены.</span>
          <div className="flex items-center gap-5">
            <a href="https://t.me/mono_studio" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--d-ink)]">Telegram</a>
            <Link href="/" className="transition-colors hover:text-[var(--d-ink)]">Сайт mono</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}