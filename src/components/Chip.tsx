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
    'inline-flex items-center justify-center rounded-sm px-sm py-xs text-(--font-size-sm) cursor-pointer transition-all duration-200'

  const stateClasses = isActive
    ? 'bg-success text-text'
    : 'bg-surface text-text border border-(--border) hover:bg-bg'

  const finalClasses = cn(baseClasses, stateClasses, className)

  return (
    <Button className={finalClasses} aria-label={ariaLabel} onClick={onClick}>
      {icon} {label}
    </Button>
  )
}
