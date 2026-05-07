import { useMonth } from '@contexts/useMonth'

import { cn } from './lib/utils'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-').map(Number)
  const label = monthFormatter.format(new Date(year, month - 1))
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export const MonthSelector: React.FC = () => {
  const { selectedMonth, setSelectedMonth, availableMonths } = useMonth()

  return (
    <nav
      aria-label="Selecionar mês"
      className={cn(
        'flex gap-[var(--spacing-sm)] overflow-x-auto',
        'scrollbar-hide', // Hide scrollbar if available
      )}
    >
      {availableMonths.map((month) => {
        const isActive = month === selectedMonth
        const baseClasses =
          'inline-flex items-center justify-center rounded-[var(--spacing-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-size-sm)] cursor-pointer transition-all duration-200 whitespace-nowrap border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-success)]'

        const stateClasses = isActive
          ? 'bg-[var(--color-success)] text-[var(--color-text)] border-transparent'
          : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--border)] hover:bg-[var(--color-bg)]'

        return (
          <button
            type="button"
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={cn(baseClasses, stateClasses)}
            aria-current={isActive ? 'true' : undefined}
          >
            {formatMonth(month)}
          </button>
        )
      })}
    </nav>
  )
}
