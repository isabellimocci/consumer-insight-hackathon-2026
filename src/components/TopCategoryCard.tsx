import { formatCurrency } from '@utils/formatters'
import { useEffect, useState } from 'react'
import { PiCrownSimpleLight } from 'react-icons/pi'

import type { Category } from '../types'

interface TopCategoryCardProps {
  category: Category
  total: number
  rank: 1 | 2 | 3
  maxTotal: number
}

export function TopCategoryCard({ category, total, rank, maxTotal }: TopCategoryCardProps) {
  const progressWidth = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0
  const isFirst = rank === 1

  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(progressWidth), 100)
    return () => clearTimeout(timer)
  }, [progressWidth])

  return (
    <div
      className="gap-sm p-md flex cursor-default flex-col rounded-2xl transition-all duration-200 ease-out select-none"
      style={{
        flex: isFirst ? '1.3 1 0%' : '1 1 0%',
        background: isFirst
          ? 'linear-gradient(145deg, var(--color-surface) 0%, var(--color-success) 100%)'
          : 'linear-gradient(145deg, var(--color-primary) 0%, var(--color-surface) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isFirst ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid var(--color-surface)',
        boxShadow: isFirst
          ? '0 12px 40px rgba(67, 107, 68, 0.35), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '0 4px 16px rgba(67, 107, 68, 0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
      aria-label={`${rank}º maior categoria: ${category}, ${formatCurrency(total)}`}
    >
      <div className="flex justify-center">
        <PiCrownSimpleLight
          size={isFirst ? 42 : 22}
          style={{
            color: isFirst ? 'var(--color-text)' : 'var(--color-success)',
            filter: isFirst ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' : 'none',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p
          className="text-(length:--font-size-sm)"
          style={{ color: isFirst ? 'var(--color-text)' : 'var(--color-inactive-text)' }}
        >
          {category}
        </p>
        <p
          className="text-(length:--font-size-lg) font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          {formatCurrency(total)}
        </p>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
      >
        <div
          role="progressbar"
          aria-valuenow={progressWidth}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${category}: ${progressWidth}% relativo ao maior gasto`}
          className="h-full rounded-full"
          style={{
            width: `${animatedWidth}%`,
            backgroundColor: isFirst ? 'var(--color-text)' : 'var(--color-success)',
            transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  )
}
