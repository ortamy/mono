/**
 * Превью первого экрана кейса.
 *
 * По ключу item.preview выбирает нужный мини-макет, оборачивает его в
 * браузерный мокап и вешает бейдж с главной метрикой проекта.
 *
 * Реестр превью (компонент + домен для адресной строки) передаётся
 * снаружи: у /design — свой по умолчанию, у /agents — свой
 * (components/agents/agent-previews.tsx). Поэтому компонент
 * переиспользуется обеими страницами и не знает о чужих типах данных.
 */
import type { ComponentType } from 'react';
import type { PreviewKey } from '@/data/design-cases';
import CasePreview from './case-preview';
import MonoPreview from './previews/mono-preview';
import LookbookPreview from './previews/lookbook-preview';
import BankPreview from './previews/bank-preview';
import DashboardPreview from './previews/dashboard-preview';
import SlotsPreview from './previews/slots-preview';
import MapPreview from './previews/map-preview';
import SpecsheetPreview from './previews/specsheet-preview';
import AlephyPreview from './previews/alephy-preview';
import TraqPreview from './previews/traq-preview';
import BasePreview from './previews/base-preview';

const PREVIEWS: Record<PreviewKey, ComponentType> = {
  mono: MonoPreview,
  lookbook: LookbookPreview,
  bank: BankPreview,
  dashboard: DashboardPreview,
  slots: SlotsPreview,
  map: MapPreview,
  specsheet: SpecsheetPreview,
  alephy: AlephyPreview,
  traq: TraqPreview,
  base: BasePreview,
};

/** Домен для адресной строки в мокапе браузера. */
const DOMAINS: Record<PreviewKey, string> = {
  mono: 'mono-studio.ru',
  lookbook: 'versta.ru',
  bank: 'nordbank.ru',
  dashboard: 'metrik.ru',
  slots: 'levin.clinic',
  map: 'ukus.ru',
  specsheet: 'ferro-industrial.ru',
  alephy: 'alephy.lab',
  traq: 'traq.dev',
  base: 'base.dev',
};

/** Метрика для бейджа поверх макета. */
export interface ScreenshotMetric {
  value: string;
  label: string;
}

/** Минимальные данные карточки, нужные для превью. */
export interface ScreenshotItem {
  /** Ключ превью в реестре. */
  preview: string;
  /** Название проекта — для aria-label браузерного мокапа. */
  title: string;
  /** Первая метрика попадает в бейдж поверх макета. */
  metrics: readonly ScreenshotMetric[];
}

/** Один пункт реестра: мини-макет и домен для адресной строки. */
export interface PreviewEntry {
  Preview: ComponentType;
  domain: string;
}

/** Реестр превью: ключ кейса → макет и домен. */
export type PreviewRegistry = Record<string, PreviewEntry>;

/** Реестр /design, собранный из типизированных карт выше. */
function designRegistry(): PreviewRegistry {
  const registry: PreviewRegistry = {};
  (Object.keys(PREVIEWS) as PreviewKey[]).forEach((key) => {
    registry[key] = { Preview: PREVIEWS[key], domain: DOMAINS[key] };
  });
  return registry;
}

const DESIGN_REGISTRY = designRegistry();

export default function CaseScreenshot({
  item,
  registry = DESIGN_REGISTRY,
  className,
}: {
  item: ScreenshotItem;
  registry?: PreviewRegistry;
  className?: string;
}) {
  const entry = registry[item.preview];
  const metric = item.metrics[0];
  // Ключ вне реестра — ошибка данных: молча не рисуем карточку, а не падаем.
  if (!entry) return null;
  const { Preview, domain } = entry;

  return (
    <div className={`relative ${className ?? ''}`}>
      <CasePreview
        url={`https://${domain}`}
        label={`Первый экран проекта «${item.title}»`}
      >
        <Preview />
      </CasePreview>

      {/* Главная метрика кейса поверх макета. */}
      {metric ? (
        <span className="pointer-events-none absolute bottom-3 left-3 z-[2] inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-black/85 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur">
          <span className="shrink-0 font-semibold tabular-nums text-white">{metric.value}</span>
          <span className="min-w-0 truncate text-white/55">{metric.label}</span>
        </span>
      ) : null}
    </div>
  );
}
