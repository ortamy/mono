/**
 * Превью первого экрана кейса.
 *
 * По ключу item.preview выбирает нужный мини-макет, оборачивает его в
 * браузерный мокап и вешает бейдж с главной метрикой проекта.
 */
import type { ComponentType } from 'react';
import type { DesignCase, PreviewKey } from '@/data/design-cases';
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

export default function CaseScreenshot({
  item,
  className,
}: {
  item: DesignCase;
  className?: string;
}) {
  const Preview = PREVIEWS[item.preview];
  const metric = item.metrics[0];

  return (
    <div className={`relative ${className ?? ''}`}>
      <CasePreview
        url={`https://${DOMAINS[item.preview]}`}
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
