import { createContext } from 'react'

export interface MonthContextType {
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  availableMonths: string[]
  transactionsVersion: number
  refreshTransactions: () => void
}

export const MonthContext = createContext<MonthContextType | null>(null)
