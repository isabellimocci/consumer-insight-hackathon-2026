import type { Category } from '../types'

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

export function getEconomyCopy(category: Category, growthPercent: number): string {
  const growth = growthPercent === 999 ? 100 : growthPercent
  return COPIES[category](growth)
}
