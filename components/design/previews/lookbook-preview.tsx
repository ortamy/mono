/**
 * Кейс «Versta» — светлый первый экран мастерской мебели.
 * Архетип: лукбук — крупное фото уходит за сетку (обрезается краем),
 * слева оффер и свотчи материалов. Фото приглушено до монохрома.
 */
import Image from 'next/image';
import { LIGHT as C } from './mono-tokens';

const PHOTO =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=70';

const SWATCHES: [string, string][] = [
  ['Букле', '#D8D3C8'],
  ['Дуб', '#A38B6A'],
  ['Металл', '#9AA0A6'],
];

export default function LookbookPreview() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: C.bg, color: C.ink }}>
      <header className="z-10 flex items-center justify-between border-b px-[3cqw] py-[1.6cqw]" style={{ borderColor: C.line }}>
        <span className="text-[2cqw] font-semibold tracking-[-0.02em]">versta</span>
        <nav className="flex items-center gap-[2.2cqw] text-[1.3cqw]" style={{ color: C.muted }}>
          <span>Каталог</span>
          <span>Коллекции</span>
          <span>Шоурум</span>
        </nav>
        <span className="text-[1.3cqw] tabular-nums" style={{ color: C.muted }}>2 / 12</span>
      </header>

      {/* Фото выходит за границы кадра сверху и снизу — приём лукбука. */}
      <div className="absolute -bottom-[8cqw] -top-[2cqw] right-0 w-[52%] overflow-hidden">
        <Image src={PHOTO} alt="" fill sizes="(max-width: 1100px) 55vw, 560px" className="object-cover grayscale" />
        <span className="absolute bottom-[9cqw] left-[2.4cqw] rounded-[0.6cqw] bg-white/90 px-[1.6cqw] py-[0.8cqw] text-[1.15cqw] font-medium text-[#0B0B0C]">
          Soffa 03 · букле
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-[3cqw]">
        <span className="text-[1.15cqw] uppercase tracking-[0.22em]" style={{ color: C.faint }}>
          Модульная мебель
        </span>
        <h3 className="mt-[1.6cqw] max-w-[42cqw] text-balance text-[5cqw] font-light leading-[1.02] tracking-[-0.16cqw]">
          Собирайте дом по модулям
        </h3>
        <p className="mt-[1.6cqw] max-w-[32cqw] text-[1.45cqw] leading-[1.5]" style={{ color: C.muted }}>
          Каждый блок доводим до нужного размера. Ткань и дерево выбираете в карточке.
        </p>

        <div className="mt-[2.6cqw] flex items-center gap-[2.4cqw]">
          {SWATCHES.map(([label, color]) => (
            <div key={label} className="flex items-center gap-[1cqw]">
              <span className="h-[2.6cqw] w-[2.6cqw] rounded-full border" style={{ background: color, borderColor: C.line }} />
              <span className="text-[1.2cqw]" style={{ color: C.muted }}>{label}</span>
            </div>
          ))}
        </div>

        <span className="mt-[2.6cqw] w-fit border-b pb-[0.6cqw] text-[1.4cqw] font-medium" style={{ borderColor: C.ink }}>
          Открыть конфигуратор →
        </span>
      </div>
    </div>
  );
}
