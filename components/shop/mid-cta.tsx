import TrackedCtaLink from '@/components/shop/tracked-cta-link';

/**
 * CTA в середине страницы — после блока ИИ-фич, где посетитель уже понял,
 * что продукт умеет то, чего нет на маркетплейсе, и ещё не дошёл к цене.
 *
 * Ссылка-anchor, а не onClick: работает без JS и сохраняет обычное поведение
 * ссылки (открыть в новой вкладке, скопировать адрес). Плавность даёт
 * scroll-behavior:smooth из globals.css.
 */
export default function MidCta() {
  return (
    <section className="border-b border-agentos-line">
      <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[720px] rounded-[12px] bg-agentos-ink px-6 py-12 text-center sm:px-12">
          <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.8px] text-white sm:text-[24px]">
            Считайте. Ваши 25% — это ваши деньги.
          </h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#A3A3A3]">
            Оставьте заявку — пришлём расчёт экономии за 1 день.
          </p>
          <TrackedCtaLink
            href="#request"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-[8px] bg-white px-6 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E5E5E5]"
          >
            Получить расчёт →
          </TrackedCtaLink>
        </div>
      </div>
    </section>
  );
}