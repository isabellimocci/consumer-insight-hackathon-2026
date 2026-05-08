import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'

import type { Category } from '../types'

interface SuggestedBudgetCardProps {
  income: number
  suggested: Record<Category, number>
}

const CATEGORY_ORDER: Category[] = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Assinaturas',
  'Compras',
  'Saúde',
  'Educação',
]

export function SuggestedBudgetCard({ income, suggested }: SuggestedBudgetCardProps) {
  if (income <= 0) return null

  return (
    <div className="gap-sm bg-surface p-md flex flex-col rounded-2xl shadow-sm">
      <p className="text-text text-(length:--font-size-base) font-semibold">
        Distribuição sugerida
      </p>
      <ul className="gap-xs flex flex-col">
        {CATEGORY_ORDER.map((cat) => {
          const pct = suggested[cat] ?? 0
          const amount = Math.round(income * (pct / 100) * 100) / 100
          const IconComponent = CATEGORY_ICONS_PI[cat]
          return (
            <li key={cat} className="flex items-center justify-between">
              <span className="gap-xs text-text flex items-center text-(length:--font-size-sm)">
                <IconComponent
                  size={16}
                  aria-hidden={true}
                  style={{ color: CATEGORY_COLORS[cat] }}
                />
                {cat}
              </span>
              <span className="text-(length:--font-size-sm) text-(--color-inactive-text)">
                {pct}% · {formatCurrency(amount)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
