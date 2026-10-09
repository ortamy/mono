/**
 * Иконки кейсов /agents: на каждый кейс — своя линейная иконка Lucide
 * (единый стиль с портфолио /design, без emoji и кружочков).
 */
import type { LucideIcon } from 'lucide-react';
import { BarChart3, MessageCircle, PenTool, Search, Target } from 'lucide-react';
import type { AgentPreviewKey } from '@/data/agent-cases';

export const AGENT_CASE_ICONS: Record<AgentPreviewKey, LucideIcon> = {
  support: MessageCircle,
  sales: Target,
  content: PenTool,
  analytics: BarChart3,
  research: Search,
};
