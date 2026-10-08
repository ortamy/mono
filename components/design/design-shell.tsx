/**
 * Оболочка портфолио /design: две темы интерфейса (белая/чёрная).
 *
 * Атрибут data-theme вешается на корневой div — так стили из
 * app/design/design.css действуют только на этом маршруте и не трогают
 * главную mono (она тёмная от globals.css и остаётся какой была).
 *
 * Тема читается из localStorage через useSyncExternalStore, а не через
 * useState + useEffect: React обязан отдать на сервере и при гидратации
 * один и тот же HTML (иначе mismatch), поэтому для SSR есть
 * getServerSnapshot со светлой темой, а сохранённое значение
 * подхватывается сразу после. Переключение пишет localStorage
 * и обновляет локальный override.
 */
'use client';

import { useCallback, useState, useSyncExternalStore, type ReactNode } from 'react';
import DesignHeader from './design-header';
import DesignFooter from './design-footer';

export type DesignTheme = 'light' | 'dark';

const STORAGE_KEY = 'design-theme';

function normalize(value: string | null): DesignTheme {
  return value === 'dark' ? 'dark' : 'light';
}

/** Реакция на смену темы в соседней вкладке (storage-событие). */
function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

function getSnapshot(): DesignTheme {
  return normalize(window.localStorage.getItem(STORAGE_KEY));
}

// На сервере и при гидратации — всегда светлая тема: это и есть контракт
// с отрендеренным HTML, сохранённое значение применится на клиенте.
function getServerSnapshot(): DesignTheme {
  return 'light';
}

export default function DesignShell({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // override живёт после переключения в этой вкладке: storage-событие не
  // приходит в вкладку, которая его вызвала.
  const [override, setOverride] = useState<DesignTheme | null>(null);
  const theme = override ?? stored;

  const toggleTheme = useCallback(() => {
    const next: DesignTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem(STORAGE_KEY, next);
    setOverride(next);
  }, [theme]);

  return (
    <div className="design-scope min-h-screen" data-theme={theme}>
      <DesignHeader theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">{children}</main>
      <DesignFooter />
    </div>
  );
}