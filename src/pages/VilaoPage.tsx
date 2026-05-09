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
        className="gap-md px-md py-lg mx-auto flex h-[80vh] max-w-2xl flex-col items-center justify-center"
        aria-live="polite"
      >
        <Card
          className="p-20"
          children={
            <div className="flex flex-col items-center gap-5 p-10">
              <TbAlertTriangle size={50} color="#d2ce54" />
              <p className="text-center text-2xl text-(--color-inactive-text)">
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
    <div className="px-md mx-6 flex h-full flex-col gap-4 overflow-hidden pb-8" aria-live="polite">
      <div className="mb-6 flex flex-col items-start">
        <h1 className="text-text text-2xl font-bold">Vilão do mês</h1>
        <span className="text-(--color-inactive-text)">
          A categoria que mais saiu do trilho. Sem julgamento, só fatos.
        </span>
      </div>

      <section className="flex gap-6">
        <div className="flex flex-1 flex-col gap-4">
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
        <div className="flex flex-1 flex-col gap-4">
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
