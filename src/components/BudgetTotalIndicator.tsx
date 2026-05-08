interface BudgetTotalIndicatorProps {
  total: number
}

export function BudgetTotalIndicator({ total }: BudgetTotalIndicatorProps) {
  const isExact = total === 100
  const isClose = total >= 95 && total <= 105 && !isExact
  const color = isExact
    ? 'var(--color-success)'
    : isClose
      ? 'var(--color-warning)'
      : 'var(--color-danger)'

  const message = isExact
    ? 'Perfeito! Total alocado: 100%'
    : total < 100
      ? `Total alocado: ${total}% — faltam ${100 - total}% para distribuir`
      : `Total alocado: ${total}% — reduza ${total - 100}% para continuar`

  return (
    <div
      aria-live="polite"
      className="px-sm py-xs rounded-xl text-center text-(length:--font-size-sm) font-medium"
      style={{
        color,
        backgroundColor: color + '1A',
        transition: 'all 150ms ease',
      }}
    >
      {message}
    </div>
  )
}
