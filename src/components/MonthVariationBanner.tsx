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

  const variationSign = variationPercent > 0 ? '↑' : variationPercent < 0 ? '↓' : '→'
  const badgeBg =
    variationPercent > 5
      ? 'bg-red-900/60 text-red-300'
      : variationPercent < -5
        ? 'bg-green-900/60 text-green-300'
        : 'bg-white/10 text-white/60'

  return (
    <div
      aria-live="polite"
      className={cn(
        'px-md py-md flex items-center justify-between rounded-2xl bg-[#1F2A1E]',
        className,
      )}
    >
      <div className="flex flex-col justify-between">
        <p className="text-4xl font-bold text-white">{formatCurrency(currentTotal)}</p>
        {totalBudget !== undefined && (
          <p className="text-sm text-white/40">de {formatCurrency(totalBudget)} planejados</p>
        )}
      </div>

      {prevMonthName && (
        <div className={cn('flex flex-col items-center rounded-xl px-4 py-3', badgeBg)}>
          <p className="text-base font-bold">
            {variationSign} {Math.abs(variationPercent).toFixed(1)}%
          </p>
          <p className="text-xs">vs {prevMonthName}</p>
        </div>
      )}
    </div>
  )
}
