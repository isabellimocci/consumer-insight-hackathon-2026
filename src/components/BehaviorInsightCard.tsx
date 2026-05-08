import type React from 'react'

interface BehaviorInsightCardProps {
  icon: string | React.ReactElement
  title: string
  description: string
}

export function BehaviorInsightCard({ icon, title, description }: BehaviorInsightCardProps) {
  return (
    <div className="bg-primary p-md flex items-start gap-3 rounded-2xl">
      <div className="bg-surface flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-2 text-lg">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-text text-(length:--font-size-base) font-bold">{title}</span>
        <span className="text-(length:--font-size-sm) text-(--color-inactive-text)">
          {description}
        </span>
      </div>
    </div>
  )
}
