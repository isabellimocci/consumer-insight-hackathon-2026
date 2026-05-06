export type Category =
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Assinaturas'
  | 'Compras'
  | 'Saúde'
  | 'Educação'

export interface Transaction {
  id: string & { readonly _brand: 'TransactionId' }
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
