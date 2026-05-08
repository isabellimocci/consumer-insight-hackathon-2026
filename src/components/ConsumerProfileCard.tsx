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
    <div className="px-md py-md flex flex-col items-center gap-3 rounded-2xl bg-[#1F2A1E] text-center">
      <p className="text-xs text-white/50 uppercase">Seu arquétipo</p>
      <span style={{ fontSize: '3rem' }} aria-hidden="true">
        {profile.emoji}
      </span>
      <span className="text-(length:--font-size-lg) font-bold text-white">{profile.archetype}</span>
      <span className="text-sm leading-snug text-white/70">{profile.description}</span>
      {showCommitted && (
        <p className="text-xs text-white/50">
          Renda: {formatCurrency(income)} | Comprometida: {Math.round((totalSpent / income) * 100)}%
        </p>
      )}
    </div>
  )
}
