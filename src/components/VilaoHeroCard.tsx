import { Badge } from '@components/Badge'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@utils/categoryMaps'
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

  return (
    <div
      className="flex flex-col items-center gap-[var(--spacing-sm)] rounded-2xl p-[var(--spacing-md)] shadow-sm"
      style={{ backgroundColor: bgColor }}
      aria-label={`Vilão do mês: ${vilao.category}`}
    >
      <Badge label="Vilão do Mês 🚨" color="danger" />
      <span aria-hidden="true" style={{ fontSize: 48, lineHeight: 1 }}>
        {CATEGORY_ICONS[vilao.category]}
      </span>
      <p className="text-[length:var(--font-size-xl)] font-bold text-[var(--color-text)]">
        {vilao.category}
      </p>
      <p className="text-[length:var(--font-size-2xl)] font-bold text-[var(--color-danger)]">
        {formatCurrency(vilao.spentAmount)}
      </p>
      <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
        Meta: {formatCurrency(vilao.targetAmount)}
      </p>
      <Badge label={varianceLabel} color="danger" />
      {vilao.growthPercent !== 0 && (
        <Badge label={growthLabel} color={vilao.growthPercent > 0 ? 'danger' : 'success'} />
      )}
    </div>
  )
}
