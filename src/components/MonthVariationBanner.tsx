import { formatCurrency } from '@utils/formatters'

interface MonthVariationBannerProps {
  currentTotal: number
  previousTotal: number
  variationPercent: number
  previousMonth: string | null
}

export function MonthVariationBanner({
  currentTotal,
  variationPercent,
  previousMonth,
}: MonthVariationBannerProps) {
  const prevMonthName = previousMonth
    ? new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
        new Date(Number(previousMonth.split('-')[0]), Number(previousMonth.split('-')[1]) - 1, 1),
      )
    : null

  const bgClass =
    variationPercent < -5
      ? 'bg-[var(--color-highlight)]'
      : variationPercent > 5
        ? 'bg-[var(--color-danger-bg)]'
        : 'bg-[var(--color-inactive-bg)]'

  const variationSign = variationPercent > 0 ? '↑' : variationPercent < 0 ? '↓' : '→'
  const variationColor =
    variationPercent > 5
      ? 'text-[var(--color-danger)]'
      : variationPercent < -5
        ? 'text-[var(--color-success)]'
        : 'text-[var(--color-inactive-text)]'

  return (
    <div
      aria-live="polite"
      className={`${bgClass} flex items-center justify-between rounded-2xl px-[var(--spacing-md)] py-[var(--spacing-md)]`}
    >
      <div>
        <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
          Total do mês
        </p>
        <p className="text-[length:var(--font-size-xl)] font-bold text-[var(--color-text)]">
          {formatCurrency(currentTotal)}
        </p>
      </div>

      {prevMonthName && (
        <div className="text-right">
          <p className={`text-[length:var(--font-size-base)] font-bold ${variationColor}`}>
            {variationSign} {Math.abs(variationPercent).toFixed(1)}%
          </p>
          <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
            vs {prevMonthName}
          </p>
        </div>
      )}
    </div>
  )
}
