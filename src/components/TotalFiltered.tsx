import { formatCurrency } from '@utils/formatters'

import type { Category } from '../types'

interface TotalFilteredProps {
  filteredTotal: number
  monthTotal: number
  selectedCategory: Category | null
}

export const TotalFiltered: React.FC<TotalFilteredProps> = ({
  filteredTotal,
  monthTotal,
  selectedCategory,
}) => {
  const percentage = monthTotal > 0 ? Math.round((filteredTotal / monthTotal) * 1000) / 10 : 0

  return (
    <div
      aria-live="polite"
      className="border-t border-[var(--border)] pt-[var(--spacing-md)] text-[var(--color-inactive-text)] text-[var(--font-size-sm)]"
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
