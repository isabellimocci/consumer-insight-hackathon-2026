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
    <div className="gap-xs flex flex-col">
      <span className="tracking-wide text-(--color-inactive-text) text-(--font-size-sm) uppercase">
        {monthLabel}
      </span>
      <span className="text-text font-bold text-(--font-size-xl)">
        {formatCurrency(totalAmount)}
      </span>
      <span className="text-(--color-inactive-text) text-(--font-size-sm)">
        {transactionCount} transações
      </span>
    </div>
  )
}
