import { Badge } from '@components/ui/badge'

import { cn } from './lib/utils'

interface ChipProps {
  label: string
  icon?: string
  isActive: boolean
  onClick: () => void
  className?: string
  ariaLabel?: string
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  isActive,
  onClick,
  className,
  ariaLabel,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-sm)] font-medium cursor-pointer transition-all duration-200'

  const stateClasses = isActive
    ? 'bg-[var(--color-success)] text-[var(--color-text)]'
    : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--border)] hover:bg-[var(--color-bg)]'

  const finalClasses = cn(baseClasses, stateClasses, className)

  return (
    <Badge className={finalClasses} aria-label={ariaLabel} onClick={onClick}>
      {icon} {label}
    </Badge>
  )
}
