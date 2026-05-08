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
    <div className="flex items-center gap-[var(--spacing-sm)]">
      <span className="flex flex-1 items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-sm)] font-medium text-[var(--color-text)]">
        <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>
        {category}
      </span>
      <span className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
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
          className="w-16 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-[var(--spacing-xs)] py-1 text-right text-[length:var(--font-size-sm)] font-semibold text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
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
        style={{ color: statusColor, backgroundColor: statusColor + '1A' }}
      >
        {STATUS_LABELS[status]}
      </span>
    </div>
  )
}
