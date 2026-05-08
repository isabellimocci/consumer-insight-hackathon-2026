import { Card } from '@components/Card'
import { formatCurrency } from '@utils/formatters'

import type { EconomyRecommendation } from '../types'

interface EconomyRecommendationCardProps {
  recommendation: EconomyRecommendation
}

export function EconomyRecommendationCard({ recommendation }: EconomyRecommendationCardProps) {
  return (
    <Card variant="highlight" ariaLabel="Recomendação de economia">
      <div className="gap-sm flex flex-col" aria-live="polite">
        <p className="text-text text-(length:--font-size-base)">💡 {recommendation.copy}</p>
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
