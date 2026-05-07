import {
  Card as SCard,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import type React from 'react'

import { cn } from './lib/utils'

interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  action?: React.ReactNode
  className?: string
  ariaLabel?: string
  variant?: 'default' | 'highlight' | 'alert'
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  action,
  className,
  ariaLabel,
  variant,
  ...props
}) => {
  const baseClasses =
    'flex bg-[var(--color-primary)] py-[var(--spacing-md)] px-[var(--spacing-sm)] rounded-[var(--spacing-sm)] text-[var(--color-text)]'
  const variantClasses =
    variant === 'highlight' ? 'bg-green-200' : variant === 'alert' ? 'bg-amber-200' : ''
  const finalClasses = cn(baseClasses, variantClasses, className)

  return (
    <SCard aria-label={ariaLabel ?? title} className={finalClasses} {...props}>
      {(title || description) && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </SCard>
  )
}
