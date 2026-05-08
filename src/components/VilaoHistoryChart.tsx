import type { ChartConfig } from '@components/ui/chart'
import { ChartContainer } from '@components/ui/chart'
import { CATEGORY_COLORS } from '@utils/categoryMaps'
import { formatCurrency, formatShortMonth } from '@utils/formatters'
import { Bar, BarChart, Cell, LabelList, ReferenceLine, XAxis, YAxis } from 'recharts'

import type { Category } from '../types'

interface MonthTotal {
  month: string
  total: number
}

interface VilaoHistoryChartProps {
  category: Category
  monthlyTotals: MonthTotal[]
  selectedMonth: string
  targetAmount?: number
}

export function VilaoHistoryChart({
  category,
  monthlyTotals,
  selectedMonth,
  targetAmount,
}: VilaoHistoryChartProps) {
  const categoryColor = CATEGORY_COLORS[category]

  const chartConfig = {
    total: { label: 'Gasto', color: categoryColor },
  } satisfies ChartConfig

  const data = monthlyTotals.map(({ month, total }) => ({
    month,
    total,
    label: formatShortMonth(month),
    fill: month === selectedMonth ? categoryColor : 'var(--color-inactive-bg-dark)',
  }))

  return (
    <div>
      <p className="mb-sm text-(length:--font-size-sm) text-(--color-inactive-text)">
        Histórico dos últimos meses
      </p>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={data} margin={{ top: 28, right: 8, left: 8, bottom: 0 }}>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--color-inactive-text)' }}
          />
          <YAxis hide />
          {targetAmount !== undefined && (
            <ReferenceLine
              y={targetAmount}
              stroke="var(--color-inactive-text)"
              strokeDasharray="4 4"
              label={{
                value: 'Meta',
                position: 'insideTopRight',
                fontSize: 10,
                fill: 'var(--color-inactive-text)',
              }}
            />
          )}
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.month} fill={entry.fill} />
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
