/**
 * Кейс «Сайт стоматологии» — светлый первый экран с голубым акцентом
 * и фото улыбающегося человека.
 */
import Image from 'next/image';

const PHOTO =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=70';

export default function DentalPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#0F2A44]">
      <header className="flex items-center justify-between px-[3cqw] py-[1.9cqw]">
        <span className="flex items-center gap-[1cqw] text-[2.1cqw] font-bold text-[#0EA5E9]">
          <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#0EA5E9]" aria-hidden />
          Стома+
        </span>
        <nav className="flex items-center gap-[2.2cqw] text-[1.45cqw] text-[#5b7086]">
          <span>Услуги</span>
          <span>Врачи</span>
          <span>Цены</span>
          <span>Контакты</span>
        </nav>
        <span className="rounded-full bg-[#0EA5E9] px-[2.4cqw] py-[1cqw] text-[1.35cqw] font-medium text-white">
          Записаться
        </span>
      </header>

      <div className="flex flex-1 items-stretch gap-[3.5cqw] px-[3cqw] pb-[3.5cqw]">
        <div className="flex w-[50%] flex-col justify-center">
          <h3 className="text-[4.6cqw] font-bold leading-[1.05] tracking-[-0.14cqw]">
            Здоровая улыбка без страха
          </h3>
          <p className="mt-[1.8cqw] text-[1.6cqw] leading-[1.45] text-[#5b7086]">
            Современная стоматология с заботой
          </p>
          <span className="mt-[2.6cqw] inline-block w-fit rounded-full bg-[#0EA5E9] px-[2.8cqw] py-[1.3cqw] text-[1.45cqw] font-medium text-white">
            Записаться
          </span>
        </div>
        <div className="relative w-[50%] overflow-hidden rounded-[1.6cqw]">
          <Image src={PHOTO} alt="" fill sizes="600px" className="object-cover" />
          <span className="absolute bottom-[1.6cqw] left-[1.6cqw] rounded-[0.8cqw] bg-white/90 px-[1.8cqw] py-[0.9cqw] text-[1.25cqw] font-medium text-[#0F2A44]">
            4,9 ★ · 1 240 отзывов
          </span>
        </div>
      </div>
    </div>
  );
}
