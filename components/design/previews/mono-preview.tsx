/**
 * Кейс «mono» — тёмный первый экран лендинга для WB-селлеров.
 */
import Image from 'next/image';

const PHOTO =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=70';

export default function MonoPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0B] text-[#FAFAFA]">
      <header className="flex items-center justify-between px-[3cqw] py-[1.9cqw]">
        <span className="text-[2.2cqw] font-bold tracking-[-0.06cqw]">
          mono<span className="text-white/40">.</span>
        </span>
        <nav className="flex items-center gap-[2.4cqw] text-[1.45cqw] text-white/55">
          <span>Решение</span>
          <span>Тарифы</span>
          <span>Кейсы</span>
        </nav>
        <span className="rounded-[0.6cqw] bg-white px-[2.4cqw] py-[1cqw] text-[1.35cqw] font-semibold text-[#0A0A0B]">
          Рассчитать
        </span>
      </header>

      <div className="flex flex-1 items-stretch gap-[3.5cqw] px-[3cqw] pb-[3.5cqw]">
        <div className="flex w-[50%] flex-col justify-center">
          <span className="mb-[1.8cqw] w-fit rounded-full border border-white/15 px-[2cqw] py-[0.8cqw] text-[1.2cqw] text-white/70">
            0% комиссий · 21 день
          </span>
          <h3 className="text-[4.8cqw] font-bold leading-[1.04] tracking-[-0.16cqw]">
            Забирайте 100% выручки
          </h3>
          <p className="mt-[1.8cqw] text-[1.55cqw] leading-[1.45] text-white/55">
            Свой интернет-магазин вместо комиссий маркетплейсов
          </p>
          <span className="mt-[2.6cqw] inline-block w-fit rounded-[0.7cqw] bg-white px-[2.8cqw] py-[1.3cqw] text-[1.45cqw] font-semibold text-[#0A0A0B]">
            Рассчитать экономию
          </span>
        </div>
        <div className="relative w-[50%] overflow-hidden rounded-[1.6cqw] ring-1 ring-white/10">
          <Image src={PHOTO} alt="" fill sizes="600px" className="object-cover opacity-80" />
        </div>
      </div>
    </div>
  );
}
