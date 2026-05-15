import { Badge } from '@components/Badge'
import { CATEGORY_COLORS, CATEGORY_ICONS_BOLD_PI } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'

import type { BudgetCategory, Category } from '../types'

interface CategorySliderItemProps {
  category: Category
  userPercent: number
  income: number
  status: BudgetCategory['status']
  onChange: (pct: number) => void
}

const BADGE_COLORS: Record<BudgetCategory['status'], 'success' | 'warning' | 'danger'> = {
  'on-track': 'success',
  warning: 'warning',
  over: 'danger',
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
  const IconComponent = CATEGORY_ICONS_BOLD_PI[category]
  const color = CATEGORY_COLORS[category]

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
    <div className="md:gap-xs flex flex-col gap-1.5 md:flex-row md:items-center">
      {/* Linha 1 (mobile): ícone + nome + barra + badge | linha única (desktop) */}
      <div className="flex items-center gap-2 md:contents">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: `color-mix(in srgb, ${color}, transparent 85%)` }}
        >
          <IconComponent size={15} aria-hidden={true} style={{ color }} />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-text text-sm font-semibold">{category}</span>
          <div className="h-1 overflow-hidden rounded-full bg-(--color-inactive-bg)">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{ width: `${userPercent}%`, backgroundColor: color }}
            />
          </div>
        </div>

        {/* Badge apenas em mobile (linha 1) */}
        <div className="shrink-0 md:hidden">
          <Badge label={STATUS_LABELS[status]} color={BADGE_COLORS[status]} />
        </div>
      </div>

      {/* Linha 2 (mobile): controles + valor | continuação da linha (desktop) */}
      <div className="flex items-center justify-between gap-2 pl-10 md:contents">
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onChange(Math.max(0, userPercent - 1))}
            className="bg-surface border-border text-text flex size-8 items-center justify-center rounded-lg border text-base leading-none font-bold hover:bg-(--color-inactive-bg)"
            aria-label={`Diminuir percentual de ${category}`}
          >
            −
          </button>
          <div className="flex items-center gap-0.5">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={userPercent}
              onChange={handleChange}
              className="border-border bg-surface text-text focus:ring-primary w-12 [appearance:textfield] rounded-lg border py-1 text-center text-sm font-semibold focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label={`Percentual de orçamento para ${category}`}
            />
            <span className="text-xs text-(--color-inactive-text)">%</span>
          </div>
          <button
            type="button"
            onClick={() => onChange(Math.min(100, userPercent + 1))}
            className="bg-surface border-border text-text flex size-8 items-center justify-center rounded-lg border text-base leading-none font-bold hover:bg-(--color-inactive-bg)"
            aria-label={`Aumentar percentual de ${category}`}
          >
            +
          </button>
        </div>

        <span className="text-text shrink-0 text-sm font-bold md:ml-auto">
          {formatCurrency(amount)}
        </span>

        {/* Badge apenas em desktop */}
        <div className="hidden shrink-0 md:flex md:w-20 md:justify-end">
          <Badge label={STATUS_LABELS[status]} color={BADGE_COLORS[status]} />
        </div>
      </div>
    </div>
  )
}
