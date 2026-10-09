/**
 * Кейс «Alephy» — тёмный «книжный» первый экран с золотым акцентом.
 */
import Image from 'next/image';

const PHOTO =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=70';

export default function AlephyPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0B0A08] text-[#F3ECE0]">
      <header className="flex items-center justify-between px-[3cqw] py-[1.9cqw]">
        <span className="flex items-center gap-[1cqw] text-[2.1cqw] font-semibold tracking-[-0.04cqw]">
          <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-[0.6cqw] bg-[#C9A227] text-[1.5cqw] font-bold text-[#1A1406]">
            א
          </span>
          alephy
        </span>
        <nav className="flex items-center gap-[2.2cqw] text-[1.45cqw] text-[#A69C88]">
          <span>Карта</span>
          <span>Механика</span>
          <span>Лаборатория</span>
          <span>Клуб</span>
        </nav>
        <span className="rounded-[0.6cqw] bg-[#C9A227] px-[2.4cqw] py-[1cqw] text-[1.35cqw] font-semibold text-[#1A1406]">
          Начать
        </span>
      </header>

      <div className="flex flex-1 items-stretch gap-[3.5cqw] px-[3cqw] pb-[3.5cqw]">
        <div className="flex w-[52%] flex-col justify-center">
          <h3 className="text-[4.4cqw] font-bold leading-[1.06] tracking-[-0.14cqw]">
            Реконструкция палео-образного мышления
          </h3>
          <p className="mt-[1.8cqw] text-[1.55cqw] leading-[1.45] text-[#A69C88]">
            Возвращаем тексту его физику: образ, движение, состояние
          </p>
          <span className="mt-[2.6cqw] inline-block w-fit rounded-[0.7cqw] bg-[#C9A227] px-[2.8cqw] py-[1.3cqw] text-[1.45cqw] font-semibold text-[#1A1406]">
            Начать исследование
          </span>
        </div>
        <div className="relative w-[48%] overflow-hidden rounded-[1.6cqw] ring-1 ring-[#C9A227]/25">
          <Image src={PHOTO} alt="" fill sizes="600px" className="object-cover opacity-85" />
        </div>
      </div>
    </div>
  );
}
