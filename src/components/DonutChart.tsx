import type { ChartConfig } from '@components/ui/chart'
import { ChartContainer } from '@components/ui/chart'
import { CATEGORY_COLORS } from '@utils/categoryMaps'
import { useMemo } from 'react'
import { Cell, Label, Pie, PieChart } from 'recharts'

import type { CategoryPercentage } from '../types'

const formatBRL = (amount: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(amount)

interface DonutChartProps {
  data: CategoryPercentage[]
  totalBudget?: number
}

const CHART_CONFIG: ChartConfig = Object.fromEntries(
  Object.entries(CATEGORY_COLORS).map(([cat, color]) => [cat, { label: cat, color }]),
)

export function DonutChart({ data, totalBudget }: DonutChartProps) {
  const spentTotal = useMemo(() => data.reduce((s, d) => s + d.total, 0), [data])
  const isOverBudget = totalBudget !== undefined && spentTotal > totalBudget
  const hasBudget = totalBudget !== undefined

  return (
    <div>
      <ChartContainer config={CHART_CONFIG} className="mx-auto h-[220px] w-full max-w-[320px]">
        <PieChart>
          {hasBudget && (
            <Pie
              data={[{ value: totalBudget }]}
              dataKey="value"
              outerRadius={108}
              innerRadius={102}
              fill="var(--color-inactive-bg)"
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={false}
            />
          )}
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius={hasBudget ? 65 : 70}
            outerRadius={hasBudget ? 95 : 100}
            strokeWidth={2}
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  const cx = viewBox.cx ?? 0
                  const cy = viewBox.cy ?? 0

                  if (hasBudget) {
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={cx}
                          y={cy - 8}
                          fill={isOverBudget ? 'var(--color-danger)' : 'var(--color-text)'}
                          fontSize={12}
                          fontWeight={700}
                        >
                          {formatBRL(spentTotal)}
                        </tspan>
                        <tspan
                          x={cx}
                          y={cy + 10}
                          fill="var(--color-inactive-text)"
                          fontSize={10}
                          fontWeight={400}
                        >
                          / {formatBRL(totalBudget)}
                        </tspan>
                      </text>
                    )
                  }

                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={cx} y={cy - 8} className="fill-text" fontSize={11} fontWeight={500}>
                        Total
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 10}
                        className="fill-text"
                        fontSize={13}
                        fontWeight={700}
                      >
                        {formatBRL(spentTotal)}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <ul role="list" className="mt-sm gap-x-md gap-y-xs flex flex-wrap justify-center">
        {data.map((d) => (
          <li
            key={d.category}
            role="listitem"
            className="gap-xs flex items-center text-(length:--font-size-sm)"
          >
            <span
              style={{ background: CATEGORY_COLORS[d.category] }}
              className="size-3 rounded-full"
            />
            <span>{d.category}</span>
            <span className="text-(--color-inactive-text)">{d.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
