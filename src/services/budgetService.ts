import type {
  BudgetAdjustments,
  BudgetCategory,
  BudgetGoal,
  Category,
  Income,
  MonthlyBudget,
  Transaction,
} from '../types'
import { CATEGORIES } from '../types'

const BASE_BUDGET: Record<Category, number> = {
  Alimentação: 30,
  Transporte: 12,
  Lazer: 10,
  Assinaturas: 8,
  Compras: 15,
  Saúde: 10,
  Educação: 15,
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

export function seedDefaultBudgetsIfNeeded(
  months: string[],
  getTransactions: (month: string) => Transaction[],
): void {
  for (const month of months) {
    if (getIncomeByMonth(month) !== null) continue
    const defaultIncome: Income = { month, amount: 1500 }
    const adjustments = getGoalsForMonth(month)
    const budget = calculateBudget(defaultIncome, getTransactions(month), adjustments)
    saveIncome(defaultIncome)
    saveBudget(budget)
  }
}

export function saveIncome(income: Income): void {
  localStorage.setItem(`income_${income.month}`, JSON.stringify(income))
}

export function getIncomeByMonth(month: string): Income | null {
  const raw = localStorage.getItem(`income_${month}`)
  return raw ? (JSON.parse(raw) as Income) : null
}

/** @deprecated use updateGoal instead */
export function saveAdjustments(month: string, adjustments: BudgetAdjustments): void {
  localStorage.setItem(`adjustments_${month}`, JSON.stringify(adjustments))
}

/** @deprecated use getGoalsForMonth instead */
export function getAdjustmentsByMonth(month: string): BudgetAdjustments {
  const raw = localStorage.getItem(`adjustments_${month}`)
  return raw ? (JSON.parse(raw) as BudgetAdjustments) : {}
}

function prevMonth(month: string): string {
  const [y, m] = month.split('-').map(Number)
  if (m === 1) return `${y - 1}-12`
  return `${y}-${String(m - 1).padStart(2, '0')}`
}

export function getAllGoals(): BudgetGoal[] {
  const raw = localStorage.getItem('budget_goals')
  if (raw) {
    const parsed = JSON.parse(raw) as BudgetGoal[]
    // Migra seed antigo (startsAt: '2025-01', endsAt: null) para o novo formato
    const isOldSeed =
      parsed.length === CATEGORIES.length &&
      parsed.every((g) => g.startsAt === '2025-01' && g.endsAt === null)
    if (!isOldSeed) return parsed
  }
  const seeded: BudgetGoal[] = CATEGORIES.map((cat) => ({
    id: crypto.randomUUID(),
    category: cat,
    percentage: BASE_BUDGET[cat],
    startsAt: '2025-05',
    endsAt: '2026-03',
  }))
  localStorage.setItem('budget_goals', JSON.stringify(seeded))
  return seeded
}

export function saveAllGoals(goals: BudgetGoal[]): void {
  localStorage.setItem('budget_goals', JSON.stringify(goals))
}

export function getGoalsForMonth(month: string): BudgetAdjustments {
  const goals = getAllGoals()
  const result: BudgetAdjustments = {}
  for (const cat of CATEGORIES) {
    const active = goals.find(
      (g) => g.category === cat && g.startsAt <= month && (g.endsAt === null || g.endsAt >= month),
    )
    if (active) result[cat] = active.percentage
  }
  return result
}

export function getActiveGoalPercents(): BudgetAdjustments {
  const goals = getAllGoals()
  const result: BudgetAdjustments = {}
  for (const cat of CATEGORIES) {
    const active = goals.find((g) => g.category === cat && g.endsAt === null)
    if (active) result[cat] = active.percentage
  }
  return result
}

export function updateGoal(category: Category, newPercent: number, startsAt: string): void {
  const goals = getAllGoals()
  const activeIdx = goals.findIndex((g) => g.category === category && g.endsAt === null)
  if (activeIdx !== -1) {
    const active = goals[activeIdx]
    if (active.percentage === newPercent) return
    if (active.startsAt === startsAt) {
      goals[activeIdx] = { ...active, percentage: newPercent }
    } else {
      goals[activeIdx] = { ...active, endsAt: prevMonth(startsAt) }
      goals.push({
        id: crypto.randomUUID(),
        category,
        percentage: newPercent,
        startsAt,
        endsAt: null,
      })
    }
  } else {
    goals.push({
      id: crypto.randomUUID(),
      category,
      percentage: newPercent,
      startsAt,
      endsAt: null,
    })
  }
  saveAllGoals(goals)
}
