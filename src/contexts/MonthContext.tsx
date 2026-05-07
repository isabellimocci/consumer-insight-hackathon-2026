import { createContext } from 'react'

export interface MonthContextType {
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  availableMonths: string[]
}

export const MonthContext = createContext<MonthContextType | null>(null)
