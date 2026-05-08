import { CATEGORY_COLORS } from '@utils/categoryMaps'

import type { Category } from '../types'

interface ConcentrationInsightCardProps {
  category: Category
  percentage: number
  budgetMode?: boolean
}

function getConcentrationCopy(cat: Category, pct: number, budgetMode: boolean): string {
  const base = budgetMode ? `do orçamento destinado a ${cat}` : 'do seu orçamento mensal'
  if (pct >= 100) return `${cat} ultrapassou o limite que você planejou`
  if (pct >= 80) return `${cat} consumiu ${pct}% ${base}`
  if (pct >= 50) return `${cat} está em ${pct}% ${base}`
  return `${cat} está dentro de um nível razoável`
}

export function ConcentrationInsightCard({
  category,
  percentage,
  budgetMode = false,
}: ConcentrationInsightCardProps) {
  const displayPct = Math.min(percentage, 100)
  const ariaLabel = budgetMode
    ? `${category}: ${percentage}% do orçamento da categoria`
    : `${category}: ${percentage}% do orçamento mensal`

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[var(--color-primary)] p-[var(--spacing-md)]">
      <span className="text-[length:var(--font-size-base)] font-semibold text-[var(--color-text)]">
        {getConcentrationCopy(category, percentage, budgetMode)}
      </span>
      <div className="flex items-center gap-2">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--color-surface)]">
          <div
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ariaLabel}
            className="h-full rounded-full transition-all"
            style={{
              width: `${displayPct}%`,
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
