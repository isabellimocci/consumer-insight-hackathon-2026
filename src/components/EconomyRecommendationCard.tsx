import { Card } from '@components/Card'
import { formatCurrency } from '@utils/formatters'
import { HiOutlineLightBulb } from 'react-icons/hi'

import type { EconomyRecommendation } from '../types'

interface EconomyRecommendationCardProps {
  recommendation: EconomyRecommendation
}

export function EconomyRecommendationCard({ recommendation }: EconomyRecommendationCardProps) {
  return (
    <Card variant="highlight" ariaLabel="Recomendação de economia">
      <div className="gap-sm flex flex-col" aria-live="polite">
        <div className="flex justify-between">
          <p className="text-text flex text-2xl">{recommendation.copy}</p>
          <HiOutlineLightBulb size={35} className="text-[#40a017]" />
        </div>
        <p className="gap-xs flex items-baseline">
          <span className="text-success text-(length:--font-size-xl) font-bold">
            {formatCurrency(recommendation.savingsAmount)}
          </span>
          <span className="text-(length:--font-size-sm) text-(--color-inactive-text)">/mês</span>
        </p>
      </div>
    </Card>
  )
}
