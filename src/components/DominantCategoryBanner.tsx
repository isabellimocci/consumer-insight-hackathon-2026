import { Button } from '@components/Button'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'
import { ROUTES } from '@utils/routes'
import { useNavigate } from 'react-router-dom'

import type { CategoryTotal } from '../types'

interface DominantCategoryBannerProps {
  dominant: CategoryTotal
  percentage: number
}

export function DominantCategoryBanner({ dominant, percentage }: DominantCategoryBannerProps) {
  const navigate = useNavigate()

  return (
    <div
      className="rounded-2xl bg-[var(--color-highlight)] p-[var(--spacing-md)]"
      style={{ borderLeft: `4px solid ${CATEGORY_COLORS[dominant.category]}` }}
    >
      <div className="flex items-center gap-[var(--spacing-sm)]">
        <span className="text-4xl">{CATEGORY_ICONS[dominant.category]}</span>
        <div className="flex-1">
          <p className="text-[length:var(--font-size-base)] font-semibold text-[var(--color-text)]">
            {dominant.category} foi sua maior categoria
          </p>
          <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
            {formatCurrency(dominant.total)} · {percentage}% do mês
          </p>
        </div>
      </div>

      <div className="mt-[var(--spacing-sm)]">
        <Button
          variant="primary"
          label="Ver Vilão do Mês →"
          onClick={() => {
            void navigate(ROUTES.VILAO)
          }}
        />
      </div>
    </div>
  )
}
