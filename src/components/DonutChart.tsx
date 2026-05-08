import type { ChartConfig } from '@components/ui/chart'
import { ChartContainer } from '@components/ui/chart'
import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { useState } from 'react'
import { Cell, Label, Pie, PieChart, Tooltip } from 'recharts'

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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: CategoryPercentage }>
}) {
  if (!active || !payload?.length) return null
  const entry = payload[0].payload
  const color = CATEGORY_COLORS[entry.category]

  const IconComponent = CATEGORY_ICONS_PI[entry.category]
  const iconBg = `color-mix(in srgb, ${color}, transparent 80%)`

  return (
    <div
      className="rounded-xl bg-(--color-primary) p-3 shadow-xl ring-1 ring-(--color-inactive-bg)"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: iconBg }}
        >
          {IconComponent && <IconComponent size={13} style={{ color }} />}
        </span>
        <p className="text-sm font-semibold text-(--color-text)">{entry.category}</p>
      </div>
      <p className="text-base font-bold text-(--color-text)">{formatBRL(entry.total)}</p>
      <p className="mt-0.5 text-xs text-(--color-inactive-text)">{entry.percentage}% do total</p>
    </div>
  )
}

export function DonutChart({ data, totalBudget }: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const spentTotal = data.reduce((s, d) => s + d.total, 0)
  const isOverBudget = totalBudget !== undefined && spentTotal > totalBudget
  const hasBudget = totalBudget !== undefined

  return (
    <div className="flex items-center gap-3">
      <ChartContainer config={CHART_CONFIG} className="h-45 w-45 shrink-0">
        <PieChart>
          {hasBudget && (
            <Pie
              data={[{ value: totalBudget }]}
              dataKey="value"
              outerRadius={88}
              innerRadius={82}
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
            innerRadius={hasBudget ? 50 : 55}
            outerRadius={hasBudget ? 76 : 80}
            strokeWidth={2}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={CATEGORY_COLORS[entry.category]}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                style={{ cursor: 'pointer', transition: 'opacity 150ms' }}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  const cx = viewBox.cx ?? 0
                  const cy = viewBox.cy ?? 0

                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan
                        x={cx}
                        y={cy - 14}
                        fill="var(--color-inactive-text)"
                        fontSize={8}
                        fontWeight={500}
                        letterSpacing="0.05em"
                      >
                        {data.length} CATEGORIAS
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 4}
                        fill={isOverBudget ? 'var(--color-danger)' : 'var(--color-text)'}
                        fontSize={11}
                        fontWeight={700}
                      >
                        {formatBRL(spentTotal)}
                      </tspan>
                      {hasBudget && (
                        <tspan
                          x={cx}
                          y={cy + 18}
                          fill="var(--color-inactive-text)"
                          fontSize={8}
                          fontWeight={400}
                        >
                          / {formatBRL(totalBudget)}
                        </tspan>
                      )}
                    </text>
                  )
                }
              }}
            />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ChartContainer>

      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-1">
        {data.map((d) => (
          <li key={d.category} role="listitem" className="flex items-center gap-1.5 text-xs">
            <span
              style={{ background: CATEGORY_COLORS[d.category] }}
              className="size-2.5 shrink-0 rounded-full"
            />
            <span className="truncate text-(--color-inactive-text)">{d.category}</span>
            <span className="shrink-0 font-medium text-(--color-text)">{d.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
