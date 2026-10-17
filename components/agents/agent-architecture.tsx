/**
 * Архитектурная схема агента. HTML-диаграмма (не bitmap): резкая на любом DPI,
 * на узком экране складывается в колонку.
 *
 * Узлы и подписи приходят данными кейса. Слой (иконка и цвет) выбирается
 * по названию: источники — серый, инструменты — синий, Jev (контроль
 * качества) — teal, ядро LLM — violet, каналы — нейтральный, мониторинг —
 * зелёный. Фон и текст — через переменные темы (--d-*).
 */
import { Activity, Cpu, Database, Send, Shield, Wrench, type LucideIcon } from 'lucide-react';

export interface ArchitectureNode {
  label: string;
  /** Короткая подпись-пример: «1С, PostgreSQL», «GPT-4o». */
  hint: string;
}

export interface ArchitectureFlow {
  /** Узлы слева направо. В RAG-кейсах между инструментами и LLM стоит Jev. */
  nodes: ArchitectureNode[];
}

/** Слой схемы: иконка, акцент (цвет иконки/рамки) и заливка узла. */
interface Layer {
  icon: LucideIcon;
  accent: string;
  tint: string;
}

const LAYER_SOURCE: Layer = { icon: Database, accent: '#8B8B93', tint: 'rgba(139,139,147,0.10)' };
const LAYER_LLM: Layer = { icon: Cpu, accent: '#7C3AED', tint: 'rgba(124,58,237,0.14)' };
const LAYER_TOOLS: Layer = { icon: Wrench, accent: '#2563EB', tint: 'rgba(37,99,235,0.10)' };
const LAYER_JEV: Layer = { icon: Shield, accent: '#0F766E', tint: 'rgba(15,118,110,0.14)' };
const LAYER_CHANNELS: Layer = { icon: Send, accent: '#52525B', tint: 'rgba(82,82,91,0.10)' };
const LAYER_MONITOR: Layer = { icon: Activity, accent: '#297A3A', tint: 'rgba(41,122,58,0.12)' };

/** Слой по названию узла, а не по индексу: число шагов в кейсах разное. */
function layerFor(label: string): Layer {
  const key = label.toLowerCase();
  if (key.includes('источник')) return LAYER_SOURCE;
  if (key.includes('jev') || key.includes('rerank') || key.includes('gate')) return LAYER_JEV;
  if (key === 'llm' || key.startsWith('llm')) return LAYER_LLM;
  if (key.includes('инструмент') || key.includes('поиск')) return LAYER_TOOLS;
  if (key.includes('канал')) return LAYER_CHANNELS;
  if (key.includes('монитор')) return LAYER_MONITOR;
  return LAYER_TOOLS;
}

const MONO = "'Geist Mono','JetBrains Mono',ui-monospace,monospace";
const SANS = "'Geist','Inter',Arial,sans-serif";

/** Стрелка потока: толщина 2, наконечник, лёгкий pulse. */
function FlowArrow() {
  const stroke = { stroke: 'var(--d-ink)', strokeOpacity: 0.6, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <span className="self-center shrink-0 motion-safe:animate-pulse" aria-hidden>
      <svg width="18" height="12" viewBox="0 0 22 12" fill="none" className="hidden md:block">
        <path d="M1.5 6h14.5" {...stroke} />
        <path d="M12 2.2L19.5 6 12 9.8" fill="none" {...stroke} />
      </svg>
      <svg width="12" height="18" viewBox="0 0 12 22" fill="none" className="md:hidden">
        <path d="M6 1.5v14.5" {...stroke} />
        <path d="M2.2 12L6 19.5 9.8 12" fill="none" {...stroke} />
      </svg>
    </span>
  );
}

export default function AgentArchitecture({ nodes }: ArchitectureFlow) {
  const compact = nodes.length > 5;
  return (
    <div className="d-card p-4 sm:p-5">
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-1.5">
        {nodes.map((node, i) => {
          const layer = layerFor(node.label);
          const Icon = layer.icon;
          const isCore = /^llm\b/i.test(node.label);
          const isGate = /jev|rerank|gate/i.test(node.label);
          return (
            <li key={`${node.label}-${i}`} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
              <div
                className={`flex w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-[6px] text-center ${
                  compact ? 'min-h-[76px] px-2 py-2.5' : 'min-h-[84px] px-3 py-3'
                }`}
                style={{
                  background: layer.tint,
                  boxShadow: `0 0 0 ${isCore || isGate ? '1.5px' : '1px'} ${layer.accent}${isCore || isGate ? '' : '66'}`,
                }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Icon size={14} strokeWidth={1.8} style={{ color: layer.accent }} aria-hidden />
                  <span
                    className={`text-center font-semibold tracking-[-0.02em] ${compact ? 'text-[12px] leading-[1.25]' : 'text-[13px]'}`}
                    style={{ fontFamily: SANS, color: 'var(--d-ink)' }}
                  >
                    {node.label}
                  </span>
                </span>
                <span className="text-[11px] leading-[1.35]" style={{ fontFamily: MONO, color: 'var(--d-faint)' }}>
                  {node.hint}
                </span>
              </div>
              {i < nodes.length - 1 ? <FlowArrow /> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

