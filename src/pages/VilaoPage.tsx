import { Button } from '@components/Button'
import { EconomyRecommendationCard } from '@components/EconomyRecommendationCard'
import { MonthSelector } from '@components/MonthSelector'
import { VilaoHeroCard } from '@components/VilaoHeroCard'
import { VilaoHistoryChart } from '@components/VilaoHistoryChart'
import { VilaoNarrativeCopy } from '@components/VilaoNarrativeCopy'
import { VilaoVazio } from '@components/VilaoVazio'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getAvailableMonths, getTransactionsByMonth } from '@services/transactionService'
import { getTotalByCategory } from '@utils/aggregations'
import { getEconomyCopy } from '@utils/copy'
import { getEconomyRecommendation, getVilaoDoMes } from '@utils/insights'
import { ROUTES } from '@utils/routes'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VilaoPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured } = useBudget()
  const navigate = useNavigate()

  const availableMonths = useMemo(() => getAvailableMonths(), [])

  const previousMonth = useMemo(() => {
    const idx = availableMonths.indexOf(selectedMonth)
    return idx > 0 ? availableMonths[idx - 1] : null
  }, [selectedMonth, availableMonths])

  const previousTxs = useMemo(
    () => (previousMonth ? getTransactionsByMonth(previousMonth) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previousMonth, transactionsVersion],
  )

  const vilaoResult = useMemo(
    () => (currentBudget ? getVilaoDoMes(currentBudget, previousTxs) : null),
    [currentBudget, previousTxs],
  )

  const economyRec = useMemo(
    () => (vilaoResult ? getEconomyRecommendation(vilaoResult) : null),
    [vilaoResult],
  )

  const vilaoPhrase = useMemo(
    () => (vilaoResult ? getEconomyCopy(vilaoResult.category, vilaoResult.growthPercent) : null),
    [vilaoResult],
  )

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableMonths, selectedMonth, vilaoResult, transactionsVersion])

  if (!isConfigured) {
    return (
      <div
        className="gap-md px-md py-lg mx-auto flex max-w-2xl flex-col items-center"
        aria-live="polite"
      >
        <p className="text-(length:--font-size-lg) text-(--color-inactive-text)">
          Configure seu orçamento primeiro para identificar o vilão do mês.
        </p>
        <Button
          variant="primary"
          label="Configurar orçamento"
          onClick={() => void navigate(ROUTES.ORCAMENTO)}
          ariaLabel="Ir para configuração de orçamento"
        />
      </div>
    )
  }

  if (!vilaoResult || !economyRec) {
    return <VilaoVazio />
  }

  return (
    <div className="gap-md px-md py-lg mx-auto flex max-w-2xl flex-col" aria-live="polite">
      <span className="flex items-center">
        <MonthSelector />
      </span>
      <VilaoHeroCard vilao={vilaoResult} />
      <VilaoNarrativeCopy copy={vilaoPhrase ?? ''} category={vilaoResult.category} />
      <VilaoHistoryChart
        category={vilaoResult.category}
        monthlyTotals={monthlyTotals}
        selectedMonth={selectedMonth}
        targetAmount={vilaoResult.targetAmount}
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
