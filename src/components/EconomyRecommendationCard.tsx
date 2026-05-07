import { Card } from '@components/Card'
import { formatCurrency } from '@utils/formatters'

import type { EconomyRecommendation } from '../types'

interface EconomyRecommendationCardProps {
  recommendation: EconomyRecommendation
}

export function EconomyRecommendationCard({ recommendation }: EconomyRecommendationCardProps) {
  return (
    <Card variant="highlight" ariaLabel="Recomendação de economia">
      <div className="flex flex-col gap-[var(--spacing-sm)]" aria-live="polite">
        <p className="text-[length:var(--font-size-base)] text-[var(--color-text)]">
          💡 {recommendation.copy}
        </p>
        <p className="flex items-baseline gap-[var(--spacing-xs)]">
          <span className="text-[length:var(--font-size-xl)] font-bold text-[var(--color-success)]">
            {formatCurrency(recommendation.savingsAmount)}
          </span>
          <span className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
            /mês
          </span>
        </p>
      </div>
    </Card>
  )
}
