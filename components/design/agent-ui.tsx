/**
 * UI-кит экранов AI-агентов (дизайн-система Vercel/shadcn, светлая тема).
 *
 * Собирает внутренние экраны кейсов на /agents/work/[slug]: карточки, кнопки,
 * бейджи, метрики, терминал и раскладку «сайдбар + контент». Всё в cqw —
 * макет масштабируется вместе с контейнером (см. case-preview.tsx), поэтому
 * одинаково читается в карточке сетки и на всю ширину страницы кейса.
 *
 * Цвета заданы жёстко токенами Vercel (canvas/paper/hairline/ink…), а не через
 * тему интерфейса /design: экран — «скриншот» чужого продукта и не должен
 * перекрашиваться. Цвет несёт только смысл: зелёный — успех/решено, красный —
 * ошибка, всё остальное монохром. Радиусы 6px у карточек/кнопок, 9999px у
 * pill-бейджей, тень — тонкий hairline-ring вместо drop-shadow.
 */

import type { CSSProperties, ReactNode } from 'react';

/** Цветовые токены экрана — зеркало значений из tailwind.config.ts. */
export const AGENT_THEME = {
  canvas: '#FAFAFA',
  paper: '#FFFFFF',
  hairline: '#EBEBEB',
  ink: '#171717',
  charcoal: '#4D4D4D',
  slate: '#7D7D7D',
  success: '#297A3A',
  ember: '#E7000B',
  successSoft: 'rgba(41, 122, 58, 0.1)',
  soft: '#F5F5F5',
  // Vercel-подход к тени: тонкий hairline-ring.
  ring: '0 0 0 1px rgba(0,0,0,0.08)',
} as const;

export const AGENT_MONO = "'Geist Mono','JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
export const AGENT_SANS = "'Geist','Inter',Arial,sans-serif";

/** Карточка: белый фон, 1px solid #ebebeb, радиус 6px, padding 16px. */
export function AgentCard({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[0.6cqw] border p-[1.6cqw] ${className}`}
      style={{ background: AGENT_THEME.paper, borderColor: AGENT_THEME.hairline, ...style }}
    >
      {children}
    </div>
  );
}

/** Кнопка: Primary (тёмная заливка) и Ghost (прозрачная с рамкой hairline). */
export function AgentButton({
  children,
  variant = 'primary',
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.7cqw',
    borderRadius: '0.6cqw',
    padding: '0.9cqw 1.6cqw',
    fontFamily: AGENT_SANS,
    fontSize: '1.3cqw',
    fontWeight: 600,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  };
  const skin: CSSProperties =
    variant === 'primary'
      ? { background: AGENT_THEME.ink, color: '#FFFFFF' }
      : {
          background: 'transparent',
          border: `1px solid ${AGENT_THEME.hairline}`,
          color: AGENT_THEME.charcoal,
        };
  return (
    <span className={className} style={{ ...base, ...skin, ...style }}>
      {children}
    </span>
  );
}

/** Бейдж-pill: Solid (тёмный), Soft (светло-серый), Success (зелёный статус). */
export function AgentBadge({
  children,
  variant = 'soft',
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: 'solid' | 'soft' | 'success';
  className?: string;
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45cqw',
    borderRadius: '9999px',
    padding: '0.42cqw 1.05cqw',
    fontFamily: AGENT_MONO,
    fontSize: '1.05cqw',
    fontWeight: 500,
    lineHeight: 1.35,
    whiteSpace: 'nowrap',
  };
  const skin: CSSProperties =
    variant === 'solid'
      ? { background: AGENT_THEME.ink, color: '#FFFFFF' }
      : variant === 'success'
        ? { background: AGENT_THEME.successSoft, color: AGENT_THEME.success }
        : { background: AGENT_THEME.soft, color: AGENT_THEME.ink };
  return (
    <span className={className} style={{ ...base, ...skin, ...style }}>
      {children}
    </span>
  );
}

/**
 * Блок метрики: заголовок 11px uppercase #7d7d7d (Geist Mono), значение 36px
 * weight 600 #171717 (Geist Sans), подпись 14px #4d4d4d.
 */
export function StatBlock({
  label,
  value,
  note,
  delta,
  className = '',
  style,
}: {
  label: string;
  value: string;
  note?: string;
  /** Прибавка: окрашивается в success (зелёный несёт только смысл роста). */
  delta?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div
        style={{ fontFamily: AGENT_MONO, fontSize: '1.05cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}
      >
        {label}
      </div>
      <div
        className="mt-[0.7cqw] flex items-baseline gap-[0.8cqw] tabular-nums"
        style={{ fontFamily: AGENT_SANS, fontSize: '3.1cqw', fontWeight: 600, color: AGENT_THEME.ink, letterSpacing: '-0.03em' }}
      >
        {value}
        {delta ? (
          <span style={{ fontFamily: AGENT_MONO, fontSize: '1.15cqw', fontWeight: 500, color: AGENT_THEME.success }}>
            {delta}
          </span>
        ) : null}
      </div>
      {note ? (
        <div className="mt-[0.5cqw]" style={{ fontFamily: AGENT_SANS, fontSize: '1.3cqw', color: AGENT_THEME.charcoal }}>
          {note}
        </div>
      ) : null}
    </div>
  );
}

/** Одна строка терминала. */
export interface TerminalRow {
  /** Уровень: команда (▲), успех (✓), ошибка (✗) или обычная info-строка (·). */
  kind?: 'cmd' | 'ok' | 'err' | 'log';
  /** Время слева (необязательно). */
  time?: string;
  /** Основной текст. */
  text: string;
  /** Приписка справа: источник, статус. */
  meta?: string;
}


/**
 * Терминал: фон #fff, рамка #ebebeb, радиус 6px. Внутри Geist Mono 12–13px:
 * команды с префиксом ▲ (#171717), успех ✓ (#297a3a), ошибки ✗ (#e7000b).
 */
export function TerminalPanel({
  title,
  status,
  rows,
  className = '',
  style,
}: {
  /** Название процесса в шапке окна. */
  title?: string;
  /** Статус справа в шапке, например «12 сайтов · каждый час». */
  status?: string;
  rows: TerminalRow[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[0.6cqw] border ${className}`}
      style={{ background: AGENT_THEME.paper, borderColor: AGENT_THEME.hairline, ...style }}
    >
      {title || status ? (
        <div
          className="flex items-center gap-[1cqw] border-b px-[1.6cqw] py-[1.1cqw]"
          style={{ borderColor: AGENT_THEME.hairline, background: AGENT_THEME.canvas }}
        >
          <span className="flex gap-[0.5cqw]" aria-hidden>
            <span className="h-[0.9cqw] w-[0.9cqw] rounded-full" style={{ background: AGENT_THEME.hairline }} />
            <span className="h-[0.9cqw] w-[0.9cqw] rounded-full" style={{ background: AGENT_THEME.hairline }} />
          </span>
          <span className="min-w-0 truncate" style={{ fontFamily: AGENT_MONO, fontSize: '1.15cqw', color: AGENT_THEME.charcoal }}>
            {title}
          </span>
          {status ? (
            <span
              className="ml-auto flex shrink-0 items-center gap-[0.5cqw]"
              style={{ fontFamily: AGENT_MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}
            >
              <span className="h-[0.8cqw] w-[0.8cqw] rounded-full" style={{ background: AGENT_THEME.ink }} aria-hidden />
              {status}
            </span>
          ) : null}
        </div>
      ) : null}
      <div style={{ fontFamily: AGENT_MONO, fontSize: '1.2cqw', lineHeight: 1.85 }}>
        {rows.map((row, i) => {
          const glyph = row.kind === 'cmd' ? '▲' : row.kind === 'ok' ? '✓' : row.kind === 'err' ? '✗' : '·';
          const color =
            row.kind === 'err'
              ? AGENT_THEME.ember
              : row.kind === 'ok'
                ? AGENT_THEME.success
                : row.kind === 'cmd'
                  ? AGENT_THEME.ink
                  : AGENT_THEME.slate;
          return (
            <div
              key={i}
              className="flex items-baseline gap-[1cqw] px-[1.6cqw]"
              style={row.kind === 'err' ? { background: AGENT_THEME.soft } : undefined}
            >
              {row.time ? (
                <span className="shrink-0 tabular-nums" style={{ color: AGENT_THEME.slate, fontSize: '1.05cqw' }}>
                  {row.time}
                </span>
              ) : null}
              <span className="shrink-0" style={{ color, width: '1cqw' }} aria-hidden>
                {glyph}
              </span>
              <span className="min-w-0 flex-1 truncate" style={{ color: row.kind === 'err' ? AGENT_THEME.ink : AGENT_THEME.charcoal }}>
                {row.text}
              </span>
              {row.meta ? (
                <span className="shrink-0 tabular-nums" style={{ color: AGENT_THEME.slate, fontSize: '1.05cqw' }}>
                  {row.meta}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}


/** Раскладка «сайдбар + контент»: слева #fafafa, справа #ffffff. */
export function SidebarLayout({
  sidebar,
  children,
  className = '',
}: {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex h-full w-full overflow-hidden ${className}`} style={{ background: AGENT_THEME.paper }}>
      <aside
        className="flex w-[26%] shrink-0 flex-col border-r px-[1.6cqw] py-[1.8cqw]"
        style={{ borderColor: AGENT_THEME.hairline, background: AGENT_THEME.canvas }}
      >
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

/**
 * Аватар: моно-кружок с инициалами. Рисуем локально, а не через внешний CDN
 * (Unsplash/randomuser): экран — «скриншот» чужого продукта и должен работать
 * офлайн и резко на любом DPI, поэтому лица не грузим по сети.
 */
export function AgentAvatar({ name, size = '2.4cqw' }: { name: string; size?: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: AGENT_THEME.ink,
        color: '#FFFFFF',
        fontFamily: AGENT_SANS,
        fontSize: `calc(${size} * 0.42)`,
        fontWeight: 600,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/** Рейтинг звёздами: filled из total, остальные — контур. */
export function AgentStars({ filled = 5, total = 5, size = '1.1cqw' }: { filled?: number; total?: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-[0.2cqw]" aria-label={`${filled} из ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            fill={i < filled ? AGENT_THEME.ink : 'none'}
            stroke={i < filled ? AGENT_THEME.ink : AGENT_THEME.hairline}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </span>
  );
}

