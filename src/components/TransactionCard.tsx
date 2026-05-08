import { Card } from '@components/Card'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency, formatDate } from '@utils/formatters'

import type { Transaction } from '../types'

interface TransactionCardProps {
  transaction: Transaction
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { category, description, date, amount } = transaction
  const icon = CATEGORY_ICONS[category]
  const color = CATEGORY_COLORS[category]

  return (
    <Card
      ariaLabel={`Transação: ${description}, ${formatCurrency(amount)}, ${formatDate(date)}`}
      className="gap-[var(--spacing-sm)]"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
        style={{ backgroundColor: color + '25' }}
      >
        {icon}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between">
        <span className="truncate pt-2 font-medium text-[var(--color-text)]">{description}</span>
        <span className="text-[var(--color-inactive-text)] text-[var(--font-size-sm)]">
          {formatDate(date)}
        </span>
      </div>
      <span className="shrink-0 font-semibold text-[var(--color-text)]">
        {formatCurrency(amount)}
      </span>
    </Card>
  )
}
