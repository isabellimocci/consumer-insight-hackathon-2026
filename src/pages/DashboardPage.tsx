import { CategoryCard } from '@components/CategoryCard'
import { DonutChart } from '@components/DonutChart'
import { MonthVariationBanner } from '@components/MonthVariationBanner'
import { UltimosLancamentos } from '@components/UltimosLancamentos'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { useUser } from '@contexts/UserContext'
import { getAvailableMonths, getTransactionsByMonth } from '@services/transactionService'
import { compareTwoMonths, getPercentageByCategory } from '@utils/aggregations'
import { getVilaoDoMes } from '@utils/insights'
import { ROUTES } from '@utils/routes'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured } = useBudget()
  const { name } = useUser()

  const availableMonths = useMemo(() => getAvailableMonths(), [])

  const previousMonth = useMemo(() => {
    const idx = availableMonths.indexOf(selectedMonth)
    return idx > 0 ? availableMonths[idx - 1] : null
  }, [selectedMonth, availableMonths])

  const currentTxs = useMemo(
    () => getTransactionsByMonth(selectedMonth),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMonth, transactionsVersion],
  )
  const previousTxs = useMemo(
    () => (previousMonth ? getTransactionsByMonth(previousMonth) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previousMonth, transactionsVersion],
  )

  const percentages = useMemo(() => getPercentageByCategory(currentTxs), [currentTxs])
  const comparisons = useMemo(
    () => compareTwoMonths(currentTxs, previousTxs),
    [currentTxs, previousTxs],
  )

  const currentTotal = useMemo(() => currentTxs.reduce((s, t) => s + t.amount, 0), [currentTxs])
  const previousTotal = useMemo(() => previousTxs.reduce((s, t) => s + t.amount, 0), [previousTxs])
  const totalVariation = useMemo(() => {
    if (previousTotal === 0) return 0
    return Math.round(((currentTotal - previousTotal) / previousTotal) * 1000) / 10
  }, [currentTotal, previousTotal])

  const totalBudget = useMemo(
    () => currentBudget?.categories.reduce((s, c) => s + c.targetAmount, 0) ?? 0,
    [currentBudget],
  )

  const vilao = useMemo(
    () => (isConfigured && currentBudget ? getVilaoDoMes(currentBudget, previousTxs) : null),
    [isConfigured, currentBudget, previousTxs],
  )

  const cardData = useMemo(
    () =>
      percentages.map((p) => {
        const comp = comparisons.find((c) => c.category === p.category)
        const budgetCat = currentBudget?.categories.find((c) => c.category === p.category)
        return {
          category: p.category,
          total: p.total,
          percentage: p.percentage,
          trend: comp?.trend ?? ('stable' as const),
          variationPercent: comp?.variationPercent ?? 0,
          targetAmount: budgetCat?.targetAmount,
          budgetStatus: budgetCat?.status,
        }
      }),
    [percentages, comparisons, currentBudget],
  )

  const mesAtual = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
        new Date(Number(selectedMonth.split('-')[0]), Number(selectedMonth.split('-')[1]) - 1, 1),
      ),
    [selectedMonth],
  )

  return (
    <div className="px-md mx-6 flex h-full flex-col gap-4 overflow-hidden pb-8" aria-live="polite">
      {/* Saudação — com espaçamento superior para respirar abaixo do top bar */}
      <div className="mt-6 flex shrink-0 items-center gap-3">
        <img
          src="https://placecats.com/bella/200/200"
          alt="Avatar"
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-(--color-text)">Olá, {name} 👋</h1>
          <p className="text-sm text-(--color-inactive-text)">Seu {mesAtual} em uma olhada.</p>
        </div>
      </div>

      {!isConfigured && (
        <Link
          to={ROUTES.ORCAMENTO}
          className="px-sm py-sm shrink-0 rounded-xl bg-(--color-danger-bg) text-(--color-danger) transition-all hover:bg-(--color-highlight)"
        >
          Configure seu orçamento para ver análises completas →
        </Link>
      )}

      {/* Main layout: left (3/5) + right (2/5) */}
      <div className="mt-6 flex min-h-0 flex-1 gap-6 overflow-hidden">
        {/* Left column */}
        <section className="flex min-h-0 flex-3 flex-col gap-8">
          {/* Row 1: dark total card + donut chart */}
          <div className="flex shrink-0 gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <p className="shrink-0 text-sm font-semibold text-(--color-text)">
                Total gasto no mês
              </p>
              <MonthVariationBanner
                currentTotal={currentTotal}
                previousTotal={previousTotal}
                variationPercent={totalVariation}
                previousMonth={previousMonth}
                totalBudget={isConfigured ? totalBudget : undefined}
                className="flex-1"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="shrink-0 text-sm font-semibold text-(--color-text)">Distribuição</p>
              <div className="flex flex-1 items-center justify-center rounded-2xl bg-(--color-primary) p-4">
                <DonutChart
                  data={percentages}
                  totalBudget={isConfigured ? totalBudget : undefined}
                />
              </div>
            </div>
          </div>

          {/* Row 2: últimos lançamentos — scrollable */}
          <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <UltimosLancamentos month={selectedMonth} />
          </section>
        </section>

        {/* Right column — category list, 1 column, scrollable */}
        <section
          aria-label="Gastos por categoria"
          className="flex min-h-0 flex-2 flex-col overflow-hidden"
        >
          <p className="mb-2 shrink-0 text-sm font-semibold text-(--color-text)">
            Por categoria · {cardData.length} ativas
          </p>
          <ul role="list" className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden pb-8">
            {cardData.map((card) => (
              <li key={card.category} role="listitem" className="min-h-0 flex-1">
                <CategoryCard {...card} isVilao={card.category === vilao?.category} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
