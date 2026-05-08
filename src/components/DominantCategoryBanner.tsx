import { Button } from '@components/Button'
import { CATEGORY_COLORS } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'
import { ROUTES } from '@utils/routes'
import {
  PiBookOpenLight,
  PiBusLight,
  PiDeviceMobileLight,
  PiForkKnifeLight,
  PiGameControllerLight,
  PiHeartbeatLight,
  PiShoppingBagLight,
} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import type { CategoryTotal } from '../types'

interface DominantCategoryBannerProps {
  dominant: CategoryTotal
  percentage: number
}

export function DominantCategoryBanner({ dominant, percentage }: DominantCategoryBannerProps) {
  const navigate = useNavigate()

  const iconsCategory = {
    Alimentação: (
      <PiForkKnifeLight
        size={30}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
    Transporte: (
      <PiBusLight
        size={35}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
    Lazer: (
      <PiGameControllerLight
        size={30}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
    Assinaturas: (
      <PiDeviceMobileLight
        size={30}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
    Compras: (
      <PiShoppingBagLight
        size={30}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
    Saúde: (
      <PiHeartbeatLight
        size={30}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
    Educação: (
      <PiBookOpenLight
        size={30}
        style={{
          color: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 100%, transparent`,
        }}
      />
    ),
  }

  return (
    <div
      className="p-md flex justify-between rounded-2xl text-(--color-text)"
      style={{
        backgroundColor: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 40%, transparent`,
      }}
    >
      <div className="gap-sm flex items-center">
        <div
          className="flex justify-center rounded-full p-2"
          style={{
            backgroundColor: ` color-mix(in srgb, ${CATEGORY_COLORS[dominant.category]} 30%, #f3f3f3 60%`,
          }}
        >
          <span className="text-4xl">{iconsCategory[dominant.category]}</span>
        </div>
        <div className="flex-1">
          <p className="text-(length:--font-size-base) font-semibold text-[#374636]">
            {dominant.category} foi sua maior categoria
          </p>
          <p className="text-(length:--font-size-sm) text-gray-600">
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
          className="bg-(--color-primary) p-1 hover:bg-[#e0f7df]"
        />
      </div>
    </div>
  )
}
