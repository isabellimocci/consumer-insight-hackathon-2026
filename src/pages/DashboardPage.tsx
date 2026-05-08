import { Card } from '@components/Card'
import { CategoryCard } from '@components/CategoryCard'
import { DominantCategoryBanner } from '@components/DominantCategoryBanner'
import { DonutChart } from '@components/DonutChart'
import { MonthSelector } from '@components/MonthSelector'
import { MonthVariationBanner } from '@components/MonthVariationBanner'
import { TopCategoryCard } from '@components/TopCategoryCard'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getAvailableMonths, getTransactionsByMonth } from '@services/transactionService'
import { compareTwoMonths, getPercentageByCategory } from '@utils/aggregations'
import { getDominantCategory } from '@utils/insights'
import { ROUTES } from '@utils/routes'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured } = useBudget()

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
  const top3Categories = useMemo(() => percentages.slice(0, 3), [percentages])
  const comparisons = useMemo(
    () => compareTwoMonths(currentTxs, previousTxs),
    [currentTxs, previousTxs],
  )
  const dominant = useMemo(() => getDominantCategory(currentTxs), [currentTxs])

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

  const dominantPercentage = useMemo(() => {
    const found = percentages.find((p) => p.category === dominant?.category)
    return found?.percentage ?? 0
  }, [percentages, dominant])

  return (
    <div
      className="mx-10 flex gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-lg)]"
      aria-live="polite"
    >
      <section className="flex flex-2 flex-col">
        <section className="flex gap-5">
          <div className="gap flex flex-1 flex-col">
            <span className="pb-4">
              <MonthSelector />
            </span>

            {!isConfigured && (
              <div className="rounded-2xl bg-[var(--color-danger-bg)] px-[var(--spacing-md)] py-[var(--spacing-sm)]">
                <Link
                  to={ROUTES.ORCAMENTO}
                  className="text-[length:var(--font-size-sm)] text-[var(--color-danger)]"
                >
                  Configure seu orçamento para ver análises completas →
                </Link>
              </div>
            )}

            <MonthVariationBanner
              currentTotal={currentTotal}
              previousTotal={previousTotal}
              variationPercent={totalVariation}
              previousMonth={previousMonth}
              totalBudget={isConfigured ? totalBudget : undefined}
            />
          </div>
          <img src="https://placecats.com/bella/200/200" alt="" />
        </section>

        {top3Categories.length > 0 && (
          <section
            aria-label="Top 3 categorias do mês"
            className="flex items-end gap-[var(--spacing-sm)]"
          >
            {(
              [
                { data: top3Categories[1], rank: 2 as const },
                { data: top3Categories[0], rank: 1 as const },
                { data: top3Categories[2], rank: 3 as const },
              ] as const
            )
              .filter(({ data }) => data != null)
              .map(({ data: item, rank }) => (
                <TopCategoryCard
                  key={item.category}
                  category={item.category}
                  total={item.total}
                  rank={rank}
                  maxTotal={top3Categories[0].total}
                />
              ))}
          </section>
        )}

        <DonutChart data={percentages} totalBudget={isConfigured ? totalBudget : undefined} />

        <section aria-label="Gastos por categoria">
          <ul role="list" className="grid grid-cols-2 gap-[var(--spacing-sm)]">
            {cardData.map((card) => (
              <li key={card.category} role="listitem">
                <CategoryCard {...card} />
              </li>
            ))}
          </ul>
        </section>
        {dominant && <DominantCategoryBanner dominant={dominant} percentage={dominantPercentage} />}
      </section>
      <section className="flex flex-1 flex-col">
        <Card />
      </section>
    </div>
  )
}
