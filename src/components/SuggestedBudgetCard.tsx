import { CATEGORY_COLORS, CATEGORY_ICONS_BOLD_PI } from '@utils/categoryMaps'
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
    <div className="gap-sm bg-primary p-md flex flex-col rounded-2xl">
      <ul className="gap-sm flex flex-col">
        {CATEGORY_ORDER.map((cat) => {
          const pct = suggested[cat] ?? 0
          const amount = Math.round(income * (pct / 100) * 100) / 100

          const IconComponent = CATEGORY_ICONS_BOLD_PI[cat]
          const color = CATEGORY_COLORS[cat]
          return (
            <li key={cat} className="gap-xs flex items-center">
              <span
                className="mt-0.5 flex size-8 shrink-0 items-center justify-center self-start rounded-full"
                style={{ background: `color-mix(in srgb, ${color}, transparent 85%)` }}
              >
                <IconComponent size={15} aria-hidden={true} style={{ color }} />
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-text text-sm font-semibold">{cat}</span>
                <div className="h-1 overflow-hidden rounded-full bg-(--color-inactive-bg)">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end">
                <span className="text-text text-sm font-bold">{formatCurrency(amount)}</span>
                <span className="text-xs text-(--color-inactive-text)">{pct}%</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
