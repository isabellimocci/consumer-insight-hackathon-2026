import type {
  Category,
  CategoryTotal,
  ConsumerProfile,
  EconomyRecommendation,
  GrowingCategoryResult,
  MonthData,
  MonthlyBudget,
  Transaction,
  VilaoResult,
  WeeklyPattern,
} from '../types'
import { CATEGORIES } from '../types'
import { getPercentageByCategory, getTotalByCategory } from './aggregations'
import { getArchetypeProfile, getEconomyCopy } from './copy'

const DOMINANT_THRESHOLD = 30

export function getVilaoDoMes(
  budget: MonthlyBudget,
  previousTransactions: Transaction[] = [],
): VilaoResult | null {
  const overCategories = budget.categories.filter((c) => c.status === 'over')
  if (overCategories.length === 0) return null

  const vilao = overCategories.reduce((max, c) => (c.variance > max.variance ? c : max))

  let growthPercent = 0
  if (previousTransactions.length > 0) {
    const prevTotals = getTotalByCategory(previousTransactions)
    const prevTotal = prevTotals.find((t) => t.category === vilao.category)?.total ?? 0
    if (prevTotal > 0) {
      growthPercent = Math.round(((vilao.spentAmount - prevTotal) / prevTotal) * 1000) / 10
    }
  }

  return {
    category: vilao.category,
    targetAmount: vilao.targetAmount,
    spentAmount: vilao.spentAmount,
    variance: vilao.variance,
    variancePercent:
      vilao.targetAmount > 0
        ? Math.round((vilao.variance / vilao.targetAmount) * 1000) / 10
        : vilao.variance > 0
          ? 100
          : 0,
    growthPercent,
    transactionCount: vilao.transactionCount,
    economyCopy: getEconomyCopy(vilao.category, growthPercent),
    savingsIfReduced20: Math.round(vilao.spentAmount * 0.2 * 100) / 100,
  }
}

export function getDominantCategory(transactions: Transaction[]): CategoryTotal | null {
  const totals = getTotalByCategory(transactions)
  if (totals.length === 0) {
    return null
  }
  return totals[0]
}

export function getGrowingCategory(months: MonthData[]): GrowingCategoryResult | null {
  if (months.length < 3) return null

  const last3 = months.slice(-3)
  const monthlyTotals = last3.map(
    (m) => new Map(getTotalByCategory(m.transactions).map((t) => [t.category, t.total])),
  )

  const candidates: GrowingCategoryResult[] = []

  for (const category of CATEGORIES) {
    const totals = monthlyTotals.map((m) => m.get(category) ?? 0)

    if (totals[0] === 0 || totals[1] === 0) continue
    if (!(totals[0] < totals[1] && totals[1] < totals[2])) continue

    const rate1 = (totals[1] - totals[0]) / totals[0]
    const rate2 = (totals[2] - totals[1]) / totals[1]
    const growthRate = Math.round(((rate1 + rate2) / 2) * 1000) / 10

    candidates.push({ category, totals, growthRate })
  }

  if (candidates.length === 0) return null

  return candidates.sort((a, b) => b.growthRate - a.growthRate)[0]
}

export function getWeeklyPattern(transactions: Transaction[]): WeeklyPattern[] {
  const weekTotals: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 0, 3: 0, 4: 0 }

  for (const t of transactions) {
    const day = parseInt(t.date.split('-')[2], 10)
    const week: 1 | 2 | 3 | 4 = day <= 7 ? 1 : day <= 14 ? 2 : day <= 21 ? 3 : 4
    weekTotals[week] = Math.round((weekTotals[week] + t.amount) * 100) / 100
  }

  const monthTotal = Object.values(weekTotals).reduce((sum, v) => sum + v, 0)

  return ([1, 2, 3, 4] as const).map((week) => ({
    week,
    total: weekTotals[week],
    percentage: monthTotal === 0 ? 0 : Math.round((weekTotals[week] / monthTotal) * 1000) / 10,
  }))
}

const ECONOMY_TEMPLATES: Record<Category, (n: number, savings: string) => string> = {
  Alimentação: (n) =>
    `Se você tivesse feito ${n} ${n === 1 ? 'pedido' : 'pedidos'} de delivery a menos, teria sobrado:`,
  Transporte: (n) =>
    `Trocando ${n} ${n === 1 ? 'corrida' : 'corridas'} de app por transporte público, você guardaria:`,
  Lazer: (n) => `Com ${n} ${n === 1 ? 'programa' : 'programas'} mais em conta, você teria:`,
  Assinaturas: (n) =>
    `Cancelando ${n} ${n === 1 ? 'assinatura' : 'assinaturas'} que não usa, você liberaria:`,
  Compras: (n) =>
    `Evitando ${n} ${n === 1 ? 'compra' : 'compras'} por impulso, você teria guardado:`,
  Saúde: (n) => `Revisando ${n} ${n === 1 ? 'gasto' : 'gastos'} com saúde, você poderia poupar:`,
  Educação: (n) =>
    `Escolhendo ${n} ${n === 1 ? 'curso' : 'cursos'} com mais critério, você guardaria:`,
}

export function getEconomyRecommendation(vilao: VilaoResult): EconomyRecommendation {
  const txToRemove = Math.max(1, Math.round(vilao.transactionCount * 0.2))
  const savings = vilao.savingsIfReduced20.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return {
    copy: ECONOMY_TEMPLATES[vilao.category](txToRemove, savings),
    savingsAmount: vilao.savingsIfReduced20,
    category: vilao.category,
  }
}

export function getConsumerProfile(transactions: Transaction[]): ConsumerProfile {
  const percentages = getPercentageByCategory(transactions)
  const top = percentages[0]
  const dominant = top && top.percentage >= DOMINANT_THRESHOLD ? top.category : null
  return getArchetypeProfile(dominant)
}
