import type { Category } from '../types'
import { NEW_CATEGORY_SENTINEL } from './aggregations'

interface ArchetypeData {
  archetype: string
  emoji: string
  description: string
}

const COPIES: Record<Category, (growth: number) => string> = {
  Alimentação: (g) =>
    `Alimentação cresceu ${g}% este mês. Cozinhar em casa pode ser seu superpoder.`,
  Transporte: (g) => `Transporte subiu ${g}%. Carona ou ônibus podem poupar uma grana.`,
  Lazer: (g) => `Lazer aumentou ${g}%. Diversão não precisa custar caro.`,
  Assinaturas: (g) => `Assinaturas cresceram ${g}%. Hora de revisar o que você realmente usa.`,
  Compras: (g) => `Compras explodiram ${g}%. Lista de desejos ajuda a filtrar impulsos.`,
  Saúde: (g) => `Saúde subiu ${g}%. Prevenção costuma custar menos que remédio.`,
  Educação: (g) => `Educação cresceu ${g}%. Investimento em conhecimento tem retorno.`,
}

const ARCHETYPE_MAP: Record<string, ArchetypeData> = {
  Alimentação: {
    archetype: 'O Sibarita',
    emoji: '🍽️',
    description: 'Você vive para comer bem e explorar sabores.\nA mesa é o seu centro social.',
  },
  Transporte: {
    archetype: 'O Nômade',
    emoji: '🚗',
    description: 'Você está sempre em movimento.\nO deslocamento faz parte da sua rotina.',
  },
  Lazer: {
    archetype: 'O Hedonista',
    emoji: '🎉',
    description: 'Você prioriza experiências e diversão.\nViver bem é a sua filosofia.',
  },
  Assinaturas: {
    archetype: 'O Conectado',
    emoji: '📱',
    description: 'Você vive no digital e ama estar atualizado.\nAssinar é uma segunda natureza.',
  },
  Compras: {
    archetype: 'O Impulsivo',
    emoji: '🛍️',
    description:
      'O carrinho nunca está vazio por muito tempo.\nA satisfação imediata é o seu motor.',
  },
  Saúde: {
    archetype: 'O Vitalista',
    emoji: '💪',
    description: 'Seu bem-estar é prioridade número um.\nInvestir em saúde nunca é exagero.',
  },
  Educação: {
    archetype: 'O Estudioso',
    emoji: '📚',
    description: 'Conhecimento é o seu maior investimento.\nAprender é uma jornada sem fim.',
  },
  default: {
    archetype: 'O Equilibrado',
    emoji: '⚖️',
    description: 'Seus gastos são distribuídos com equilíbrio.\nVocê não tem um padrão dominante.',
  },
}

export function getArchetypeProfile(category: Category | null): ArchetypeData {
  return category ? ARCHETYPE_MAP[category] : ARCHETYPE_MAP['default']
}

export function getEconomyCopy(category: Category, growthPercent: number): string {
  const growth = growthPercent === NEW_CATEGORY_SENTINEL ? 100 : growthPercent
  return COPIES[category](growth)
}
