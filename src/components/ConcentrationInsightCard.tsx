import { CATEGORY_COLORS } from '@utils/categoryMaps'

import type { Category } from '../types'

interface ConcentrationInsightCardProps {
  category: Category
  percentage: number
}

function getConcentrationCopy(cat: Category, pct: number): string {
  if (pct >= 45) return `${cat} engoliu quase metade do seu mês`
  if (pct >= 35) return `${cat} consome mais de um terço do seu orçamento`
  if (pct >= 25) return `${cat} está sendo uma fatia expressiva do mês`
  return `${cat} está dentro de um nível razoável por enquanto`
}

export function ConcentrationInsightCard({ category, percentage }: ConcentrationInsightCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[var(--color-primary)] p-[var(--spacing-md)]">
      <span className="text-[length:var(--font-size-base)] font-semibold text-[var(--color-text)]">
        {getConcentrationCopy(category, percentage)}
      </span>
      <div className="flex items-center gap-2">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--color-surface)]">
          <div
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${category}: ${percentage}% do orçamento`}
            className="h-full rounded-full transition-all"
            style={{
              width: `${percentage}%`,
              backgroundColor: CATEGORY_COLORS[category],
            }}
          />
        </div>
        <span className="w-12 text-right text-[length:var(--font-size-sm)] font-bold text-[var(--color-text)]">
          {percentage}%
        </span>
      </div>
    </div>
  )
}
