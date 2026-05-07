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
    'inline-flex justify-center items-center px-[var(--spacing-lg)] py-[var(--spacing-md)] text-[var(--color-text)] font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-75'
  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--color-surface)] hover:bg-[var(--color-success)]'
      : 'bg-[var(--color-inactive-bg)] text-[var(--color-inactive-text)] hover:bg-[var(--color-inactive-bg-dark)] border border-[var(--color-primary)] disabled:opacity-75'

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
