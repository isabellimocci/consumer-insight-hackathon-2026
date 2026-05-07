import { NEW_CATEGORY_SENTINEL } from '@utils/aggregations'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'
import { ROUTES } from '@utils/routes'
import { useNavigate } from 'react-router-dom'

import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  total: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  variationPercent: number
}

export function CategoryCard({
  category,
  total,
  percentage,
  trend,
  variationPercent,
}: CategoryCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    void navigate(`${ROUTES.TRANSACOES}?categoria=${category}`)
  }

  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'
  const trendColor =
    trend === 'up'
      ? 'text-[var(--color-danger)]'
      : trend === 'down'
        ? 'text-[var(--color-success)]'
        : 'text-[var(--color-inactive-text)]'

  const variationLabel =
    variationPercent === NEW_CATEGORY_SENTINEL
      ? 'Novo'
      : `${variationPercent > 0 ? '+' : ''}${variationPercent.toFixed(1)}%`

  const iconBg = `color-mix(in srgb, ${CATEGORY_COLORS[category]}, transparent 85%)`

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Ver transações de ${category}`}
      className="w-full cursor-pointer rounded-2xl bg-[var(--color-primary)] p-[var(--spacing-sm)] text-left transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-[var(--color-text)]"
      style={{ borderLeft: `4px solid ${CATEGORY_COLORS[category]}` }}
    >
      <div className="flex items-center gap-[var(--spacing-sm)]">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
          style={{ background: iconBg }}
        >
          {CATEGORY_ICONS[category]}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[length:var(--font-size-sm)] font-semibold text-[var(--color-text)]">
            {category}
          </p>
          <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
            {percentage}% do total
          </p>
        </div>
      </div>

      <div className="mt-[var(--spacing-xs)] flex items-end justify-between">
        <span className="text-[length:var(--font-size-base)] font-bold text-[var(--color-text)]">
          {formatCurrency(total)}
        </span>
        <span className={`text-[length:var(--font-size-sm)] font-bold ${trendColor}`}>
          {trendArrow} {variationLabel}
        </span>
      </div>
    </button>
  )
}
