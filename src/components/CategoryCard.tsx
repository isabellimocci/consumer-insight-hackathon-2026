import { Badge } from '@components/Badge'
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
  targetAmount?: number
  budgetStatus?: 'on-track' | 'warning' | 'over'
}

export function CategoryCard({
  category,
  total,
  percentage,
  trend,
  variationPercent,
  targetAmount,
  budgetStatus,
}: CategoryCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    void navigate(`${ROUTES.TRANSACOES}?categoria=${category}`)
  }

  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'
  const trendColor =
    trend === 'up'
      ? 'text-danger'
      : trend === 'down'
        ? 'text-success'
        : 'text-(--color-inactive-text)'

  const variationLabel =
    variationPercent === NEW_CATEGORY_SENTINEL
      ? 'Novo'
      : `${variationPercent > 0 ? '+' : ''}${variationPercent.toFixed(1)}%`

  const iconBg = `color-mix(in srgb, ${CATEGORY_COLORS[category]}, transparent 85%)`

  const progressWidth = targetAmount ? `${Math.min((total / targetAmount) * 100, 100)}%` : undefined

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Ver transações de ${category}`}
      className="bg-primary p-sm focus-visible:outline-text w-full cursor-pointer rounded-2xl text-left transition-transform hover:scale-[1.02] focus-visible:outline-2"
      style={{ borderLeft: `4px solid ${CATEGORY_COLORS[category]}` }}
    >
      <div className="gap-sm flex items-center">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-xl"
          style={{ background: iconBg }}
        >
          {CATEGORY_ICONS[category]}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-text truncate text-(length:--font-size-sm) font-semibold">
            {category}
          </p>
          <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
            {percentage}% do total
          </p>
        </div>
      </div>

      <div className="mt-xs flex items-end justify-between">
        <span className="text-text text-(length:--font-size-base) font-bold">
          {formatCurrency(total)}
        </span>
        <span className={`text-(length:--font-size-sm) font-bold ${trendColor}`}>
          {trendArrow} {variationLabel}
        </span>
      </div>

      {targetAmount !== undefined && (
        <div className="mt-xs gap-xs flex flex-col">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-inactive-bg)">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: progressWidth, backgroundColor: CATEGORY_COLORS[category] }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
              Meta: {formatCurrency(targetAmount)}
            </p>
            {budgetStatus && (
              <Badge
                label={
                  budgetStatus === 'on-track'
                    ? '✓ Dentro da meta'
                    : budgetStatus === 'warning'
                      ? '⚠ Atenção'
                      : '✗ Acima da meta'
                }
                color={
                  budgetStatus === 'on-track'
                    ? 'success'
                    : budgetStatus === 'warning'
                      ? 'warning'
                      : 'danger'
                }
              />
            )}
          </div>
        </div>
      )}
    </button>
  )
}
