// Домены данных генератора WB-карточек: конфиг ниши, контент товара, форматы.
// Контент и стиль ниши живут в JSON-конфигах (wbgen/content), код рендера их не хардкодит.

export type HexColor = string;

export type Rgb = { r: number; g: number; b: number };

/** Палитра ниши: фон подложки, чернильный текст, один акцент, вторичный текст, фон фото-зоны. */
export interface NichePalette {
  background: HexColor;
  ink: HexColor;
  muted: HexColor;
  accent: HexColor;
  photoBg: HexColor;
}

/** Типографика ниши: максимум две гарнитуры (гротеск + опциональный сериф). */
export interface NicheTypography {
  primary: string; // семейство основного гротеска, напр. "Inter"
  accent?: string | null; // опциональный акцентный сериф, напр. "Prata"
  headlineFont: 'primary' | 'accent'; // чем набирать заголовки
  quoteFont: 'primary' | 'accent'; // чем набирать цитаты
  capsTrackingEm: number; // трекинг капители, em (напр. 0.18)
}

/** Тон голоса и лимиты текстов — источник для QA и будущей LLM-генерации. */
export interface NicheVoice {
  tone: string;
  hookMax: number;
  subMax: number;
  bulletMax: number;
  badgeMax: number;
  rowValueMax: number;
  quoteMax: number;
  noExclaims: boolean;
  bannedWords: string[];
}

/** Обязательные элементы ниши: что должно присутствовать на конкретных слайдах. */
export interface NicheRequirement {
  slide: SlideType;
  /** ключи словаря labels, которые обязаны встретиться в строках характеристик */
  specRowKeys?: string[];
  /** подстрока, которую обязан содержать бейдж на слайде */
  badgeContains?: string;
}

export interface NicheConfig {
  id: string;
  title: string;
  description: string;
  palette: NichePalette;
  typography: NicheTypography;
  photo: { style: string; note: string };
  voice: NicheVoice;
  /** словарь лейблов ниши: металл, камень, объём, состав и т.д. */
  labels: Record<string, string>;
  requirements: NicheRequirement[];
}

export type SlideType =
  | 'cover'
  | 'pain'
  | 'benefits'
  | 'quality'
  | 'specs'
  | 'scenario'
  | 'proof'
  | 'cta';

export const SLIDE_ORDER: SlideType[] = [
  'cover',
  'pain',
  'benefits',
  'quality',
  'specs',
  'scenario',
  'proof',
  'cta',
];

/**
 * Контент одного слайда. Совместим с воронкой студии: поля hook/подзаголовок/
 * буллеты/бейджи/заметки — чтобы позже подключить LLM-генерацию текстов.
 */
export interface SlideContent {
  type: SlideType;
  /** капитель-лейбл (служебный, не смысл) */
  label?: string;
  hook?: string;
  sub?: string;
  badges?: string[];
  bullets?: string[];
  /** строки характеристик [лейбл, значение] */
  rows?: [string, string][];
  /** слайд «отзывы/сравнение»: честное сравнение с альтернативой */
  compare?: {
    title: string;
    columns: [string, string];
    rows: [string, string, string][];
  };
  /** цитата отзыва (используется вместо compare; демо-контент не выдумывает отзывы) */
  quote?: string;
  source?: string;
  /** какой фото-слот использовать */
  photo?: 'hero' | 'macro' | 'scenario';
  cta?: string;
  /** заметка к слайду — не рендерится, идёт в превью и отчёт (хинт для LLM) */
  note?: string;
}

export interface ProductContent {
  id: string;
  /** id конфига ниши */
  niche: string;
  title: string;
  /** вид демо-плейсхолдера, если реальных фото нет */
  placeholder: string;
  /** реальные фото; пути от корня репозитория; любой слот может отсутствовать */
  photos: { hero?: string; macro?: string; scenario?: string };
  slides: SlideContent[];
}

export type FormatId = 'square' | 'vertical';

export const FORMATS: Record<FormatId, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  vertical: { w: 900, h: 1200 },
};
