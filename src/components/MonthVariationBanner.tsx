import { cn } from '@components/lib/utils'
import { formatCurrency } from '@utils/formatters'

interface MonthVariationBannerProps {
  currentTotal: number
  previousTotal: number
  variationPercent: number
  previousMonth: string | null
  totalBudget?: number
  className?: string
}

export function MonthVariationBanner({
  currentTotal,
  variationPercent,
  previousMonth,
  totalBudget,
  className,
}: MonthVariationBannerProps) {
  const prevMonthName = previousMonth
    ? new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
        new Date(Number(previousMonth.split('-')[0]), Number(previousMonth.split('-')[1]) - 1, 1),
      )
    : null

  const bgClass =
    variationPercent < -5
      ? 'bg-highlight'
      : variationPercent > 5
        ? 'bg-(--color-danger-bg)'
        : 'bg-(--color-inactive-bg)'

  const variationSign = variationPercent > 0 ? '↑' : variationPercent < 0 ? '↓' : '→'
  const variationColor =
    variationPercent > 5
      ? 'text-danger'
      : variationPercent < -5
        ? 'text-success'
        : 'text-(--color-inactive-text)'

  const isOverBudget = totalBudget !== undefined && currentTotal > totalBudget
  const totalTextColor = isOverBudget ? 'text-danger' : 'text-text'

  return (
    <div
      aria-live="polite"
      className={cn(
        bgClass,
        'px-md py-md flex items-center justify-between rounded-2xl',
        className,
      )}
    >
      <div>
        <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">Total do mês</p>
        <p className={`text-(length:--font-size-xl) font-bold ${totalTextColor}`}>
          {formatCurrency(currentTotal)}
        </p>
        {totalBudget !== undefined && (
          <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
            Orçado: {formatCurrency(totalBudget)}
          </p>
        )}
      </div>

      {prevMonthName && (
        <div className="text-right">
          <p className={`text-(length:--font-size-base) font-bold ${variationColor}`}>
            {variationSign} {Math.abs(variationPercent).toFixed(1)}%
          </p>
          <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
            vs {prevMonthName}
          </p>
        </div>
      )}
    </div>
  )
}
