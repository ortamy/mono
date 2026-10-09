/**
 * Кейс «Корпоративный сайт B2B» — строгий тёмно-синий первый экран
 * с фотографией строительной площадки / офиса.
 */
import Image from 'next/image';

const PHOTO =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70';

export default function B2BPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#1E3A8A]">
      <header className="flex items-center justify-between bg-[#1E3A8A] px-[3cqw] py-[1.9cqw] text-white">
        <span className="text-[2.2cqw] font-bold tracking-[-0.06cqw]">СтройПро</span>
        <nav className="flex items-center gap-[2.4cqw] text-[1.45cqw] text-white/70">
          <span>Услуги</span>
          <span>Проекты</span>
          <span>О компании</span>
          <span>Контакты</span>
        </nav>
        <span className="rounded-[0.6cqw] bg-white px-[2.4cqw] py-[1cqw] text-[1.35cqw] font-semibold text-[#1E3A8A]">
          Обсудить
        </span>
      </header>

      <div className="flex flex-1 items-stretch gap-[3.5cqw] px-[3cqw] py-[3cqw]">
        <div className="flex w-[48%] flex-col justify-center">
          <span className="mb-[1.8cqw] w-fit rounded-full bg-[#1E3A8A]/10 px-[2cqw] py-[0.8cqw] text-[1.25cqw] font-medium">
            15 лет на рынке · 200+ объектов
          </span>
          <h3 className="text-[4.4cqw] font-bold leading-[1.06] tracking-[-0.14cqw]">
            Промышленное строительство под ключ
          </h3>
          <span className="mt-[2.6cqw] inline-block w-fit rounded-[0.7cqw] bg-[#1E3A8A] px-[2.8cqw] py-[1.3cqw] text-[1.45cqw] font-medium text-white">
            Оставить заявку
          </span>
        </div>
        <div className="relative w-[52%] overflow-hidden rounded-[1.2cqw]">
          <Image src={PHOTO} alt="" fill sizes="600px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
