import { Button } from '@components/Button'
import { EconomyRecommendationCard } from '@components/EconomyRecommendationCard'
import { VilaoHeroCard } from '@components/VilaoHeroCard'
import { VilaoHistoryChart } from '@components/VilaoHistoryChart'
import { VilaoNarrativeCopy } from '@components/VilaoNarrativeCopy'
import { useMonth } from '@contexts/useMonth'
import { getAvailableMonths, getTransactionsByMonth } from '@services/transactionService'
import { getTotalByCategory } from '@utils/aggregations'
import { getEconomyCopy } from '@utils/copy'
import { getEconomyRecommendation, getVilaoDoMes } from '@utils/insights'
import { ROUTES } from '@utils/routes'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VilaoPage() {
  const { selectedMonth } = useMonth()
  const navigate = useNavigate()

  const availableMonths = useMemo(() => getAvailableMonths(), [])

  const previousMonth = useMemo(() => {
    const idx = availableMonths.indexOf(selectedMonth)
    return idx > 0 ? availableMonths[idx - 1] : null
  }, [selectedMonth, availableMonths])

  const currentTxs = useMemo(() => getTransactionsByMonth(selectedMonth), [selectedMonth])
  const previousTxs = useMemo(
    () => (previousMonth ? getTransactionsByMonth(previousMonth) : []),
    [previousMonth],
  )

  const vilaoResult = useMemo(
    () => getVilaoDoMes(currentTxs, previousTxs),
    [currentTxs, previousTxs],
  )

  const economyRec = useMemo(
    () => (vilaoResult ? getEconomyRecommendation(vilaoResult) : null),
    [vilaoResult],
  )

  const vilaoPhrase = useMemo(() => (vilaoResult ? getEconomyCopy(vilaoResult.category, vilaoResult.growthPercent) : null), [vilaoResult])

  const monthlyTotals = useMemo(() => {
    if (!vilaoResult) return []
    const idx = availableMonths.indexOf(selectedMonth)
    const slice = availableMonths.slice(Math.max(0, idx - 2), idx + 1)
    return slice.map((month) => {
      const txs = getTransactionsByMonth(month)
      const totals = getTotalByCategory(txs)
      const found = totals.find((t) => t.category === vilaoResult.category)
      return { month, total: found?.total ?? 0 }
    })
  }, [availableMonths, selectedMonth, vilaoResult])

  if (!vilaoResult || !economyRec) {
    return (
      <div
        className="mx-auto flex max-w-2xl flex-col items-center gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-lg)]"
        aria-live="polite"
      >
        <p className="text-[length:var(--font-size-lg)] text-[var(--color-inactive-text)]">
          Nenhum dado disponível para este mês.
        </p>
      </div>
    )
  }

  return (
    <div
      className="mx-auto flex max-w-2xl flex-col gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-lg)]"
      aria-live="polite"
    >
      <VilaoHeroCard vilao={vilaoResult} />
      <VilaoNarrativeCopy copy={vilaoPhrase} category={vilaoResult.category} />
      <VilaoHistoryChart
        category={vilaoResult.category}
        monthlyTotals={monthlyTotals}
        selectedMonth={selectedMonth}
      />
      <EconomyRecommendationCard recommendation={economyRec} />
      <Button
        variant="ghost"
        label={`Ver todos os gastos em ${vilaoResult.category} →`}
        onClick={() => {
          void navigate(
            `${ROUTES.TRANSACOES}?categoria=${encodeURIComponent(vilaoResult.category)}`,
          )
        }}
        ariaLabel={`Ver todas as transações de ${vilaoResult.category}`}
      />
    </div>
  )
}
