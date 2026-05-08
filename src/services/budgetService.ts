import type {
  BudgetAdjustments,
  BudgetCategory,
  Category,
  Income,
  MonthlyBudget,
  Transaction,
} from '../types'
import { CATEGORIES } from '../types'

const BASE_BUDGET: Record<Category, number> = {
  Alimentação: 25,
  Transporte: 12,
  Lazer: 10,
  Assinaturas: 8,
  Compras: 15,
  Saúde: 10,
  Educação: 10,
}

export function getSuggestedBudget(): Record<Category, number> {
  return { ...BASE_BUDGET }
}

export function calculateBudget(
  income: Income,
  transactions: Transaction[],
  adjustments: BudgetAdjustments,
): MonthlyBudget {
  const percents: Record<Category, number> = { ...getSuggestedBudget() }
  for (const [cat, pct] of Object.entries(adjustments) as [Category, number][]) {
    percents[cat] = pct
  }

  const total = Object.values(percents).reduce((s, v) => s + v, 0)
  percents['Alimentação'] = (percents['Alimentação'] ?? 0) + (100 - total)

  const categories: BudgetCategory[] = CATEGORIES.map((cat) => {
    const userPercent = percents[cat] ?? 0
    const targetAmount = Math.round(income.amount * (userPercent / 100) * 100) / 100
    const catTxs = transactions.filter((t) => t.category === cat)
    const spentAmount = Math.round(catTxs.reduce((s, t) => s + t.amount, 0) * 100) / 100
    const variance = Math.round((spentAmount - targetAmount) * 100) / 100
    const status: BudgetCategory['status'] =
      variance <= 0 ? 'on-track' : variance <= targetAmount * 0.1 ? 'warning' : 'over'
    return {
      category: cat,
      suggestedPercent: BASE_BUDGET[cat] ?? 0,
      userPercent,
      targetAmount,
      spentAmount,
      transactionCount: catTxs.length,
      variance,
      status,
    }
  })

  return {
    month: income.month,
    income,
    categories,
    totalUserPercent: Math.round(Object.values(percents).reduce((s, v) => s + v, 0)),
  }
}

export function saveBudget(budget: MonthlyBudget): void {
  localStorage.setItem(`budget_${budget.month}`, JSON.stringify(budget))
}

export function getBudgetByMonth(month: string): MonthlyBudget | null {
  const raw = localStorage.getItem(`budget_${month}`)
  return raw ? (JSON.parse(raw) as MonthlyBudget) : null
}

export function saveIncome(income: Income): void {
  localStorage.setItem(`income_${income.month}`, JSON.stringify(income))
}

export function getIncomeByMonth(month: string): Income | null {
  const raw = localStorage.getItem(`income_${month}`)
  return raw ? (JSON.parse(raw) as Income) : null
}

export function saveAdjustments(month: string, adjustments: BudgetAdjustments): void {
  localStorage.setItem(`adjustments_${month}`, JSON.stringify(adjustments))
}

export function getAdjustmentsByMonth(month: string): BudgetAdjustments {
  const raw = localStorage.getItem(`adjustments_${month}`)
  return raw ? (JSON.parse(raw) as BudgetAdjustments) : {}
}
