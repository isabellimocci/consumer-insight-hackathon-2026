import type { ChartConfig } from '@components/ui/chart'
import { ChartContainer } from '@components/ui/chart'
import { CATEGORY_COLORS } from '@utils/categoryMaps'
import { useMemo } from 'react'
import { Cell, Label, Pie, PieChart } from 'recharts'

import type { CategoryPercentage } from '../types'

interface DonutChartProps {
  data: CategoryPercentage[]
}

const CHART_CONFIG: ChartConfig = Object.fromEntries(
  Object.entries(CATEGORY_COLORS).map(([cat, color]) => [cat, { label: cat, color }]),
)

export function DonutChart({ data }: DonutChartProps) {
  const total = useMemo(() => data.reduce((s, d) => s + d.total, 0), [data])

  return (
    <div>
      <ChartContainer config={CHART_CONFIG} className="mx-auto h-[220px] w-full max-w-[320px]">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius={70}
            outerRadius={100}
            strokeWidth={2}
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) - 8}
                        className="fill-[var(--color-text)]"
                        fontSize={11}
                        fontWeight={500}
                      >
                        Total
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 10}
                        className="fill-[var(--color-text)]"
                        fontSize={13}
                        fontWeight={700}
                      >
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          maximumFractionDigits: 0,
                        }).format(total)}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <ul
        role="list"
        className="mt-[var(--spacing-sm)] flex flex-wrap justify-center gap-x-[var(--spacing-md)] gap-y-[var(--spacing-xs)]"
      >
        {data.map((d) => (
          <li
            key={d.category}
            role="listitem"
            className="flex items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-sm)]"
          >
            <span
              style={{ background: CATEGORY_COLORS[d.category] }}
              className="size-3 rounded-full"
            />
            <span>{d.category}</span>
            <span className="text-[var(--color-inactive-text)]">{d.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
