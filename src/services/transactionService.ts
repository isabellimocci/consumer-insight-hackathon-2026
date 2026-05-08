import { mockData } from '@data/transactions'

import type { MonthData, Transaction, TransactionId } from '../types'

export function getTransactionsByMonth(month: string): Transaction[] {
  const stored = localStorage.getItem(`transactions_${month}`)
  if (stored) return JSON.parse(stored) as Transaction[]
  return [...(mockData.find((m) => m.month === month)?.transactions ?? [])]
}

export function getAvailableMonths(): string[] {
  const fromMock = mockData.map((m) => m.month)
  const fromStorage: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('transactions_')) {
      const month = key.replace('transactions_', '')
      if (/^\d{4}-\d{2}$/.test(month)) fromStorage.push(month)
    }
  }
  return Array.from(new Set([...fromMock, ...fromStorage])).sort()
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
  const base: Transaction[] = stored
    ? (JSON.parse(stored) as Transaction[])
    : [...(mockData.find((m) => m.month === month)?.transactions ?? [])]
  const filtered = base.filter((t) => t.id !== transactionId)
  localStorage.setItem(`transactions_${month}`, JSON.stringify(filtered))
}

export function updateTransaction(
  id: string,
  oldMonth: string,
  data: Omit<Transaction, 'id'>,
): void {
  const newMonth = data.date.slice(0, 7)
  if (newMonth === oldMonth) {
    const stored = localStorage.getItem(`transactions_${oldMonth}`)
    if (!stored) return
    const txs = (JSON.parse(stored) as Transaction[]).map((t) =>
      t.id === id ? { ...t, ...data } : t,
    )
    localStorage.setItem(`transactions_${oldMonth}`, JSON.stringify(txs))
  } else {
    deleteTransaction(id, oldMonth)
    addTransaction(data)
  }
}
