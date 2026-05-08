import { CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency, formatShortMonth } from '@utils/formatters'

import type { GrowingCategoryResult, MonthData } from '../types'

interface GrowingCategoryCardProps {
  result: GrowingCategoryResult | null
  allMonthsData: MonthData[]
}

export function GrowingCategoryCard({ result, allMonthsData }: GrowingCategoryCardProps) {
  if (!result) return null

  const last3 = allMonthsData.slice(-3)

  return (
    <div
      className="p-md flex flex-col gap-3 rounded-2xl"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        <span className="text-text text-(length:--font-size-base) font-bold">
          {result.category} {CATEGORY_ICONS[result.category]} crescendo
        </span>
      </div>

      <div className="text-text flex flex-wrap items-center gap-1 text-(length:--font-size-sm)">
        {last3.map((m, i) => (
          <span key={m.month} className="flex items-center gap-1">
            <span className="font-semibold">{formatShortMonth(m.month)}</span>
            <span>{formatCurrency(result.totals.slice(-last3.length)[i])}</span>
            {i < last3.length - 1 && <span className="text-(--color-inactive-text)">→</span>}
          </span>
        ))}
      </div>

      <span className="text-text text-(length:--font-size-sm)">
        Taxa de crescimento médio:{' '}
        <span className="font-bold">{result.growthRate.toFixed(1)}% ao mês</span>
      </span>

      <span className="text-(length:--font-size-sm) text-(--color-inactive-text)">
        {result.category} cresceu 3 meses seguidos. Está na hora de prestar atenção.
      </span>
    </div>
  )
}
