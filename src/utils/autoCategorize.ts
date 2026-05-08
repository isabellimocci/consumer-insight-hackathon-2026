import type { Category } from '../types'

const KEYWORDS: Record<Category, string[]> = {
  Alimentação: [
    'ifood',
    'rappi',
    'mcdonalds',
    'burger',
    'pizza',
    'padaria',
    'restaurante',
    'lanche',
    'mercado',
    'supermercado',
    'hortifruti',
  ],
  Transporte: [
    'uber',
    '99',
    'onibus',
    'metro',
    'passagem',
    'combustivel',
    'estacionamento',
    'gasolina',
  ],
  Saúde: ['farmacia', 'medico', 'academia', 'remedio', 'consulta', 'plano de saude'],
  Lazer: ['cinema', 'ingresso', 'bar', 'show', 'teatro', 'jogo', 'steam', 'balada'],
  Assinaturas: [
    'spotify',
    'netflix',
    'prime',
    'disney',
    'hbo',
    'max',
    'youtube',
    'deezer',
    'assinatura',
  ],
  Compras: ['amazon', 'shopee', 'shein', 'roupa', 'calcado', 'magazine', 'americanas'],
  Educação: ['faculdade', 'curso', 'livro', 'apostila', 'udemy', 'alura', 'mensalidade'],
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

export function autoCategorizacao(description: string): Category | null {
  const normalized = normalize(description)
  for (const [category, keywords] of Object.entries(KEYWORDS) as [Category, string[]][]) {
    if (keywords.some((kw) => normalized.includes(kw))) return category
  }
  return null
}
