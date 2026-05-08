import { useContext } from 'react'

import { BudgetContext, type BudgetContextType } from './BudgetContext'

export function useBudget(): BudgetContextType {
  const ctx = useContext(BudgetContext)
  if (!ctx) throw new Error('useBudget must be used within BudgetProvider')
  return ctx
}
