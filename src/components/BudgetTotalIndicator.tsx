interface BudgetTotalIndicatorProps {
  total: number
}

const BG: Record<string, string> = {
  success: 'color-mix(in srgb, var(--color-success) 15%, transparent)',
  warning: 'color-mix(in srgb, var(--color-warning) 25%, transparent)',
  danger: 'color-mix(in srgb, var(--color-danger) 15%, transparent)',
}

const FG: Record<string, string> = {
  success: 'var(--color-success)',
  warning: 'var(--color-text)',
  danger: 'var(--color-danger)',
}

export function BudgetTotalIndicator({ total }: BudgetTotalIndicatorProps) {
  const isExact = total === 100
  const isClose = total >= 95 && total <= 105 && !isExact
  const variant = isExact ? 'success' : isClose ? 'warning' : 'danger'

  const message = isExact
    ? 'Perfeito! Total alocado.'
    : total < 100
      ? `Faltam ${100 - total}% para distribuir`
      : `Reduza ${total - 100}% para continuar`

  return (
    <div
      aria-live="polite"
      className="px-sm py-xs flex items-center justify-between rounded-xl"
      style={{ backgroundColor: BG[variant], transition: 'all 150ms ease' }}
    >
      <span className="text-xs font-medium" style={{ color: FG[variant] }}>
        {message}
      </span>
      <span className="text-lg font-bold" style={{ color: FG[variant] }}>
        {total}%
      </span>
    </div>
  )
}
