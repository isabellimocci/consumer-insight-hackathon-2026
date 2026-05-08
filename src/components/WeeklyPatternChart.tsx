import type { ChartConfig } from '@components/ui/chart'
import { ChartContainer } from '@components/ui/chart'
import { formatCurrency } from '@utils/formatters'
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from 'recharts'

import type { WeeklyPattern } from '../types'

interface WeeklyPatternChartProps {
  pattern: WeeklyPattern[]
}

const chartConfig = {
  total: { label: 'Gasto semanal' },
} satisfies ChartConfig

const WEEK_COLORS = ['#14532d', '#16a34a', '#4ade80', '#bbf7d0']

interface CustomTickProps {
  x?: number | string
  y?: number | string
  payload?: { value: string }
  chartData: { name: string; percentage: number }[]
}

function CustomTick({ x = 0, y = 0, payload, chartData }: CustomTickProps) {
  const entry = chartData.find((d) => d.name === payload?.value)
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fill="var(--color-inactive-text)" fontSize={12}>
        {payload?.value}
      </text>
      <text x={0} y={0} dy={26} textAnchor="middle" fill="var(--color-inactive-text)" fontSize={10}>
        {entry?.percentage}%
      </text>
    </g>
  )
}

export function WeeklyPatternChart({ pattern }: WeeklyPatternChartProps) {
  const sortedTotals = [...pattern].sort((a, b) => b.total - a.total).map((w) => w.total)

  const getColor = (total: number) => WEEK_COLORS[sortedTotals.indexOf(total)] ?? '#F97316'

  const chartData = pattern.map((w) => ({
    name: `Sem ${w.week}`,
    total: w.total,
    percentage: w.percentage,
  }))

  return (
    <div className="bg-primary p-sm rounded-xl">
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart data={chartData} margin={{ top: 20, right: 8, left: 8, bottom: 8 }}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={(props) => <CustomTick {...props} chartData={chartData} />}
            height={40}
          />
          <YAxis hide />
          <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={80}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={getColor(entry.total)} />
            ))}
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: unknown) => (typeof v === 'number' ? formatCurrency(v) : String(v))}
              style={{ fontSize: 10, fill: 'var(--color-text)' }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
