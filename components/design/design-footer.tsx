/** Подвал портфолио: контакты, разделы, ссылка на основной сайт mono. */
import Link from 'next/link';
import Logo from '@/components/logo';

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
      { label: 'Telegram @ortamy', href: 'https://t.me/ortamy', external: true },
      { label: 'hamaschiah@proton.me', href: 'mailto:hamaschiah@proton.me', external: true },
    ],
  },
];

export default function DesignFooter() {
  return (
    <footer className="d-surface mx-0 w-full max-w-none border-t border-[var(--d-line)] overflow-hidden">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <p className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.6px] text-[var(--d-ink)]">
              <Logo mutedClassName="d-faint" />
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
                  <li key={l.label} className="break-words">
                    {'external' in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-sm sm:text-base d-muted transition-colors hover:text-[var(--d-ink)] break-words">
                        {l.label}
                      </a>
                    ) : (
                      <a href={'href' in l ? l.href : '#'} className="text-sm sm:text-base d-muted transition-colors hover:text-[var(--d-ink)] break-words">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--d-line)] pt-4 text-[12px] d-faint sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          <span>© {new Date().getFullYear()} UX/UI дизайнер. Все права защищены.</span>
          <div className="flex items-center gap-5">
            <a href="https://t.me/ortamy" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--d-ink)]">Telegram</a>
            <Link href="/" className="transition-colors hover:text-[var(--d-ink)]">Сайт mono</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}