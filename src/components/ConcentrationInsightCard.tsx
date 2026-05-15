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
    <div className="bg-primary py-sm flex min-h-36 w-full flex-col justify-center gap-3 rounded-xl px-4">
      <span className="text-text text-center text-sm font-semibold">
        {getConcentrationCopy(category, percentage, budgetMode)}
      </span>
      <div className="flex items-center gap-2">
        <div className="bg-surface block h-1.5 flex-1 rounded-full text-center">
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
        <p className="text-text text-xs font-bold">{percentage}%</p>
      </div>
    </div>
  )
}
