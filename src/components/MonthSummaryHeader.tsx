import { formatCurrency } from '@utils/formatters'

interface MonthSummaryHeaderProps {
  monthLabel: string
  totalAmount: number
  transactionCount: number
}

export const MonthSummaryHeader: React.FC<MonthSummaryHeaderProps> = ({
  monthLabel,
  totalAmount,
  transactionCount,
}) => {
  return (
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <span className="tracking-wide text-[var(--color-inactive-text)] text-[var(--font-size-sm)] uppercase">
        {monthLabel}
      </span>
      <span className="font-bold text-[var(--color-text)] text-[var(--font-size-xl)]">
        {formatCurrency(totalAmount)}
      </span>
      <span className="text-[var(--color-inactive-text)] text-[var(--font-size-sm)]">
        {transactionCount} transações
      </span>
    </div>
  )
}
