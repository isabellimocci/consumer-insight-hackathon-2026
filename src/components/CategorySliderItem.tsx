import { CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'

import type { BudgetCategory, Category } from '../types'

interface CategorySliderItemProps {
  category: Category
  userPercent: number
  income: number
  status: BudgetCategory['status']
  onChange: (pct: number) => void
}

const STATUS_COLORS: Record<BudgetCategory['status'], string> = {
  'on-track': 'var(--color-success)',
  warning: 'var(--color-warning)',
  over: 'var(--color-danger)',
}

const STATUS_BG_COLORS: Record<BudgetCategory['status'], string> = {
  'on-track': 'color-mix(in srgb, var(--color-success) 15%, transparent)',
  warning: 'color-mix(in srgb, var(--color-warning) 15%, transparent)',
  over: 'color-mix(in srgb, var(--color-danger) 15%, transparent)',
}

const STATUS_LABELS: Record<BudgetCategory['status'], string> = {
  'on-track': 'No limite',
  warning: 'Atenção',
  over: 'Acima',
}

export function CategorySliderItem({
  category,
  userPercent,
  income,
  status,
  onChange,
}: CategorySliderItemProps) {
  const amount = Math.round(income * (userPercent / 100) * 100) / 100
  const statusColor = STATUS_COLORS[status]
  const statusBgColor = STATUS_BG_COLORS[status]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '') {
      onChange(0)
      return
    }
    const parsed = Math.min(100, Math.max(0, Math.round(Number(raw))))
    if (!isNaN(parsed)) onChange(parsed)
  }

  return (
    <div className="gap-sm flex items-center">
      <span className="gap-xs text-text flex flex-1 items-center text-(length:--font-size-sm) font-medium">
        <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>
        {category}
      </span>
      <span className="text-(length:--font-size-sm) text-(--color-inactive-text)">
        {formatCurrency(amount)}
      </span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={userPercent}
          onChange={handleChange}
          className="border-border bg-background px-xs text-text focus:ring-primary w-16 rounded-lg border py-1 text-right text-(length:--font-size-sm) font-semibold focus:ring-2 focus:outline-none"
          aria-label={`Percentual de orçamento para ${category}`}
        />
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ color: statusColor }}
        >
          %
        </span>
      </div>
      <span
        className="rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ color: statusColor, backgroundColor: statusBgColor }}
      >
        {STATUS_LABELS[status]}
      </span>
    </div>
  )
}
