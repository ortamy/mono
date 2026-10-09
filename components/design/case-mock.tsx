/**
 * Живой макет экрана для кейсов портфолио.
 *
 * Рисуется SVG по описанию DesignScreen (kind + контент) и палитре кейса:
 * никаких картинок и заглушек — макет резкий на любом DPI, работает офлайн
 * и выглядит как реальный скриншот проекта. Разметка (сетка, шапка, карточки)
 * похожа на StoreMock на главной mono, но живёт внутри темы /design.
 */
import type { DesignScreen, MockPalette } from '@/data/design-cases';

const W = 720;
const H = 450;
const FONT = 'Inter, Arial, sans-serif';

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

/** Полоска-«текст» для второстепенного контента макета. */
function Bar({ x, y, w, h = 7, fill, r = 3.5, opacity = 1 }: {
  x: number; y: number; w: number; h?: number; fill: string; r?: number; opacity?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} opacity={opacity} />;
}

/** Шапка веб-макета: логотип, навигация и кнопка. */
function Nav({ p, brand, cta, links = ['Каталог', 'Цены', 'Кейсы'] }: {
  p: MockPalette; brand: string; cta: string; links?: string[];
}) {
  // Длинный текст кнопки не влезает в узкую шапку макета — заменяем на короткий.
  const label = cta.length > 11 ? 'Заявка' : cta;
  return (
    <g>
      <rect x={0} y={0} width={W} height={54} fill={p.panel} />
      <line x1={0} y1={54} x2={W} y2={54} stroke={p.line} strokeWidth={1} />
      <circle cx={40} cy={27} r={7} fill={p.accent} />
      <text x={54} y={32} fill={p.ink} fontSize={16} fontWeight={700}>{brand}</text>
      {links.map((l, i) => (
        <text key={l} x={392 + i * 74} y={32} fill={p.muted} fontSize={12}>{l}</text>
      ))}
      <rect x={610} y={14} width={86} height={26} rx={6} fill={p.accent} />
      <text x={653} y={31} fill={p.accentInk} fontSize={11} fontWeight={600} textAnchor="middle" dominantBaseline="middle">{label}</text>
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
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Заявка'} />
      {lines.map((line, i) => (
        <text key={line} x={48} y={142 + i * 44} fill={p.ink} fontSize={36} fontWeight={700} letterSpacing={-1}>{line}</text>
      ))}
      <text x={48} y={subY} fill={p.muted} fontSize={13}>{s.sub ?? ''}</text>
      <rect x={48} y={btnY} width={176} height={40} rx={8} fill={p.accent} />
      <text x={136} y={btnY + 20} fill={p.accentInk} fontSize={12} fontWeight={600} textAnchor="middle" dominantBaseline="middle">{s.cta ?? 'Заявка'}</text>
      <rect x={236} y={btnY} width={140} height={40} rx={8} fill="none" stroke={p.line} />
      <text x={306} y={btnY + 20} fill={p.muted} fontSize={12} textAnchor="middle" dominantBaseline="middle">Подробнее</text>
      {items.slice(0, 3).map((it, i) => (
        <g key={it}>
          <rect x={48 + i * 212} y={cardsY} width={196} height={112} rx={10} fill={p.panel} stroke={p.line} />
          <rect x={66 + i * 212} y={cardsY + 18} width={30} height={30} rx={8} fill={p.accent} opacity={0.9} />
          <text x={66 + i * 212} y={cardsY + 78} fill={p.ink} fontSize={13} fontWeight={600}>{it}</text>
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
  const filters = ['Цена', 'Материал', 'Цвет', 'Размер', 'Бренд'];
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Корзина" />
      <text x={176} y={100} fill={p.ink} fontSize={19} fontWeight={700}>{s.headline}</text>
      <rect x={24} y={84} width={132} height={342} rx={12} fill={p.panel} stroke={p.line} />
      {filters.map((f, i) => (
        <g key={f}>
          <rect x={40} y={108 + i * 46} width={13} height={13} rx={3} fill={i === 0 ? p.accent : 'none'} stroke={i === 0 ? p.accent : p.line} />
          <text x={62} y={120 + i * 46} fill={p.muted} fontSize={11}>{f}</text>
        </g>
      ))}
      {items.slice(0, 6).map((it, i) => {
        const cx = 176 + (i % cols) * (cw + 12);
        const cy = 118 + Math.floor(i / cols) * (ch + 12);
        return (
          <g key={it}>
            <rect x={cx} y={cy} width={cw} height={ch} rx={10} fill={p.panel} stroke={p.line} />
            <rect x={cx + 8} y={cy + 8} width={cw - 16} height={72} rx={7} fill={p.accent} opacity={0.14} />
            <text x={cx + 10} y={cy + 104} fill={p.ink} fontSize={12} fontWeight={600}>{it}</text>
            <text x={cx + 10} y={cy + 128} fill={p.accent} fontSize={13} fontWeight={700}>{values[i] ?? ''}</text>
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
  // Стартовые позиции чипов считаем заранее: мутировать переменную внутри
  // .map() нельзя — это ломает правило react-hooks/immutability.
  const chipStarts = chips.map((_, i) =>
    392 + chips.slice(0, i).reduce((acc, t) => acc + 24 + t.length * 7.2 + 8, 0),
  );
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="В корзину" />
      <rect x={48} y={86} width={300} height={318} rx={14} fill={p.accent} opacity={0.14} />
      <rect x={76} y={150} width={244} height={190} rx={10} fill={p.accent} opacity={0.22} />
      <circle cx={224} cy={248} r={54} fill="none" stroke={p.accent} strokeWidth={2} opacity={0.5} />
      {lines.map((line, i) => (
        <text key={line} x={392} y={126 + i * 38} fill={p.ink} fontSize={30} fontWeight={700} letterSpacing={-1}>{line}</text>
      ))}
      <text x={392} y={126 + lines.length * 38 + 34} fill={p.accent} fontSize={26} fontWeight={700}>{values[0] ?? ''}</text>
      <text x={392} y={126 + lines.length * 38 + 62} fill={p.muted} fontSize={12}>{s.sub ?? ''}</text>
      {chips.map((it, i) => {
        const cw = 24 + it.length * 7.2;
        const x = chipStarts[i];
        return (
          <g key={it}>
            <rect x={x} y={272} width={cw} height={26} rx={13} fill={p.panel} stroke={p.line} />
            <text x={x + cw / 2} y={285} fill={p.muted} fontSize={11} textAnchor="middle" dominantBaseline="middle">{it}</text>
          </g>
        );
      })}
      <rect x={392} y={326} width={168} height={42} rx={8} fill={p.accent} />
      <text x={476} y={347} fill={p.accentInk} fontSize={13} fontWeight={600} textAnchor="middle" dominantBaseline="middle">{s.cta ?? 'Купить'}</text>
    </g>
  );
}

/** Дашборд: KPI-плитки, график и боковая панель. */
function Dash({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const points = '48,352 104,318 160,334 216,276 272,300 328,238 384,258 430,212';
  return (
    <g>
      <rect x={0} y={0} width={W} height={56} fill={p.panel} />
      <line x1={0} y1={56} x2={W} y2={56} stroke={p.line} strokeWidth={1} />
      <circle cx={40} cy={28} r={7} fill={p.accent} />
      <text x={54} y={33} fill={p.ink} fontSize={16} fontWeight={700}>{s.brand ?? 'metric'}</text>
      {['Обзор', 'Отчёты', 'Когорты'].map((t, i) => (
        <text key={t} x={300 + i * 74} y={33} fill={i === 0 ? p.ink : p.muted} fontSize={12}>{t}</text>
      ))}
      <circle cx={672} cy={28} r={12} fill={p.accent} opacity={0.25} />
      {items.slice(0, 3).map((it, i) => {
        const x = 24 + i * 224;
        return (
          <g key={it}>
            <rect x={x} y={74} width={208} height={94} rx={10} fill={p.panel} stroke={p.line} />
            <text x={x + 18} y={112} fill={i === 0 ? p.accent : p.ink} fontSize={26} fontWeight={700} letterSpacing={-1}>{values[i] ?? ''}</text>
            <text x={x + 18} y={140} fill={p.muted} fontSize={11}>{it}</text>
            <text x={x + 190} y={112} fill={p.muted} fontSize={11} textAnchor="end">↗</text>
          </g>
        );
      })}
      <rect x={24} y={190} width={432} height={236} rx={12} fill={p.panel} stroke={p.line} />
      {[230, 290, 350].map((y) => (
        <line key={y} x1={44} y1={y} x2={436} y2={y} stroke={p.line} strokeDasharray="3 5" />
      ))}
      <polyline points={points} fill="none" stroke={p.accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {points.split(' ').map((pt) => {
        const [x, y] = pt.split(',');
        return <circle key={pt} cx={Number(x)} cy={Number(y)} r={3.5} fill={p.accent} />;
      })}
      <rect x={470} y={190} width={226} height={236} rx={12} fill={p.panel} stroke={p.line} />
      <text x={490} y={220} fill={p.ink} fontSize={12} fontWeight={600}>Каналы</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Bar x={490} y={240 + i * 44} w={60} fill={p.line} />
          <rect x={490} y={258 + i * 44} width={180 - i * 30} height={8} rx={4} fill={p.accent} opacity={0.9 - i * 0.18} />
          <text x={678} y={252 + i * 44} fill={p.muted} fontSize={10} textAnchor="end">{['42%', '28%', '19%', '11%'][i]}</text>
        </g>
      ))}
    </g>
  );
}

/** Воронка: шаги продаж убывающей ширины. */
function Funnel({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  const widths = [480, 400, 320, 240];
  return (
    <g>
      <rect x={0} y={0} width={W} height={56} fill={p.panel} />
      <line x1={0} y1={56} x2={W} y2={56} stroke={p.line} strokeWidth={1} />
      <circle cx={40} cy={28} r={7} fill={p.accent} />
      <text x={54} y={33} fill={p.ink} fontSize={16} fontWeight={700}>{s.brand ?? 'metric'}</text>
      <text x={40} y={104} fill={p.ink} fontSize={22} fontWeight={700}>{s.headline}</text>
      {items.slice(0, 4).map((it, i) => {
        const w = widths[i];
        const x = (W - w) / 2;
        const y = 130 + i * 62;
        return (
          <g key={it}>
            <rect x={x} y={y} width={w} height={48} rx={9} fill={p.panel} stroke={p.line} />
            <rect x={x} y={y} width={7} height={48} rx={3.5} fill={p.accent} opacity={1 - i * 0.2} />
            <text x={x + 22} y={y + 30} fill={p.ink} fontSize={13} fontWeight={600}>{it}</text>
            <text x={x + w - 18} y={y + 30} fill={p.muted} fontSize={13} fontWeight={600} textAnchor="end">{values[i] ?? ''}</text>
          </g>
        );
      })}
      <rect x={606} y={130} width={90} height={172} rx={9} fill={p.accent} opacity={0.1} />
      <text x={651} y={196} fill={p.accent} fontSize={26} fontWeight={700} textAnchor="middle">3,5%</text>
      <text x={651} y={222} fill={p.muted} fontSize={10} textAnchor="middle">итоговая CR</text>
    </g>
  );
}

/** Мобильное приложение: телефон с экраном и списком. */
function Phone({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      {/* Полу-прозрачные панели по бокам — глубина экрана. */}
      <rect x={44} y={108} width={168} height={252} rx={12} fill={p.panel} stroke={p.line} opacity={0.72} />
      <Bar x={64} y={130} w={70} fill={p.line} />
      <Bar x={64} y={154} w={128} h={10} fill={p.accent} opacity={0.3} />
      <Bar x={64} y={182} w={128} fill={p.line} />
      <Bar x={64} y={202} w={100} fill={p.line} />
      <Bar x={64} y={222} w={120} fill={p.line} />
      <rect x={508} y={108} width={168} height={252} rx={12} fill={p.panel} stroke={p.line} opacity={0.72} />
      <Bar x={528} y={130} w={70} fill={p.line} />
      <circle cx={568} cy={190} r={34} fill={p.accent} opacity={0.2} />
      <Bar x={528} y={240} w={128} fill={p.line} />
      <Bar x={528} y={260} w={96} fill={p.line} />
      <Bar x={528} y={280} w={120} fill={p.line} />

      {/* Телефон */}
      <rect x={250} y={34} width={220} height={382} rx={30} fill={p.panel} stroke={p.line} />
      <rect x={328} y={46} width={64} height={7} rx={3.5} fill={p.line} />
      <text x={274} y={78} fill={p.muted} fontSize={10}>9:41</text>
      <Bar x={424} y={72} w={28} fill={p.line} />
      <text x={274} y={112} fill={p.ink} fontSize={17} fontWeight={700}>{s.headline}</text>
      <text x={274} y={132} fill={p.muted} fontSize={11}>{s.sub ?? ''}</text>

      {items.slice(0, 4).map((it, i) => {
        const y = 148 + i * 52;
        const label = it.length > 14 ? `${it.slice(0, 13)}…` : it;
        return (
          <g key={it}>
            <rect x={262} y={y} width={196} height={44} rx={10} fill={p.bg} stroke={p.line} />
            <circle cx={284} cy={y + 22} r={10} fill={p.accent} opacity={0.22} />
            <text x={284} y={y + 26} fill={p.accent} fontSize={11} fontWeight={700} textAnchor="middle">{i + 1}</text>
            <text x={304} y={y + 26} fill={p.ink} fontSize={11}>{label}</text>
            {values[i] ? (
              <text x={446} y={y + 26} fill={p.muted} fontSize={11} textAnchor="end">{values[i]}</text>
            ) : null}
          </g>
        );
      })}

      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={290 + i * 50} cy={386} r={6} fill={i === 0 ? p.accent : p.line} />
      ))}
      <rect x={320} y={402} width={80} height={5} rx={2.5} fill={p.line} />
    </g>
  );
}

/** Форма: поля слева и карточка с кнопкой справа. */
function Form({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Отправить'} />
      <text x={48} y={122} fill={p.ink} fontSize={24} fontWeight={700} letterSpacing={-0.6}>{s.headline}</text>
      <text x={48} y={150} fill={p.muted} fontSize={12}>{s.sub ?? ''}</text>

      {items.slice(0, 4).map((it, i) => {
        const y = 178 + i * 58;
        return (
          <g key={it}>
            <text x={48} y={y} fill={p.muted} fontSize={10} letterSpacing={0.6}>{it.toUpperCase()}</text>
            <rect x={48} y={y + 8} width={348} height={34} rx={8} fill={p.panel} stroke={p.line} />
            <text x={62} y={y + 25} fill={p.ink} fontSize={12} dominantBaseline="middle">{values[i] ?? ''}</text>
          </g>
        );
      })}

      <rect x={428} y={86} width={244} height={340} rx={12} fill={p.panel} stroke={p.line} />
      <circle cx={460} cy={122} r={11} fill={p.accent} />
      <text x={478} y={127} fill={p.ink} fontSize={14} fontWeight={700}>{s.brand ?? 'brand'}</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={462} cy={166 + i * 40} r={7} fill={p.accent} opacity={0.25} />
          <Bar x={480} y={161 + i * 40} w={168 - i * 34} fill={p.line} />
        </g>
      ))}
      <line x1={452} y1={296} x2={648} y2={296} stroke={p.line} />
      <rect x={452} y={318} width={196} height={46} rx={8} fill={p.accent} />
      <text x={550} y={342} fill={p.accentInk} fontSize={13} fontWeight={600} textAnchor="middle" dominantBaseline="middle">{s.cta ?? 'Отправить'}</text>
      <Bar x={452} y={382} w={196} fill={p.line} opacity={0.7} />
      <Bar x={452} y={396} w={120} fill={p.line} opacity={0.7} />
    </g>
  );
}

/** Список: строки со статусами или значениями. */
function Feed({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Написать" />
      <text x={48} y={112} fill={p.ink} fontSize={22} fontWeight={700} letterSpacing={-0.6}>{s.headline}</text>
      {items.slice(0, 6).map((it, i) => {
        const y = 134 + i * 52;
        return (
          <g key={it}>
            <rect x={48} y={y} width={624} height={46} rx={10} fill={p.panel} stroke={p.line} />
            <circle cx={78} cy={y + 23} r={13} fill={p.accent} opacity={0.2} />
            <text x={78} y={y + 27} fill={p.accent} fontSize={12} fontWeight={700} textAnchor="middle">{it.slice(0, 1)}</text>
            <text x={104} y={y + 27} fill={p.ink} fontSize={13}>{it}</text>
            {values[i] ? (
              <text x={656} y={y + 27} fill={p.muted} fontSize={11} textAnchor="end">{values[i]}</text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** Статья или кейс: заголовок, изображение и текст. */
function Article({ s, p }: { s: DesignScreen; p: MockPalette }) {
  const lines = splitLines(s.headline);
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta="Обсудить" />
      {lines.map((line, i) => (
        <text key={line} x={48} y={126 + i * 38} fill={p.ink} fontSize={30} fontWeight={700} letterSpacing={-1}>{line}</text>
      ))}
      <text x={48} y={126 + lines.length * 38 + 34} fill={p.muted} fontSize={12}>{s.sub ?? ''}</text>
      <rect x={48} y={232} width={264} height={186} rx={12} fill={p.accent} opacity={0.14} />
      <circle cx={180} cy={325} r={48} fill="none" stroke={p.accent} strokeWidth={2} opacity={0.5} />
      {[0, 1, 2, 3].map((i) => (
        <Bar key={`p${i}`} x={340} y={236 + i * 20} w={[332, 300, 316, 250][i]} fill={p.line} />
      ))}
      <rect x={340} y={340} width={4} height={64} fill={p.accent} />
      {[0, 1, 2].map((i) => (
        <Bar key={`q${i}`} x={358} y={346 + i * 20} w={[300, 260, 200][i]} fill={p.muted} opacity={0.6} />
      ))}
      <Bar x={340} y={424} w={316} fill={p.line} />
    </g>
  );
}

/** Тарифы: три карточки с ценой и кнопкой. */
function Pricing({ s, p, items, values }: { s: DesignScreen; p: MockPalette; items: string[]; values: string[] }) {
  return (
    <g>
      <Nav p={p} brand={s.brand ?? 'brand'} cta={s.cta ?? 'Заявка'} />
      <text x={360} y={112} fill={p.ink} fontSize={24} fontWeight={700} textAnchor="middle" letterSpacing={-0.6}>{s.headline}</text>
      <text x={360} y={140} fill={p.muted} fontSize={12} textAnchor="middle">{s.sub ?? ''}</text>
      {items.slice(0, 3).map((it, i) => {
        const x = 24 + i * 235;
        const featured = i === 1;
        return (
          <g key={it}>
            <rect x={x} y={166} width={210} height={252} rx={12} fill={p.panel} stroke={featured ? p.accent : p.line} strokeWidth={featured ? 2 : 1} />
            {featured ? <rect x={x + 150} y={178} width={48} height={20} rx={10} fill={p.accent} /> : null}
            {featured ? <text x={x + 174} y={188} fill={p.accentInk} fontSize={10} fontWeight={600} textAnchor="middle" dominantBaseline="middle">топ</text> : null}
            <text x={x + 20} y={216} fill={p.ink} fontSize={16} fontWeight={700}>{it}</text>
            <text x={x + 20} y={252} fill={p.accent} fontSize={21} fontWeight={700} letterSpacing={-0.5}>{values[i] ?? ''}</text>
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <circle cx={x + 26} cy={280 + k * 24} r={4} fill={p.accent} opacity={0.6} />
                <Bar x={x + 40} y={276 + k * 24} w={[130, 110, 140, 96][k]} fill={p.line} />
              </g>
            ))}
            <rect x={x + 16} y={382} width={178} height={24} rx={6} fill={featured ? p.accent : 'none'} stroke={featured ? p.accent : p.line} />
            <text x={x + 105} y={394} fill={featured ? p.accentInk : p.muted} fontSize={11} fontWeight={600} textAnchor="middle" dominantBaseline="middle">{s.cta ?? 'Выбрать'}</text>
          </g>
        );
      })}
    </g>
  );
}

/** Рисует экран кейса по типу и палитре. */
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
    </svg>
  );
}


