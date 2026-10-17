/**
 * Схема «Обычный RAG vs Jev + RAG» для блока контроля галлюцинаций на /agents.
 *
 * Две колонки в языке секции (d-card, --d-*): слева путь без фильтра —
 * модель отвечает на сыром поиске и может выдумать; справа Rerank + Gate
 * отсекает мусор и либо даёт точный ответ, либо передаёт оператору.
 */
import { ArrowRight, CheckCircle, Shield, XCircle } from 'lucide-react';

/** Шаг потока: короткая подпись на «чипе». */
interface FlowStep {
  label: string;
  /** Выделить шаг как слой контроля качества. */
  accent?: boolean;
}

const PLAIN_STEPS: FlowStep[] = [
  { label: 'Запрос' },
  { label: 'Векторный поиск' },
  { label: 'LLM' },
];

const JEV_STEPS: FlowStep[] = [
  { label: 'Запрос' },
  { label: 'Векторный поиск' },
  { label: 'Rerank + Gate', accent: true },
  { label: 'LLM' },
];

function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, i) => (
        <li key={`${step.label}-${i}`} className="flex items-center gap-2">
          <span
            className={`inline-flex min-h-[32px] items-center rounded-md border px-2.5 py-1 text-[12px] font-medium leading-[1.3] ${
              step.accent
                ? 'border-[var(--d-ink)] bg-[var(--d-soft)] text-[var(--d-ink)]'
                : 'border-[var(--d-line)] text-[var(--d-ink)]'
            }`}
          >
            {step.accent ? (
              <span className="mr-1.5 inline-flex" aria-hidden>
                <Shield size={12} strokeWidth={1.8} />
              </span>
            ) : null}
            {step.label}
          </span>
          {i < steps.length - 1 ? (
            <ArrowRight size={12} strokeWidth={1.6} className="shrink-0 d-faint max-sm:rotate-90" aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function JevRagCompare() {
  return (
    <div className="mt-8 sm:mt-10">
      <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Сравнение</p>
      <h3 className="mt-2 text-[17px] font-semibold text-[var(--d-ink)]">
        Обычный RAG vs Jev + RAG
      </h3>
      <p className="mt-2 max-w-[620px] text-[14px] leading-[1.6] d-muted">
        Разница не в модели, а в контроле качества: что попадает в ответ
        и что отсекается до клиента.
      </p>

      <div className="mt-5 grid gap-4 sm:gap-5 lg:grid-cols-2">
        <article className="d-card flex flex-col p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Обычный RAG</p>
          <h4 className="mt-2 text-[15px] font-semibold text-[var(--d-ink)]">
            Поиск без фильтра
          </h4>
          <Flow steps={PLAIN_STEPS} />
          <p className="mt-5 flex items-start gap-2 rounded-lg border border-[var(--d-line)] bg-[var(--d-soft)] px-3 py-2.5 text-[13px] leading-[1.5] d-muted">
            <XCircle size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 d-faint" aria-hidden />
            <span>
              <strong className="font-semibold text-[var(--d-ink)]">Галлюцинация.</strong>{' '}
              В модель попадает всё подряд — она додумывает пробелы.
            </span>
          </p>
        </article>

        <article className="d-card flex flex-col p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.08em] d-faint">Jev + RAG</p>
          <h4 className="mt-2 text-[15px] font-semibold text-[var(--d-ink)]">
            Контроль качества перед ответом
          </h4>
          <Flow steps={JEV_STEPS} />
          <p className="mt-5 flex items-start gap-2 rounded-lg border border-[var(--d-ink)] bg-[var(--d-soft)] px-3 py-2.5 text-[13px] leading-[1.5] text-[var(--d-ink)]">
            <CheckCircle size={15} strokeWidth={1.6} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              <strong className="font-semibold">Точный ответ</strong>
              {' / '}
              передача оператору. Мусор отсечён, выдумывать не из чего.
            </span>
          </p>
        </article>
      </div>
    </div>
  );
}
