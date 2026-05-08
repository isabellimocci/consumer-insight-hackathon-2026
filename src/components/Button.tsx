import { Button as SButton } from '@components/ui/button'

import { cn } from './lib/utils'

interface ButtonProps {
  variant: 'primary' | 'ghost'
  label: string
  icon?: React.ReactNode
  onClick: () => void
  ariaLabel?: string
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  label,
  icon,
  onClick,
  ariaLabel,
  className,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex justify-center items-center px-lg py-md text-text font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-75'
  const variantClasses =
    variant === 'primary'
      ? 'bg-surface hover:bg-success'
      : 'bg-(--color-inactive-bg) text-(--color-inactive-text) hover:bg-(--color-inactive-bg-dark) border border-primary disabled:opacity-75'

  const finalClasses = cn(baseClasses, variantClasses, className)

  return (
    <SButton
      aria-label={ariaLabel}
      className={finalClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon} {label}
    </SButton>
  )
}
