import { Button } from '@components/ui/button'

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
    'inline-flex items-center justify-center rounded-[var(--spacing-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-size-sm)] cursor-pointer transition-all duration-200'

  const stateClasses = isActive
    ? 'bg-[var(--color-success)] text-[var(--color-text)]'
    : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--border)] hover:bg-[var(--color-bg)]'

  const finalClasses = cn(baseClasses, stateClasses, className)

  return (
    <Button className={finalClasses} aria-label={ariaLabel} onClick={onClick}>
      {icon} {label}
    </Button>
  )
}
