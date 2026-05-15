import { Button } from '@components/ui/button'
import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatCurrency, formatDate } from '@utils/formatters'
import { PiPencilSimpleBold, PiTrashSimpleBold } from 'react-icons/pi'

import type { Transaction } from '../types'

interface TransactionCardProps {
  transaction: Transaction
  onEdit?: () => void
  onDelete?: () => void
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const { category, description, date, amount } = transaction
  const IconComponent = CATEGORY_ICONS_PI[category]
  const color = CATEGORY_COLORS[category]

  return (
    <div
      role="article"
      aria-label={`Transação: ${description}, ${formatCurrency(amount)}, ${formatDate(date)}`}
      className="bg-primary px-sm flex items-center gap-2 rounded-2xl py-3.5"
    >
      <section className="flex w-full justify-between">
        <section className="flex max-w-[30%] gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
            style={{ backgroundColor: color + '25' }}
          >
            <IconComponent size={18} style={{ color }} />
          </div>

          <section className="flex max-w-[120px] flex-col gap-1 md:max-w-full">
            <span className="text-text min-w-0 flex-1 truncate text-sm font-medium">
              {description}
            </span>
            <span className="shrink-0 text-xs text-(--color-inactive-text)">
              {formatDate(date)}
            </span>
          </section>
        </section>

        <section className="flex items-center gap-2">
          <span className="text-text shrink-0 text-sm font-semibold">{formatCurrency(amount)}</span>

          <section>
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={onEdit}
                aria-label="Editar transação"
              >
                <PiPencilSimpleBold className="h-3.5 w-3.5" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-red-500 hover:text-red-600"
                onClick={onDelete}
                aria-label="Excluir transação"
              >
                <PiTrashSimpleBold className="h-3.5 w-3.5" />
              </Button>
            )}
          </section>
        </section>
      </section>
    </div>
  )
}
