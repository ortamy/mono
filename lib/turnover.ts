/**
 * Единый источник правды по диапазонам оборота.
 *
 * Раньше лендинг и API держали диапазоны каждый в своём файле, и значения не
 * совпадали: форма отдавала '1M-3M' / '3M-10M', а карта экономии в API ждала
 * '1-3M' / '3-10M'. Лиды с самым частым оборотом молча получали savings = 0.
 * Теперь и подписи select, и расчёт берутся отсюда.
 */

export interface TurnoverBand {
  /** Ключ диапазона: он же value в select и одновременно ключ расчёта. */
  value: string;
  /** Подпись для выпадающего списка формы. */
  label: string;
  /** Оценка годовой экономии на своём магазине, ₽. */
  savings: number;
}

export const TURNOVER_BANDS: TurnoverBand[] = [
  { value: '100-500k', label: '100 тыс — 500 тыс ₽/мес', savings: 300_000 },
  { value: '500k-1M', label: '500 тыс — 1 млн ₽/мес', savings: 900_000 },
  { value: '1-3M', label: '1 — 3 млн ₽/мес', savings: 2_400_000 },
  { value: '3-10M', label: '3 — 10 млн ₽/мес', savings: 7_800_000 },
  { value: '10M+', label: 'больше 10 млн ₽/мес', savings: 18_000_000 },
];

const BY_VALUE = new Map(TURNOVER_BANDS.map((band) => [band.value, band]));

/** Годовая экономия по диапазону; 0 для неизвестного значения. */
export function savingsForBand(turnover: string): number {
  return BY_VALUE.get(turnover)?.savings ?? 0;
}

/** Человекочитаемая подпись диапазона для уведомления в Telegram. */
export function turnoverLabel(turnover: string): string {
  return BY_VALUE.get(turnover)?.label ?? turnover;
}