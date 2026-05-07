import { Badge as SBadge } from '@components/ui/badge'

import { cn } from './lib/utils'

interface BadgeProps {
  label: string
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
    'inline-flex items-center justify-center rounded-[var(--spacing-sm)] text-[var(--color-text)] font-medium px-[var(--spacing-xs)] py-[var(--spacing-xs)] whitespace-nowrap'

  const colorClasses =
    color === 'danger'
      ? 'text-[var(--color-primary)] bg-[var(--color-danger)]'
      : color === 'success'
        ? 'bg-[var(--color-success)] text-[var(--color-surface)]'
        : color === 'warning'
          ? 'bg-[var(--color-warning)] text-[var(--color-text)]'
          : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--border)] hover:bg-[var(--color-bg)]'

  const sizeClasses =
    size === 'md'
      ? 'text-[var(--font-size-base)] px-[var(--spacing-sm)]'
      : 'text-[var(--font-size-md)] px-[var(--spacing-xs)]'

  const finalClasses = cn(baseClasses, sizeClasses, colorClasses, className)
  return (
    <SBadge aria-label={ariaLabel} className={finalClasses} {...props}>
      {label}
    </SBadge>
  )
}
