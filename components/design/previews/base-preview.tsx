/**
 * Кейс «Base» — светлая документация API для разработчиков.
 * Архетип: слева навигация по разделам, в центре текст гайда,
 * справа код-сэмпл с вкладками языков и ответ сервера рядом.
 */
import { LIGHT as C } from './mono-tokens';

const NAV: [string, boolean][] = [
  ['Быстрый старт', true],
  ['Аутентификация', false],
  ['Платежи', false],
  ['Возвраты', false],
  ['Webhooks', false],
];

const LANGS = ['cURL', 'Node', 'Python', 'Go'];

const CODE: [string, string][] = [
  ['POST', '/v1/payments'],
  ['Authorization', 'Bearer sk_test_···'],
  ['amount', '1 290 ₽'],
  ['currency', 'RUB'],
];

const RESP: [string, string][] = [
  ['id', '"pay_8f2a"'],
  ['status', '"succeeded"'],
  ['amount', '129000'],
];

export default function BasePreview() {
  return (
    <div className="flex h-full w-full" style={{ background: C.bg, color: C.ink }}>
      {/* Навигация docs */}
      <aside className="flex w-[22%] flex-col border-r px-[2cqw] py-[2.2cqw]" style={{ borderColor: C.line }}>
        <span className="font-mono text-[1.7cqw] font-semibold tracking-[-0.02em]">base</span>
        <nav className="mt-[2cqw] flex flex-col gap-[0.3cqw] text-[1.2cqw]">
          {NAV.map(([item, active]) => (
            <span
              key={item}
              className="truncate rounded-[0.6cqw] px-[1.2cqw] py-[0.9cqw]"
              style={active ? { background: C.soft, color: C.ink } : { color: C.muted }}
            >
              {item}
            </span>
          ))}
        </nav>
        <span className="mt-auto font-mono text-[1.05cqw]" style={{ color: C.faint }}>v1.4</span>
      </aside>

      <main className="flex flex-1 gap-[2.6cqw] px-[2.6cqw] py-[2.2cqw]">
        {/* Текст гайда */}
        <div className="flex w-[42%] flex-col">
          <span className="font-mono text-[1.05cqw] uppercase tracking-[0.16em]" style={{ color: C.faint }}>Быстрый старт</span>
          <h3 className="mt-[1.3cqw] text-balance text-[2.7cqw] font-semibold leading-[1.15] tracking-[-0.06cqw]">
            Первый платёж за 5 минут
          </h3>
          <p className="mt-[1.3cqw] text-[1.2cqw] leading-[1.6]" style={{ color: C.muted }}>
            Создайте ключ в тестовом режиме и отправьте запрос. Всё на этой странице.
          </p>
          <div className="mt-[1.8cqw] flex flex-col gap-[0.9cqw]">
            {['Ключ создаётся в один клик', 'Тестовый режим не тронет продажи', 'Ответ копируется как JSON или cURL'].map((t) => (
              <div key={t} className="flex items-start gap-[1.2cqw] text-[1.15cqw]" style={{ color: C.muted }}>
                <span className="mt-[0.5cqw] h-[1.2cqw] w-[1.2cqw] shrink-0 rounded-full" style={{ background: C.ink }} />
                {t}
              </div>
            ))}
          </div>
          <span className="mt-auto w-fit whitespace-nowrap rounded-[0.6cqw] px-[2.2cqw] py-[1cqw] text-[1.2cqw] font-semibold" style={{ background: C.ink, color: C.bg }}>
            Создать API-ключ
          </span>
        </div>

        {/* Код и ответ */}
        <div className="flex w-[58%] flex-col gap-[1.6cqw] font-mono">
          <div className="overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
            <div className="flex items-center gap-[1.4cqw] border-b px-[1.6cqw] py-[1cqw] text-[1.05cqw]" style={{ borderColor: C.line }}>
              {LANGS.map((l, i) => (
                <span key={l} style={{ color: i === 0 ? C.ink : C.muted, fontWeight: i === 0 ? 600 : 400 }}>{l}</span>
              ))}
            </div>
            <div className="flex flex-col gap-[0.7cqw] px-[1.6cqw] py-[1.4cqw] text-[1.1cqw] leading-[1.7]">
              {CODE.map(([k, v], i) => (
                <div key={k} className="flex min-w-0 gap-[1.2cqw]">
                  <span className="shrink-0" style={{ color: C.faint }}>{i === 0 ? '$' : ' '}</span>
                  <span className="shrink-0" style={{ color: C.muted }}>{k}</span>
                  <span className="ml-auto min-w-0 truncate" style={{ color: C.ink }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1cqw] border" style={{ borderColor: C.line, background: C.panel }}>
            <div className="flex items-center justify-between border-b px-[1.6cqw] py-[1cqw] text-[1.05cqw]" style={{ borderColor: C.line }}>
              <span style={{ color: C.muted }}>200 OK</span>
              <span style={{ color: C.faint }}>application/json</span>
            </div>
            <div className="flex flex-col gap-[0.7cqw] px-[1.6cqw] py-[1.4cqw] text-[1.1cqw] leading-[1.7]">
              {RESP.map(([k, v]) => (
                <div key={k} className="flex min-w-0 gap-[1.2cqw]">
                  <span className="shrink-0" style={{ color: C.muted }}>&quot;{k}&quot;:</span>
                  <span className="ml-auto min-w-0 truncate" style={{ color: C.ink }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
