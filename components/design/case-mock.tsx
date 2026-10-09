/**
 * Живой макет экрана для кейсов портфолио.
 *
 * Рисуется SVG по описанию DesignScreen (kind + контент) и палитре кейса:
 * никаких картинок и заглушек — макет резкий на любом DPI, работает офлайн
 * и выглядит как реальный скриншот проекта.
 *
 * Часть архетипов общие (landing, grid, detail…), часть — отраслевые
 * (lookbook, slots, map, terminal, ledger…): они рисуют сценарий конкретного
 * продукта, поэтому внутренние экраны кейсов не повторяют друг друга.
 *
 * Любая подпись внутри кнопки/бейджа проходит через fitText: SVG не переносит
 * текст по строкам, поэтому строку обрезаем до ширины плашки, а не выпускаем
 * за её край.
 */
import type { DesignScreen, MockPalette } from '@/data/design-cases';

const W = 720;
const H = 450;
const FONT = 'Inter, Arial, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** Делит заголовок на две сбалансированные по длине строки. */
function splitLines(text: string): string[] {
  const words = text.trim().split(' ');
  if (words.length < 2) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
}

/** Оценка ширины строки (Inter, em на символ) — до реального layout в SVG. */
function textWidth(text: string, fontSize: number, bold = false): number {
  return text.length * fontSize * (bold ? 0.575 : 0.545);
}

/**
 * Обрезает подпись до maxWidth с многоточием. SVG не умеет text-overflow,
 * поэтому вместимость считаем сами: так текст кнопки не выходит за плашку
 * и не наезжает на соседний элемент.
 */
function fitText(text: string, maxWidth: number, fontSize: number, bold = false): string {
  if (maxWidth <= 0) return '';
  const per = fontSize * (bold ? 0.575 : 0.545);
  if (text.length * per <= maxWidth) return text;
  const max = Math.max(1, Math.floor(maxWidth / per) - 1);
  return `${text.slice(0, max).trimEnd()}…`;
}

/** Полоска-«текст» для второстепенного контента макета. */
function Bar({ x, y, w, h = 7, fill, r = 3.5, opacity = 1 }: {
  x: number; y: number; w: number; h?: number; fill: string; r?: number; opacity?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} opacity={opacity} />;
}

/** Кнопка: плашка с гарантированно влезающей по ширине подписью. */
function Btn({ x, y, w, h = 40, label, p, filled = true, fontSize = 12 }: {
  x: number; y: number; w: number; h?: number; label: string; p: MockPalette; filled?: boolean; fontSize?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={filled ? p.accent : 'none'}
        stroke={filled ? 'none' : p.line}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        fill={filled ? p.accentInk : p.ink}
        fontSize={fontSize}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {fitText(label, w - 20, fontSize, true)}
      </text>
    </g>
  );
}

/** Чип-бейдж: короткая метка в скруглённой рамке. */
function Chip({ x, y, w, h = 26, label, p, filled = false }: {
  x: number; y: number; w: number; h?: number; label: string; p: MockPalette; filled?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={filled ? p.accent : p.panel} stroke={filled ? 'none' : p.line} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 0.5}
        fill={filled ? p.accentInk : p.muted}
        fontSize={11}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {fitText(label, w - 16, 11)}
      </text>
    </g>
  );
}

/** Шапка веб-макета: логотип, навигация и кнопка. */
function Nav({ p, brand, cta, links = ['Каталог', 'Цены', 'Кейсы'] }: {
  p: MockPalette; brand: string; cta: string; links?: string[];
}) {
  // Кнопка в шапке макета узкая: берём саму подпись, иначе её первое слово
  // («Рассчитать экономию» → «Рассчитать»), и только потом нейтральное «Заявка».
  const fits = (t: string) => fitText(t, 66, 11, true) === t;
  const firstWord = cta.split(' ')[0];
  const label = fits(cta) ? cta : fits(firstWord) ? firstWord : 'Заявка';
  return (
    <g>
      <rect x={0} y={0} width={W} height={54} fill={p.panel} />
      <line x1={0} y1={54} x2={W} y2={54} stroke={p.line} strokeWidth={1} />
      <circle cx={40} cy={27} r={7} fill={p.accent} />
      <text x={54} y={32} fill={p.ink} fontSize={16} fontWeight={700}>{fitText(brand, 120, 16, true)}</text>
      {links.map((l, i) => (
        <text key={l} x={392 + i * 74} y={32} fill={p.muted} fontSize={12}>{fitText(l, 66, 12)}</text>
      ))}
      <Btn x={610} y={14} w={86} h={26} label={label} p={p} fontSize={11} />
    </g>
  );
}

/** Лендинг: оффер, кнопки и три карточки преимуществ. */
function Landing({ s, p, items }: { s: DesignScreen; p: MockPalette; items: string[] }) {
  const lines = splitLines(s.headline);
  const base = 142 + (lines.length - 1) * 44;
  const subY = base + 40;
  const btnY = subY + 18;
  const cardsY = Math.max(btnY + 62, 296);
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Заявка'} links={s.links} />
      {lines.map((line, i) => (
        <text key={line} x={48} y={142 + i * 44} fill={p.ink} fontSize={36} fontWeight={700} letterSpacing={-1}>{fitText(line, 512, 36, true)}</text>
      ))}
      <text x={48} y={subY} fill={p.muted} fontSize={13}>{fitText(s.sub ?? '', 600, 13)}</text>
      <Btn x={48} y={btnY} w={176} label={s.cta ?? 'Заявка'} p={p} />
      <Btn x={236} y={btnY} w={140} label="Подробнее" p={p} filled={false} />
      {items.slice(0, 3).map((it, i) => (
        <g key={it}>
          <rect x={48 + i * 212} y={cardsY} width={196} height={112} rx={10} fill={p.panel} stroke={p.line} />
          <rect x={66 + i * 212} y={cardsY + 18} width={30} height={30} rx={8} fill={p.accent} opacity={0.9} />
          <text x={66 + i * 212} y={cardsY + 78} fill={p.ink} fontSize={13} fontWeight={600}>{fitText(it, 160, 13, true)}</text>
          <Bar x={66 + i * 212} y={cardsY + 90} w={140} fill={p.line} />
        </g>
      ))}
    </g>
  );
}

/** Каталог: боковые фильтры и сетка карточек 3×2. */
function Grid({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const cols = 3;
  const cw = 164;
  const ch = 148;
  const filters = s.filters ?? ['Цена', 'Материал', 'Цвет', 'Размер', 'Бренд'];
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Открыть'} links={s.links} />
      <text x={176} y={100} fill={p.ink} fontSize={19} fontWeight={700}>{fitText(s.headline, 500, 19, true)}</text>
      <rect x={24} y={84} width={132} height={342} rx={12} fill={p.panel} stroke={p.line} />
      {filters.map((f, i) => (
        <g key={f}>
          <rect x={40} y={108 + i * 46} width={13} height={13} rx={3} fill={i === 0 ? p.accent : 'none'} stroke={i === 0 ? p.accent : p.line} />
          <text x={62} y={120 + i * 46} fill={p.muted} fontSize={11}>{fitText(f, 80, 11)}</text>
        </g>
      ))}
      {items.slice(0, 6).map((it, i) => {
        const cx = 176 + (i % cols) * (cw + 12);
        const cy = 118 + Math.floor(i / cols) * (ch + 12);
        return (
          <g key={it}>
            <rect x={cx} y={cy} width={cw} height={ch} rx={10} fill={p.panel} stroke={p.line} />
            <rect x={cx + 8} y={cy + 8} width={cw - 16} height={72} rx={7} fill={p.accent} opacity={0.14} />
            <text x={cx + 10} y={cy + 104} fill={p.ink} fontSize={12} fontWeight={600}>{fitText(it, cw - 20, 12, true)}</text>
            <text x={cx + 10} y={cy + 128} fill={p.accent} fontSize={13} fontWeight={700}>{fitText(values[i] ?? '', cw - 20, 13, true)}</text>
          </g>
        );
      })}
    </g>
  );
}

/** Карточка товара: крупное изображение и блок информации. */
function Detail({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const lines = splitLines(s.headline);
  const chips = items.slice(0, 2);
  // Считаем стартовые позиции чипов, чтобы бейджи не наслаивались друг на друга.
  const chipStarts = chips.map((_, i) =>
    392 + chips.slice(0, i).reduce((acc, t) => acc + 24 + t.length * 7.2 + 8, 0),
  );
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'В корзину'} links={s.links} />
      <rect x={48} y={86} width={300} height={318} rx={14} fill={p.accent} opacity={0.14} />
      <rect x={76} y={150} width={244} height={190} rx={10} fill={p.accent} opacity={0.22} />
      <circle cx={224} cy={248} r={54} fill="none" stroke={p.accent} strokeWidth={2} opacity={0.5} />
      {lines.map((line, i) => (
        <text key={line} x={392} y={126 + i * 38} fill={p.ink} fontSize={30} fontWeight={700} letterSpacing={-1}>{fitText(line, 288, 30, true)}</text>
      ))}
      <text x={392} y={126 + lines.length * 38 + 34} fill={p.accent} fontSize={26} fontWeight={700}>{fitText(values[0] ?? '', 288, 26, true)}</text>
      <text x={392} y={126 + lines.length * 38 + 62} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 288, 12)}</text>
      {chips.map((it, i) => (
        <Chip key={it} x={chipStarts[i]} y={272} w={24 + it.length * 7.2} label={it} p={p} />
      ))}
      <Btn x={392} y={326} w={168} h={42} label={s.cta ?? 'Купить'} p={p} fontSize={13} />
    </g>
  );
}

/** Дашборд: боковое меню, метрики и график. */
function Dash({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <rect x={0} y={0} width={160} height={H} fill={p.panel} />
      <circle cx={28} cy={30} r={8} fill={p.accent} />
      <text x={44} y={35} fill={p.ink} fontSize={15} fontWeight={700}>{fitText(s.brand ?? 'brand', 100, 15, true)}</text>
      {['Обзор', 'Отчёты', 'Клиенты', 'Настройки'].map((m, i) => (
        <g key={m}>
          {i === 0 ? <rect x={12} y={70} width={136} height={34} rx={8} fill={p.bg} stroke={p.line} /> : null}
          <text x={28} y={92 + i * 40} fill={i === 0 ? p.ink : p.muted} fontSize={12}>{m}</text>
        </g>
      ))}
      <text x={184} y={56} fill={p.ink} fontSize={20} fontWeight={700}>{fitText(s.headline, 420, 20, true)}</text>
      <text x={184} y={80} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 420, 12)}</text>
      {items.slice(0, 3).map((it, i) => (
        <g key={it}>
          <rect x={184 + i * 174} y={104} width={158} height={82} rx={10} fill={p.panel} stroke={p.line} />
          <text x={200 + i * 174} y={134} fill={p.muted} fontSize={11}>{fitText(it, 130, 11)}</text>
          <text x={200 + i * 174} y={166} fill={p.ink} fontSize={22} fontWeight={700} letterSpacing={-0.5}>{fitText(values[i] ?? '', 130, 22, true)}</text>
        </g>
      ))}
      <rect x={184} y={206} width={512} height={206} rx={12} fill={p.panel} stroke={p.line} />
      <text x={204} y={236} fill={p.muted} fontSize={11}>Динамика</text>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" x={204} y={252} width={472} height={140}>
        {[10, 20, 30].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={p.line} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        ))}
        <polyline points="0,34 12,28 24,30 36,20 48,24 60,14 72,18 84,8 100,12" fill="none" stroke={p.accent} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      </svg>
    </g>
  );
}

/** Воронка: этапы с конверсией и полосами. */
function Funnel({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Отчёт'} links={s.links} />
      <text x={48} y={104} fill={p.ink} fontSize={22} fontWeight={700}>{fitText(s.headline, 480, 22, true)}</text>
      <text x={48} y={128} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 480, 12)}</text>
      {items.slice(0, 4).map((it, i) => {
        const w = 624 - i * 120;
        const y = 164 + i * 66;
        // Подпись в баре не должна подлезать под значение справа — режем по его краю.
        const labelW = Math.min(w - 32, 510);
        return (
          <g key={it}>
            <rect x={48} y={y} width={w} height={50} rx={8} fill={p.accent} opacity={0.9 - i * 0.18} />
            <text x={68} y={y + 30} fill={p.accentInk} fontSize={13} fontWeight={600}>{fitText(it, labelW, 13, true)}</text>
            <text x={668} y={y + 30} fill={p.ink} fontSize={14} fontWeight={700} textAnchor="end">{fitText(values[i] ?? '', 90, 14, true)}</text>
            {i < 3 ? <text x={668} y={y + 62} fill={p.muted} fontSize={10} textAnchor="end">↓</text> : null}
          </g>
        );
      })}
      <text x={48} y={430} fill={p.muted} fontSize={11}>{fitText('Сквозная конверсия', 300, 11)}</text>
      <text x={672} y={430} fill={p.accent} fontSize={11} fontWeight={700} textAnchor="end">{fitText('3,5%', 90, 11, true)}</text>
    </g>
  );
}

/** Мобильный экран внутри макета. */
function Phone({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      <rect x={262} y={24} width={196} height={402} rx={26} fill={p.panel} stroke={p.line} strokeWidth={2} />
      <rect x={288} y={44} width={56} height={5} rx={2.5} fill={p.line} />
      <text x={300} y={86} fill={p.ink} fontSize={15} fontWeight={700}>{fitText(s.headline, 120, 15, true)}</text>
      <text x={300} y={106} fill={p.muted} fontSize={10}>{fitText(s.sub ?? '', 120, 10)}</text>
      {items.slice(0, 4).map((it, i) => (
        <g key={it}>
          <rect x={284} y={126 + i * 66} width={152} height={54} rx={10} fill={p.bg} stroke={p.line} />
          <text x={298} y={152 + i * 66} fill={p.ink} fontSize={12} fontWeight={600}>{fitText(it, 120, 12, true)}</text>
          <text x={298} y={170 + i * 66} fill={p.muted} fontSize={10}>{fitText(values[i] ?? '', 120, 10)}</text>
        </g>
      ))}
      <rect x={284} y={394} width={152} height={28} rx={8} fill={p.accent} />
      <text x={360} y={408} fill={p.accentInk} fontSize={11} fontWeight={600} textAnchor="middle" dominantBaseline="middle">{fitText(s.cta ?? 'Продолжить', 132, 11, true)}</text>
    </g>
  );
}

/** Форма: поля ввода и CTA-кнопка. */
function Form({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const summary = s.summary;
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Войти'} links={s.links} />
      <text x={48} y={120} fill={p.ink} fontSize={26} fontWeight={700}>{fitText(s.headline, 320, 26, true)}</text>
      <text x={48} y={148} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 320, 12)}</text>
      <rect x={48} y={196} width={340} height={216} rx={12} fill={p.panel} stroke={p.line} />
      {items.slice(0, 4).map((it, i) => (
        <g key={it}>
          <text x={72} y={228 + i * 48} fill={p.muted} fontSize={11}>{fitText(it, 160, 11)}</text>
          <rect x={72} y={236 + i * 48} width={292} height={26} rx={6} fill={p.bg} stroke={p.line} />
          <text x={84} y={254 + i * 48} fill={p.ink} fontSize={11}>{fitText(values[i] ?? '', 260, 11)}</text>
        </g>
      ))}
      <rect x={452} y={196} width={220} height={216} rx={12} fill={p.panel} stroke={p.line} />
      <text x={472} y={228} fill={p.ink} fontSize={14} fontWeight={600}>{fitText(summary?.title ?? 'Сводка', 100, 14, true)}</text>
      {(summary?.items ?? []).slice(0, 3).map((k, i) => (
        <g key={k}>
          <text x={472} y={262 + i * 30} fill={p.muted} fontSize={11}>{fitText(k, 100, 11)}</text>
          <text x={652} y={262 + i * 30} fill={p.ink} fontSize={11} textAnchor="end">{fitText(summary?.values[i] ?? '', 90, 11)}</text>
        </g>
      ))}
      {summary ? null : [0, 1, 2].map((i) => (
        <Bar key={`summary-gap-${i}`} x={472} y={262 + i * 30} w={180} fill={p.line} />
      ))}
      <Btn x={472} y={358} w={180} h={40} label={s.cta ?? 'Отправить'} p={p} />
    </g>
  );
}

/** Лента: список элементов с иконкой, текстом и значением. */
function Feed({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Фильтр'} links={s.links} />
      <text x={48} y={104} fill={p.ink} fontSize={20} fontWeight={700}>{fitText(s.headline, 420, 20, true)}</text>
      <text x={48} y={128} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 420, 12)}</text>
      {items.slice(0, 5).map((it, i) => (
        <g key={it}>
          <rect x={48} y={150 + i * 54} width={624} height={46} rx={8} fill={p.panel} stroke={p.line} />
          <circle cx={74} cy={173 + i * 54} r={12} fill={p.accent} opacity={0.18} />
          <text x={100} y={178 + i * 54} fill={p.ink} fontSize={13}>{fitText(it, 380, 13)}</text>
          <text x={648} y={178 + i * 54} fill={p.muted} fontSize={12} textAnchor="end">{fitText(values[i] ?? '', 160, 12)}</text>
        </g>
      ))}
    </g>
  );
}

/** Статья: заголовок, метаданные и текстовая колонка. */
function Article({ s, p }: { s: DesignScreen; p: MockPalette }) {
  const lines = splitLines(s.headline);
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Подписка'} links={s.links} />
      <text x={48} y={104} fill={p.accent} fontSize={11} fontWeight={600} letterSpacing={1.5}>{fitText((s.sub ?? 'Статья').toUpperCase(), 460, 11, true)}</text>
      {lines.map((line, i) => (
        <text key={line} x={48} y={150 + i * 40} fill={p.ink} fontSize={32} fontWeight={700} letterSpacing={-1}>{fitText(line, 480, 32, true)}</text>
      ))}
      <line x1={48} y1={150 + lines.length * 40 + 16} x2={624} y2={150 + lines.length * 40 + 16} stroke={p.line} />
      {[560, 500, 580, 540, 470, 600].map((w, i) => (
        <Bar key={i} x={48} y={176 + lines.length * 40 + i * 26} w={w} h={9} fill={p.line} />
      ))}
      <rect x={48} y={176 + lines.length * 40 + 172} width={576} height={4} rx={2} fill={p.accent} opacity={0.4} />
    </g>
  );
}

/** Тарифы: три карточки с ценой и кнопкой. */
function Pricing({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Связаться'} links={s.links} />
      <text x={360} y={112} fill={p.ink} fontSize={24} fontWeight={700} textAnchor="middle">{fitText(s.headline, 560, 24, true)}</text>
      <text x={360} y={138} fill={p.muted} fontSize={12} textAnchor="middle">{fitText(s.sub ?? '', 560, 12)}</text>
      {items.slice(0, 3).map((it, i) => {
        const mid = i === 1;
        const x = 48 + i * 216;
        return (
          <g key={it}>
            <rect x={x} y={172} width={200} height={228} rx={12} fill={p.panel} stroke={mid ? p.accent : p.line} strokeWidth={mid ? 2 : 1} />
            <text x={x + 24} y={210} fill={p.muted} fontSize={12}>{fitText(it, 150, 12)}</text>
            <text x={x + 24} y={252} fill={p.ink} fontSize={24} fontWeight={700} letterSpacing={-0.5}>{fitText(values[i] ?? '', 152, 24, true)}</text>
            {['Запуск под ключ', 'Свои интеграции', 'Приоритет поддержки'].map((f, j) => (
              <text key={f} x={x + 24} y={286 + j * 22} fill={p.muted} fontSize={11}>{fitText(f, 152, 11)}</text>
            ))}
            <Btn x={x + 24} y={358} w={152} h={30} label="Выбрать" p={p} filled={mid} fontSize={11} />
          </g>
        );
      })}
    </g>
  );
}

/** Лукбук: крупный модуль уходит за край, слева оффер и свотчи тканей. */
function Lookbook({ s, p }: { s: DesignScreen; p: MockPalette }) {
  const lines = splitLines(s.headline);
  const swatches = ['Букле', 'Дуб', 'Металл'];
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Шоурум" links={['Каталог', 'Коллекции', 'Шоурум']} />
      {/* Крупный кадр справа обрезается краем макета — типичный приём лукбука. */}
      <rect x={392} y={54} width={328} height={396} fill={p.accent} opacity={0.1} />
      <rect x={430} y={238} width={262} height={74} rx={12} fill={p.accent} opacity={0.2} />
      <rect x={444} y={196} width={92} height={52} rx={10} fill={p.accent} opacity={0.3} />
      <rect x={548} y={196} width={92} height={52} rx={10} fill={p.accent} opacity={0.3} />
      <line x1={444} y1={330} x2={692} y2={330} stroke={p.accent} opacity={0.4} />
      <Chip x={430} y={352} w={176} label="Soffa 03 · букле" p={p} />
      {/* Текстовая колонка. */}
      <text x={48} y={116} fill={p.muted} fontSize={11} letterSpacing={2}>МОДУЛЬНАЯ МЕБЕЛЬ</text>
      {lines.map((line, i) => (
        <text key={line} x={48} y={158 + i * 40} fill={p.ink} fontSize={32} fontWeight={600} letterSpacing={-1}>{fitText(line, 320, 32, true)}</text>
      ))}
      <text x={48} y={158 + lines.length * 40 + 26} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 320, 12)}</text>
      {swatches.map((sw, i) => (
        <g key={sw}>
          <circle cx={62 + i * 108} cy={318} r={13} fill={p.accent} opacity={0.22 + i * 0.22} stroke={p.line} />
          <text x={84 + i * 108} y={322} fill={p.muted} fontSize={11}>{sw}</text>
        </g>
      ))}
      <text x={48} y={378} fill={p.ink} fontSize={13} fontWeight={600}>{fitText(s.cta ?? 'Открыть конфигуратор →', 300, 13, true)}</text>
      <line x1={48} y1={388} x2={48 + Math.min(300, textWidth(s.cta ?? 'Открыть конфигуратор →', 13, true))} y2={388} stroke={p.ink} />
    </g>
  );
}

/** Конструктор модулей: блоки на канве, размеры и панель сборки с ценой. */
function Build({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const blocks = items.slice(0, 3);
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="В корзину" links={['Каталог', 'Коллекции', 'Сборка']} />
      <text x={48} y={98} fill={p.ink} fontSize={20} fontWeight={700}>{fitText(s.headline, 500, 20, true)}</text>
      <text x={48} y={122} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 500, 12)}</text>
      {/* Канва сборки с миллиметровой сеткой. */}
      <rect x={48} y={150} width={388} height={252} rx={12} fill={p.panel} stroke={p.line} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={48 + (i + 1) * 38.8} y1={150} x2={48 + (i + 1) * 38.8} y2={402} stroke={p.line} strokeDasharray="3 5" opacity={0.5} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1={48} y1={150 + (i + 1) * 36} x2={436} y2={150 + (i + 1) * 36} stroke={p.line} strokeDasharray="3 5" opacity={0.5} />
      ))}
      {/* Собранный диван из модулей. */}
      <rect x={96} y={240} width={100} height={70} rx={8} fill={p.accent} opacity={0.22} stroke={p.accent} />
      <rect x={200} y={240} width={100} height={70} rx={8} fill={p.accent} opacity={0.16} stroke={p.accent} />
      <rect x={96} y={196} width={100} height={40} rx={8} fill={p.accent} opacity={0.3} />
      <rect x={200} y={196} width={100} height={40} rx={8} fill={p.accent} opacity={0.22} />
      {/* Пунктирный блок «добавить модуль». */}
      <rect x={304} y={240} width={100} height={70} rx={8} fill="none" stroke={p.muted} strokeDasharray="5 4" />
      <text x={354} y={275} fill={p.muted} fontSize={20} textAnchor="middle" dominantBaseline="middle">+</text>
      {/* Размерная линия. */}
      <line x1={96} y1={336} x2={300} y2={336} stroke={p.muted} />
      <text x={198} y={330} fill={p.muted} fontSize={10} textAnchor="middle">240 см</text>
      {/* Панель сборки. */}
      <rect x={452} y={150} width={244} height={252} rx={12} fill={p.panel} stroke={p.line} />
      <text x={472} y={182} fill={p.ink} fontSize={16} fontWeight={700}>Сборка</text>
      {blocks.map((it, i) => (
        <g key={it}>
          <text x={472} y={214 + i * 46} fill={p.ink} fontSize={12}>{fitText(it, 140, 12)}</text>
          <text x={676} y={214 + i * 46} fill={p.muted} fontSize={12} textAnchor="end">{fitText(values[i] ?? '', 80, 12)}</text>
        </g>
      ))}
      <line x1={472} y1={300} x2={676} y2={300} stroke={p.line} />
      <text x={472} y={330} fill={p.muted} fontSize={12}>Итого</text>
      <text x={676} y={330} fill={p.ink} fontSize={18} fontWeight={700} textAnchor="end">{fitText(values[3] ?? '129 000 ₽', 110, 18, true)}</text>
      <Btn x={472} y={352} w={204} h={40} label={s.cta ?? 'Собрать конфигурацию'} p={p} />
    </g>
  );
}

/** Тайм-сетка записи: неделя × время, свободные и занятые слоты врача. */
function Slots({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
  const times = ['08:50', '10:00', '11:20', '13:00', '15:40', '18:10'];
  // Занятые ячейки (день-время) и выбранный слот: Пн 15:40.
  const busy = new Set(['0-2', '1-0', '2-4', '3-1', '4-3', '1-5', '3-5']);
  const selected = '0-4';
  // В аватар идут инициалы: «Соколова М.» → «СМ», «Врач» → «В».
  const initials = (items[0] ?? 'МС').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Записаться" links={['Врачи', 'Цены', 'Клиника']} />
      <text x={48} y={98} fill={p.ink} fontSize={20} fontWeight={700}>{fitText(s.headline, 460, 20, true)}</text>
      <text x={48} y={122} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 460, 12)}</text>
      {/* Карточка врача. */}
      <rect x={48} y={152} width={228} height={250} rx={12} fill={p.panel} stroke={p.line} />
      <circle cx={92} cy={196} r={22} fill={p.accent} opacity={0.18} />
      <text x={92} y={201} fill={p.accent} fontSize={14} fontWeight={700} textAnchor="middle">{initials}</text>
      <text x={128} y={192} fill={p.ink} fontSize={14} fontWeight={600}>{fitText(items[1] ?? 'Врач', 130, 14, true)}</text>
      <text x={128} y={212} fill={p.muted} fontSize={11}>{fitText(values[0] ?? '', 130, 11)}</text>
      <line x1={70} y1={238} x2={254} y2={238} stroke={p.line} />
      {items.slice(2, 5).map((sv, i) => (
        <g key={sv}>
          <text x={70} y={266 + i * 26} fill={p.ink} fontSize={12}>{fitText(sv, 140, 12)}</text>
          <text x={254} y={266 + i * 26} fill={p.muted} fontSize={12} textAnchor="end">{fitText(values[i + 1] ?? '', 60, 12)}</text>
        </g>
      ))}
      <Btn x={70} y={352} w={184} h={32} label="Все врачи" p={p} filled={false} fontSize={11} />
      {/* Сетка времени. */}
      <rect x={292} y={152} width={404} height={250} rx={12} fill={p.panel} stroke={p.line} />
      <text x={312} y={182} fill={p.ink} fontSize={13} fontWeight={600}>Выберите время</text>
      <text x={676} y={182} fill={p.muted} fontSize={11} textAnchor="end">март 2026</text>
      {days.map((d, i) => (
        <text key={d} x={350 + i * 68} y={212} fill={p.muted} fontSize={11} textAnchor="middle">{d}</text>
      ))}
      {times.map((t, r) => (
        <g key={t}>
          <text x={312} y={236 + r * 26} fill={p.muted} fontSize={10} dominantBaseline="middle">{t}</text>
          {days.map((d, c) => {
            const key = `${c}-${r}`;
            const isBusy = busy.has(key);
            const isSel = key === selected;
            return (
              <rect
                key={d}
                x={322 + c * 68}
                y={226 + r * 26}
                width={56}
                height={20}
                rx={5}
                fill={isSel ? p.accent : p.bg}
                stroke={isSel ? 'none' : p.line}
                opacity={isBusy && !isSel ? 0.35 : 1}
              />
            );
          })}
        </g>
      ))}
      <line x1={312} y1={392} x2={676} y2={392} stroke={p.line} />
      <text x={312} y={404} fill={p.muted} fontSize={11} dominantBaseline="middle">{fitText('Понедельник, 15:40 · кабинет 3', 260, 11)}</text>
    </g>
  );
}

/** Карта города: маршрут курьера, пины доставки и панель ресторанов рядом. */
function Map({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const route = '60,360 200,360 200,250 380,250 380,150 560,150 560,90';
  const pins: [number, number][] = [[200, 250], [380, 150], [560, 90]];
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      {/* Сетка улиц. */}
      <g opacity={0.5}>
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 60} y1={0} x2={(i + 1) * 60} y2={H} stroke={p.line} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i + 1) * 60} x2={W} y2={(i + 1) * 60} stroke={p.line} />
        ))}
      </g>
      {/* Маршрут курьера. */}
      <polyline points={route} fill="none" stroke={p.accent} strokeWidth={3} strokeDasharray="8 6" strokeLinecap="round" strokeLinejoin="round" />
      {pins.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={8} fill={p.bg} stroke={p.accent} strokeWidth={3} />
      ))}
      <circle cx={60} cy={360} r={9} fill={p.accent} />
      {/* Панель ресторанов рядом. */}
      <rect x={24} y={24} width={300} height={402} rx={14} fill={p.panel} stroke={p.line} />
      <circle cx={48} cy={50} r={7} fill={p.accent} />
      <text x={62} y={55} fill={p.ink} fontSize={15} fontWeight={700}>{fitText(s.brand ?? 'brand', 120, 15, true)}</text>
      <text x={44} y={90} fill={p.ink} fontSize={16} fontWeight={700}>{fitText(s.headline, 260, 16, true)}</text>
      <text x={44} y={112} fill={p.muted} fontSize={11}>{fitText(s.sub ?? '', 260, 11)}</text>
      {items.slice(0, 4).map((it, i) => {
        const y = 130 + i * 68;
        return (
          <g key={it}>
            <rect x={40} y={y} width={268} height={58} rx={10} fill={p.bg} stroke={p.line} />
            <circle cx={66} cy={y + 29} r={16} fill={p.accent} opacity={0.18} />
            <text x={92} y={y + 24} fill={p.ink} fontSize={13} fontWeight={600}>{fitText(it, 150, 13, true)}</text>
            <text x={92} y={y + 42} fill={p.muted} fontSize={11}>{fitText(values[i] ?? '', 120, 11)}</text>
            <circle cx={288} cy={y + 29} r={4} fill={p.accent} />
          </g>
        );
      })}
    </g>
  );
}

/** Трекер заказа: маршрут курьера на карте и живая лента статусов. */
function Tracker({ s, p, items }: { s: DesignScreen; p: MockPalette; items: string[] }) {
  const steps = items.slice(0, 4);
  const active = 2; // «Курьер в пути»
  const route = '70,300 180,300 180,200 320,200 320,120';
  const dates = ['18:02', '18:11', '18:24', '—'];
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Помощь" links={['Заказы', 'Адреса', 'Помощь']} />
      {/* Карта. */}
      <rect x={24} y={80} width={404} height={346} rx={14} fill={p.panel} stroke={p.line} />
      <g opacity={0.45}>
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={24 + (i + 1) * 50} y1={80} x2={24 + (i + 1) * 50} y2={426} stroke={p.line} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1={24} y1={80 + (i + 1) * 54} x2={428} y2={80 + (i + 1) * 54} stroke={p.line} />
        ))}
      </g>
      <polyline points={route} fill="none" stroke={p.accent} strokeWidth={3} strokeDasharray="8 6" strokeLinecap="round" />
      <circle cx={70} cy={300} r={7} fill={p.bg} stroke={p.muted} strokeWidth={3} />
      <circle cx={320} cy={120} r={9} fill={p.accent} />
      {/* ETA-плашка. */}
      <rect x={44} y={100} width={168} height={56} rx={10} fill={p.bg} stroke={p.line} />
      <text x={60} y={126} fill={p.muted} fontSize={11}>Приедет через</text>
      <text x={60} y={146} fill={p.ink} fontSize={18} fontWeight={700}>{fitText('18 минут', 130, 18, true)}</text>
      {/* Лента статусов. */}
      <rect x={448} y={80} width={248} height={346} rx={14} fill={p.panel} stroke={p.line} />
      <text x={470} y={114} fill={p.ink} fontSize={16} fontWeight={700}>{fitText(s.headline, 200, 16, true)}</text>
      <text x={470} y={134} fill={p.muted} fontSize={11}>{fitText(s.sub ?? '', 200, 11)}</text>
      {steps.map((st, i) => {
        const y = 168 + i * 48;
        const done = i <= active;
        return (
          <g key={st}>
            {i < steps.length - 1 ? <line x1={482} y1={y + 12} x2={482} y2={y + 48} stroke={done ? p.accent : p.line} strokeWidth={2} /> : null}
            <circle cx={482} cy={y + 12} r={7} fill={done ? p.accent : p.bg} stroke={done ? 'none' : p.line} strokeWidth={2} />
            <text x={502} y={y + 16} fill={done ? p.ink : p.muted} fontSize={12} fontWeight={i === active ? 600 : 400}>{fitText(st, 130, 12)}</text>
            <text x={676} y={y + 16} fill={p.muted} fontSize={10} textAnchor="end">{dates[i]}</text>
          </g>
        );
      })}
      <line x1={470} y1={370} x2={674} y2={370} stroke={p.line} />
      <circle cx={488} cy={398} r={16} fill={p.accent} opacity={0.2} />
      <text x={488} y={402} fill={p.accent} fontSize={11} fontWeight={700} textAnchor="middle">Т</text>
      <text x={512} y={394} fill={p.ink} fontSize={12} fontWeight={600}>{fitText('Тимур', 56, 12, true)}</text>
      <text x={512} y={410} fill={p.muted} fontSize={10}>{fitText('4,9 · 1 240', 62, 10)}</text>
      <Btn x={584} y={386} w={90} h={26} label="Позвонить" p={p} fontSize={11} />
    </g>
  );
}

/** Чек: состав заказа, доставка и итог — как на кассовой ленте. */
function Receipt({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const rows = items.slice(0, 3);
  const totalLabel = items[3] ?? 'Итого';
  const total = values[3] ?? values[values.length - 1] ?? '';
  return (
    <g fontFamily={MONO}>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      <rect x={200} y={28} width={320} height={394} rx={12} fill={p.panel} stroke={p.line} />
      <text x={360} y={70} fill={p.ink} fontSize={16} fontWeight={700} textAnchor="middle">{fitText(s.headline, 280, 16, true)}</text>
      <text x={360} y={92} fill={p.muted} fontSize={11} textAnchor="middle">{fitText(s.sub ?? '', 280, 11)}</text>
      <line x1={224} y1={110} x2={496} y2={110} stroke={p.line} strokeDasharray="4 4" />
      {rows.map((it, i) => (
        <g key={it}>
          <text x={224} y={142 + i * 30} fill={p.ink} fontSize={12}>{fitText(it, 190, 12)}</text>
          <text x={496} y={142 + i * 30} fill={p.muted} fontSize={12} textAnchor="end">{fitText(values[i] ?? '', 70, 12)}</text>
        </g>
      ))}
      <line x1={224} y1={244} x2={496} y2={244} stroke={p.line} strokeDasharray="4 4" />
      {['Оплата', 'Сдача', 'Бонусы'].map((k, i) => (
        <g key={k}>
          <text x={224} y={272 + i * 24} fill={p.muted} fontSize={11}>{k}</text>
          <text x={496} y={272 + i * 24} fill={p.muted} fontSize={11} textAnchor="end">{fitText(['карта •• 4417', '0 ₽', '+ 64 ₽'][i], 130, 11)}</text>
        </g>
      ))}
      <line x1={224} y1={348} x2={496} y2={348} stroke={p.line} />
      <text x={224} y={376} fill={p.ink} fontSize={14} fontWeight={700}>{fitText(totalLabel, 140, 14, true)}</text>
      <text x={496} y={378} fill={p.ink} fontSize={18} fontWeight={700} textAnchor="end">{fitText(total, 140, 18, true)}</text>
      <Btn x={224} y={390} w={272} h={26} label={s.cta ?? 'Оплатить'} p={p} fontSize={11} />
    </g>
  );
}

/** Спецификация: чертёж с допусками и таблица параметров модели. */
function Specsheet({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const rows = items.slice(0, 5);
  return (
    <g fontFamily={MONO}>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      {/* Миллиметровка. */}
      <g opacity={0.5}>
        {Array.from({ length: 17 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 40} y1={0} x2={(i + 1) * 40} y2={H} stroke={p.line} />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i + 1) * 40} x2={W} y2={(i + 1) * 40} stroke={p.line} />
        ))}
      </g>
      {/* Штамп чертежа. */}
      <rect x={24} y={24} width={672} height={44} fill={p.panel} stroke={p.line} />
      <text x={40} y={52} fill={p.ink} fontSize={15} fontWeight={700}>{fitText((s.brand ?? 'FERRO').toUpperCase(), 200, 15, true)}</text>
      <text x={680} y={52} fill={p.muted} fontSize={11} textAnchor="end">{fitText('ЧЕРТЁЖ · РЕВ. 04 / 2025', 260, 11)}</text>
      {/* Чертёж узла. */}
      <rect x={24} y={92} width={384} height={286} fill={p.panel} stroke={p.line} opacity={0.6} />
      <rect x={96} y={168} width={196} height={92} rx={4} fill="none" stroke={p.ink} strokeWidth={1.6} />
      <rect x={118} y={190} width={96} height={48} rx={3} fill="none" stroke={p.muted} />
      <circle cx={302} cy={214} r={24} fill="none" stroke={p.ink} strokeWidth={1.6} />
      <circle cx={302} cy={214} r={7} fill={p.ink} />
      <line x1={150} y1={168} x2={150} y2={140} stroke={p.muted} />
      <line x1={238} y1={168} x2={238} y2={140} stroke={p.muted} />
      <line x1={96} y1={300} x2={292} y2={300} stroke={p.muted} />
      <line x1={96} y1={294} x2={96} y2={306} stroke={p.muted} />
      <line x1={292} y1={294} x2={292} y2={306} stroke={p.muted} />
      <text x={194} y={318} fill={p.muted} fontSize={10} textAnchor="middle">2 400</text>
      <rect x={40} y={106} width={140} height={22} fill={p.bg} />
      <text x={48} y={122} fill={p.muted} fontSize={10}>{fitText(s.headline, 124, 10)}</text>
      {/* Таблица параметров. */}
      <rect x={436} y={92} width={260} height={286} fill={p.panel} stroke={p.line} />
      <text x={452} y={122} fill={p.muted} fontSize={10} letterSpacing={1}>СПЕЦИФИКАЦИЯ</text>
      {rows.map((k, i) => (
        <g key={k}>
          <line x1={436} y1={140 + i * 46} x2={696} y2={140 + i * 46} stroke={p.line} />
          <text x={452} y={168 + i * 46} fill={p.muted} fontSize={11}>{fitText(k, 120, 11)}</text>
          <text x={680} y={168 + i * 46} fill={p.ink} fontSize={11} fontWeight={600} textAnchor="end">{fitText(values[i] ?? '', 120, 11, true)}</text>
        </g>
      ))}
      {/* Нижняя полоса. */}
      <rect x={24} y={396} width={672} height={30} fill={p.panel} stroke={p.line} />
      <text x={40} y={415} fill={p.muted} fontSize={10}>{fitText('ДОПУСК ± 0,02 ММ', 200, 10)}</text>
      <text x={680} y={415} fill={p.ink} fontSize={10} fontWeight={600} textAnchor="end">{fitText(s.cta ?? 'ЗАПРОС СПЕЦИФИКАЦИИ →', 260, 10, true)}</text>
    </g>
  );
}

/** Консоль: живой поток логов и метрики сервиса на одном экране. */
function Terminal({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const levels = ['info', 'warn', 'error', 'info', 'info', 'warn'];
  const spark = '0,28 12,22 24,26 36,15 48,19 60,10 72,14 84,6 100,10';
  return (
    <g fontFamily={MONO}>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      <rect x={0} y={0} width={W} height={46} fill={p.panel} />
      <line x1={0} y1={46} x2={W} y2={46} stroke={p.line} />
      <circle cx={26} cy={23} r={6} fill={p.line} />
      <circle cx={46} cy={23} r={6} fill={p.accent} opacity={0.5} />
      <text x={68} y={28} fill={p.ink} fontSize={12} fontWeight={600}>{fitText(s.brand ?? 'traq', 90, 12, true)} · {fitText(s.headline, 180, 12)}</text>
      <circle cx={636} cy={23} r={5} fill={p.accent} />
      <text x={650} y={27} fill={p.muted} fontSize={11}>live</text>
      {/* Поток логов. */}
      <rect x={24} y={66} width={440} height={360} rx={10} fill={p.panel} stroke={p.line} />
      <text x={44} y={92} fill={p.muted} fontSize={10} letterSpacing={1}>ПОТОК ЛОГОВ</text>
      <text x={444} y={92} fill={p.muted} fontSize={10} textAnchor="end">{fitText(s.sub ?? '', 170, 10)}</text>
      {items.slice(0, 6).map((it, i) => {
        const y = 116 + i * 48;
        const lvl = (values[i] ?? levels[i] ?? 'info').toLowerCase();
        const hot = lvl === 'error' || lvl === 'warn';
        return (
          <g key={`${it}-${i}`}>
            <rect x={40} y={y} width={408} height={38} rx={6} fill={p.bg} stroke={p.line} />
            <text x={54} y={y + 24} fill={p.muted} fontSize={10}>{`12:04:1${i}`}</text>
            <rect x={120} y={y + 10} width={56} height={18} rx={4} fill={hot ? p.accent : 'none'} stroke={hot ? 'none' : p.line} />
            <text x={148} y={y + 23} fill={hot ? p.accentInk : p.muted} fontSize={9} textAnchor="middle">{lvl.toUpperCase()}</text>
            <text x={188} y={y + 24} fill={p.ink} fontSize={11}>{fitText(it, 196, 11)}</text>
            <text x={434} y={y + 24} fill={p.muted} fontSize={10} textAnchor="end">{`${21 + i * 6} ms`}</text>
          </g>
        );
      })}
      {/* Метрика задержки. */}
      <rect x={480} y={66} width={216} height={170} rx={10} fill={p.panel} stroke={p.line} />
      <text x={498} y={94} fill={p.muted} fontSize={10} letterSpacing={1}>LATENCY p95</text>
      <text x={678} y={94} fill={p.ink} fontSize={11} fontWeight={600} textAnchor="end">182 мс</text>
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" x={498} y={106} width={180} height={74}>
        <polyline points={spark} fill="none" stroke={p.accent} strokeWidth={1.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <text x={498} y={218} fill={p.muted} fontSize={10}>порог алерта · 250 мс</text>
      {/* Прочие метрики. */}
      <rect x={480} y={248} width={216} height={178} rx={10} fill={p.panel} stroke={p.line} />
      {[['requests/s', '1 240'], ['error rate', '0,7%'], ['instances', '6 / 6'], ['uptime', '99,98%']].map(([k, v], i) => (
        <g key={k}>
          <text x={498} y={284 + i * 34} fill={p.muted} fontSize={11}>{k}</text>
          <text x={678} y={284 + i * 34} fill={p.ink} fontSize={11} fontWeight={600} textAnchor="end">{v}</text>
          {i < 3 ? <line x1={498} y1={300 + i * 34} x2={678} y2={300 + i * 34} stroke={p.line} /> : null}
        </g>
      ))}
    </g>
  );
}

/** Docs API: оглавление, текст гайда и живой код-сэмпл с ответом сервера. */
function Apiref({ s, p, items }: { s: DesignScreen; p: MockPalette; items: string[] }) {
  const nav = items.slice(0, 5);
  const lines = splitLines(s.headline);
  // Двухстрочный заголовок сдвигает всё, что под ним, — считаем базовую линию.
  const textY = 132 + (lines.length - 1) * 26;
  const code: [string, string][] = [
    ['POST', '/v1/payments'],
    ['amount', '1 290 ₽'],
    ['currency', 'RUB'],
  ];
  const res: [string, string][] = [
    ['"id"', '"pay_8f2a"'],
    ['"status"', '"succeeded"'],
    ['"amount"', '129000'],
  ];
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      {/* Сайдбар. */}
      <rect x={0} y={0} width={168} height={H} fill={p.panel} />
      <line x1={168} y1={0} x2={168} y2={H} stroke={p.line} />
      <text x={24} y={40} fill={p.ink} fontSize={15} fontWeight={700} fontFamily={MONO}>{fitText(s.brand ?? 'base', 120, 15, true)}</text>
      {nav.map((it, i) => (
        <g key={it}>
          {i === 0 ? <rect x={12} y={62} width={144} height={30} rx={6} fill={p.bg} stroke={p.line} /> : null}
          <text x={24} y={82 + i * 34} fill={i === 0 ? p.ink : p.muted} fontSize={12}>{fitText(it, 128, 12)}</text>
        </g>
      ))}
      <text x={24} y={430} fill={p.muted} fontSize={10} fontFamily={MONO}>v1.4</text>
      {/* Текст гайда. */}
      <text x={196} y={98} fill={p.muted} fontSize={10} letterSpacing={1}>{fitText(s.sub ?? 'БЫСТРЫЙ СТАРТ', 140, 10)}</text>
      {lines.map((line, i) => (
        <text key={line} x={196} y={132 + i * 26} fill={p.ink} fontSize={22} fontWeight={700}>{fitText(line, 224, 22, true)}</text>
      ))}
      <text x={196} y={textY + 26} fill={p.muted} fontSize={12}>{fitText('Создайте ключ и отправьте запрос.', 224, 12)}</text>
      {['Ключ создаётся в один клик', 'Тестовый режим без продаж', 'Ответ копируется как JSON'].map((t, i) => (
        <g key={t}>
          <circle cx={202} cy={textY + 58 + i * 26} r={4} fill={p.accent} />
          <text x={216} y={textY + 62 + i * 26} fill={p.muted} fontSize={11}>{fitText(t, 200, 11)}</text>
        </g>
      ))}
      <Btn x={196} y={textY + 120} w={200} label={s.cta ?? 'Создать API-ключ'} p={p} />
      {/* Код-сэмпл. */}
      <rect x={420} y={70} width={276} height={200} rx={10} fill={p.panel} stroke={p.line} />
      <line x1={420} y1={104} x2={696} y2={104} stroke={p.line} />
      {['cURL', 'Node', 'Python', 'Go'].map((l, i) => (
        <text key={l} x={440 + i * 52} y={93} fill={i === 0 ? p.ink : p.muted} fontSize={11} fontWeight={i === 0 ? 600 : 400} fontFamily={MONO}>{l}</text>
      ))}
      {code.map(([k, v], i) => (
        <g key={k} fontFamily={MONO}>
          <text x={440} y={134 + i * 28} fill={p.muted} fontSize={11}>{fitText(k, 90, 11)}</text>
          <text x={676} y={134 + i * 28} fill={p.ink} fontSize={11} textAnchor="end">{fitText(v, 150, 11)}</text>
        </g>
      ))}
      {/* Ответ сервера. */}
      <rect x={420} y={286} width={276} height={140} rx={10} fill={p.panel} stroke={p.line} />
      <text x={440} y={314} fill={p.muted} fontSize={10} fontFamily={MONO}>{fitText('200 OK · application/json', 240, 10)}</text>
      <line x1={420} y1={328} x2={696} y2={328} stroke={p.line} />
      {res.map(([k, v], i) => (
        <g key={k} fontFamily={MONO}>
          <text x={440} y={356 + i * 24} fill={p.muted} fontSize={11}>{k}</text>
          <text x={676} y={356 + i * 24} fill={p.ink} fontSize={11} textAnchor="end">{v}</text>
        </g>
      ))}
    </g>
  );
}

/** Счета и операции: карты счетов, остаток и лента транзакций. */
function Ledger({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const accounts = items.slice(0, 3);
  const tx = items.slice(3, 6);
  const dates = ['12 марта', '11 марта', '10 марта'];
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Платёж" links={['Счета', 'Платежи', 'Налоги']} />
      <text x={48} y={100} fill={p.ink} fontSize={20} fontWeight={700}>{fitText(s.headline, 400, 20, true)}</text>
      <text x={48} y={124} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 400, 12)}</text>
      {/* Карты счетов. */}
      {accounts.map((it, i) => {
        const y = 150 + i * 92;
        const primary = i === 0;
        return (
          <g key={it}>
            <rect x={48} y={y} width={300} height={80} rx={12} fill={primary ? p.accent : p.panel} stroke={primary ? 'none' : p.line} />
            <text x={68} y={y + 30} fill={primary ? p.accentInk : p.muted} fontSize={11}>{fitText(it, 180, 11)}</text>
            <text x={68} y={y + 60} fill={primary ? p.accentInk : p.ink} fontSize={22} fontWeight={700} letterSpacing={-0.5}>{fitText(values[i] ?? '', 200, 22, true)}</text>
          </g>
        );
      })}
      {/* Лента операций. */}
      <rect x={376} y={150} width={320} height={256} rx={12} fill={p.panel} stroke={p.line} />
      <text x={396} y={182} fill={p.ink} fontSize={13} fontWeight={600}>Операции</text>
      <text x={676} y={182} fill={p.muted} fontSize={11} textAnchor="end">март 2026</text>
      {tx.map((t, i) => (
        <g key={t}>
          <circle cx={410} cy={216 + i * 50} r={12} fill={p.accent} opacity={0.16} />
          <text x={410} y={220 + i * 50} fill={p.accent} fontSize={11} fontWeight={700} textAnchor="middle">{t.slice(0, 1)}</text>
          <text x={432} y={212 + i * 50} fill={p.ink} fontSize={12}>{fitText(t, 150, 12)}</text>
          <text x={432} y={228 + i * 50} fill={p.muted} fontSize={10}>{dates[i]}</text>
          <text x={676} y={220 + i * 50} fill={p.ink} fontSize={12} fontWeight={600} textAnchor="end">{fitText(values[i + 3] ?? '', 80, 12, true)}</text>
        </g>
      ))}
    </g>
  );
}

/** Аналитика: плитки KPI, столбчатый график и структура расходов. */
function Economics({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const bars = [42, 58, 50, 72, 64, 84, 76, 92];
  const breakdown = s.summary?.items.slice(0, 4) ?? ['Комиссия', 'Логистика', 'Реклама', 'Прочее'];
  const shares = s.summary?.values.slice(0, 4).map((v) => Number.parseFloat(v.replace(',', '.')) || 0) ?? [46, 24, 18, 12];
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} fill={p.bg} />
      {/* Шапка. */}
      <text x={40} y={64} fill={p.ink} fontSize={22} fontWeight={700} letterSpacing={-0.6}>{fitText(s.headline, 380, 22, true)}</text>
      <text x={40} y={90} fill={p.muted} fontSize={12}>{fitText(s.sub ?? '', 380, 12)}</text>
      <Chip x={560} y={46} w={120} h={28} label={s.brand ?? ''} p={p} />
      {/* KPI-плитки. */}
      {items.slice(0, 4).map((it, i) => (
        <g key={it}>
          <rect x={40 + i * 162} y={116} width={146} height={84} rx={10} fill={p.panel} stroke={p.line} />
          <text x={56 + i * 162} y={148} fill={p.muted} fontSize={11}>{fitText(it, 132, 11)}</text>
          <text x={56 + i * 162} y={182} fill={p.ink} fontSize={20} fontWeight={700} letterSpacing={-0.5}>{fitText(values[i] ?? '', 132, 20, true)}</text>
        </g>
      ))}
      {/* График по месяцам. */}
      <rect x={40} y={220} width={392} height={186} rx={12} fill={p.panel} stroke={p.line} />
      <text x={58} y={248} fill={p.muted} fontSize={11}>Динамика по месяцам</text>
      {bars.map((h, i) => (
        <rect key={i} x={58 + i * 46} y={384 - h} width={30} height={h} rx={4} fill={p.accent} opacity={i === bars.length - 1 ? 1 : 0.34 + i * 0.07} />
      ))}
      <line x1={58} y1={384} x2={414} y2={384} stroke={p.line} />
      {/* Структура расходов. */}
      <rect x={448} y={220} width={232} height={186} rx={12} fill={p.panel} stroke={p.line} />
      <text x={466} y={248} fill={p.muted} fontSize={11}>{fitText(s.summary?.title ?? 'Структура расходов', 196, 11)}</text>
      {breakdown.map((k, i) => (
        <g key={k}>
          <text x={466} y={282 + i * 30} fill={p.ink} fontSize={12}>{fitText(k, 150, 12)}</text>
          <text x={662} y={282 + i * 30} fill={p.muted} fontSize={11} textAnchor="end">{shares[i]}%</text>
          <rect x={466} y={290 + i * 30} width={(196 * shares[i]) / 100} height={6} rx={3} fill={p.accent} opacity={0.9 - i * 0.16} />
        </g>
      ))}
    </g>
  );
}

/** Рисует экран кейса по типу (kind) и палитре. */
export default function CaseMock({ screen, palette }: { screen: DesignScreen; palette: MockPalette }) {
  const p = palette;
  const items = screen.items ?? [];
  const values = screen.values ?? [];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      role="img"
      aria-label={`Макет экрана «${screen.title}»`}
      preserveAspectRatio="xMidYMid slice"
      fontFamily={FONT}
    >
      <rect width={W} height={H} fill={p.bg} />
      {/* Общие архетипы. */}
      {screen.kind === 'landing' && <Landing s={screen} p={p} items={items} />}
      {screen.kind === 'grid' && <Grid s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'detail' && <Detail s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'dash' && <Dash s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'funnel' && <Funnel s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'phone' && <Phone s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'form' && <Form s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'feed' && <Feed s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'article' && <Article s={screen} p={p} />}
      {screen.kind === 'pricing' && <Pricing s={screen} p={p} items={items} values={values} />}
      {/* Отраслевые экраны. */}
      {screen.kind === 'lookbook' && <Lookbook s={screen} p={p} />}
      {screen.kind === 'build' && <Build s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'slots' && <Slots s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'map' && <Map s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'tracker' && <Tracker s={screen} p={p} items={items} />}
      {screen.kind === 'receipt' && <Receipt s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'specsheet' && <Specsheet s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'terminal' && <Terminal s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'apiref' && <Apiref s={screen} p={p} items={items} />}
      {screen.kind === 'ledger' && <Ledger s={screen} p={p} items={items} values={values} />}
      {screen.kind === 'economics' && <Economics s={screen} p={p} items={items} values={values} />}
    </svg>
  );
}
