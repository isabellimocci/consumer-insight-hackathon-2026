import { BehaviorInsightCard } from '@components/BehaviorInsightCard'
import { ConcentrationInsightCard } from '@components/ConcentrationInsightCard'
import { ConsumerProfileCard } from '@components/ConsumerProfileCard'
import { GrowingCategoryCard } from '@components/GrowingCategoryCard'
import { WeeklyPatternChart } from '@components/WeeklyPatternChart'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getAllMonthsData, getTransactionsByMonth } from '@services/transactionService'
import { getPercentageByCategory, getTotalByCategory } from '@utils/aggregations'
import { formatCurrency, formatMonthLabel } from '@utils/formatters'
import { getConsumerProfile, getGrowingCategory, getWeeklyPattern } from '@utils/insights'
import { useMemo } from 'react'

export default function InsightsPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured, income } = useBudget()

  const allMonthsData = useMemo(() => getAllMonthsData(), [])

  const currentTxs = useMemo(
    () => getTransactionsByMonth(selectedMonth),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMonth, transactionsVersion],
  )

  const profile = useMemo(() => getConsumerProfile(currentTxs), [currentTxs])

  const weeklyPattern = useMemo(() => getWeeklyPattern(currentTxs), [currentTxs])

  const relevantMonths = useMemo(
    () => allMonthsData.filter((m) => m.month <= selectedMonth),
    [allMonthsData, selectedMonth],
  )

  const growingCategory = useMemo(() => getGrowingCategory(relevantMonths), [relevantMonths])

  const dominantPercentage = useMemo(() => {
    const pcts = getPercentageByCategory(currentTxs)
    return pcts[0] ?? null
  }, [currentTxs])

  const mostFrequent = useMemo(() => {
    const totals = getTotalByCategory(currentTxs)
    if (totals.length === 0) return null
    return totals.reduce((max, c) => (c.count > max.count ? c : max), totals[0])
  }, [currentTxs])

  const first2WeeksPct = useMemo(() => {
    const sum = weeklyPattern
      .filter((w) => w.week === 1 || w.week === 2)
      .reduce((acc, w) => acc + w.percentage, 0)
    return Math.round(sum * 10) / 10
  }, [weeklyPattern])

  const avgTicket = useMemo(() => {
    const total = currentTxs.reduce((acc, t) => acc + t.amount, 0)
    return currentTxs.length > 0 ? total / currentTxs.length : 0
  }, [currentTxs])

  const totalSpent = useMemo(() => currentTxs.reduce((s, t) => s + t.amount, 0), [currentTxs])

  const concentrationData = useMemo(() => {
    if (!isConfigured || !dominantPercentage || !currentBudget) {
      return { percentage: dominantPercentage?.percentage ?? 0, budgetMode: false }
    }
    const budgetCat = currentBudget.categories.find(
      (c) => c.category === dominantPercentage.category,
    )
    if (!budgetCat || budgetCat.targetAmount === 0) {
      return { percentage: dominantPercentage.percentage, budgetMode: false }
    }
    return {
      percentage: Math.round((budgetCat.spentAmount / budgetCat.targetAmount) * 1000) / 10,
      budgetMode: true,
    }
  }, [isConfigured, dominantPercentage, currentBudget])

  const healthData = useMemo(() => {
    if (!isConfigured || !currentBudget) return null
    const onTrack = currentBudget.categories.filter((c) => c.status === 'on-track').length
    const total = currentBudget.categories.length
    return { onTrack, total }
  }, [isConfigured, currentBudget])

  const monthLabel = formatMonthLabel(selectedMonth)
  const shortMonth = monthLabel.split(' ')[0]

  return (
    <div
      className="mx-auto flex max-w-2xl flex-col gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-lg)]"
      aria-live="polite"
    >
      <h1 className="text-[length:var(--font-size-lg)] font-bold text-[var(--color-text)]">
        Seus Insights
      </h1>

      <ConsumerProfileCard
        profile={profile}
        income={income?.amount}
        totalSpent={isConfigured ? totalSpent : undefined}
      />

      {dominantPercentage && (
        <ConcentrationInsightCard
          category={dominantPercentage.category}
          percentage={concentrationData.percentage}
          budgetMode={concentrationData.budgetMode}
        />
      )}

      <WeeklyPatternChart pattern={weeklyPattern} />

      <GrowingCategoryCard result={growingCategory} allMonthsData={relevantMonths} />

      {mostFrequent && (
        <section aria-label="Outros comportamentos">
          <h2 className="mb-[var(--spacing-sm)] text-[length:var(--font-size-base)] font-semibold text-[var(--color-text)]">
            Outros comportamentos
          </h2>
          <div className="flex flex-col gap-[var(--spacing-sm)]">
            {healthData && (
              <BehaviorInsightCard
                icon="💚"
                title="Saúde financeira do mês"
                description={`${healthData.onTrack} de ${healthData.total} categorias dentro da meta`}
              />
            )}
            <BehaviorInsightCard
              icon="🔁"
              title="Categoria mais frequente"
              description={`Você fez ${mostFrequent.count} transações de ${mostFrequent.category} em ${shortMonth} — uma média de ${(mostFrequent.count / 4).toFixed(1)} por semana`}
            />
            <BehaviorInsightCard
              icon="📅"
              title="Concentração no início do mês"
              description={`Você gastou ${first2WeeksPct}% do orçamento nas primeiras 2 semanas`}
            />
            <BehaviorInsightCard
              icon="🧾"
              title="Ticket médio por transação"
              description={`Seu gasto médio por transação em ${shortMonth} foi de ${formatCurrency(avgTicket)}`}
            />
          </div>
        </section>
      )}
    </div>
  )
}
