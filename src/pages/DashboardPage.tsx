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
import { useMemo } from 'react'

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
    <div
      className="flex h-full flex-col gap-4 overflow-y-auto px-4 pb-8 md:overflow-hidden md:px-6"
      aria-live="polite"
    >
      {/* Saudação — com espaçamento superior para respirar abaixo do top bar */}
      <div className="mt-4 flex shrink-0 items-center gap-3">
        <img
          src="https://placecats.com/bella/200/200"
          alt="Avatar"
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-(--color-text)">Olá, {name} 👋</h1>
          <p className="text-sm text-(--color-inactive-text)">Seu {mesAtual} em uma olhada.</p>
        </div>
      </div>

      {/* Main layout: left (3/5) + right (2/5) */}
      <div className="flex flex-1 flex-col gap-6 lg:min-h-0 lg:flex-row lg:overflow-hidden">
        {/* Left column */}
        <section className="flex flex-col gap-6 lg:min-h-0 lg:flex-[3]">
          {/* Row 1: dark total card + donut chart */}
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-1">
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
              <p className="shrink-0 text-xs font-semibold tracking-wide text-(--color-inactive-text) uppercase">
                Distribuição
              </p>
              <div className="flex min-h-[180px] flex-1 items-center justify-center rounded-2xl bg-(--color-primary) p-4 sm:min-h-[220px]">
                <DonutChart
                  data={percentages}
                  totalBudget={isConfigured ? totalBudget : undefined}
                />
              </div>
            </div>
          </div>

          {/* Row 2: últimos lançamentos — scrollable */}
          <section className="flex flex-col lg:min-h-0 lg:flex-1 lg:overflow-hidden">
            <UltimosLancamentos month={selectedMonth} />
          </section>
        </section>

        {/* Right column — category list, 1 column, scrollable */}
        <section
          aria-label="Gastos por categoria"
          className="flex flex-col border-t border-(--color-surface) pt-4 lg:min-h-0 lg:flex-[2] lg:overflow-hidden lg:border-none lg:pt-0"
        >
          <p className="mb-2 shrink-0 text-xs font-semibold tracking-wide text-(--color-inactive-text) uppercase">
            Por categoria · {cardData.length} ativas
          </p>
          <ul
            role="list"
            className="flex flex-col gap-1.5 pb-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pb-8"
          >
            {cardData.map((card) => (
              <li key={card.category} role="listitem">
                <CategoryCard {...card} isVilao={card.category === vilao?.category} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
