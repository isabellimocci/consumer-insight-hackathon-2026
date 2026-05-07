import type {
  Category,
  CategoryComparison,
  CategoryPercentage,
  CategoryTotal,
  Transaction,
} from '../types'

export const NEW_CATEGORY_SENTINEL = 999

export function getTotalByCategory(transactions: Transaction[]): CategoryTotal[] {
  const map = new Map<Category, CategoryTotal>()

  for (const tx of transactions) {
    const entry = map.get(tx.category)
    if (entry) {
      entry.total = Math.round((entry.total + tx.amount) * 100) / 100
      entry.count += 1
    } else {
      map.set(tx.category, {
        category: tx.category,
        total: tx.amount,
        count: 1,
      })
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.total - a.total || a.category.localeCompare(b.category),
  )
}

export function getPercentageByCategory(transactions: Transaction[]): CategoryPercentage[] {
  const totals = getTotalByCategory(transactions)
  if (totals.length === 0) return []

  const grandTotal = totals.reduce((sum, t) => sum + t.total, 0)

  return totals.map((t) => ({
    category: t.category,
    total: t.total,
    percentage: grandTotal > 0 ? Math.round((t.total / grandTotal) * 1000) / 10 : 0,
  }))
}

export function compareTwoMonths(
  currentMonth: Transaction[],
  previousMonth: Transaction[],
): CategoryComparison[] {
  const currentMap = new Map(getTotalByCategory(currentMonth).map((t) => [t.category, t.total]))
  const previousMap = new Map(getTotalByCategory(previousMonth).map((t) => [t.category, t.total]))

  const allCategories = new Set([...currentMap.keys(), ...previousMap.keys()])

  return Array.from(allCategories).map((category) => {
    const current = currentMap.get(category) ?? 0
    const previous = previousMap.get(category) ?? 0

    let variationPercent: number
    if (previous === 0) {
      variationPercent = current > 0 ? NEW_CATEGORY_SENTINEL : 0
    } else if (current === 0) {
      variationPercent = -100
    } else {
      variationPercent = Math.round(((current - previous) / previous) * 1000) / 10
    }

    const trend: 'up' | 'down' | 'stable' =
      variationPercent > 5 ? 'up' : variationPercent < -5 ? 'down' : 'stable'

    return { category, currentTotal: current, previousTotal: previous, variationPercent, trend }
  })
}
