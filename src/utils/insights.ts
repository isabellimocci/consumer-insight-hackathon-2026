import type { CategoryTotal, Transaction } from '../types'
import { getTotalByCategory } from './aggregations'

export function getDominantCategory(transactions: Transaction[]): CategoryTotal {
  const totals = getTotalByCategory(transactions)
  if (totals.length === 0) {
    throw new Error('Nenhuma transação fornecida')
  }
  return totals[0]
}
