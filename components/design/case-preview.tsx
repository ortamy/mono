/**
 * Браузерный мокап вокруг превью первого экрана кейса.
 *
 * Внутрь передаётся вёрстка первого экрана (см. components/design/previews/*).
 * Рамка ничего не знает о содержимом. Все размеры внутри превью задаются в cqw —
 * это 1% ширины контейнера, поэтому один и тот же макет одинаково выглядит и в
 * карточке сетки, и в hero на странице кейса (контейнер здесь — сам мокап).
 */
import type { ReactNode } from 'react';

export default function CasePreview({
  url,
  label,
  children,
}: {
  url: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#dcdce2] [container-type:inline-size]"
      role="img"
      aria-label={label}
    >
      {/* Полоска браузера: три точки и адрес. */}
      <div className="flex h-[5cqw] items-center gap-[1cqw] border-b border-black/10 bg-[#eceded] px-[2cqw]">
        <span className="h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-[1cqw] truncate rounded-[1cqw] bg-white px-[1.5cqw] py-[0.45cqw] text-[1.35cqw] leading-[1.5] text-[#8b8b93]">
          {url}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[5cqw] overflow-hidden">{children}</div>
    </div>
  );
}
