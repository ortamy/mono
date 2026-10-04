/** Аккордеон FAQ лендинга магазинов. */
'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const ITEMS = [
  {
    q: 'Чем ваш магазин лучше Tilda / Shopify?',
    a: 'Мы делаем кастом на Next.js с ИИ внутри. Не ограничены шаблонами, работаем под ваш бизнес.',
  },
  {
    q: 'Сколько ждать первых продаж?',
    a: 'Первые заказы — в первую неделю после запуска. Полная окупаемость — 2–4 месяца.',
  },
  {
    q: 'Смогу ли я сам управлять магазином?',
    a: 'Да. Админка простая, обучение 2 часа. Меняете товары, цены и акции без разработчика.',
  },
  {
    q: 'Что с переносом товаров с WB / Ozon?',
    a: 'Переносим автоматически через API. 1–2 дня на всю номенклатуру.',
  },
  {
    q: 'Что если что-то сломается?',
    a: 'Подписка на поддержку 30 000 ₽/мес. Реагируем за 2–4 часа.',
  },
];

export default function ShopFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-agentos-line border-y border-agentos-line">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`shop-faq-a-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-agentos-ink sm:text-[17px]"
              >
                <span>{item.q}</span>
                <span className="shrink-0 text-agentos-faint" aria-hidden="true">
                  {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={`shop-faq-a-${i}`} className="pb-6 pr-8">
                <p className="text-[14px] leading-[1.65] text-agentos-muted sm:text-[15px]">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}