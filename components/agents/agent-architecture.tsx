/**
 * Архитектурная схема агента: Источники данных → LLM → Инструменты →
 * Каналы → Мониторинг. HTML-диаграмма (не bitmap): резкая на любом DPI,
 * на узком экране складывается в колонку. Монохром + hairline-ring;
 * ядро (LLM) залито ink, потому что решение принимает модель.
 *
 * Пять стадий фиксированы, подписи-примеры приходят данными кейса.
 */
export interface ArchitectureNode {
  label: string;
  /** Короткая подпись-пример: «1С, WB API», «GPT-4o». */
  hint: string;
}

export interface ArchitectureFlow {
  /** Пять узлов слева направо. */
  nodes: ArchitectureNode[];
}

const STEPS = ['Источники данных', 'LLM', 'Инструменты', 'Каналы', 'Мониторинг'];

export default function AgentArchitecture({ nodes }: ArchitectureFlow) {
  const items = nodes.slice(0, 5);
  return (
    <div className="overflow-hidden rounded-[6px] border bg-white p-4 sm:p-5" style={{ borderColor: '#EBEBEB' }}>
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-2">
        {items.map((node, i) => {
          const isCore = i === 1;
          return (
            <li key={STEPS[i]} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
              <div
                className="flex min-h-[72px] w-full flex-col items-center justify-center rounded-[6px] px-3 py-3 text-center"
                style={{
                  background: isCore ? '#171717' : '#FFFFFF',
                  boxShadow: `0 0 0 1px ${isCore ? '#171717' : '#EBEBEB'}`,
                }}
              >
                <span
                  className="text-[13px] font-semibold tracking-[-0.02em]"
                  style={{ fontFamily: "'Geist','Inter',Arial,sans-serif", color: isCore ? '#FFFFFF' : '#171717' }}
                >
                  {STEPS[i]}
                </span>
                <span
                  className="mt-1 text-[11px]"
                  style={{
                    fontFamily: "'Geist Mono','JetBrains Mono',ui-monospace,monospace",
                    color: isCore ? 'rgba(255,255,255,0.7)' : '#7D7D7D',
                  }}
                >
                  {node.hint}
                </span>
              </div>
              {i < items.length - 1 ? (
                <span className="self-center shrink-0 text-[14px] leading-none" style={{ color: '#171717' }} aria-hidden>
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

