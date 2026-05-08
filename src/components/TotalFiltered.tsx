import { formatCurrency } from '@utils/formatters'

import type { Category } from '../types'

interface TotalFilteredProps {
  filteredTotal: number
  monthTotal: number
  selectedCategory: Category | null
  targetAmount?: number
}

export const TotalFiltered: React.FC<TotalFilteredProps> = ({
  filteredTotal,
  monthTotal,
  selectedCategory,
  targetAmount,
}) => {
  const percentage = monthTotal > 0 ? Math.round((filteredTotal / monthTotal) * 1000) / 10 : 0

  if (selectedCategory !== null && targetAmount !== undefined) {
    const balance = targetAmount - filteredTotal
    const isOver = balance < 0
    return (
      <div
        aria-live="polite"
        className="pt-md border-t border-(--border) text-(length:--font-size-sm)"
      >
        <span className="text-(--color-inactive-text)">
          {selectedCategory}: {formatCurrency(filteredTotal)} de {formatCurrency(targetAmount)}
        </span>
        {' | '}
        <span className={isOver ? 'text-danger' : 'text-success'}>
          {formatCurrency(Math.abs(balance))} {isOver ? 'acima da meta' : 'disponível'}
        </span>
      </div>
    )
  }

  if (selectedCategory === null && targetAmount !== undefined) {
    return (
      <div
        aria-live="polite"
        className="pt-md border-t border-(--border) text-(length:--font-size-sm) text-(--color-inactive-text)"
      >
        <span>Total do mês: {formatCurrency(filteredTotal)}</span>
        {' | '}
        <span>Orçado: {formatCurrency(targetAmount)}</span>
      </div>
    )
  }

  return (
    <div
      aria-live="polite"
      className="pt-md border-t border-(--border) text-(length:--font-size-sm) text-(--color-inactive-text)"
    >
      {selectedCategory === null ? (
        <span>Total do mês: {formatCurrency(filteredTotal)}</span>
      ) : (
        <span>
          {selectedCategory}: {formatCurrency(filteredTotal)} ({percentage}% do mês)
        </span>
      )}
    </div>
  )
}
