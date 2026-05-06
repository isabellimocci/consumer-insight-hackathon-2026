import { mockData } from '@data/transactions'

import type { MonthData, Transaction } from '../types'

export function getTransactionsByMonth(month: string): Transaction[] {
  return [...(mockData.find((m) => m.month === month)?.transactions ?? [])]
}

export function getAvailableMonths(): string[] {
  return mockData.map((m) => m.month)
}

export function getAllMonthsData(): MonthData[] {
  return mockData.map((m) => ({ ...m, transactions: [...m.transactions] }))
}
