/**
 * Обёртка над Яндекс.Метрикой.
 *
 * ID счётчика берётся из NEXT_PUBLIC_METRIKA_ID. Если переменной нет — счётчик
 * не подключается вовсе и все вызовы trackGoal становятся no-op. Так на
 * локальной машине и в превью не гоняется лишний внешний скрипт, а на проде
 * достаточно задать одну переменную окружения.
 *
 * Идентификаторы целей дублируются в lib/metrika-goals.ts, чтобы не искать их
 * по строкам в компонентах.
 */

export const METRIKA_ID = process.env.NEXT_PUBLIC_METRIKA_ID || '';

/** Включена ли Метрика: без ID нет ни скрипта, ни целей. */
export const metrikaEnabled = METRIKA_ID.length > 0;

/**
 * Цели Метрики. Держим константами, потому что Яндекс.Метрика показывает их в
 * отчёте по именам: опечатка в строке создаёт новую цель и разрывает статистику.
 */
export const GOALS = {
  leadSubmit: 'lead_submit',
  ctaClick: 'cta_click',
  calculatorUsed: 'calculator_used',
} as const;

export type Goal = (typeof GOALS)[keyof typeof GOALS] | (string & {});

/** Минимальный контракт глобальной функции ym, которую создаёт tag.js. */
export type YmFn = (
  id: string,
  method: 'init' | 'reachGoal' | 'reachGoalOnce',
  goal: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    ym?: YmFn;
  }
}

/**
 * Отправляет цель в Метрику, если она подключена.
 *
 * Ошибки глушатся: аналитика не должна ломать интерфейс, если скрипт не
 * загрузился или счётчик ещё не инициализирован (например, цель вызвали
 * раньше, чем отработал tag.js).
 */
export function trackGoal(goal: Goal, params?: Record<string, unknown>): void {
  if (!metrikaEnabled || typeof window === 'undefined') return;
  try {
    window.ym?.(METRIKA_ID, 'reachGoal', goal, params);
  } catch {
    // Счётчик недоступен — молча продолжаем работу формы.
  }
}

/** Клиентский хук: стабильная ссылка на функцию отправки цели. */
export function useMetrika() {
  return trackGoal;
}