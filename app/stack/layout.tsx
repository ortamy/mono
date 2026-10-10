import type { Metadata } from 'next';
import '../design/design.css';
import DesignShell from '@/components/design/design-shell';
import { buildMetadata } from '@/lib/meta';

/**
 * Оболочка /stack: та же тема портфолио, что у /agents (DesignShell и общие
 * стили из app/design/design.css). Страница — продолжение услуги по сборке
 * агентов: подробный разбор стека, на который ссылается компактный блок
 * «Стек» на /agents.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Стек сборки AI-агентов: оркестрация, LLM, RAG и мониторинг',
  description:
    'Из чего собираю AI-агентов: LangGraph и n8n, GPT-4o и Claude, pgvector и Qdrant, LangSmith и Langfuse. Что за инструмент, зачем он и когда нужен.',
  path: '/stack',
});

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}
