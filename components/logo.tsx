/**
 * Единый логотип сайта: «mono. / раздел».
 *
 * Раньше разметку логотипа каждая шапка собирала сама — главная и остальные
 * разделы печатали «mono.», а портфолио «portfolio.», поэтому один и тот же
 * бренд выглядел на сайте по-разному. Теперь структура одна на все страницы, а
 * раздел приходит пропсом от маршрута.
 *
 * Цвета и кегль задаёт вызывающая сторона: в тёмной шапке это класс .site-logo
 * (его потомки уже серые), в светлой — text-agentos-faint, в портфолио —
 * d-faint. Поэтому компонент не привязан ни к одной теме и остаётся серверным.
 */
import { cn } from '@/lib/utils';

export interface LogoProps {
  /** Бренд. На всём сайте — «mono.». */
  brand?: string;
  /**
   * Раздел текущей страницы: portfolio, agents, stack, audit, web…
   * Без него печатается только бренд — так выглядит футер и главная.
   */
  section?: string;
  /** Классы корня: кегль, вес, цвет бренда. */
  className?: string;
  /** Классы точки бренда и хвоста «/ раздел» — приглушённый цвет. */
  mutedClassName?: string;
}

export default function Logo({ brand = 'mono.', section, className, mutedClassName }: LogoProps) {
  // Точку отделяем от слова, чтобы покрасить её вместе с разделителем: во всех
  // трёх темах она такая же приглушённая.
  const [word, dot] = brand.endsWith('.') ? [brand.slice(0, -1), '.'] : [brand, ''];

  return (
    <span className={className}>
      {word}
      <span className={mutedClassName}>{dot}</span>
      {section ? <span className={cn('font-normal', mutedClassName)}>{' / '}{section}</span> : null}
    </span>
  );
}
