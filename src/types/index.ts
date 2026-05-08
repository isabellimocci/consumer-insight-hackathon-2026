export const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Assinaturas',
  'Compras',
  'Saúde',
  'Educação',
] as const

export type Category = (typeof CATEGORIES)[number]

export type TransactionId = string & { readonly __brand: 'TransactionId' }

export interface Transaction {
  id: TransactionId
  date: string // formato: YYYY-MM-DD
  category: Category
  subcategory: string
  description: string
  amount: number // Sempre positivo e em reais
}

export interface MonthData {
  month: string // formato: YYYY-MM
  transactions: Transaction[]
}

export interface UserProfile {
  name: string
  archetype: string | null
}

export interface CategoryTotal {
  category: Category
  total: number
  count: number
}

export interface CategoryPercentage {
  category: Category
  total: number
  percentage: number // 0-100, 1 casa decimal
}

export interface CategoryComparison {
  category: Category
  currentTotal: number
  previousTotal: number
  variationPercent: number // positivo = aumentou, negativo = diminuiu; 1 casa decimal. Valor especial: NEW_CATEGORY_SENTINEL = categoria nova (previousTotal === 0 && currentTotal > 0)
  trend: 'up' | 'down' | 'stable' // stable se variação entre -5% e +5%
}

export interface VilaoResult {
  category: Category
  targetAmount: number
  spentAmount: number
  variance: number
  variancePercent: number
  growthPercent: number
  transactionCount: number
  economyCopy: string
  savingsIfReduced20: number
}

export interface Income {
  month: string // "2025-05"
  amount: number // sempre positivo
}

export interface BudgetCategory {
  category: Category
  suggestedPercent: number
  userPercent: number
  targetAmount: number
  spentAmount: number
  transactionCount: number
  variance: number
  status: 'on-track' | 'warning' | 'over'
}

export interface MonthlyBudget {
  month: string
  income: Income
  categories: BudgetCategory[]
  totalUserPercent: number
}

export type BudgetAdjustments = Partial<Record<Category, number>>

export interface BudgetGoal {
  id: string
  category: Category
  percentage: number
  startsAt: string // "YYYY-MM"
  endsAt: string | null // null = vigente
}

export interface GrowingCategoryResult {
  category: Category
  totals: number[] // [mês1, mês2, mês3]
  growthRate: number // crescimento médio percentual mês a mês
}

export interface WeeklyPattern {
  week: 1 | 2 | 3 | 4
  total: number
  percentage: number
}

export interface EconomyRecommendation {
  copy: string
  savingsAmount: number
  category: Category
}

export interface ConsumerProfile {
  archetype: string // nome do arquétipo
  emoji: string
  description: string // 2 linhas de copy
}
