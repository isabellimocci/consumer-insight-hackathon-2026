import { CATEGORY_ICONS } from '@utils/categoryMaps'
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
    <div className="flex flex-col gap-[var(--spacing-sm)] rounded-2xl bg-[var(--color-surface)] p-[var(--spacing-md)] shadow-sm">
      <p className="text-[length:var(--font-size-base)] font-semibold text-[var(--color-text)]">
        Distribuição sugerida
      </p>
      <ul className="flex flex-col gap-[var(--spacing-xs)]">
        {CATEGORY_ORDER.map((cat) => {
          const pct = suggested[cat] ?? 0
          const amount = Math.round(income * (pct / 100) * 100) / 100
          return (
            <li key={cat} className="flex items-center justify-between">
              <span className="flex items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[var(--color-text)]">
                <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
                {cat}
              </span>
              <span className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
                {pct}% · {formatCurrency(amount)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
