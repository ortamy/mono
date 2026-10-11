/**
 * Архитектурная схема агента: Источники данных → LLM → Инструменты →
 * Каналы → Мониторинг. HTML-диаграмма (не bitmap): резкая на любом DPI,
 * на узком экране складывается в колонку.
 *
 * У каждого слоя свой цвет и иконка (lucide): источники — серый, ядро LLM —
 * violet, инструменты — синий, каналы — нейтральный, мониторинг — зелёный.
 * Подписи-примеры («1С · база знаний», «GPT-4o») приходят данными кейса.
 * Фон и текст — через переменные темы (--d-*), поэтому схема не остаётся
 * белой в тёмной теме страницы.
 */
import { Activity, ArrowDown, ArrowRight, Cpu, Database, Send, Wrench, type LucideIcon } from 'lucide-react';

export interface ArchitectureNode {
  label: string;
  /** Короткая подпись-пример: «1С, PostgreSQL», «GPT-4o». */
  hint: string;
}

export interface ArchitectureFlow {
  /** Пять узлов слева направо. */
  nodes: ArchitectureNode[];
}

/** Слой схемы: иконка, акцент (цвет иконки/рамки) и заливка узла. */
interface Layer {
  icon: LucideIcon;
  accent: string;
  tint: string;
}

/** Порядок слоёв совпадает с STEPS и с architecture[] из data/agent-cases.ts. */
const LAYERS: Layer[] = [
  { icon: Database, accent: '#8B8B93', tint: 'rgba(139,139,147,0.10)' }, // источники — серый
  { icon: Cpu, accent: '#7C3AED', tint: 'rgba(124,58,237,0.14)' }, // LLM — violet
  { icon: Wrench, accent: '#2563EB', tint: 'rgba(37,99,235,0.10)' }, // инструменты — синий
  { icon: Send, accent: '#52525B', tint: 'rgba(82,82,91,0.10)' }, // каналы — нейтральный
  { icon: Activity, accent: '#297A3A', tint: 'rgba(41,122,58,0.12)' }, // мониторинг — зелёный
];

const STEPS = ['Источники данных', 'LLM', 'Инструменты', 'Каналы', 'Мониторинг'];

const MONO = "'Geist Mono','JetBrains Mono',ui-monospace,monospace";
const SANS = "'Geist','Inter',Arial,sans-serif";

export default function AgentArchitecture({ nodes }: ArchitectureFlow) {
  const items = nodes.slice(0, 5);
  return (
    <div className="d-card p-4 sm:p-5">
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-2">
        {items.map((node, i) => {
          const layer = LAYERS[i];
          const Icon = layer.icon;
          const isCore = i === 1;
          return (
            <li key={STEPS[i]} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
              <div
                className="flex min-h-[84px] w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-[6px] px-3 py-3 text-center"
                style={{
                  background: layer.tint,
                  boxShadow: `0 0 0 ${isCore ? '1.5px' : '1px'} ${layer.accent}${isCore ? '' : '66'}`,
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Icon size={14} strokeWidth={1.8} style={{ color: layer.accent }} aria-hidden />
                  <span className="text-[13px] font-semibold tracking-[-0.02em]" style={{ fontFamily: SANS, color: 'var(--d-ink)' }}>
                    {STEPS[i]}
                  </span>
                </span>
                <span className="text-[11px] leading-[1.35]" style={{ fontFamily: MONO, color: 'var(--d-faint)' }}>
                  {node.hint}
                </span>
              </div>
              {i < items.length - 1 ? (
                <span className="self-center shrink-0 text-[var(--d-faint)]" aria-hidden>
                  <ArrowRight size={14} strokeWidth={1.5} className="hidden md:block" />
                  <ArrowDown size={14} strokeWidth={1.5} className="md:hidden" />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

