/**
 * Реестр превью кейсов /agents.
 *
 * Три визуальные схемы — чат, дашборд метрик и поток логов — собраны
 * параметризованными мини-макетами в previews/*, а здесь каждому кейсу
 * подставляется свой контент и домен. Ключи совпадают с AgentPreviewKey
 * из data/agent-cases.ts: реестр передаётся в общий CaseScreenshot с /design.
 */
import type { PreviewEntry } from '@/components/design/case-screenshot';
import type { AgentPreviewKey } from '@/data/agent-cases';
import ChatPreview from './previews/chat-preview';
import MetricsPreview from './previews/metrics-preview';
import LogsPreview from './previews/logs-preview';

/* Кейс «Агент поддержки»: светлый чат поддержки мебельного магазина. */
const SupportChat = () => (
  <ChatPreview
    tone="light"
    brand="МД"
    title="Поддержка · Мебель-Дом"
    sub="WhatsApp · ответ за 8 секунд"
    placeholder="Спросить о заказе…"
    messages={[
      { from: 'user', text: 'Где мой заказ?' },
      { from: 'agent', text: 'Заказ #1842 у грузчиков — сегодня до 18:00.' },
      { from: 'user', text: 'А диван тёмно-зелёный?' },
      { from: 'agent', text: 'Да, цвет «мокко» — присылаю фото.' },
    ]}
    context={['Статусы заказов из 1С', 'Условия доставки', 'Гарантия и возврат']}
    chip="уверенность 0.94"
  />
);

/* Кейс «Sales-агент»: тёмный дашборд воронки лидов. */
const SalesDash = () => (
  <MetricsPreview
    tone="dark"
    title="Воронка лидов"
    period="Февраль 2026"
    kpis={[
      ['Лиды', '412'],
      ['Квалиф.', '174'],
      ['Демо', '96'],
      ['Конверсия', '23%'],
    ]}
    chartLabel="Демо по неделям"
    chartDelta="+18"
    rows={[
      ['Сайт', '52%'],
      ['Telegram', '28%'],
      ['Вебинар', '14%'],
    ]}
  />
);

/* Кейс «Контент-агент»: тёмный чат задания по генерации карточек. */
const ContentChat = () => (
  <ChatPreview
    tone="dark"
    brand="CB"
    title="Контент-агент · WB"
    sub="Telegram · партия из 20 SKU"
    placeholder="Уточнить тон…"
    messages={[
      { from: 'user', text: 'Карточки для новой линейки белья.' },
      { from: 'agent', text: 'Готово: 20 карточек, по 5 слайдов.' },
      { from: 'user', text: 'Добавь акцент: 100% хлопок.' },
      { from: 'agent', text: 'Обновил — проверьте черновики.' },
    ]}
    context={['Тон голоса по гайду', 'Факты из спецификации', 'Лимиты WB API']}
    chip="черновиков: 20"
  />
);

/* Кейс «Аналитик маркетплейса»: светлый дашборд продаж. */
const AnalyticsDash = () => (
  <MetricsPreview
    tone="light"
    title="Продажи маркетплейса"
    period="Февраль 2026"
    kpis={[
      ['Выручка', '4,1 млн'],
      ['Заказы', '8 240'],
      ['Ср. чек', '498 ₽'],
      ['Возвраты', '3,2%'],
    ]}
    chartLabel="Выручка по дням"
    chartDelta="+9%"
    rows={[
      ['Органика', '38%'],
      ['Реклама', '34%'],
      ['Внешний трафик', '18%'],
    ]}
  />
);

/* Кейс «Research-агент»: тёмный поток сбора данных о конкурентах. */
const ResearchLogs = () => (
  <LogsPreview
    tone="dark"
    title="marketwatch — crawler · prod"
    sub="12 сайтов · каждый час"
    rows={[
      { time: '06:00:04', level: 'info', msg: 'olmebel.ru: цены обновлены' },
      { time: '06:00:09', level: 'info', msg: 'stolica.ru: новые SKU (40)' },
      { time: '06:00:12', level: 'warn', msg: 'liga.ru: скидка −8%' },
      { time: '06:00:15', level: 'info', msg: 'tb-market.ru: blog +1' },
      { time: '06:00:19', level: 'error', msg: 'rate limit 429 → backoff' },
    ]}
    sparkLabel="страниц обработано/день"
    sparkValue="4 120"
    stats={[
      ['источников', '12'],
      ['изменений/нед.', '34'],
      ['ошибок', '0,3%'],
    ]}
  />
);

/** Реестр превью: ключ AgentPreviewKey → мини-макет и домен в мокапе. */
export const AGENT_REGISTRY: Record<AgentPreviewKey, PreviewEntry> = {
  support: { Preview: SupportChat, domain: 'mebazon.ru' },
  sales: { Preview: SalesDash, domain: 'leadbot.io' },
  content: { Preview: ContentChat, domain: 'wbcontent.ru' },
  analytics: { Preview: AnalyticsDash, domain: 'sellsight.app' },
  research: { Preview: ResearchLogs, domain: 'marketwatch.pro' },
};
