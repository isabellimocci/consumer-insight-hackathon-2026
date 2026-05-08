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
  children?: React.ReactNode
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
  const baseClasses = 'flex bg-primary py-md px-sm rounded-sm text-text'
  const variantClasses =
    variant === 'highlight' ? 'bg-highlight' : variant === 'alert' ? 'bg-warning' : ''
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
