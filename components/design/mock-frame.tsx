/**
 * Изолирующая рамка мокапа: объявляет тему для всего, что внутри.
 *
 * Мокапы кейсов — «скриншоты» чужих продуктов: у них своя палитра, и часть
 * элементов внутри окрашивается через переменные --d-*. Без явной границы
 * такие элементы наследуют тему родителя, и светлый мокап внутри тёмной
 * страницы (или наоборот) рассыпается: фон остаётся светлым, а токены внутри
 * становятся тёмными. Поэтому `theme` — обязательный проп: каждый мокап
 * декларирует свою тему сам и не зависит от .design-scope.
 *
 * Набор токенов для обоих значений описан в app/design/design.css селекторами
 * [data-theme='light'] и [data-theme='dark'].
 */
import type { CSSProperties, ReactNode } from 'react';

export type MockTheme = 'light' | 'dark';

export default function MockFrame({
  theme,
  className = '',
  style,
  children,
}: {
  /** Тема мокапа. Обязательна: без неё элементы унаследуют тему родителя. */
  theme: MockTheme;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      data-theme={theme}
      className={className}
      style={{ background: 'var(--d-bg)', color: 'var(--d-ink)', ...style }}
    >
      {children}
    </div>
  );
}
