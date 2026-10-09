/**
 * Превью первого экрана кейса.
 *
 * По ключу item.preview выбирает нужный мини-макет, оборачивает его в
 * браузерный мокап и вешает бейдж с главной метрикой проекта.
 */
import type { ComponentType } from 'react';
import type { DesignCase, PreviewKey } from '@/data/design-cases';
import CasePreview from './case-preview';
import FurniturePreview from './previews/furniture-preview';
import BankPreview from './previews/bank-preview';
import DashboardPreview from './previews/dashboard-preview';
import DentalPreview from './previews/dental-preview';
import FoodPreview from './previews/food-preview';
import B2BPreview from './previews/b2b-preview';
import MonoPreview from './previews/mono-preview';
import AlephyPreview from './previews/alephy-preview';

const PREVIEWS: Record<PreviewKey, ComponentType> = {
  furniture: FurniturePreview,
  bank: BankPreview,
  dashboard: DashboardPreview,
  dental: DentalPreview,
  food: FoodPreview,
  b2b: B2BPreview,
  mono: MonoPreview,
  alephy: AlephyPreview,
};

/** Домен для адресной строки в мокапе браузера. */
const DOMAINS: Record<PreviewKey, string> = {
  furniture: 'mebelplus.ru',
  bank: 'finbank.ru',
  dashboard: 'analitikpro.ru',
  dental: 'stomaplus.ru',
  food: 'edaskoro.ru',
  b2b: 'stroypro.ru',
  mono: 'mono-studio.ru',
  alephy: 'alephy.lab',
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
        <span className="pointer-events-none absolute bottom-3 left-3 z-[2] inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur">
          <span className="text-[#7dd3fc]">{metric.value}</span>
          {metric.label}
        </span>
      ) : null}
    </div>
  );
}
