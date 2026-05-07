import { Badge } from '@components/Badge'
import { NEW_CATEGORY_SENTINEL } from '@utils/aggregations'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'

import type { VilaoResult } from '../types'

interface VilaoHeroCardProps {
  vilao: VilaoResult
}

export function VilaoHeroCard({ vilao }: VilaoHeroCardProps) {
  const bgColor = CATEGORY_COLORS[vilao.category] + '1A'
  const isNew = vilao.growthPercent === NEW_CATEGORY_SENTINEL
  const growthLabel = isNew
    ? 'Nova categoria'
    : `${vilao.growthPercent > 0 ? '+' : ''}${vilao.growthPercent}% vs mês anterior`
  const growthColor = isNew ? 'neutral' : vilao.growthPercent > 0 ? 'danger' : 'success'

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
        {formatCurrency(vilao.currentTotal)}
      </p>
      <Badge label={growthLabel} color={growthColor} />
    </div>
  )
}
