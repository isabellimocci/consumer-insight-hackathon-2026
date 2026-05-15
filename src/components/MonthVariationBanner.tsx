import { cn } from '@components/lib/utils'
import { useBudget } from '@contexts/useBudget'
import { formatCurrency } from '@utils/formatters'
import { ROUTES } from '@utils/routes'
import { Link } from 'react-router-dom'

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
  const { isConfigured } = useBudget()
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
        'px-md py-md gap-sm flex items-center justify-between rounded-2xl bg-[#1F2A1E]',
        className,
      )}
    >
      <div className="flex flex-col justify-between">
        <div className="">
          <p className="shrink-0 pb-1 text-xs font-semibold text-gray-400 uppercase">
            Total gasto no mês
          </p>
          <p className="text-xl font-bold text-white md:text-4xl">{formatCurrency(currentTotal)}</p>
          {totalBudget !== undefined && (
            <p className="text-sm text-white/40">de {formatCurrency(totalBudget)} planejados</p>
          )}
        </div>
        {!isConfigured && (
          <Link
            to={ROUTES.ORCAMENTO}
            className="mt-3 shrink-0 rounded-sm bg-[#364935] px-3 py-2 text-(--color-primary) transition-all hover:bg-[#486147]"
          >
            Configure seu orçamento →
          </Link>
        )}
      </div>

      {prevMonthName && (
        <div className={cn('flex flex-col items-center rounded-xl px-4 py-3', badgeBg)}>
          <p className="text-sm font-bold">
            {variationSign} {Math.abs(variationPercent).toFixed(1)}%
          </p>
          <p className="text-xs">vs {prevMonthName}</p>
        </div>
      )}
    </div>
  )
}
