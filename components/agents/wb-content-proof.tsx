import { ArrowRight, ShieldCheck } from 'lucide-react';
export function WbContentAfterScreens() {
  return (
    <>
      <section aria-labelledby="wb-g-title" className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="border-b border-[var(--d-line)] py-5">
          <h2 id="wb-g-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">Гарантия: риск — на мне</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            <li className="d-card p-4"><p className="text-[14px] font-semibold text-[var(--d-ink)]">Возврат 50% за 30 дней</p><p className="mt-1 text-[13px] leading-[1.55] d-muted">если агент не обрабатывает 40% карточек.</p></li>
            <li className="d-card p-4"><p className="text-[14px] font-semibold text-[var(--d-ink)]">Первый месяц поддержки — бесплатно</p><p className="mt-1 text-[13px] leading-[1.55] d-muted">правки тона и сценариев включены.</p></li>
            <li className="d-card p-4"><p className="text-[14px] font-semibold text-[var(--d-ink)]">Данные и код — ваши</p><p className="mt-1 text-[13px] leading-[1.55] d-muted">уйти можно в любой момент.</p></li>
          </ul>
        </div>
      </section>
      <section aria-labelledby="wb-cmp-title" className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="border-b border-[var(--d-line)] py-5">
          <h2 id="wb-cmp-title" className="text-[16px] font-semibold tracking-[-0.2px] text-[var(--d-ink)] sm:text-[17px]">Контент-агент vs найм</h2>
          <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--d-line)]">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-[1.55]">
              <thead>
                <tr className="bg-[var(--d-soft)]">
                  <th className="px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Критерий</th>
                  <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Контент-агент</th>
                  <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Фрилансер</th>
                  <th className="border-l border-[var(--d-line)] px-4 py-3 text-[11px] uppercase tracking-[0.06em] d-faint">Штатный менеджер</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[var(--d-line)]"><td className="px-4 py-3 font-semibold text-[var(--d-ink)]">Стоимость</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">200–500К разово, затем поддержка</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">40–80К ₽/мес + контроль</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">80–150К ₽/мес + налоги</td></tr>
                <tr className="border-t border-[var(--d-line)]"><td className="px-4 py-3 font-semibold text-[var(--d-ink)]">Скорость</td><td className="border-l border-[var(--d-line)] px-4 py-3 font-semibold text-[var(--d-ink)]">20+ карточек в день</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">3–5 в день</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">3–4 в день</td></tr>
                <tr className="border-t border-[var(--d-line)]"><td className="px-4 py-3 font-semibold text-[var(--d-ink)]">Работает</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">24/7, без отпусков</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">по договорённости</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">5/2, 8 часов</td></tr>
                <tr className="border-t border-[var(--d-line)]"><td className="px-4 py-3 font-semibold text-[var(--d-ink)]">Масштаб</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">партии 20–50 SKU без потери качества</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">упрётся в часы</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">упрётся в найм</td></tr>
                <tr className="border-t border-[var(--d-line)]"><td className="px-4 py-3 font-semibold text-[var(--d-ink)]">Окупаемость</td><td className="border-l border-[var(--d-line)] px-4 py-3 font-semibold text-agentos-up">1–2 мес при 100+ SKU</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">нет: расход каждый месяц</td><td className="border-l border-[var(--d-line)] px-4 py-3 d-muted">нет: расход каждый месяц</td></tr>
              </tbody>
            </table>
          </div>
          <a href="/agents/#contact" className="d-btn d-btn-ghost mt-4 inline-flex h-12 min-h-[48px] items-center gap-2 px-6 py-3 text-[15px] font-semibold"><ShieldCheck size={16} strokeWidth={1.5} aria-hidden /> Обсудить под мой ассортимент <ArrowRight size={15} strokeWidth={1.5} aria-hidden /></a>
        </div>
      </section>
    </>
  );
}
