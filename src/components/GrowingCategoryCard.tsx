import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatCurrency, formatShortMonth } from '@utils/formatters'

import type { GrowingCategoryResult, MonthData } from '../types'

interface GrowingCategoryCardProps {
  result: GrowingCategoryResult | null
  allMonthsData: MonthData[]
}

export function GrowingCategoryCard({ result, allMonthsData }: GrowingCategoryCardProps) {
  if (!result) return null

  const last3 = allMonthsData.slice(-3)
  const IconComponent = CATEGORY_ICONS_PI[result.category]
  const iconBg = `color-mix(in srgb, ${CATEGORY_COLORS[result.category]}, transparent 85%)`

  return (
    <div className="p-sm bg-primary relative flex h-44 w-96 flex-col justify-between rounded-xl">
      <div className="flex items-center justify-start gap-2">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: iconBg }}
        >
          <IconComponent size={20} style={{ color: CATEGORY_COLORS[result.category] }} />
        </span>
        <span className="text-text text-2xl font-bold">{result.category}</span>
      </div>
      <span className="bg-text text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-semibold">
        ⚠️ alta
      </span>

      <div className="flex items-center justify-center gap-2 text-xs">
        {last3.map((m, i) => (
          <>
            <span
              key={m.month}
              className="flex flex-col items-center rounded-lg bg-white/20 px-3 py-1.5 leading-tight"
            >
              <span className="text-text font-semibold">{formatShortMonth(m.month)}</span>
              <span className="text-(--color-inactive-text)">
                {formatCurrency(result.totals.slice(-last3.length)[i])}
              </span>
            </span>
            {i < last3.length - 1 && <span className="text-(--color-inactive-text)">→</span>}
          </>
        ))}
      </div>

      <p className="text-center text-xs text-(--color-inactive-text)">
        Crescimento médio de{' '}
        <span className="text-text font-bold">+{result.growthRate.toFixed(1)}% ao mês</span>
      </p>
    </div>
  )
}
