import { BehaviorInsightCard } from '@components/BehaviorInsightCard'
import { ConcentrationInsightCard } from '@components/ConcentrationInsightCard'
import { ConsumerProfileCard } from '@components/ConsumerProfileCard'
import { DominantCategoryBanner } from '@components/DominantCategoryBanner'
import { GrowingCategoryCard } from '@components/GrowingCategoryCard'
import { WeeklyPatternChart } from '@components/WeeklyPatternChart'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getAllMonthsData, getTransactionsByMonth } from '@services/transactionService'
import { getPercentageByCategory, getTotalByCategory } from '@utils/aggregations'
import { formatCurrency, formatMonthLabel } from '@utils/formatters'
import { getConsumerProfile, getGrowingCategory, getWeeklyPattern } from '@utils/insights'
import { useMemo } from 'react'
import { PiCalendar, PiHeartFill, PiRepeat, PiTicket } from 'react-icons/pi'

export default function InsightsPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured, income } = useBudget()

  const allMonthsData = useMemo(
    () => getAllMonthsData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactionsVersion],
  )

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
      className="flex h-full flex-col gap-4 overflow-y-auto px-4 py-4 md:px-6 md:py-5 lg:overflow-hidden lg:px-10 lg:py-5"
      aria-live="polite"
    >
      <div className="flex shrink-0 flex-col items-start gap-0.5">
        <h1 className="text-text text-xl font-bold md:text-2xl">Seus Insights</h1>
        <span className="text-sm text-(--color-inactive-text)">
          Padrões que os números frios escondem.
        </span>
      </div>

      <div className="flex flex-col gap-4 md:gap-5 lg:min-h-0 lg:flex-1 lg:flex-row lg:overflow-hidden">
        <section className="flex flex-col gap-4 md:gap-5 lg:flex-1 lg:overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h2 className="text-text text-sm font-semibold tracking-wide">Maior categoria</h2>
            {dominantPercentage && <DominantCategoryBanner dominant={dominantPercentage} />}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-text text-sm font-semibold tracking-wide">Conheça seu perfil</h2>
            <ConsumerProfileCard
              profile={profile}
              income={income?.amount}
              totalSpent={isConfigured ? totalSpent : undefined}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-text text-sm font-semibold tracking-wide">Em crescimento</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <GrowingCategoryCard result={growingCategory} allMonthsData={relevantMonths} />
              {dominantPercentage && (
                <ConcentrationInsightCard
                  category={dominantPercentage.category}
                  percentage={concentrationData.percentage}
                  budgetMode={concentrationData.budgetMode}
                />
              )}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4 md:gap-5 lg:flex-1 lg:overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h2 className="text-text text-sm font-semibold tracking-wide">Gastos por semana</h2>
            <WeeklyPatternChart pattern={weeklyPattern} />
          </div>
          {mostFrequent && (
            <section aria-label="Outros comportamentos">
              <h2 className="mb-sm text-text text-sm font-semibold tracking-wide">
                Outros comportamentos
              </h2>
              <div className="gap-sm flex flex-col">
                {healthData && (
                  <BehaviorInsightCard
                    icon={<PiHeartFill className="text-text" size={22} />}
                    title="Saúde financeira do mês"
                    description={`${healthData.onTrack} de ${healthData.total} categorias dentro da meta`}
                  />
                )}
                <BehaviorInsightCard
                  icon={<PiRepeat className="text-text" size={22} />}
                  title="Categoria mais frequente"
                  description={`Você fez ${mostFrequent.count} transações de ${mostFrequent.category} em ${shortMonth} — uma média de ${(mostFrequent.count / 4).toFixed(1)} por semana`}
                />
                <BehaviorInsightCard
                  icon={<PiCalendar className="text-text" size={22} />}
                  title="Concentração no início do mês"
                  description={`Você gastou ${first2WeeksPct}% do orçamento nas primeiras 2 semanas`}
                />
                <BehaviorInsightCard
                  icon={<PiTicket className="text-text" size={22} />}
                  title="Ticket médio por transação"
                  description={`Seu gasto médio por transação em ${shortMonth} foi de ${formatCurrency(avgTicket)}`}
                />
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  )
}
