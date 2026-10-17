/**
 * SVG-логотипы стека для секции «Стек и интеграции» на страницах кейсов.
 *
 * Брендовые марки — path Simple Icons 14.12.0 (MIT), вшиты инлайном
 * (без npm-пакета и сетевых запросов). Нет бренда в наборе — упрощённый
 * монохромный знак. Реестр матчит подстроку из data/agent-cases.ts
 * («GPT-4o», «Claude», «n8n», «Telegram»): item.stack не меняется.
 */
import type { ReactNode } from 'react';
import type { StackCategory } from '@/data/agent-cases';
import {
  PATH_ANTHROPIC,
  PATH_GOOGLE,
  PATH_GOOGLE_CALENDAR,
  PATH_N8N,
  PATH_NOTION,
  PATH_OPENAI,
  PATH_PYTHON,
  PATH_REDIS,
  PATH_STRIPE,
  PATH_SUPABASE,
  PATH_TELEGRAM,
  PATH_WHATSAPP,
} from './stack-logo-paths';

/** Марка: один <path>/<g> в координатах 24×24. */
type Mark = () => ReactNode;

const Fill = ({ d }: { d: string }) => <path d={d} fill="currentColor" />;

const OpenAIMark: Mark = () => <Fill d={PATH_OPENAI} />;
const AnthropicMark: Mark = () => <Fill d={PATH_ANTHROPIC} />;
const N8nMark: Mark = () => <Fill d={PATH_N8N} />;
const TelegramMark: Mark = () => <Fill d={PATH_TELEGRAM} />;
const WhatsAppMark: Mark = () => <Fill d={PATH_WHATSAPP} />;
const PythonMark: Mark = () => <Fill d={PATH_PYTHON} />;
const RedisMark: Mark = () => <Fill d={PATH_REDIS} />;
const GoogleMark: Mark = () => <Fill d={PATH_GOOGLE} />;
const CalendarMark: Mark = () => <Fill d={PATH_GOOGLE_CALENDAR} />;
const NotionMark: Mark = () => <Fill d={PATH_NOTION} />;
const StripeMark: Mark = () => <Fill d={PATH_STRIPE} />;
const SupabaseMark: Mark = () => <Fill d={PATH_SUPABASE} />;


/** Cline — фигурная скобка терминала (агент в CLI). */
const ClineMark: Mark = () => (
  <path
    d="M9 6l-5 6 5 6M15 6l5 6-5 6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/** OpenAI + Python — общий знак «код». */
const CodeMark: Mark = () => (
  <path
    d="M8.5 8L5 12l3.5 4M15.5 8L19 12l-3.5 4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/** Playwright — «маска театра» (браузерная автоматизация). */
const PlaywrightMark: Mark = () => (
  <g fill="currentColor">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14z" opacity="0.15" />
    <circle cx="9" cy="10" r="1.2" />
    <circle cx="15" cy="10" r="1.2" />
    <path d="M8 15c1.2 1.2 2.5 1.8 4 1.8s2.8-.6 4-1.8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </g>
);

/** База данных — три диска (PostgreSQL/Redis/векторная). */
const DbMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.6">
    <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
    <path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13" />
    <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
  </g>
);

/** Облако/S3 — хранилище. */
const CloudMark: Mark = () => (
  <path
    d="M7 18a4 4 0 01-.4-8A5.5 5.5 0 0117 9.5 3.5 3.5 0 0117.5 18H7z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
  />
);

/** Wildberries — нет в Simple Icons. */
const WbMark: Mark = () => (
  <path d="M4.2 5.2h3.1l1.55 9.4L12 8.4l3.15 6.2 1.55-9.4h3.1L17.6 19H14.2L12 13.6 9.8 19H6.4L4.2 5.2z" fill="currentColor" />
);

/** Ozon — упрощённая «O». */
const OzonMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="7.2" />
    <path d="M8.2 12h7.6" strokeLinecap="round" />
  </g>
);

/** amoCRM — упрощённый контакт. */
const AmoMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="8.2" r="3" />
    <path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8S16.8 15.8 18.5 19" />
  </g>
);


/** LangGraph — граф узлов с рёбрами (stateful-агенты, память, human-in-the-loop). */
const LangGraphMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <circle cx="8" cy="5" r="2" />
    <circle cx="16" cy="12" r="2" />
    <circle cx="10" cy="18" r="2" />
    <circle cx="18" cy="17" r="2" />
    <path d="M9 5l5 4M16 12l-2 5" />
    <path d="M10 18l4-2M16 17l2-2" />
  </g>
);

/** Dify — разговорный пузырь (RAG-боты, LLM-приложения). */
const DifyMark: Mark = () => (
  <g>
    <path
      d="M4 3h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z"
      fill="currentColor"
    />
    <path
      d="M8 9h8M8 12h5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

/** ByteChef — колбаса на приборной панели (embedded-автоматизация). */
const ByteChefMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 4v16M8 8c0-1.7 1.3-3 3-3s3 1.3 3 3" />
    <path d="M12 8V5M12 5c1.7 0 3 1.3 3 3" />
    <path d="M8 12c-1.7 0-3-1.3-3-3M16 12c1.7 0 3-1.3 3-3" />
    <path d="M6 16c-2 0-3-1.3-3-3M18 16c2 0 3-1.3 3-3" />
  </svg>
);

/** DeepSeek — диагональный поток (алгоритмическая сила). */
const DeepSeekMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M4 16l6-6 4 4 8-8" />
    <circle cx="16" cy="8" r="2" />
  </svg>
);

/** Mistral — ветровая струя (бархатный поток). */
const MistralMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M4 16c4-4 8-6 12-6s8 2 12 6" />
    <path d="M6 20c4-2 8-3 12-3s8 1 12 3" opacity="0.6" />
  </svg>
);

/** Pinecone — шишка спицей. */
const PineconeMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3c2 2 2 6 0 8M12 3c-2 2-2 6 0 8M12 15c2-2 2-6 0-8M12 15c-2-2-2-6 0-8" />
    <path d="M7 9c2-2 4-1 5 1M17 9c-2-2-4-1-5 1" />
    <path d="M6 14c3-2 6-1 8 1" />
  </svg>
);

/** Qdrant — кластер векторов (точечный шар). */
const QdrantMark: Mark = () => (
  <g fill="currentColor">
    <circle cx="12" cy="6" r="1.4" />
    <circle cx="7" cy="10" r="1.4" />
    <circle cx="17" cy="10" r="1.4" />
    <circle cx="6" cy="15" r="1.4" />
    <circle cx="12" cy="16" r="1.4" />
    <circle cx="18" cy="15" r="1.4" />
  </g>
);

/** Weaviate — узор переплетения (векторное пространство). */
const WeaviateMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3l8 8-8 8-8-8 8-8z" opacity="0.3" />
    <path d="M4 16l6-6 4 4 6-6" />
    <path d="M14 8l-6 6-4-4-6 6" opacity="0.6" />
  </svg>
);

/** LangSmith — лупа аудита и мониторинга. */
const LangSmithMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

/** Langfuse — аналитическая искра (tracing, observability). */
const LangfuseMark: Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3c3 3 3 9 0 12" />
    <path d="M12 3c-3 3-3 9 0 12" opacity="0.5" />
    <circle cx="12" cy="18" r="1.2" />
  </svg>
);

/** Reranker — шкала отбора: сверху точные куски. */
const RerankMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 7h14" />
    <path d="M7 12h10" opacity="0.7" />
    <path d="M9 17h6" opacity="0.45" />
  </g>
);

/** Semantic Gate — щит: мусор не проходит к клиенту. */
const GateMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3.5l7 3v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6.5l7-3z" />
    <path d="M9 12.2l2.1 2.1 4-4" strokeLinecap="round" />
  </g>
);

/** Порядок важен: более специфичные ключи выше. Реестр матчит первую подстроку,
 * встреченную в названии технологии из data/agent-cases.ts. */
const MARKS: { test: RegExp; mark: Mark; name: string }[] = [
  { test: /langgraph/i, mark: LangGraphMark, name: 'LangGraph' },
  { test: /dify/i, mark: DifyMark, name: 'Dify' },
  { test: /bytechef/i, mark: ByteChefMark, name: 'ByteChef' },
  { test: /deepseek/i, mark: DeepSeekMark, name: 'DeepSeek' },
  { test: /mistral/i, mark: MistralMark, name: 'Mistral' },
  { test: /pinecone/i, mark: PineconeMark, name: 'Pinecone' },
  { test: /qdrant/i, mark: QdrantMark, name: 'Qdrant' },
  { test: /weaviate/i, mark: WeaviateMark, name: 'Weaviate' },
  { test: /langsmith/i, mark: LangSmithMark, name: 'LangSmith' },
  { test: /langfuse/i, mark: LangfuseMark, name: 'Langfuse' },
  { test: /jev/i, mark: RerankMark, name: 'Jev' },
  { test: /rerank/i, mark: RerankMark, name: 'Reranker' },
  { test: /semantic gate|gate/i, mark: GateMark, name: 'Semantic Gate' },
  { test: /openai|gpt|text-to-sql/i, mark: OpenAIMark, name: 'OpenAI' },
  { test: /claude|anthropic/i, mark: AnthropicMark, name: 'Anthropic' },
  { test: /n8n/i, mark: N8nMark, name: 'n8n' },
  { test: /whatsapp/i, mark: WhatsAppMark, name: 'WhatsApp' },
  { test: /telegram/i, mark: TelegramMark, name: 'Telegram' },
  { test: /wildberries|\bwb\b/i, mark: WbMark, name: 'Wildberries' },
  { test: /ozon/i, mark: OzonMark, name: 'Ozon' },
  { test: /amocrm|amo\b/i, mark: AmoMark, name: 'amoCRM' },
  { test: /redis/i, mark: RedisMark, name: 'Redis' },
  { test: /supabase/i, mark: SupabaseMark, name: 'Supabase' },
  { test: /pgvector|postgres|база|вектор/i, mark: DbMark, name: 'PostgreSQL' },
  { test: /python/i, mark: PythonMark, name: 'Python' },
  { test: /playwright|crawler|парсер|парсинг/i, mark: PlaywrightMark, name: 'Playwright' },
  { test: /s3|хранилище|облако/i, mark: CloudMark, name: 'Amazon S3' },
  { test: /calendar|календарь/i, mark: CalendarMark, name: 'Google Calendar' },
  { test: /google/i, mark: GoogleMark, name: 'Google' },
  { test: /stripe/i, mark: StripeMark, name: 'Stripe' },
  { test: /notion/i, mark: NotionMark, name: 'Notion' },
  { test: /cline/i, mark: ClineMark, name: 'Cline' },
  { test: /api|скрипт/i, mark: CodeMark, name: 'API' },
];

/** Марка и её имя для строки стека (фолбэк — «код», если совпадений нет). */
export function stackMark(tech: string): { mark: Mark; name: string } {
  const hit = MARKS.find((m) => m.test.test(tech));
  return hit ?? { mark: CodeMark, name: tech };
}

/** Иконка-логотип для одной технологии стека. */
export function StackIcon({ tech, size = '18px' }: { tech: string; size?: string }) {
  const { mark: Mark, name } = stackMark(tech);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center text-current"
      style={{ width: size, height: size }}
      title={name}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
        <Mark />
      </svg>
    </span>
  );
}

/** Ряд стека: SVG-марка + подпись технологии. Цвет наследует тему страницы. */
export function AgentStackRow({ stack }: { stack: StackCategory[] }) {
  return (
    <div className="mt-3 space-y-3">
      {stack.map((group) => (
        <div key={group.title}>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] d-faint">{group.title}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {group.items.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-3 py-1 text-[12px] d-muted"
              >
                <StackIcon tech={tech} size="14px" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
