/**
 * Превью «чат агента»: диалог пользователя и AI-ассистента с панелью
 * контекста — из каких данных агент строит ответ.
 *
 * Размеры задаются в cqw (1% ширины контейнера), поэтому макет одинаково
 * выглядит в карточке сетки и в hero на странице кейса (контейнер задаёт
 * case-preview.tsx). Цвета инлайновые: превью — «скриншот» чужого продукта
 * и не перекрашивается темой интерфейса.
 */
import { DARK, LIGHT } from '@/components/design/previews/mono-tokens';

export interface ChatPreviewMessage {
  from: 'user' | 'agent';
  text: string;
}

export default function ChatPreview({
  tone = 'light',
  brand,
  title,
  sub,
  placeholder,
  messages,
  context,
  chip,
}: {
  tone?: 'light' | 'dark';
  /** Буква-логотип в шапке чата. */
  brand: string;
  /** Название диалога, например «Поддержка». */
  title: string;
  /** Канал и скорость ответа. */
  sub: string;
  /** Подсказка в поле ввода. */
  placeholder: string;
  messages: ChatPreviewMessage[];
  /** Строки панели «Контекст агента». */
  context: string[];
  /** Чип внизу панели контекста: уверенность, источник… */
  chip: string;
}) {
  const C = tone === 'dark' ? DARK : LIGHT;
  return (
    <div className="flex h-full w-full" style={{ background: C.bg, color: C.ink }}>
      {/* Диалог */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex items-center gap-[1.2cqw] border-b px-[2.4cqw] py-[1.5cqw]"
          style={{ borderColor: C.line, background: C.panel }}
        >
          <span
            className="flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-[0.9cqw] text-[1.5cqw] font-bold"
            style={{ background: C.ink, color: C.bg }}
            aria-hidden
          >
            {brand.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <div className="truncate text-[1.55cqw] font-semibold tracking-[-0.02em]">{title}</div>
            <div className="truncate text-[1.1cqw]" style={{ color: C.muted }}>{sub}</div>
          </div>
          <span className="ml-auto flex shrink-0 items-center gap-[0.7cqw] text-[1.1cqw]" style={{ color: C.muted }}>
            <span className="h-[1cqw] w-[1cqw] rounded-full" style={{ background: C.ink }} aria-hidden />
            online
          </span>
        </header>

        <div className="flex flex-1 flex-col justify-end gap-[1.1cqw] px-[2.4cqw] py-[1.6cqw]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[74%] rounded-[1.2cqw] px-[1.5cqw] py-[1cqw] text-[1.3cqw] leading-[1.45] ${m.from === 'agent' ? 'self-end' : 'self-start'}`}
              style={m.from === 'agent' ? { background: C.ink, color: C.bg } : { background: C.soft, color: C.ink }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[1cqw] border-t px-[2.4cqw] py-[1.4cqw]" style={{ borderColor: C.line }}>
          <span
            className="min-w-0 flex-1 truncate rounded-[0.9cqw] border px-[1.3cqw] py-[0.85cqw] text-[1.2cqw]"
            style={{ borderColor: C.line, color: C.faint }}
          >
            {placeholder}
          </span>
          <span
            className="shrink-0 rounded-[0.9cqw] px-[1.7cqw] py-[0.85cqw] text-[1.2cqw] font-semibold"
            style={{ background: C.ink, color: C.bg }}
          >
            Отправить
          </span>
        </div>
      </div>

      {/* Контекст агента */}
      <aside
        className="flex w-[30%] shrink-0 flex-col border-l px-[2cqw] py-[1.6cqw]"
        style={{ borderColor: C.line, background: C.panel }}
      >
        <div className="text-[1cqw] uppercase tracking-[0.12em]" style={{ color: C.faint }}>Контекст агента</div>
        <ul className="mt-[1.4cqw] flex flex-1 flex-col gap-[1.1cqw]">
          {context.map((row) => (
            <li key={row} className="flex items-start gap-[0.9cqw] text-[1.2cqw] leading-[1.4]">
              <span className="mt-[0.5cqw] h-[0.8cqw] w-[0.8cqw] shrink-0 rounded-full" style={{ background: C.ink }} aria-hidden />
              <span className="min-w-0">{row}</span>
            </li>
          ))}
        </ul>
        <span
          className="mt-auto max-w-full self-start truncate rounded-full border px-[1.3cqw] py-[0.55cqw] text-[1.05cqw]"
          style={{ borderColor: C.line, color: C.muted }}
        >
          {chip}
        </span>
      </aside>
    </div>
  );
}
