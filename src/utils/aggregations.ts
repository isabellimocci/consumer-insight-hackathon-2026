import type { Category, CategoryPercentage, CategoryTotal, Transaction } from '../types'

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
