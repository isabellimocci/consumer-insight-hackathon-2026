import { Badge } from '@components/Badge'
import { NEW_CATEGORY_SENTINEL } from '@utils/aggregations'
import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
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
  isVilao?: boolean
}

export function CategoryCard({
  category,
  total,
  percentage,
  trend,
  variationPercent,
  targetAmount,
  budgetStatus,
  isVilao,
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
  const progressColor =
    budgetStatus === 'over'
      ? 'var(--color-danger)'
      : budgetStatus === 'warning'
        ? 'var(--color-warning)'
        : 'var(--color-success)'
  const IconComponent = CATEGORY_ICONS_PI[category]

  const badges: { label: string; color: 'danger' | 'success' | 'warning' | 'neutral' }[] = []
  if (isVilao) badges.push({ label: 'Vilão do Mês 🗡️', color: 'danger' })
  if (budgetStatus === 'over' && targetAmount !== undefined) {
    const pct = Math.round((total / targetAmount - 1) * 100)
    badges.push({ label: `+${pct}% acima da meta`, color: 'danger' })
  } else if (budgetStatus === 'on-track') {
    badges.push({ label: '✓ Dentro da meta', color: 'success' })
  } else if (budgetStatus === 'warning') {
    badges.push({ label: '⚠ Atenção', color: 'warning' })
  }
  if (variationPercent === NEW_CATEGORY_SENTINEL) badges.push({ label: 'Novo', color: 'neutral' })

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Ver transações de ${category}`}
      className="bg-primary focus-visible:outline-text h-full w-full cursor-pointer rounded-xl px-2.5 py-1.5 text-left focus-visible:outline-2"
    >
      <div className="flex items-start gap-2.5">
        <span
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: iconBg }}
        >
          <IconComponent size={15} style={{ color: CATEGORY_COLORS[category] }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-text text-sm font-bold">{category}</p>
          <p className="text-xs text-(--color-inactive-text)">{percentage}% do total</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <p className="text-text text-sm font-bold">{formatCurrency(total)}</p>
          {variationPercent !== NEW_CATEGORY_SENTINEL && (
            <span className={`text-xs font-medium ${trendColor}`}>
              {trendArrow} {variationLabel}
            </span>
          )}
        </div>
      </div>

      {(targetAmount !== undefined || badges.length > 0) && (
        <div className="mt-1 flex items-center gap-2">
          {badges.length > 0 && (
            <div className="flex shrink-0 gap-1">
              {badges.map((b) => (
                <Badge key={b.label} label={b.label} color={b.color} />
              ))}
            </div>
          )}
          {targetAmount !== undefined && (
            <div className="h-1.5 min-w-8 flex-1 overflow-hidden rounded-full bg-(--color-inactive-bg)">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: progressWidth, backgroundColor: progressColor }}
              />
            </div>
          )}
        </div>
      )}
    </button>
  )
}
