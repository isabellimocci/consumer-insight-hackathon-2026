import { Button } from '@components/Button'
import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'
import { ROUTES } from '@utils/routes'
import { useNavigate } from 'react-router-dom'

import type { CategoryPercentage } from '../types'

interface DominantCategoryBannerProps {
  dominant: CategoryPercentage
}

export function DominantCategoryBanner({ dominant }: DominantCategoryBannerProps) {
  const navigate = useNavigate()

  const IconComponent = CATEGORY_ICONS_PI[dominant.category]
  const iconBg = `color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]}, transparent 85%)`

  return (
    <div
      className="relative overflow-hidden rounded-xl p-0.5"
      style={{ boxShadow: '0 0 16px oklch(0.4364 0.0588 142.9 / 0.25)' }}
    >
      <div
        className="absolute -inset-full animate-spin"
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 330deg,
            oklch(0.4364 0.0588 142.9) 350deg,
            transparent 360deg
          )`,
          animationDuration: '4s',
        }}
      />
      <div className="bg-primary p-sm relative flex justify-between rounded-[10px]">
        <div className="gap-sm flex items-center">
          <span
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: iconBg }}
          >
            <IconComponent size={15} style={{ color: CATEGORY_COLORS[dominant.category] }} />
          </span>
          <div className="flex-1">
            <p className="text-text text-sm font-semibold">
              {dominant.category} foi sua maior categoria
            </p>
            <p className="text-xs text-(--color-inactive-text)">
              {formatCurrency(dominant.total)} · {dominant.percentage}% do mês
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <Button
            variant="ghost"
            label="Ver Vilão do Mês →"
            onClick={() => {
              void navigate(ROUTES.VILAO)
            }}
            className="border-none bg-(--color-text) p-1 text-white hover:bg-[oklch(0.55_0.07_142.9)]"
          />
        </div>
      </div>
    </div>
  )
}
