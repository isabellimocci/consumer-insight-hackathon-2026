import type { Category, GrowingCategoryResult, MonthData, Transaction, VilaoResult } from '../types'
import { compareTwoMonths, getTotalByCategory } from './aggregations'
import { getEconomyCopy } from './copy'

export function getVilaoDoMes(
  currentMonth: Transaction[],
  previousMonth: Transaction[],
): VilaoResult | null {
  const comparisons = compareTwoMonths(currentMonth, previousMonth)
  if (comparisons.length === 0) return null
  const currentTotals = getTotalByCategory(currentMonth)

  const growing = comparisons.filter((c) => c.variationPercent > 0)

  const vilao =
    growing.length > 0
      ? growing.reduce((max, c) => (c.variationPercent > max.variationPercent ? c : max))
      : comparisons.reduce((max, c) => (c.currentTotal > max.currentTotal ? c : max))

  const transactionCount = currentTotals.find((t) => t.category === vilao.category)?.count ?? 0

  return {
    category: vilao.category,
    currentTotal: vilao.currentTotal,
    previousTotal: vilao.previousTotal,
    growthPercent: vilao.variationPercent,
    transactionCount,
    economyCopy: getEconomyCopy(vilao.category, vilao.variationPercent),
    savingsIfReduced20: Math.round(vilao.currentTotal * 0.2 * 100) / 100,
  }
}

const CATEGORIES: Category[] = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Assinaturas',
  'Compras',
  'Saúde',
  'Educação',
]

export function getGrowingCategory(months: MonthData[]): GrowingCategoryResult | null {
  const last3 = months.slice(-3)

  const candidates: GrowingCategoryResult[] = []

  for (const category of CATEGORIES) {
    const totals = last3.map(
      (m) => getTotalByCategory(m.transactions).find((t) => t.category === category)?.total ?? 0,
    )

    if (totals[0] === 0 || totals[1] === 0) continue
    if (!(totals[0] < totals[1] && totals[1] < totals[2])) continue

    const rate1 = (totals[1] - totals[0]) / totals[0]
    const rate2 = (totals[2] - totals[1]) / totals[1]
    const growthRate = Math.round(((rate1 + rate2) / 2) * 1000) / 10

    candidates.push({ category, totals, growthRate })
  }

  if (candidates.length === 0) return null

  return candidates.sort((a, b) => b.growthRate - a.growthRate)[0]
}
