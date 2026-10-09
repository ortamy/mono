/**
 * Превью первого экрана кейса /agents.
 *
 * Переиспользует общий CaseScreenshot с /design (тот же браузерный мокап и
 * бейдж метрики поверх макета), подключая реестр превью агентов.
 */
import CaseScreenshot from '@/components/design/case-screenshot';
import type { AgentCase } from '@/data/agent-cases';
import { AGENT_REGISTRY } from './agent-previews';

export default function AgentCaseScreenshot({ item, className }: { item: AgentCase; className?: string }) {
  return <CaseScreenshot item={item} registry={AGENT_REGISTRY} className={className} />;
}
