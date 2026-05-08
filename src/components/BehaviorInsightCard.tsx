import type React from 'react'

interface BehaviorInsightCardProps {
  icon: string | React.ReactElement
  title: string
  description: string
}

export function BehaviorInsightCard({ icon, title, description }: BehaviorInsightCardProps) {
  return (
    <div className="bg-primary py-sm flex items-start gap-2.5 rounded-xl px-2.5">
      <div className="bg-surface flex size-8 shrink-0 items-center justify-center rounded-full">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-text text-sm font-bold">{title}</span>
        <span className="text-xs text-(--color-inactive-text)">{description}</span>
      </div>
    </div>
  )
}
