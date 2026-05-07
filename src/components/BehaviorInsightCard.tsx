interface BehaviorInsightCardProps {
  icon: string
  title: string
  description: string
}

export function BehaviorInsightCard({ icon, title, description }: BehaviorInsightCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[var(--color-primary)] p-[var(--spacing-md)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-lg">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[length:var(--font-size-base)] font-bold text-[var(--color-text)]">
          {title}
        </span>
        <span className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
          {description}
        </span>
      </div>
    </div>
  )
}
