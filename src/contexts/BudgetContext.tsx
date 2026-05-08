import { createContext } from 'react'

import type { BudgetAdjustments, BudgetCategory, Category, Income, MonthlyBudget } from '../types'

export interface BudgetContextType {
  currentBudget: MonthlyBudget | null
  income: Income | null
  isConfigured: boolean
  activeGoalPercents: BudgetAdjustments
  setIncome: (amount: number) => void
  updateCategoryPercent: (category: Category, percent: number) => void
  applyBudget: (startsAt: string) => void
  getCategoryStatus: (category: Category) => BudgetCategory['status']
  getCategoryVariance: (category: Category) => number
  getVilaoCategory: () => Category | null
}

export const BudgetContext = createContext<BudgetContextType | null>(null)
