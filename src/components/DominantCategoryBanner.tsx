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
      className="bg-highlight p-md rounded-2xl"
      style={{ borderLeft: `4px solid ${CATEGORY_COLORS[dominant.category]}` }}
    >
      <div className="gap-sm flex items-center">
        <span className="text-4xl">{CATEGORY_ICONS[dominant.category]}</span>
        <div className="flex-1">
          <p className="text-text text-(length:--font-size-base) font-semibold">
            {dominant.category} foi sua maior categoria
          </p>
          <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
            {formatCurrency(dominant.total)} · {percentage}% do mês
          </p>
        </div>
      </div>

      <div className="mt-sm">
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
