import { Card } from '@components/Card'
import { CategoryCard } from '@components/CategoryCard'
import { DominantCategoryBanner } from '@components/DominantCategoryBanner'
import { DonutChart } from '@components/DonutChart'
import { MonthSelector } from '@components/MonthSelector'
import { MonthVariationBanner } from '@components/MonthVariationBanner'
import { TopCategoryCard } from '@components/TopCategoryCard'
import { useMonth } from '@contexts/useMonth'
import { getAvailableMonths, getTransactionsByMonth } from '@services/transactionService'
import { compareTwoMonths, getPercentageByCategory } from '@utils/aggregations'
import { getDominantCategory } from '@utils/insights'
import { useMemo } from 'react'

export default function DashboardPage() {
  const { selectedMonth } = useMonth()

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

  const cardData = useMemo(
    () =>
      percentages.map((p) => {
        const comp = comparisons.find((c) => c.category === p.category)
        return {
          category: p.category,
          total: p.total,
          percentage: p.percentage,
          trend: comp?.trend ?? ('stable' as const),
          variationPercent: comp?.variationPercent ?? 0,
        }
      }),
    [percentages, comparisons],
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
            <MonthVariationBanner
              currentTotal={currentTotal}
              previousTotal={previousTotal}
              variationPercent={totalVariation}
              previousMonth={previousMonth}
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

        <DonutChart data={percentages} />

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
        <Card children={undefined} />
      </section>
    </div>
  )
}
