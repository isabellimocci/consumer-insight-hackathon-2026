import { Badge as SBadge } from '@components/ui/badge'

import { cn } from './lib/utils'

interface BadgeProps {
  label: string | React.ReactElement
  color: 'danger' | 'success' | 'warning' | 'neutral'
  size?: 'sm' | 'md'
  className?: string
  ariaLabel?: string
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color,
  size,
  className,
  ariaLabel,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-sm text-text font-medium px-xs py-xs whitespace-nowrap'

  const colorClasses =
    color === 'danger'
      ? 'text-primary bg-danger'
      : color === 'success'
        ? 'bg-success text-white'
        : color === 'warning'
          ? 'bg-warning text-text'
          : 'bg-surface text-text border border-(--border) hover:bg-bg'

  const sizeClasses =
    size === 'md' ? 'text-(--font-size-base) px-sm' : 'text-(--font-size-md) px-xs'

  const finalClasses = cn(baseClasses, sizeClasses, colorClasses, className)
  return (
    <SBadge aria-label={ariaLabel} className={finalClasses} {...props}>
      {label}
    </SBadge>
  )
}
