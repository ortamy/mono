/**
 * Макет интерфейса кастомного магазина для hero-блока.
 *
 * Собран на CSS, а не на картинке: в проекте нет растровых ассетов, статический
 * экспорт не даёт генерировать их на билде, а так блок остаётся резким на любом
 * DPI и не добавляет веса. Заменить на реальный скриншот — одна правка здесь.
 */

const PLACES = [4, 9, 3];
const AI_CHIPS = ['Похожие товары', 'Чат-поддержка', 'Умный поиск'];

export default function StoreMock() {
  return (
    <div className="rounded-agentos border border-agentos-line bg-agentos-card">
      {/* Строка окна браузера */}
      <div className="flex items-center gap-2 border-b border-agentos-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-agentos-line" />
        <span className="h-2 w-2 rounded-full bg-agentos-line" />
        <span className="h-2 w-2 rounded-full bg-agentos-line" />
        <span className="ml-3 hidden truncate rounded-control bg-agentos-soft px-3 py-1 text-[11px] text-agentos-faint sm:block">
          shop.brand.ru
        </span>
        <span className="ml-auto rounded-control bg-agentos-ink px-2 py-1 text-[10px] font-medium text-white">AI</span>
      </div>

      <div className="p-4 sm:p-5">
        {/* Хлебные крошки и поиск */}
        <div className="flex items-center justify-between gap-3 border-b border-agentos-line pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold tracking-[-0.3px] text-agentos-ink">brand</span>
            <span className="text-[11px] text-agentos-faint">Каталог</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-agentos-muted">
            <span className="rounded-control border border-agentos-line px-2 py-1">Поиск</span>
            <span className="rounded-control border border-agentos-line px-2 py-1">Корзина</span>
          </div>
        </div>

        {/* Сетка товаров */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {PLACES.map((h, i) => (
            <div key={h} className="rounded-control border border-agentos-line p-2.5">
              <div className="flex aspect-[4/3] items-center justify-center rounded-control bg-agentos-soft text-[10px] text-agentos-faint">
                1:{h}
              </div>
              <div className="mt-2 h-1.5 w-4/5 rounded-full bg-agentos-line" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-agentos-line" />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-agentos-ink tabular-nums">
                  {(4.9 - i * 1.3).toFixed(1).replace('.', ',')} ₽
                </span>
                <span className="rounded-control bg-agentos-ink px-1.5 py-0.5 text-[9px] text-white">Купить</span>
              </div>
            </div>
          ))}
        </div>

        {/* Панель ИИ-функций */}
        <div className="mt-4 rounded-control border border-agentos-line bg-agentos-bg p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-agentos-ink">ИИ-слой магазина</span>
            <span className="text-[10px] text-agentos-faint">онлайн</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {AI_CHIPS.map((chip) => (
              <span key={chip} className="rounded-full border border-agentos-line bg-agentos-card px-2.5 py-1 text-[10px] text-agentos-muted">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Метрики */}
      <div className="grid grid-cols-3 divide-x divide-agentos-line border-t border-agentos-line">
        {[
          { v: '0%', l: 'комиссия' },
          { v: '21', l: 'день' },
          { v: '100%', l: 'ваших данных' },
        ].map((m) => (
          <div key={m.l} className="px-3 py-3 text-center">
            <div className="text-[15px] font-semibold tracking-[-0.4px] text-agentos-ink tabular-nums">{m.v}</div>
            <div className="mt-0.5 text-[10px] text-agentos-faint">{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}