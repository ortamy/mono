/**
 * Кейс «Мебельный интернет-магазин» — первый экран в бежево-коричневой палитре.
 * Вёрстка миниатюры: шапка, оффер слева и фото интерьера справа.
 */
import Image from 'next/image';

const PHOTO =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=70';

export default function FurniturePreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F5E6D3] text-[#3D2B1F]">
      <header className="flex items-center justify-between px-[3cqw] py-[1.9cqw]">
        <span className="text-[2.2cqw] font-bold tracking-[-0.06cqw]">Мебель+</span>
        <nav className="flex items-center gap-[2.4cqw] text-[1.45cqw] text-[#6b5646]">
          <span>Каталог</span>
          <span>Коллекции</span>
          <span>О нас</span>
          <span>Контакты</span>
        </nav>
        <span className="rounded-full bg-[#3D2B1F] px-[2.2cqw] py-[1cqw] text-[1.35cqw] font-medium text-[#F5E6D3]">
          Корзина
        </span>
      </header>

      <div className="flex flex-1 items-stretch gap-[3.5cqw] px-[3cqw] pb-[3.5cqw]">
        <div className="flex w-[46%] flex-col justify-center">
          <h3 className="text-[5cqw] font-bold leading-[1.03] tracking-[-0.16cqw]">Мебель для жизни</h3>
          <p className="mt-[1.8cqw] text-[1.6cqw] leading-[1.45] text-[#6b5646]">
            Коллекции из натурального дерева
          </p>
          <span className="mt-[2.6cqw] inline-block w-fit rounded-[0.7cqw] bg-[#3D2B1F] px-[2.8cqw] py-[1.3cqw] text-[1.45cqw] font-medium text-[#F5E6D3]">
            Смотреть каталог
          </span>
        </div>
        <div className="relative w-[54%] overflow-hidden rounded-[1.6cqw]">
          <Image src={PHOTO} alt="" fill sizes="(max-width: 1100px) 60vw, 560px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
