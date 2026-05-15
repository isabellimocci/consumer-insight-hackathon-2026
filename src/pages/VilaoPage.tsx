import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { EconomyRecommendationCard } from '@components/EconomyRecommendationCard'
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
import { TbAlertTriangle } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export default function VilaoPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured } = useBudget()
  const navigate = useNavigate()

  const availableMonths = useMemo(
    () => getAvailableMonths(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactionsVersion],
  )

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
        className="gap-md px-md py-lg mx-auto flex h-[80vh] max-w-2xl flex-col items-center justify-center"
        aria-live="polite"
      >
        <Card
          className="p-md md:p-16"
          children={
            <div className="flex flex-col items-center gap-5">
              <TbAlertTriangle size={50} color="#d2ce54" />
              <p className="text-center text-xl text-(--color-inactive-text) md:text-2xl">
                Configure seu orçamento primeiro para identificar o vilão do mês.
              </p>
              <Button
                variant="primary"
                label="Configurar orçamento"
                onClick={() => void navigate(ROUTES.ORCAMENTO)}
                ariaLabel="Ir para configuração de orçamento"
                className="bg-[#364935] px-3 py-2 text-(--color-primary) transition-all hover:bg-[#486147]"
              />
            </div>
          }
        />
      </div>
    )
  }

  if (!vilaoResult || !economyRec) {
    return <VilaoVazio />
  }

  return (
    <div
      className="flex h-full flex-col gap-4 overflow-y-auto px-4 pb-8 md:px-6 lg:overflow-hidden"
      aria-live="polite"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-text text-2xl font-bold">Vilão do mês</h1>
        <span className="text-(--color-inactive-text)">
          A categoria que mais saiu do trilho. Sem julgamento, só fatos.
        </span>
      </div>

      <section className="flex flex-col gap-4 md:gap-5 lg:min-h-0 lg:flex-row lg:gap-6 lg:overflow-hidden">
        <div className="flex flex-col gap-4 lg:flex-1 lg:overflow-y-auto">
          <VilaoHeroCard
            vilao={vilaoResult}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-danger) 20%, transparent)',
            }}
          />
          <VilaoNarrativeCopy copy={vilaoPhrase ?? ''} category={vilaoResult.category} />
          <Button
            variant="ghost"
            label={`Ver todos os gastos em ${vilaoResult.category} →`}
            onClick={() => {
              void navigate(
                `${ROUTES.TRANSACOES}?categoria=${encodeURIComponent(vilaoResult.category)}`,
              )
            }}
            ariaLabel={`Ver todas as transações de ${vilaoResult.category}`}
            className="bg-[#364935] px-3 py-2 text-(--color-primary) transition-all hover:bg-[#486147]"
          />
        </div>
        <div className="flex flex-col gap-4 lg:flex-1 lg:overflow-y-auto">
          <VilaoHistoryChart
            category={vilaoResult.category}
            monthlyTotals={monthlyTotals}
            selectedMonth={selectedMonth}
            targetAmount={vilaoResult.targetAmount}
          />
          <EconomyRecommendationCard recommendation={economyRec} />
        </div>
      </section>
    </div>
  )
}
