/**
 * Блок «О студии» — ставится перед финальной формой, чтобы человек, дошедший
 * до конца страницы, увидел не только цену, но и команду за ней.
 */

const STATS = [
  { value: '5 лет', label: 'на рынке' },
  { value: '30+', label: 'проектов' },
  { value: '12', label: 'специалистов' },
];

export default function About() {
  return (
    <section id="about" className="border-b border-agentos-line bg-agentos-card">
      <div className="mx-auto max-w-[800px] px-5 py-20 text-center sm:px-8 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.1em] text-agentos-faint">/ О студии</p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-[-1.4px] text-agentos-ink sm:text-[32px]">
          О mono
        </h2>

        <p className="mt-4 text-[15px] leading-[1.6] text-agentos-muted sm:text-[16px]">
          Студия кастомной разработки. 5 лет опыта, 30+ проектов, специализация на
          AI-powered e-commerce. Работаем с селлерами, которые хотят свой канал продаж.
        </p>

        {/* gap-6 на телефоне: при gap-8 на 375px на колонку остаётся ~90px,
            и подпись вроде «специалистов» переносится на две строки. */}
        <dl className="mt-8 grid grid-cols-3 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="text-[28px] font-bold leading-none tracking-[-1.2px] text-agentos-ink tabular-nums sm:text-[32px]">
                {stat.value}
              </dd>
              <dt className="mt-2 text-[12px] uppercase tracking-[0.05em] text-agentos-muted sm:text-[13px]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}