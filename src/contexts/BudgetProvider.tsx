import {
  calculateBudget,
  getActiveGoalPercents,
  getBudgetByMonth,
  getGoalsForMonth,
  getIncomeByMonth,
  saveBudget,
  saveIncome,
  seedDefaultBudgetsIfNeeded,
  updateGoal,
} from '@services/budgetService'
import { getAvailableMonths, getTransactionsByMonth } from '@services/transactionService'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'

import type { BudgetAdjustments, BudgetCategory, Category, Income, MonthlyBudget } from '../types'
import { BudgetContext } from './BudgetContext'
import { useMonth } from './useMonth'

type BudgetState = {
  income: Income | null
  adjustments: BudgetAdjustments
  currentBudget: MonthlyBudget | null
}

function budgetReducer(
  state: BudgetState,
  action: {
    type: 'LOAD_MONTH'
    payload: {
      income: Income | null
      adjustments: BudgetAdjustments
      currentBudget: MonthlyBudget | null
    }
  },
): BudgetState {
  if (action.type === 'LOAD_MONTH') {
    return action.payload
  }
  return state
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const { selectedMonth, transactionsVersion } = useMonth()
  useEffect(() => {
    seedDefaultBudgetsIfNeeded(getAvailableMonths(), getTransactionsByMonth)
  }, [])
  const [{ income, adjustments, currentBudget }, dispatch] = useReducer(budgetReducer, {
    income: null,
    adjustments: {},
    currentBudget: null,
  })

  useEffect(() => {
    dispatch({
      type: 'LOAD_MONTH',
      payload: {
        income: getIncomeByMonth(selectedMonth),
        adjustments: getGoalsForMonth(selectedMonth),
        currentBudget: getBudgetByMonth(selectedMonth),
      },
    })
  }, [selectedMonth, transactionsVersion])

  const [activeGoalPercents, setActiveGoalPercents] = useState<BudgetAdjustments>(() =>
    getActiveGoalPercents(),
  )

  const recalculate = useCallback(
    (inc: Income, adj: BudgetAdjustments): MonthlyBudget => {
      const txs = getTransactionsByMonth(selectedMonth)
      return calculateBudget(inc, txs, adj)
    },
    [selectedMonth],
  )

  const setIncome = useCallback(
    (amount: number) => {
      const newIncome: Income = { month: selectedMonth, amount }
      saveIncome(newIncome)
      const budget = recalculate(newIncome, adjustments)
      dispatch({
        type: 'LOAD_MONTH',
        payload: {
          income: newIncome,
          adjustments,
          currentBudget: budget,
        },
      })
    },
    [selectedMonth, adjustments, recalculate],
  )

  const updateCategoryPercent = useCallback(
    (category: Category, percent: number) => {
      const newAdj = { ...adjustments, [category]: percent }
      if (income) {
        const budget = recalculate(income, newAdj)
        dispatch({
          type: 'LOAD_MONTH',
          payload: {
            income,
            adjustments: newAdj,
            currentBudget: budget,
          },
        })
      }
    },
    [adjustments, income, recalculate],
  )

  const applyBudget = useCallback(
    (startsAt: string) => {
      if (!income || !currentBudget) return
      saveIncome(income)
      saveBudget(currentBudget)
      for (const [cat, pct] of Object.entries(adjustments) as [Category, number][]) {
        updateGoal(cat, pct, startsAt)
      }
      setActiveGoalPercents(getActiveGoalPercents())
    },
    [income, currentBudget, adjustments],
  )

  const getCategoryStatus = useCallback(
    (category: Category): BudgetCategory['status'] => {
      return currentBudget?.categories.find((c) => c.category === category)?.status ?? 'on-track'
    },
    [currentBudget],
  )

  const getCategoryVariance = useCallback(
    (category: Category): number => {
      return currentBudget?.categories.find((c) => c.category === category)?.variance ?? 0
    },
    [currentBudget],
  )

  const getVilaoCategory = useCallback((): Category | null => {
    if (!currentBudget) return null
    const overCats = currentBudget.categories
      .filter((c) => c.status === 'over')
      .sort((a, b) => b.variance - a.variance)
    return overCats[0]?.category ?? null
  }, [currentBudget])

  const isConfigured = income !== null

  const value = useMemo(
    () => ({
      currentBudget,
      income,
      isConfigured,
      activeGoalPercents,
      setIncome,
      updateCategoryPercent,
      applyBudget,
      getCategoryStatus,
      getCategoryVariance,
      getVilaoCategory,
    }),
    [
      currentBudget,
      income,
      isConfigured,
      activeGoalPercents,
      setIncome,
      updateCategoryPercent,
      applyBudget,
      getCategoryStatus,
      getCategoryVariance,
      getVilaoCategory,
    ],
  )

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
}
