/**
 * Внутренние экраны кейсов AI-агентов на дизайн-системе Vercel/shadcn.
 *
 * Каждый кейс (/agents/work/[slug]) показывает четыре экрана; они собраны из
 * UI-кита components/design/agent-ui.tsx (AgentCard, AgentButton, AgentBadge,
 * StatBlock, TerminalPanel, SidebarLayout) с реалистичным контентом — заказы,
 * лиды, SKU, цены, статусы. Блоки намеренно не повторяются между кейсами:
 * поддержка ведёт диалог и логи, продажи — карточки лидов и воронку, контент —
 * партии товаров и генерацию, аналитика — вопросы к данным и SKU, разведка —
 * поток краулера и дайджест.
 *
 * Размеры внутри экрана — в cqw, поэтому каждый экран масштабируется вместе с
 * контейнером страницы кейса (Screen задаёт [container-type:inline-size]).
 * Экран — «скриншот» чужого продукта: цвета заданы жёстко токенами Vercel и не
 * перекрашиваются темой интерфейса.
 */
import type { ReactNode } from 'react';
import type { AgentPreviewKey } from '@/data/agent-cases';
import {
  AGENT_MONO,
  AGENT_SANS,
  AGENT_THEME,
  AgentAvatar,
  AgentBadge,
  AgentButton,
  AgentCard,
  AgentStars,
  SidebarLayout,
  StatBlock,
  TerminalPanel,
  type TerminalRow,
} from '@/components/design/agent-ui';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCheck,
  Clock,
  Cpu,
  Database,
  MessageSquare,
  Paperclip,
  Package,
  RotateCcw,
  Send,
  Shield,
  Tag as TagIcon,
  Truck,
  Wrench,
  Wifi,
} from 'lucide-react';
import { Line, LineChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MONO = AGENT_MONO;
const SANS = AGENT_SANS;

/** Обёртка экрана: светлый canvas + контейнер для cqw-масштабирования. */
function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden [container-type:inline-size]"
      style={{ background: AGENT_THEME.canvas, color: AGENT_THEME.ink }}
    >
      {children}
    </div>
  );
}

/** Верхний колонтитул страницы-экрана: имя продукта, период, действие. */
function ScreenHeader({ brand, period, action }: { brand: string; period?: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-[1.5cqw] px-[2cqw] pt-[1.6cqw]">
      <div className="flex items-center gap-[0.8cqw]">
        <span
          className="flex items-center justify-center rounded-[0.5cqw]"
          style={{ width: '2.2cqw', height: '2.2cqw', background: AGENT_THEME.ink, color: '#fff', fontFamily: SANS, fontSize: '1.1cqw', fontWeight: 700 }}
          aria-hidden
        >
          {brand.slice(0, 1)}
        </span>
        <span style={{ fontFamily: SANS, fontSize: '1.4cqw', fontWeight: 600 }}>{brand}</span>
        {period ? (
          <span style={{ fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>{period}</span>
        ) : null}
      </div>
      {action ? <AgentButton variant="ghost">{action}</AgentButton> : null}
    </div>
  );
}

/** Панель «подпись → значение»: строки с hairline-разделителями. */
function Rows({ items, className = '' }: { items: [string, string][]; className?: string }) {
  return (
    <AgentCard className={`flex flex-col justify-between ${className}`}>
      {items.map(([k, v], i) => (
        <div
          key={k}
          className="flex items-center justify-between py-[0.85cqw]"
          style={i > 0 ? { borderTop: `1px solid ${AGENT_THEME.hairline}` } : undefined}
        >
          <span style={{ fontFamily: SANS, fontSize: '1.2cqw', color: AGENT_THEME.charcoal }}>{k}</span>
          <span className="tabular-nums" style={{ fontFamily: MONO, fontSize: '1.15cqw', color: AGENT_THEME.ink, fontWeight: 500 }}>
            {v}
          </span>
        </div>
      ))}
    </AgentCard>
  );
}

/** Горизонтальные столбцы-бары (доли каналов, темы). */
function Bars({ items, title }: { items: [string, string, number][]; title?: string }) {
  const max = Math.max(...items.map((it) => it[2]));
  return (
    <AgentCard className="flex flex-col justify-between gap-[1cqw]">
      {title ? (
        <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
          {title}
        </div>
      ) : null}
      {items.map(([label, value, w]) => (
        <div key={label} className="flex flex-col gap-[0.4cqw]">
          <div className="flex items-center justify-between" style={{ fontSize: '1.15cqw' }}>
            <span style={{ fontFamily: SANS, color: AGENT_THEME.charcoal }}>{label}</span>
            <span className="tabular-nums" style={{ fontFamily: MONO, color: AGENT_THEME.ink, fontWeight: 500 }}>
              {value}
            </span>
          </div>
          <div className="h-[0.6cqw] w-full rounded-full" style={{ background: AGENT_THEME.soft }}>
            <div className="h-full rounded-full" style={{ width: `${(w / max) * 100}%`, background: AGENT_THEME.ink }} />
          </div>
        </div>
      ))}
    </AgentCard>
  );
}

/* ============================ Поддержка ============================ */

/** Диалог поддержки: список диалогов + чат с клиентом. */
function SupportDialogue() {
  return (
    <Screen>
      <SidebarLayout
        sidebar={
          <>
            <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
              Диалоги
            </div>
            {[
              ['Ольга Ковалёва', 'Заказ №1842', true],
              ['Игорь Морозов', 'Доставка дивана', false],
              ['Марина Лебедева', 'Возврат подушки', false],
              ['Пётр Соколов', 'Гарантия', false],
            ].map(([name, topic, active]) => (
              <div
                key={name as string}
                className="mt-[1.1cqw] flex items-center gap-[0.8cqw] rounded-[0.5cqw] px-[0.6cqw] py-[0.55cqw]"
                style={active ? { background: AGENT_THEME.paper } : undefined}
              >
                <AgentAvatar name={name as string} size="2cqw" />
                <div className="min-w-0">
                  <div className="truncate" style={{ fontFamily: SANS, fontSize: '1.15cqw', fontWeight: 500 }}>
                    {name}
                  </div>
                  <div className="truncate" style={{ fontFamily: MONO, fontSize: '0.95cqw', color: AGENT_THEME.slate }}>
                    {topic}
                  </div>
                </div>
              </div>
            ))}
          </>
        }
      >
        <div className="flex items-center justify-between border-b px-[2cqw] py-[1.2cqw]" style={{ borderColor: AGENT_THEME.hairline }}>
          <div className="flex items-center gap-[0.9cqw]">
            <AgentAvatar name="Ольга Ковалёва" size="2.4cqw" />
            <div>
              <div style={{ fontFamily: SANS, fontSize: '1.3cqw', fontWeight: 600 }}>Ольга Ковалёва</div>
              <div style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>WhatsApp · онлайн</div>
            </div>
          </div>
          <AgentBadge variant="success">решено</AgentBadge>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-[0.9cqw] px-[2cqw] py-[1.3cqw]">
          {[
            ['user', 'Здравствуйте! Где мой заказ?'],
            ['agent', 'Заказ №1842 — «Диван Осло» — у грузчиков, сегодня до 18:00.'],
            ['user', 'А диван точно тёмно-зелёный?'],
            ['agent', 'Да, цвет «мокко» — пришлю фото из зала.'],
          ].map(([from, text], i) => (
            <div
              key={i}
              className={`flex max-w-[72%] items-end gap-[0.8cqw] rounded-[0.7cqw] px-[1.2cqw] py-[0.8cqw] ${from === 'agent' ? 'self-end' : 'self-start'}`}
              style={
                from === 'agent'
                  ? { background: AGENT_THEME.ink, color: '#fff', fontFamily: SANS, fontSize: '1.2cqw' }
                  : { background: AGENT_THEME.soft, fontFamily: SANS, fontSize: '1.2cqw' }
              }
            >
              {from === 'user' ? <AgentAvatar name="Ольга Ковалёва" size="1.8cqw" /> : null}
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[0.9cqw] border-t px-[2cqw] py-[1.2cqw]" style={{ borderColor: AGENT_THEME.hairline }}>
          <span
            className="min-w-0 flex-1 truncate rounded-[0.5cqw] border px-[1cqw] py-[0.7cqw]"
            style={{ borderColor: AGENT_THEME.hairline, color: AGENT_THEME.slate, fontFamily: SANS, fontSize: '1.15cqw' }}
          >
            Спросить о заказе…
          </span>
          <AgentButton>Отправить</AgentButton>
        </div>
      </SidebarLayout>
    </Screen>
  );
}

/** База знаний: сетка статей со счётчиками просмотров. */
function SupportKnowledge() {
  const articles: [string, string, string, string, number][] = [
    ['Доставка', 'Как отследить заказ', '12 480', 'обновлено 3 дня назад', 96],
    ['Доставка', 'Сроки доставки по регионам', '8 210', 'обновлено вчера', 78],
    ['Сборка', 'Сборка и монтаж', '5 640', 'обновлено 6 дней назад', 62],
    ['Гарантия', 'Гарантия 2 года', '4 915', 'обновлено 2 недели назад', 54],
    ['Возврат', 'Возврат за 14 дней', '3 302', 'обновлено 5 дней назад', 41],
    ['Ткани', 'Уход за тканью', '1 870', 'обновлено неделю назад', 28],
    ['Оплата', 'Оплата и рассрочка', '1 420', 'обновлено 4 дня назад', 22],
    ['Сервис', 'Замер и монтаж на дому', '1 180', 'обновлено 8 дней назад', 18],
    ['Сервис', 'Вызов замерщика', '640', 'обновлено 11 дней назад', 11],
  ];
  return (
    <Screen>
      <ScreenHeader brand="Мебель-Дом" period="842 статьи" action="Новая статья" />
      {/* 9 статей в три ряда; сетка растянута на всю высоту кадра, как в каталоге. */}
      <div className="mt-[1.6cqw] grid h-[calc(100%-7cqw)] auto-rows-fr grid-cols-3 gap-[1.2cqw] px-[2cqw] pb-[2cqw]">
        {articles.map(([topic, title, views, updated, share]) => (
          <AgentCard key={title} className="flex flex-col justify-between gap-[0.7cqw]">
            <div className="flex items-center justify-between gap-[0.6cqw]">
              <span
                className="truncate rounded-full px-[0.75cqw] py-[0.25cqw]"
                style={{ background: AGENT_THEME.soft, color: AGENT_THEME.charcoal, fontFamily: MONO, fontSize: '0.95cqw' }}
              >
                {topic}
              </span>
              <span
                className="shrink-0 tabular-nums"
                style={{ fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}
              >
                {views} просм.
              </span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: '1.25cqw', fontWeight: 600, lineHeight: 1.35 }}>{title}</div>
            <div className="flex flex-col gap-[0.5cqw]">
              <div className="h-[0.5cqw] w-full rounded-full" style={{ background: AGENT_THEME.soft }}>
                <div className="h-full rounded-full" style={{ width: `${share}%`, background: AGENT_THEME.ink }} />
              </div>
              <div className="flex items-center justify-between gap-[0.6cqw]">
                <span className="truncate" style={{ fontFamily: SANS, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>
                  {updated}
                </span>
                <span className="shrink-0 tabular-nums" style={{ fontFamily: MONO, fontSize: '0.95cqw', color: AGENT_THEME.slate }}>
                  {share}%
                </span>
              </div>
            </div>
          </AgentCard>
        ))}
      </div>
    </Screen>
  );
}

/** Журнал диалогов: TerminalPanel + метрики качества. */
function SupportLogs() {
  const rows: TerminalRow[] = [
    { kind: 'cmd', time: '14:02', text: 'диалог #8841 · вопрос «где мой заказ»', meta: '0.94' },
    { kind: 'ok', time: '14:02', text: 'источник: 1С · заказ №1842 → «в пути»', meta: '200' },
    { kind: 'log', time: '14:03', text: 'доставка: зона Краснодар · сегодня до 18:00' },
    { kind: 'ok', time: '14:03', text: 'ответ отправлен · 8 сек', meta: 'ok' },
    { kind: 'log', time: '14:05', text: 'подбор ткани: букле vs велюр · ответ по базе знаний' },
    { kind: 'err', time: '14:06', text: 'скидка вне политики → оператору', meta: 'handoff' },
  ];
  return (
    <Screen>
      <ScreenHeader brand="Мебель-Дом" period="февраль 2026" action="Экспорт" />
      <div className="mt-[1.6cqw] grid h-[calc(100%-7cqw)] grid-cols-[1.5fr_1fr] gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <TerminalPanel title="support-agent · prod" status="live" rows={rows} />
        <div className="flex flex-col gap-[1.6cqw]">
          <StatBlock label="Первый ответ" value="8 сек" delta="−82%" note="медиана за неделю" />
          <StatBlock label="Без оператора" value="74%" delta="+31 п.п." note="из всех диалогов" />
        </div>
      </div>
    </Screen>
  );
}

/** Дашборд качества: метрики, темы обращений, отзыв клиента. */
function SupportDashboard() {
  return (
    <Screen>
      <ScreenHeader brand="Мебель-Дом" period="февраль 2026" />
      {/* Колонка контента растянута на всю высоту кадра: метрики сверху, панели — на остаток. */}
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <div className="grid grid-cols-3 gap-[1.2cqw]">
          <StatBlock label="Первый ответ" value="8 сек" delta="−82%" />
          <StatBlock label="Оценка диалогов" value="4,7" note="2 480 отзывов" />
          <StatBlock label="Без оператора" value="74%" delta="+31 п.п." />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-[1.4cqw]">
          <Bars
            title="Топ тем обращений"
            items={[
              ['Статус заказа', '41%', 41],
              ['Доставка', '24%', 24],
              ['Возврат', '18%', 18],
              ['Наличие ткани', '9%', 9],
            ]}
          />
          <AgentCard className="flex flex-col justify-between gap-[1cqw]">
            <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
              Отзыв клиента
            </div>
            <div className="flex items-center gap-[0.8cqw]">
              <AgentAvatar name="Ольга Ковалёва" size="2.2cqw" />
              <div>
                <div style={{ fontFamily: SANS, fontSize: '1.15cqw', fontWeight: 600 }}>Ольга Ковалёва</div>
                <AgentStars filled={5} />
              </div>
            </div>
            <p style={{ fontFamily: SANS, fontSize: '1.2cqw', color: AGENT_THEME.charcoal, lineHeight: 1.5 }}>
              «Ответили за секунды и показали, где заказ. Оператор не понадобился.»
            </p>
            <div className="flex items-center justify-between gap-[0.6cqw]" style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>
              <span>заказ №1842</span>
              <span>WhatsApp · 12:40</span>
            </div>
          </AgentCard>
        </div>
      </div>
    </Screen>
  );
}



/* ============================ Продажи ============================ */

/** Чат с клиентом: аватары, таймстампы, статус доставки, вложение. */
function ChatThread({ header, badge, badgeVariant = 'solid', messages, placeholder }: { header: string; badge: string; badgeVariant?: 'solid' | 'soft' | 'success'; messages: [string, string][]; placeholder: string; }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-[2cqw] py-[1.2cqw]" style={{ borderColor: AGENT_THEME.hairline }}>
        <div className="flex items-center gap-[0.9cqw]">
          <span className="relative flex h-[2.4cqw] w-[2.4cqw] items-center justify-center rounded-full" style={{ background: AGENT_THEME.soft }}>
            <MessageSquare className="h-full w-full" style={{ color: AGENT_THEME.ink }} aria-hidden />
            <span className="absolute right-[0.3cqw] top-[0.3cqw] h-[0.5cqw] w-[0.5cqw] rounded-full border-2 border-[var(--d-ink)]" />
          </span>
          <div>
            <div style={{ fontFamily: SANS, fontSize: '1.3cqw', fontWeight: 600 }}>{header}</div>
            <div style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>WhatsApp · онлайн</div>
          </div>
        </div>
        <AgentBadge variant={badgeVariant}>{badge}</AgentBadge>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-[0.9cqw] px-[2cqw] py-[1.3cqw]">
        {messages.map(([from, text], i) => (
          <div key={i} className="flex max-w-[72%] items-end gap-[0.8cqw]">
            {from === 'user' ? (
              <div className="flex items-end gap-[0.8cqw]">
                <AgentAvatar name="Ольга Ковалёва" size="1.8cqw" />
                <div className="group relative flex-1 rounded-[0.7cqw] rounded-tl-[0.35cqw] bg-[var(--d-soft)] px-[1.2cqw] py-[0.8cqw]" style={{ fontFamily: SANS, fontSize: '1.2cqw' }}>
                  <div className="absolute inset-x-[0.8cqw] top-[0.3cqw] flex items-center gap-[0.25cqw] rounded-[0.35cqw] bg-[var(--d-soft)] px-[0.5cqw] py-[0.2cqw] text-[10px] font-semibold" style={{ color: AGENT_THEME.ink }}>
                    <Paperclip className="h-[0.6cqw] w-[0.6cqw]" aria-hidden />
                    <span className="sr-only">Вложение</span>
                  </div>
                  <span className="mt-[0.9cqw]">{text}</span>
                  <span className="mt-[0.3cqw] tabular-nums text-[10px]" style={{ fontFamily: MONO, color: AGENT_THEME.slate }}>{formatTime(i)}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-end gap-[0.8cqw]">
                <span className="relative flex h-[2.4cqw] w-[2.4cqw] items-center justify-center rounded-full" style={{ background: AGENT_THEME.ink }}>
                  <span className="flex h-full w-full items-center justify-center rounded-full" style={{ background: AGENT_THEME.soft }}>
                    <CheckCheck className="h-[0.9cqw] w-[0.9cqw]" style={{ color: AGENT_THEME.ink }} aria-hidden />
                  </span>
                  <span className="absolute inset-0 rounded-full border-2 border-[var(--d-ink)]" />
                </span>
                <div className="relative max-w-[72%] rounded-[0.7cqw] rounded-tr-[0.35cqw] bg-[var(--d-ink)] px-[1.2cqw] py-[0.8cqw] text-white" style={{ fontFamily: SANS, fontSize: '1.2cqw' }}>
                  <span className="flex items-center justify-between gap-[0.6cqw]">
                    <span className="truncate">{text}</span>
                    <span className="flex items-center gap-[0.2cqw] text-[10px] font-semibold" style={{ color: '#9CA0A6' }}>
                      <CheckCheck className="h-[0.5cqw] w-[0.5cqw]" aria-hidden />
                      <span className="sr-only">Доставлено</span>
                    </span>
                  </span>
                  <span className="mt-[0.3cqw] tabular-nums text-[10px]" style={{ fontFamily: MONO, color: '#9CA0A6' }}>{formatTime(i)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-[0.9cqw] border-t px-[2cqw] py-[1.2cqw]" style={{ borderColor: AGENT_THEME.hairline }}>
        <span className="min-w-0 flex-1 truncate rounded-[0.5cqw] border px-[1cqw] py-[0.7cqw]" style={{ borderColor: AGENT_THEME.hairline, color: AGENT_THEME.slate, fontFamily: SANS, fontSize: '1.15cqw' }}>
          {placeholder}
        </span>
        <AgentButton>Отправить</AgentButton>
      </div>
    </div>
  );
}

function formatTime(i: number): string {
  const times = ['18:04', '18:05', '18:06', '18:07', '18:08', '18:09'];
  return times[i] ?? '18:10';
}

/** Диалог с лидом слева, панель квалификации справа. */
function SalesDialogue() {
  return (
    <Screen>
      <div className="flex h-full w-full">
        <div className="min-w-0 flex-1">
          <ChatThread
            header="Анна Ковалёва · Север-Трейд"
            badge="лид квалифицирован"
            messages={[
              ['user', 'Интересует интеграция с нашей CRM.'],
              ['agent', 'Сколько человек в команде и какая CRM?'],
              ['user', '40 человек, работаем в Битрикс24.'],
              ['agent', 'Покажу демо: завтра в 15:00 удобно?'],
            ]}
            placeholder="Задать уточняющий вопрос…"
          />
        </div>
        <aside className="flex w-[30%] shrink-0 flex-col border-l px-[1.6cqw] py-[1.6cqw]" style={{ borderColor: AGENT_THEME.hairline, background: AGENT_THEME.canvas }}>
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Квалификация
          </div>
          <div className="mt-[1cqw]">
            <Rows
              items={[
                ['ICP', 'совпадает'],
                ['Компания', '40+ чел.'],
                ['CRM', 'Битрикс24'],
                ['Демо', 'завтра 15:00'],
              ]}
            />
          </div>
        </aside>
      </div>
    </Screen>
  );
}

/** Воронка лидов: этапы с конверсией — горизонтальные ступени. */
function SalesFunnel() {
  const stages: [string, string, number][] = [
    ['Заявка', '412', 412],
    ['Ответ агента', '398', 398],
    ['Квалификация', '174', 174],
    ['Демо', '96', 96],
  ];
  return (
    <Screen>
      <ScreenHeader brand="LeadBot" period="последние 30 дней" action="amoCRM" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <AgentCard className="flex min-h-0 flex-1 flex-col justify-between gap-[1.3cqw]">
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Путь лида до демо
          </div>
          {stages.map(([label, value, n]) => (
            <div key={label} className="flex items-center gap-[1cqw]">
              <span className="w-[9cqw] shrink-0" style={{ fontFamily: SANS, fontSize: '1.2cqw', color: AGENT_THEME.charcoal }}>
                {label}
              </span>
              <div className="h-[2.6cqw] flex-1 rounded-[0.4cqw]" style={{ background: AGENT_THEME.soft }}>
                <div className="flex h-full items-center justify-end rounded-[0.4cqw] px-[0.8cqw]" style={{ width: `${(n / 412) * 100}%`, background: AGENT_THEME.ink }}>
                  <span className="tabular-nums" style={{ fontFamily: MONO, fontSize: '1.05cqw', color: '#fff', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div
            className="flex items-center justify-between border-t pt-[1.1cqw]"
            style={{ borderColor: AGENT_THEME.hairline, fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}
          >
            <span>заявок за период</span>
            <span className="tabular-nums">412 → 96 демо · срез 30 дней</span>
          </div>
        </AgentCard>
        <div className="grid grid-cols-3 gap-[1.2cqw]">
          <StatBlock label="Конверсия в демо" value="23%" delta="+9 п.п." />
          <StatBlock label="До ответа" value="40 сек" delta="−94%" />
          <StatBlock label="Цикл сделки" value="11 дней" delta="−6 дней" />
        </div>
      </div>
    </Screen>
  );
}

/** Запись на демо: карточка встречи + слоты календаря. */
function SalesBooking() {
  const slots = ['14:00', '15:00', '16:00', '17:00', '18:00'];
  return (
    <Screen>
      <ScreenHeader brand="LeadBot" period="Google Calendar" action="Создать встречу" />
      {/* Обе колонки растянуты на высоту кадра: слева карточка встречи, справа слоты дня. */}
      <div className="mt-[1.6cqw] grid h-[calc(100%-7cqw)] grid-cols-2 gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <AgentCard className="flex flex-col gap-[1cqw]">
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Встреча
          </div>
          <div className="mt-[0.6cqw] flex min-h-0 flex-1 flex-col">
            <Rows
              className="h-full"
              items={[
                ['Лида', 'Анна Ковалёва'],
                ['Компания', 'Север-Трейд'],
                ['Слот', 'завтра, 15:00 MSK'],
                ['Участники', '3 со стороны клиента'],
                ['Интеграция', 'Битрикс24'],
              ]}
            />
          </div>
          <AgentButton className="self-start">Отправить приглашение</AgentButton>
        </AgentCard>
        <AgentCard className="flex flex-col gap-[1cqw]">
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Свободные слоты · завтра
          </div>
          <div className="mt-[0.6cqw] flex min-h-0 flex-1 flex-col justify-between gap-[0.8cqw]">
            {slots.map((slot) => {
              const active = slot === '15:00';
              return (
                <div
                  key={slot}
                  className="flex items-center justify-between rounded-[0.5cqw] border px-[1cqw] py-[0.8cqw]"
                  style={
                    active
                      ? { borderColor: AGENT_THEME.ink, background: AGENT_THEME.ink, color: '#fff' }
                      : { borderColor: AGENT_THEME.hairline }
                  }
                >
                  <span className="tabular-nums" style={{ fontFamily: MONO, fontSize: '1.2cqw', fontWeight: 500 }}>
                    {slot}
                  </span>
                  {active ? <AgentBadge variant="solid">выбран</AgentBadge> : <span style={{ fontFamily: SANS, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>свободен</span>}
                </div>
              );
            })}
          </div>
          <div
            className="flex items-center justify-between gap-[0.6cqw]"
            style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}
          >
            <span>слоты в MSK</span>
            <span>30 мин · встреча в Zoom</span>
          </div>
        </AgentCard>
      </div>
    </Screen>
  );
}

/** Дашборд продаж: метрики, источники лидов, вклад агента. */
function SalesDashboard() {
  return (
    <Screen>
      <ScreenHeader brand="LeadBot" period="февраль 2026" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <div className="grid grid-cols-4 gap-[1.1cqw]">
          <StatBlock label="Лиды" value="412" delta="+34%" />
          <StatBlock label="Демо" value="96" delta="×3" />
          <StatBlock label="Конверсия" value="23%" delta="+9 п.п." />
          <StatBlock label="Время SDR" value="−40%" note="сэкономлено" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-[1.4cqw]">
          <Bars
            title="Источники лидов"
            items={[
              ['Сайт', '52%', 52],
              ['Telegram', '28%', 28],
              ['Вебинар', '14%', 14],
              ['Партнёры', '6%', 6],
            ]}
          />
          <AgentCard className="flex flex-col justify-between gap-[0.8cqw]">
            <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
              Топ-сделка месяца
            </div>
            <div className="flex items-center gap-[0.8cqw]">
              <AgentAvatar name="Север-Трейд" size="2.4cqw" />
              <div>
                <div style={{ fontFamily: SANS, fontSize: '1.2cqw', fontWeight: 600 }}>Север-Трейд</div>
                <div style={{ fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>сделка 480 000 ₽ · годовой план</div>
              </div>
            </div>
            <AgentBadge variant="success">демо проведено</AgentBadge>
            <div
              className="flex items-center justify-between gap-[0.6cqw] border-t pt-[1cqw]"
              style={{ borderColor: AGENT_THEME.hairline, fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}
            >
              <span>источник: сайт</span>
              <span>менеджер Ирина</span>
            </div>
          </AgentCard>
        </div>
      </div>
    </Screen>
  );
}


/* ============================ Контент ============================ */

/** Задание агенту: диалог в Telegram + панель параметров партии. */
function ContentTask() {
  return (
    <Screen>
      <div className="flex h-full w-full">
        <div className="min-w-0 flex-1">
          <ChatThread
            header="ContentBot · WB"
            badge="черновиков: 20"
            badgeVariant="soft"
            messages={[
              ['user', 'Карточки для новой линейки белья.'],
              ['agent', 'Готово: 20 карточек, по 5 слайдов.'],
              ['user', 'Добавь акцент: 100% хлопок.'],
              ['agent', 'Обновил — проверьте черновики.'],
            ]}
            placeholder="Уточнить тон…"
          />
        </div>
        <aside className="flex w-[32%] shrink-0 flex-col border-l px-[1.6cqw] py-[1.6cqw]" style={{ borderColor: AGENT_THEME.hairline, background: AGENT_THEME.canvas }}>
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Параметры партии
          </div>
          <div className="mt-[1cqw]">
            <Rows
              items={[
                ['Тон', 'нейтральный'],
                ['Источник', 'ТЗ бренда'],
                ['Факты', 'состав, размеры'],
                ['SKU в партии', '20'],
                ['Статус', 'на проверке'],
              ]}
            />
          </div>
        </aside>
      </div>
    </Screen>
  );
}

/** Партия карточек в работе: сетка товаров со статусами. */
function ContentBatch() {
  const cards: [string, string, string][] = [
    ['Бельё «Лофт»', '5 слайдов', 'готово'],
    ['Плед «Кашемир»', '5 слайдов', 'черновик'],
    ['Подушка 70×70', '4 слайда', 'на проверке'],
    ['Наволочки (набор)', '5 слайдов', 'готово'],
    ['Одеяло «Зима»', '5 слайдов', 'черновик'],
    ['Плед детский', '4 слайда', 'готово'],
  ];
  return (
    <Screen>
      <ScreenHeader brand="ContentBot" period="партия из 20 SKU" action="Экспорт на WB" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.3cqw] px-[2cqw] pb-[2cqw]">
        <div className="flex items-center gap-[0.8cqw]">
          <AgentBadge variant="success">готово · 12</AgentBadge>
          <AgentBadge variant="soft">черновик · 5</AgentBadge>
          <AgentBadge variant="soft">на проверке · 3</AgentBadge>
        </div>
        {/* Карточки делят остаток высоты: две строки по три SKU. */}
        <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-3 gap-[1.2cqw]">
          {cards.map(([title, slides, status]) => (
            <AgentCard key={title} className="flex flex-col justify-between gap-[0.9cqw]">
              <div style={{ fontFamily: SANS, fontSize: '1.2cqw', fontWeight: 600 }}>{title}</div>
              <div className="flex items-center gap-[0.5cqw]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    style={{ background: s <= Number(slides[0]) ? AGENT_THEME.ink : AGENT_THEME.hairline, height: '0.5cqw', flex: 1, borderRadius: '0.2cqw' }}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-[0.3cqw]" style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>
                <span>состав и размеры заполнены</span>
                <span>акцент: 100% хлопок</span>
                <span>уход: стирка 40°</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>{slides}</span>
                {status === 'готово' ? <AgentBadge variant="success">готово</AgentBadge> : <AgentBadge variant="soft">{status}</AgentBadge>}
              </div>
            </AgentCard>
          ))}
        </div>
      </div>
    </Screen>
  );
}

/** Контент-план недели: публикации по дням. */
function ContentPlan() {
  const plan: [string, string, string, string, boolean][] = [
    ['Пн', '10:00', 'Карточка SKU-4821', 'WB', true],
    ['Пн', '15:30', 'Пост «Как выбрать бельё»', 'Блог', true],
    ['Ср', '10:00', 'Карточка SKU-4018', 'WB', true],
    ['Ср', '12:30', 'Сторис: обзор коллекции', 'Instagram', false],
    ['Чт', '11:00', 'Пост «5 правил ухода»', 'Блог', false],
    ['Пт', '10:00', 'Карточка SKU-3390', 'WB', true],
    ['Пт', '16:00', 'Подборка «Лофт»', 'Ozon', false],
    ['Сб', '09:00', 'Ревизия заголовков', 'WB', false],
    ['Сб', '13:00', 'Рассылка по базе', 'E-mail', false],
  ];
  return (
    <Screen>
      <ScreenHeader brand="ContentBot" period="12–18 февраля" action="Публиковать" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.2cqw] px-[2cqw] pb-[2cqw]">
        <div className="flex items-center gap-[0.8cqw]">
          <AgentBadge variant="success">готово · 4</AgentBadge>
          <AgentBadge variant="soft">черновик · 5</AgentBadge>
          <AgentBadge variant="soft">площадок · 4</AgentBadge>
        </div>
        {/* Таблица плана растянута на остаток высоты: строки делят её поровну. */}
        <AgentCard className="flex min-h-0 flex-1 flex-col p-[1.2cqw]">
          {plan.map(([day, time, title, channel, ready], i) => (
            <div
              key={`${day}-${time}`}
              className="flex flex-1 items-center gap-[1cqw]"
              style={i > 0 ? { borderTop: `1px solid ${AGENT_THEME.hairline}` } : undefined}
            >
              <span className="w-[3.4cqw] shrink-0" style={{ fontFamily: SANS, fontSize: '1.15cqw', fontWeight: 600 }}>
                {day}
              </span>
              <span className="w-[4.4cqw] shrink-0 tabular-nums" style={{ fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>
                {time}
              </span>
              <span className="min-w-0 flex-1 truncate" style={{ fontFamily: SANS, fontSize: '1.15cqw', color: AGENT_THEME.ink }}>
                {title}
              </span>
              <span className="w-[6cqw] shrink-0" style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>
                {channel}
              </span>
              {ready ? <AgentBadge variant="success">готово</AgentBadge> : <AgentBadge variant="soft">черновик</AgentBadge>}
            </div>
          ))}
        </AgentCard>
      </div>
    </Screen>
  );
}

/** Метрики контента: CTR, охваты, на что смотрят. */
function ContentMetrics() {
  return (
    <Screen>
      <ScreenHeader brand="ContentBot" period="февраль 2026" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <div className="grid grid-cols-4 gap-[1.1cqw]">
          <StatBlock label="CTR карточек" value="+18%" delta="▲" />
          <StatBlock label="Просмотры" value="2,4 млн" note="за месяц" />
          <StatBlock label="Конверсия" value="6,1%" delta="+1,4 п.п." />
          <StatBlock label="Возвраты" value="−2 п.п." note="точнее состав" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-[1.4cqw]">
          <Bars
            title="На что смотрят"
            items={[
              ['Заголовок', '46%', 46],
              ['Слайд 2', '24%', 24],
              ['Состав', '19%', 19],
              ['Размер', '11%', 11],
            ]}
          />
          <AgentCard className="flex flex-col justify-between gap-[0.8cqw]">
            <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
              Рекомендация агента
            </div>
            <p style={{ fontFamily: SANS, fontSize: '1.25cqw', color: AGENT_THEME.ink, lineHeight: 1.5, fontWeight: 500 }}>
              «Бельё „Лофт“: заголовок кликается на 46% — перенесите акцент в первые 40 символов на остальные карточки.»
            </p>
            <AgentButton className="self-start">Применить к партии</AgentButton>
            <div
              className="flex items-center justify-between gap-[0.6cqw] border-t pt-[1cqw]"
              style={{ borderColor: AGENT_THEME.hairline, fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}
            >
              <span>затронет 8 карточек</span>
              <span className="tabular-nums">прогноз CTR +6–9%</span>
            </div>
          </AgentCard>
        </div>
      </div>
    </Screen>
  );
}


/* ============================ Аналитика ============================ */

/** Вопрос к данным словами: чат + панель источников. */
function AnalystAsk() {
  return (
    <Screen>
      <div className="flex h-full w-full">
        <div className="min-w-0 flex-1">
          <ChatThread
            header="Аналитик · маркетплейс"
            badge="ответ подтверждён данными"
            badgeVariant="soft"
            messages={[
              ['user', 'Почему упали продажи SKU-4821?'],
              ['agent', 'Реклама стояла 4 дня: ДРР выросла до 14%.'],
              ['user', 'Что возобновить первым?'],
              ['agent', '«Крем SPF» — ROI 2,1, он в плюсе.'],
            ]}
            placeholder="Спросить про продажи…"
          />
        </div>
        <aside className="flex w-[32%] shrink-0 flex-col border-l px-[1.6cqw] py-[1.6cqw]" style={{ borderColor: AGENT_THEME.hairline, background: AGENT_THEME.canvas }}>
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Источники
          </div>
          <div className="mt-[1cqw]">
            <Rows
              items={[
                ['WB API', 'кабинет 1'],
                ['Ozon API', 'кабинет 2'],
                ['Период', '12–16 фев'],
                ['Кампаний', '5'],
                ['ROI окно', '30 дней'],
              ]}
            />
          </div>
        </aside>
      </div>
    </Screen>
  );
}

/** Утренняя сводка продаж: 4 метрики + каналы. */
function AnalystSummary() {
  return (
    <Screen>
      <ScreenHeader brand="Analyst" period="февраль 2026" action="Telegram" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <div className="grid grid-cols-4 gap-[1.1cqw]">
          <StatBlock label="Выручка" value="4,1 млн ₽" delta="+9%" />
          <StatBlock label="Заказы" value="8 240" delta="+6%" />
          <StatBlock label="Ср. чек" value="498 ₽" note="по всем кабинетам" />
          <StatBlock label="Возвраты" value="3,2%" delta="−0,8 п.п." />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-[1.4cqw]">
          <Bars
            title="Доля каналов"
            items={[
              ['Органика', '38%', 38],
              ['Реклама', '34%', 34],
              ['Внешний трафик', '18%', 18],
              ['Скидки', '10%', 10],
            ]}
          />
          <AgentCard className="flex flex-col justify-between gap-[0.8cqw]">
            <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
              Ответ агента · «почему упали продажи?»
            </div>
            <p style={{ fontFamily: SANS, fontSize: '1.2cqw', color: AGENT_THEME.charcoal, lineHeight: 1.55 }}>
              Реклама SKU-4821 стояла 4 дня без корректировки — ДРР выросла с 8% до 14%. Органика держится, теряется платный трафик.
            </p>
            <div className="flex flex-wrap gap-[0.8cqw]">
              <AgentBadge variant="success">ДРР 14%</AgentBadge>
              <AgentBadge variant="soft">источник: WB API</AgentBadge>
            </div>
            <div
              className="flex items-center justify-between gap-[0.6cqw] border-t pt-[1cqw]"
              style={{ borderColor: AGENT_THEME.hairline, fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}
            >
              <span>период 12–16 фев</span>
              <span className="tabular-nums">5 кампаний · обновлено 07:15</span>
            </div>
          </AgentCard>
        </div>
      </div>
    </Screen>
  );
}

/** SKU под вниманием: сетка убыточных и растущих позиций. */
function AnalystSku() {
  const sku: [string, string, boolean, number, string, string][] = [
    ['SKU 4821 Крем', '−4,2%', true, 84, '1 240 шт', 'ДРР 14%'],
    ['SKU 4018 Коврик', '+1,8%', false, 36, '860 шт', 'органика'],
    ['SKU 3390 Лампа', '−0,6%', true, 12, '410 шт', 'возвраты 9%'],
    ['SKU 2214 Подушка', '+2,4%', false, 48, '1 105 шт', 'рост органики'],
    ['SKU 1102 Плед', '+0,9%', false, 18, '520 шт', 'стабильно'],
    ['SKU 0911 Кружка', '−0,3%', true, 6, '300 шт', 'цена выше рынка'],
  ];
  return (
    <Screen>
      <ScreenHeader brand="Analyst" period="февраль 2026" action="Выгрузить" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.3cqw] px-[2cqw] pb-[2cqw]">
        <div className="flex items-center gap-[0.8cqw]">
          <AgentBadge variant="soft">Маржа</AgentBadge>
          <AgentBadge variant="soft">Реклама</AgentBadge>
          <AgentBadge variant="soft">Возвраты</AgentBadge>
        </div>
        {/* Карточки SKU делят остаток высоты: три строки по две позиции. */}
        <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-[1.2cqw]">
          {sku.map(([title, delta, down, w, sales, reason]) => (
            <AgentCard key={title} className="flex items-center justify-between gap-[1.4cqw]">
              <div className="flex min-w-0 items-center gap-[1cqw]">
                <span style={{ fontFamily: SANS, fontSize: '1.25cqw', fontWeight: 600 }}>{title}</span>
                <AgentBadge variant={down ? 'soft' : 'success'}>{down ? 'падение' : 'рост'}</AgentBadge>
              </div>
              <div className="flex shrink-0 items-center gap-[1.4cqw]">
                <span
                  className="tabular-nums"
                  style={{ fontFamily: MONO, fontSize: '1.7cqw', fontWeight: 600, color: down ? AGENT_THEME.ember : AGENT_THEME.success }}
                >
                  {delta}
                </span>
                <div className="w-[14cqw]">
                  <div className="h-[0.9cqw] rounded-[0.4cqw]" style={{ background: AGENT_THEME.soft }}>
                    <div className="h-full rounded-[0.4cqw]" style={{ width: `${w}%`, background: down ? AGENT_THEME.ember : AGENT_THEME.success }} />
                  </div>
                  <div className="mt-[0.4cqw]" style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>
                    маржа за месяц
                  </div>
                </div>
                <span className="tabular-nums" style={{ fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>
                  {sales} · {reason}
                </span>
              </div>
            </AgentCard>
          ))}
        </div>
      </div>
    </Screen>
  );
}

/** Воронка карточки: показы → клики → корзина → заказ. */
function AnalystFunnel() {
  const stages: [string, string, number][] = [
    ['Показы', '1,2 млн', 1200],
    ['Клики', '48 900', 49],
    ['В корзину', '6 480', 6.5],
    ['Заказ', '4 110', 4.1],
  ];
  return (
    <Screen>
      <ScreenHeader brand="Analyst" period="SKU-4821" action="Выгрузить" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <AgentCard className="flex min-h-0 flex-1 flex-col justify-between gap-[1.3cqw]">
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Воронка карточки
          </div>
          {stages.map(([label, value, n]) => (
            <div key={label} className="flex items-center gap-[1cqw]">
              <span className="w-[9cqw] shrink-0" style={{ fontFamily: SANS, fontSize: '1.2cqw', color: AGENT_THEME.charcoal }}>
                {label}
              </span>
              <div className="h-[2.6cqw] flex-1 rounded-[0.4cqw]" style={{ background: AGENT_THEME.soft }}>
                <div className="flex h-full items-center justify-end rounded-[0.4cqw] px-[0.8cqw]" style={{ width: `${Math.max((n / 1200) * 100, 14)}%`, background: AGENT_THEME.ink }}>
                  <span className="tabular-nums" style={{ fontFamily: MONO, fontSize: '1.05cqw', color: '#fff', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div
            className="flex items-center justify-between gap-[0.6cqw] border-t pt-[1.1cqw]"
            style={{ borderColor: AGENT_THEME.hairline, fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}
          >
            <span>конверсия показ → заказ</span>
            <span className="tabular-nums">0,34% · цель 0,40%</span>
          </div>
        </AgentCard>
        <div className="grid grid-cols-3 gap-[1.2cqw]">
          <StatBlock label="CTR" value="4,1%" delta="+0,6 п.п." />
          <StatBlock label="CR корзины" value="13,2%" note="клик → корзина" />
          <StatBlock label="Выкуп" value="63%" note="−4 п.п. к январю" />
        </div>
      </div>
    </Screen>
  );
}

/* ============================ Разведка ============================ */

/** Утренний бриф: диалог + панель источника. */
function ResearchBrief() {
  return (
    <Screen>
      <div className="flex h-full w-full">
        <div className="min-w-0 flex-1">
          <ChatThread
            header="MarketWatch"
            badge="12 источников"
            badgeVariant="soft"
            messages={[
              ['user', 'Что изменилось у «Лига Мебели»?'],
              ['agent', 'Подняли цены на диваны на 8%, добавили рассрочку.'],
              ['user', 'А у «Столицы»?'],
              ['agent', 'Новый раздел «Распродажа склада»: 40 позиций.'],
            ]}
            placeholder="Уточнить по конкуренту…"
          />
        </div>
        <aside className="flex w-[32%] shrink-0 flex-col border-l px-[1.6cqw] py-[1.6cqw]" style={{ borderColor: AGENT_THEME.hairline, background: AGENT_THEME.canvas }}>
          <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
            Источник
          </div>
          <div className="mt-[1cqw]">
            <Rows
              items={[
                ['Сайт', 'liga.ru'],
                ['Парсинг', 'сегодня, 06:00'],
                ['Изменение цен', '+8%'],
                ['Проверено', '12 источников'],
              ]}
            />
          </div>
        </aside>
      </div>
    </Screen>
  );
}

/** Поток краулера: TerminalPanel + метрики обхода. */
function ResearchCrawler() {
  const rows: TerminalRow[] = [
    { kind: 'ok', time: '06:00', text: 'olmebel.ru: цены обновлены', meta: '200' },
    { kind: 'log', time: '06:01', text: 'stolica.ru: новые SKU (40)' },
    { kind: 'log', time: '06:02', text: 'liga.ru: скидка −8% · диваны «Лофт»' },
    { kind: 'log', time: '06:03', text: 'tb-market.ru: blog +1' },
    { kind: 'err', time: '06:04', text: 'rate limit 429 → backoff 30s', meta: '429' },
    { kind: 'ok', time: '06:05', text: 'retry ok: olmebel.ru', meta: '200' },
  ];
  return (
    <Screen>
      <ScreenHeader brand="MarketWatch" period="12 сайтов · каждый час" action="Логи" />
      <div className="mt-[1.6cqw] grid h-[calc(100%-7cqw)] grid-cols-[1.5fr_1fr] gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <TerminalPanel title="crawler · prod" status="live" rows={rows} />
        <div className="flex flex-col gap-[1.6cqw]">
          <StatBlock label="Сайтов" value="12" note="под наблюдением" />
          <StatBlock label="Ретраи" value="2/3" note="rate limit 429" />
        </div>
      </div>
    </Screen>
  );
}

/** Дайджест недели: список изменений по конкурентам. */
function ResearchDigest() {
  const cards: [string, string, string, string][] = [
    ['Лига Мебели', 'сегодня', 'Цены на диваны +8%, появилась рассрочка 0-0-12.', 'цены'],
    ['Столица', 'вчера', 'Новый раздел «Распродажа склада»: 40 позиций.', 'ассортимент'],
    ['TB Market', '2 дня назад', 'Статья в блоге про экологичные ткани.', 'контент'],
    ['Олмебель', '3 дня назад', 'Скидка −12% на комплекты «Лофт» до конца месяца.', 'промо'],
    ['Домовой', '4 дня назад', 'Запустили подписку на обслуживание диванов.', 'услуги'],
  ];
  return (
    <Screen>
      <ScreenHeader brand="MarketWatch" period="неделя 6, 2026" action="Telegram" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.3cqw] px-[2cqw] pb-[2cqw]">
        <div>
          <div style={{ fontFamily: SANS, fontSize: '1.5cqw', fontWeight: 600 }}>Дайджест недели: рынок мебели</div>
          <div className="mt-[0.4cqw]" style={{ fontFamily: MONO, fontSize: '1.05cqw', color: AGENT_THEME.slate }}>
            9 изменений · 4 минуты чтения
          </div>
        </div>
        {/* Список изменений делит остаток высоты: пять позиций с разделителями. */}
        <AgentCard className="flex min-h-0 flex-1 flex-col p-[1.2cqw]">
          {cards.map(([brand, when, text, tag], i) => (
            <div
              key={brand}
              className="flex flex-1 items-center gap-[1.2cqw]"
              style={i > 0 ? { borderTop: `1px solid ${AGENT_THEME.hairline}` } : undefined}
            >
              <div className="w-[11cqw] shrink-0">
                <div style={{ fontFamily: SANS, fontSize: '1.2cqw', fontWeight: 600 }}>{brand}</div>
                <div style={{ fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}>{when}</div>
              </div>
              <p className="min-w-0 flex-1" style={{ fontFamily: SANS, fontSize: '1.15cqw', color: AGENT_THEME.charcoal, lineHeight: 1.45 }}>
                {text}
              </p>
              <AgentBadge variant={i === 0 ? 'success' : 'soft'}>{tag}</AgentBadge>
            </div>
          ))}
        </AgentCard>
      </div>
    </Screen>
  );
}

/** Сигналы рынка: индикаторы + рекомендация. */
function ResearchSignals() {
  return (
    <Screen>
      <ScreenHeader brand="MarketWatch" period="неделя 6, 2026" />
      <div className="mt-[1.6cqw] flex h-[calc(100%-7cqw)] flex-col gap-[1.4cqw] px-[2cqw] pb-[2cqw]">
        <div className="grid grid-cols-4 gap-[1.1cqw]">
          <StatBlock label="Скидки" value="14" />
          <StatBlock label="Новинки" value="9" />
          <StatBlock label="Вакансии" value="6" />
          <StatBlock label="Реклама" value="5" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-[1.4cqw]">
          <Bars
            title="Что чаще всего менялось"
            items={[
              ['Цены', '38%', 38],
              ['Ассортимент', '24%', 24],
              ['Контент', '21%', 21],
              ['Услуги', '17%', 17],
            ]}
          />
          <AgentCard className="flex flex-col justify-between gap-[0.8cqw]">
            <div style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}>
              Рекомендация агента
            </div>
            <p style={{ fontFamily: SANS, fontSize: '1.2cqw', color: AGENT_THEME.ink, lineHeight: 1.5, fontWeight: 500 }}>
              Конкуренты давят ценой на диваны. Не снижайте маржу — усильте контент «Лофт» и рассрочку.
            </p>
            <div className="flex flex-wrap gap-[0.8cqw]">
              <AgentBadge variant="soft">наблюдение</AgentBadge>
              <AgentBadge variant="success">проверено 12 источниками</AgentBadge>
            </div>
            <div
              className="flex items-center justify-between gap-[0.6cqw] border-t pt-[1cqw]"
              style={{ borderColor: AGENT_THEME.hairline, fontFamily: MONO, fontSize: '1cqw', color: AGENT_THEME.slate }}
            >
              <span>сайтов под наблюдением · 12</span>
              <span className="tabular-nums">обход 06:15</span>
            </div>
          </AgentCard>
        </div>
      </div>
    </Screen>
  );
}

/** Реестр: preview-ключ кейса → четыре экрана в том же порядке, что item.screens. */
export const AGENT_SCREENS: Record<AgentPreviewKey, Array<() => ReactNode>> = {
  support: [SupportDialogue, SupportKnowledge, SupportLogs, SupportDashboard],
  sales: [SalesDialogue, SalesFunnel, SalesBooking, SalesDashboard],
  content: [ContentTask, ContentPlan, ContentBatch, ContentMetrics],
  analytics: [AnalystAsk, AnalystSummary, AnalystSku, AnalystFunnel],
  research: [ResearchBrief, ResearchCrawler, ResearchDigest, ResearchSignals],
};


