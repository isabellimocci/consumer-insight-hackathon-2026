import type { Transaction, VilaoResult } from '../types'
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

import type { CategoryTotal, Transaction } from '../types'
import { getTotalByCategory } from './aggregations'

export function getDominantCategory(transactions: Transaction[]): CategoryTotal | null {
  const totals = getTotalByCategory(transactions)
  if (totals.length === 0) {
    return null
  }
  return totals[0]
}
