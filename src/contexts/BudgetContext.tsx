import { createContext } from 'react'

import type { BudgetCategory, Category, Income, MonthlyBudget } from '../types'

export interface BudgetContextType {
  currentBudget: MonthlyBudget | null
  income: Income | null
  isConfigured: boolean
  setIncome: (amount: number) => void
  updateCategoryPercent: (category: Category, percent: number) => void
  applyBudget: () => void
  getCategoryStatus: (category: Category) => BudgetCategory['status']
  getCategoryVariance: (category: Category) => number
  getVilaoCategory: () => Category | null
}

export const BudgetContext = createContext<BudgetContextType | null>(null)
