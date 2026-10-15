/**
 * Компактный блок «Стек» для страницы услуги /agents.
 *
 * Четыре группы инструментов одной строкой (на мобильном — 2×2) и ссылка на
 * полный разбор /stack. Здесь только марка и название — без описаний: секция
 * должна занимать не больше экрана и не спорить с блоком «Сколько стоит».
 * Зачем нужен каждый инструмент, рассказано на /stack.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { STACK_GROUPS } from '@/data/stack';
import { StackIcon } from './agent-stack-logos';

export default function AgentStackTeaser() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[1100px] scroll-mt-20 px-5 py-10 sm:px-8 sm:py-16"
    >
      <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Стек</p>
      <h2 className="mt-3 text-[clamp(26px,4vw,36px)] font-bold tracking-[-1px] text-[var(--d-ink)]">
        Собираю на инструментах, которые работают в продакшене
      </h2>
      <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] d-muted">
        Каждый инструмент выбран под задачу, а не ради моды. Open-source ядро,
        self-hosted, без вендор-лока.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:mt-10 lg:grid-cols-4">
        {STACK_GROUPS.map((group) => (
          <div key={group.title} className="d-card p-5">
            <h3 className="text-[13px] uppercase tracking-[0.08em] d-faint">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted"
                >
                  <StackIcon tech={tool.name} size="14px" />
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href="/stack" className="d-btn d-btn-ghost h-14 min-h-[56px] w-full whitespace-nowrap px-8 py-4 text-base font-semibold sm:w-auto sm:min-w-[240px]">
          Смотреть стек <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
        </Link>
        <p className="text-[13px] d-faint">
          С описанием, зачем каждый инструмент и когда он нужен.
        </p>
      </div>
    </section>
  );
}
