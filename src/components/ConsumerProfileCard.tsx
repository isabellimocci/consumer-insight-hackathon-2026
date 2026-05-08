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
    <div className="bg-surface px-lg py-lg flex flex-col items-center gap-3 rounded-3xl text-center">
      <p className="text-(--color-inactive-text) uppercase">Seu arquétipo</p>
      <span style={{ fontSize: '4rem' }} aria-hidden="true">
        {profile.emoji}
      </span>
      <span className="text-text text-(length:--font-size-xl) font-bold">{profile.archetype}</span>
      <span className="text-(length:--font-size-base) leading-snug text-(--color-inactive-text)">
        {profile.description}
      </span>
      {showCommitted && (
        <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
          Renda: {formatCurrency(income)} | Comprometida: {Math.round((totalSpent / income) * 100)}%
        </p>
      )}
    </div>
  )
}
