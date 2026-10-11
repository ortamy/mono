/**
 * График качества ответов для экрана «Дашборд качества» кейса /agents/work/support-furniture.
 *
 * Отдельный клиентский модуль ('use client'): recharts внутри вызывает
 * React.createContext, которого нет в серверном графе Next.js. Если импортировать
 * recharts напрямую из серверного agent-screens.tsx, prerender падает с ошибкой
 * `createContext is not a function`. Вынос в 'use client' изолирует recharts, а
 * реестр AGENT_SCREENS остаётся серверным объектом.
 *
 * Цвет несёт смысл: зелёный — рост (оценка), серый — стагнация (без правок).
 */
'use client';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AGENT_MONO, AGENT_SANS, AGENT_THEME, AgentBadge, AgentCard } from '@/components/design/agent-ui';

const MONO = AGENT_MONO;
const SANS = AGENT_SANS;

export function QualityChart() {
  const data = [
    { day: 'пн', quality: 88, clean: 74 },
    { day: 'вт', quality: 90, clean: 75 },
    { day: 'ср', quality: 92, clean: 74 },
    { day: 'чт', quality: 94, clean: 75 },
    { day: 'пт', quality: 95, clean: 76 },
    { day: 'сб', quality: 97, clean: 75 },
    { day: 'вс', quality: 98, clean: 76 },
  ];
  return (
    <AgentCard className="flex min-h-0 flex-col gap-[0.6cqw] overflow-hidden">
      <div
        className="truncate"
        style={{ fontFamily: MONO, fontSize: '1cqw', letterSpacing: '0.1em', textTransform: 'uppercase', color: AGENT_THEME.slate }}
      >
        Качество ответов · неделя
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={AGENT_THEME.hairline} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: AGENT_THEME.hairline }}
              tick={{ fontSize: 8, fill: AGENT_THEME.slate, fontFamily: MONO }}
              interval={0}
            />
            <YAxis
              domain={[60, 100]}
              tickLine={false}
              axisLine={false}
              width={30}
              tick={{ fontSize: 8, fill: AGENT_THEME.slate, fontFamily: MONO }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 6, border: `1px solid ${AGENT_THEME.hairline}`, fontSize: 10, fontFamily: SANS }}
              labelStyle={{ fontFamily: MONO, color: AGENT_THEME.slate }}
            />
            <Legend wrapperStyle={{ fontSize: 8, fontFamily: MONO, color: AGENT_THEME.slate, paddingTop: 2 }} />
            <Line type="monotone" dataKey="quality" name="оценка 4,5+ · рост" stroke={AGENT_THEME.success} strokeWidth={1.6} dot={false} />
            <Line type="monotone" dataKey="clean" name="без правок · стагнация" stroke="#9CA3AF" strokeWidth={1.6} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center gap-[0.6cqw]">
        <AgentBadge variant="success">+10 п.п. за неделю</AgentBadge>
        <AgentBadge variant="soft">без правок · 75%</AgentBadge>
      </div>
    </AgentCard>
  );
}
