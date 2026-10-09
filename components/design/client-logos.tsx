/**
 * Полоса логотипов клиентов: SVG-иконка в квадрате + название, чёрным на белом.
 */
import { CASE_ICONS } from './case-icons';
import type { PreviewKey } from '@/data/design-cases';

const CLIENTS: { name: string; icon: PreviewKey }[] = [
  { name: 'Мебель+', icon: 'furniture' },
  { name: 'ФинБанк', icon: 'bank' },
  { name: 'АналитикПро', icon: 'dashboard' },
  { name: 'Стома+', icon: 'dental' },
  { name: 'ЕдаСкоро', icon: 'food' },
  { name: 'СтройПро', icon: 'b2b' },
];

export default function ClientLogos() {
  return (
    <section aria-label="Клиенты" className="mx-auto max-w-[1100px] px-5 pb-4 sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.08em] d-faint">С кем работал</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
        {CLIENTS.map(({ name, icon }) => {
          const Icon = CASE_ICONS[icon];
          return (
            <li key={name} className="flex items-center gap-2.5 text-[var(--d-ink)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--d-line)]">
                <Icon size={17} strokeWidth={1.6} aria-hidden />
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.3px]">{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
