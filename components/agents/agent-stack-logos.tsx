/**
 * SVG-логотипы стека для секции «Стек и интеграции» на страницах кейсов.
 *
 * Упрощённые монохромные марки нарисованы инлайном (без внешних ассетов и
 * сетевых запросов), поэтому резкие на любом DPI и работают офлайн. Реестр
 * сопоставляет подстроку из data/agent-cases.ts (например «GPT-4o»,
 * «Claude», «n8n», «Telegram») с нужной маркой: item.stack не меняется,
 * сопоставление гибкое по ключевому слову.
 */
import type { ReactNode } from 'react';
import type { StackCategory } from '@/data/agent-cases';

/** Марка: один <path>/<g> в координатах 24×24. */
type Mark = (props: { size?: string }) => ReactNode;

/** OpenAI — стилизованный «узел/клубок» из пересекающихся петель. */
const OpenAIMark: Mark = () => (
  <path
    d="M12 2c-1.2 0-2.3.7-2.8 1.8L7.6 7.4 4 9.2C2.9 9.7 2.2 10.8 2.2 12s.7 2.3 1.8 2.8l3.6 1.8 1.6 3.6c.5 1.1 1.6 1.8 2.8 1.8s2.3-.7 2.8-1.8l1.6-3.6 3.6-1.8c1.1-.5 1.8-1.6 1.8-2.8s-.7-2.3-1.8-2.8l-3.6-1.8-1.6-3.6C14.3 2.7 13.2 2 12 2zm0 5.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
    fill="currentColor"
  />
);

/** Anthropic — заглавная «A» с характерным срезом. */
const AnthropicMark: Mark = () => (
  <path d="M13.9 3l6.1 15h-3.3l-1.2-3.2H8.5L7.3 18H4L10.1 3h3.8zm-1 3.2L10.6 12h4.6L12.9 6.2z" fill="currentColor" />
);

/** n8n — связанные узлы workflow (три кружка + связи). */
const N8nMark: Mark = () => (
  <g fill="currentColor">
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="12" r="2.4" />
    <circle cx="6" cy="18" r="2.4" />
    <path d="M8.4 6.7l7.2 4.4M8.4 17.3l7.2-4.4" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </g>
);

/** Telegram — бумажный самолётик в круге. */
const TelegramMark: Mark = () => (
  <path
    d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 6.9l-1.6 7.5c-.1.6-.5.8-1 .5l-2.7-2-1.3 1.3c-.2.2-.3.2-.5.2l.2-2.8 5.1-4.6c.2-.2 0-.3-.3-.1l-6.3 4-2.7-.9c-.6-.2-.6-.6.1-.9l10.5-4c.5-.2 1 .1.8.8z"
    fill="currentColor"
  />
);

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

/** Календарь — Google Calendar. */
const CalendarMark: Mark = () => (
  <g fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
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
  { test: /openai|gpt|text-to-sql/i, mark: OpenAIMark, name: 'OpenAI' },
  { test: /claude|anthropic/i, mark: AnthropicMark, name: 'Anthropic' },
  { test: /n8n/i, mark: N8nMark, name: 'n8n' },
  // Марка «база / векторы» общая: pgvector, PostgreSQL, Redis и любые похожие.
  { test: /pgvector|postgres|redis|база|вектор/i, mark: DbMark, name: 'База данных' },
  { test: /telegram/i, mark: TelegramMark, name: 'Telegram' },
  { test: /cline/i, mark: ClineMark, name: 'Cline' },
  { test: /python|api|скрипт/i, mark: CodeMark, name: 'Код' },
  { test: /playwright|crawler|парсер|парсинг/i, mark: PlaywrightMark, name: 'Playwright' },
  { test: /s3|хранилище|облако/i, mark: CloudMark, name: 'Хранилище' },
  { test: /calendar|календарь/i, mark: CalendarMark, name: 'Календарь' },
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
    <div className="mt-4 space-y-4">
      {stack.map((group) => (
        <div key={group.title}>
          <h3 className="text-[12px] uppercase tracking-[0.08em] d-faint">{group.title}</h3>
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
