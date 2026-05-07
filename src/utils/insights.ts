import type {
  Category,
  CategoryTotal,
  EconomyRecommendation,
  GrowingCategoryResult,
  MonthData,
  Transaction,
  VilaoResult,
  WeeklyPattern,
} from '../types'
import { CATEGORIES } from '../types'
import { compareTwoMonths, getTotalByCategory } from './aggregations'
import { getEconomyCopy } from './copy'

export function getVilaoDoMes(
  currentMonth: Transaction[],
  previousMonth: Transaction[],
): VilaoResult | null {
  const comparisons = compareTwoMonths(currentMonth, previousMonth)
  if (comparisons.length === 0) return null
  const currentTotals = getTotalByCategory(currentMonth)

  const growing = comparisons.filter((c) => c.variationPercent > 0)

  const vilao =
    growing.length > 0
      ? growing.reduce((max, c) => (c.variationPercent > max.variationPercent ? c : max))
      : comparisons.reduce((max, c) => (c.currentTotal > max.currentTotal ? c : max))

  const transactionCount = currentTotals.find((t) => t.category === vilao.category)?.count ?? 0

  return {
    category: vilao.category,
    currentTotal: vilao.currentTotal,
    previousTotal: vilao.previousTotal,
    growthPercent: vilao.variationPercent,
    transactionCount,
    economyCopy: getEconomyCopy(vilao.category, vilao.variationPercent),
    savingsIfReduced20: Math.round(vilao.currentTotal * 0.2 * 100) / 100,
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
    const day = parseInt(t.date.split('/')[0], 10)
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
  Alimentação: (n, s) =>
    `Se você tivesse feito ${n} ${n === 1 ? 'pedido' : 'pedidos'} de delivery a menos, teria sobrado ${s} este mês.`,
  Transporte: (n, s) =>
    `Trocando ${n} ${n === 1 ? 'corrida' : 'corridas'} de app por transporte público, você guardaria ${s}.`,
  Lazer: (n, s) =>
    `Com ${n} ${n === 1 ? 'programa' : 'programas'} mais em conta, você teria ${s} sobrando este mês.`,
  Assinaturas: (n, s) =>
    `Cancelando ${n} ${n === 1 ? 'assinatura' : 'assinaturas'} que não usa, você liberaria ${s} por mês.`,
  Compras: (n, s) =>
    `Evitando ${n} ${n === 1 ? 'compra' : 'compras'} por impulso, você teria guardado ${s}.`,
  Saúde: (n, s) =>
    `Revisando ${n} ${n === 1 ? 'gasto' : 'gastos'} com saúde, você poderia poupar ${s} este mês.`,
  Educação: (n, s) =>
    `Escolhendo ${n} ${n === 1 ? 'curso' : 'cursos'} com mais critério, você guardaria ${s} este mês.`,
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
