export type Category =
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Assinaturas'
  | 'Compras'
  | 'Saúde'
  | 'Educação'

export type TransactionId = string & { readonly __brand: 'TransactionId' }

export interface Transaction {
  id: TransactionId
  date: string // formato: dd/mm/aaaa
  category: Category
  subcategory: string
  description: string
  amount: number // Sempre positivo e em reais
}

export interface MonthData {
  month: string // formato: mm/aaaa
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
  currentTotal: number
  previousTotal: number
  growthPercent: number // espelha variationPercent de CategoryComparison; NEW_CATEGORY_SENTINEL se categoria nova
  transactionCount: number
  economyCopy: string
  savingsIfReduced20: number
}
