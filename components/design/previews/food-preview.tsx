/**
 * Кейс «Приложение доставки» — мокап мобильного экрана: адрес, категории
 * и карточки ресторанов с фото и рейтингом.
 */
import Image from 'next/image';
import { Beef, Fish, MapPin, Pizza, Search, Star } from 'lucide-react';

const SHOTS = {
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=70',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=70',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=70',
};

const CATEGORIES = [
  { Icon: Pizza, label: 'Пицца' },
  { Icon: Fish, label: 'Суши' },
  { Icon: Beef, label: 'Бургеры' },
];

const PLACES: [string, string, string][] = [
  ['Sushi Box', '4.9', SHOTS.sushi],
  ['Pizza Napoli', '4.8', SHOTS.pizza],
  ['Burger Lab', '4.7', SHOTS.burger],
];

export default function FoodPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#111111]">
      <div className="absolute h-[70%] w-[38%] rounded-full bg-[#F97316]/25 blur-[7cqw]" aria-hidden />

      <div className="relative flex h-[94%] aspect-[9/19] flex-col overflow-hidden rounded-[3.4cqw] bg-white [container-type:inline-size]">
        <div className="flex items-center justify-between px-[5cqw] pt-[5cqw] text-[3.4cqw] text-[#111]">
          <span className="flex items-center gap-[1.6cqw] font-medium">
            <MapPin className="h-[4cqw] w-[4cqw] text-[#F97316]" aria-hidden />
            Москва, Ленина 12
          </span>
          <span className="flex h-[7cqw] w-[7cqw] items-center justify-center rounded-full bg-[#FFF1E7]">
            <Search className="h-[3.6cqw] w-[3.6cqw] text-[#F97316]" aria-hidden />
          </span>
        </div>

        <div className="mx-[5cqw] mt-[3.6cqw] flex items-center gap-[2cqw] rounded-[3cqw] bg-[#f4f4f5] px-[3.4cqw] py-[2.6cqw] text-[3.1cqw] text-[#9ca3af]">
          <Search className="h-[3.4cqw] w-[3.4cqw]" aria-hidden />
          Найти ресторан или блюдо
        </div>

        <div className="mt-[4cqw] flex gap-[4cqw] px-[5cqw]">
          {CATEGORIES.map(({ Icon, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-[1.6cqw]">
              <span
                className={`flex h-[11cqw] w-[11cqw] items-center justify-center rounded-[3cqw] ${
                  i === 0 ? 'bg-[#F97316] text-white' : 'bg-[#FFF1E7] text-[#F97316]'
                }`}
              >
                <Icon className="h-[5.6cqw] w-[5.6cqw]" aria-hidden />
              </span>
              <span className="text-[2.9cqw] text-[#111]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-[4.5cqw] px-[5cqw]">
          <div className="text-[3.6cqw] font-semibold text-[#111]">Рядом с вами</div>
          <div className="mt-[3cqw] flex flex-col gap-[2.8cqw]">
            {PLACES.map(([name, rating, src]) => (
              <div key={name} className="flex items-center gap-[3cqw] rounded-[2.6cqw] border border-black/5 p-[2.4cqw]">
                <span className="relative h-[12cqw] w-[12cqw] shrink-0 overflow-hidden rounded-[2cqw]">
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </span>
                <div className="text-[3.1cqw] leading-[1.4]">
                  <div className="text-[3.4cqw] font-medium text-[#111]">{name}</div>
                  <div className="flex items-center gap-[1.2cqw] text-[#F97316]">
                    <Star className="h-[3cqw] w-[3cqw] fill-[#F97316]" aria-hidden />
                    {rating} · 25 мин
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
