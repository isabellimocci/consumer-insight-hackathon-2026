import { Button } from '@components/ui/button'
import type React from 'react'

import { cn } from './lib/utils'

interface ChipProps {
  label: string | React.ReactElement
  icon?: React.ReactNode
  isActive: boolean
  onClick: () => void
  className?: string
  ariaLabel?: string
  style?: React.CSSProperties
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  isActive,
  onClick,
  className,
  ariaLabel,
  style,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-start rounded-lg px-md py-6 text-(--font-size-sm) cursor-pointer transition-all duration-200'

  const stateClasses = isActive
    ? 'bg-success text-text'
    : 'bg-surface text-text border border-(--border) hover:bg-bg'

  const finalClasses = cn(baseClasses, stateClasses, className)

  return (
    <Button
      className={finalClasses}
      aria-label={ariaLabel}
      onClick={onClick}
      style={style}
      {...props}
    >
      {icon} {label}
    </Button>
  )
}
