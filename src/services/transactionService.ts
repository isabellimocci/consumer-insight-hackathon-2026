import { mockData } from '@data/transactions'

import type { MonthData, Transaction, TransactionId } from '../types'

export function getTransactionsByMonth(month: string): Transaction[] {
  const stored = localStorage.getItem(`transactions_${month}`)
  if (stored) return JSON.parse(stored) as Transaction[]
  return [...(mockData.find((m) => m.month === month)?.transactions ?? [])]
}

export function getAvailableMonths(): string[] {
  return mockData.map((m) => m.month)
}

export function getAllMonthsData(): MonthData[] {
  return mockData.map((m) => ({ ...m, transactions: [...m.transactions] }))
}

export function addTransaction(data: Omit<Transaction, 'id'>): Transaction {
  const month = data.date.slice(0, 7)
  const stored = localStorage.getItem(`transactions_${month}`)
  const base: Transaction[] = stored
    ? (JSON.parse(stored) as Transaction[])
    : [...(mockData.find((m) => m.month === month)?.transactions ?? [])]
  const newTx: Transaction = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}` as TransactionId,
  }
  localStorage.setItem(`transactions_${month}`, JSON.stringify([...base, newTx]))
  return newTx
}

export function deleteTransaction(transactionId: string, month: string): void {
  const stored = localStorage.getItem(`transactions_${month}`)
  if (!stored) return
  const filtered = (JSON.parse(stored) as Transaction[]).filter((t) => t.id !== transactionId)
  localStorage.setItem(`transactions_${month}`, JSON.stringify(filtered))
}
