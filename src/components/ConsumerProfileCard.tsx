import type { ConsumerProfile } from '../types'

interface ConsumerProfileCardProps {
  profile: ConsumerProfile
}

export function ConsumerProfileCard({ profile }: ConsumerProfileCardProps) {
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
    </div>
  )
}
