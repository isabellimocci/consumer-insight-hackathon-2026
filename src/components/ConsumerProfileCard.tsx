import { formatCurrency } from '@utils/formatters'

import type { ConsumerProfile } from '../types'

interface ConsumerProfileCardProps {
  profile: ConsumerProfile
  income?: number
  totalSpent?: number
}

export function ConsumerProfileCard({ profile, income, totalSpent }: ConsumerProfileCardProps) {
  const showCommitted = income !== undefined && income > 0 && totalSpent !== undefined

  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl bg-[var(--color-surface)] px-[var(--spacing-md)] py-[var(--spacing-lg)] text-center">
      <span style={{ fontSize: '4rem' }} aria-hidden="true">
        {profile.emoji}
      </span>
      <span className="text-[length:var(--font-size-xl)] font-bold text-[var(--color-text)]">
        {profile.archetype}
      </span>
      <span className="text-[length:var(--font-size-base)] leading-snug text-[var(--color-inactive-text)]">
        {profile.description}
      </span>
      {showCommitted && (
        <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
          Renda: {formatCurrency(income)} | Comprometida: {Math.round((totalSpent / income) * 100)}%
        </p>
      )}
    </div>
  )
}
