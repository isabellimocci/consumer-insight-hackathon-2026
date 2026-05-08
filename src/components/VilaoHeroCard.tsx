import { Badge } from '@components/Badge'
import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'

import type { VilaoResult } from '../types'

interface VilaoHeroCardProps {
  vilao: VilaoResult
}

export function VilaoHeroCard({ vilao }: VilaoHeroCardProps) {
  const bgColor = CATEGORY_COLORS[vilao.category] + '1A'
  const varianceLabel = `+${vilao.variancePercent}% acima da meta`
  const growthLabel =
    (vilao.growthPercent > 0 ? '+' : '') + vilao.growthPercent + '% vs mês anterior'
  const IconComponent = CATEGORY_ICONS_PI[vilao.category]

  return (
    <div
      className="gap-sm p-md flex flex-col items-center rounded-2xl shadow-sm"
      style={{ backgroundColor: bgColor }}
      aria-label={`Vilão do mês: ${vilao.category}`}
    >
      <Badge label="Vilão do Mês 🚨" color="danger" />
      <IconComponent
        size={48}
        aria-hidden={true}
        style={{ color: CATEGORY_COLORS[vilao.category] }}
      />
      <p className="text-text text-(length:--font-size-xl) font-bold">{vilao.category}</p>
      <p className="text-danger text-(length:--font-size-2xl) font-bold">
        +{formatCurrency(vilao.variance)}
      </p>
      <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
        Gastou {formatCurrency(vilao.spentAmount)} de {formatCurrency(vilao.targetAmount)}{' '}
        planejados
      </p>
      <Badge label={varianceLabel} color="danger" />
      {vilao.growthPercent !== 0 && (
        <Badge label={growthLabel} color={vilao.growthPercent > 0 ? 'danger' : 'success'} />
      )}
    </div>
  )
}
