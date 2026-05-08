import { Card } from '@components/Card'
import { CATEGORY_ICONS } from '@utils/categoryMaps'

import type { Category } from '../types'

interface VilaoNarrativeCopyProps {
  copy: string
  category: Category
}

export function VilaoNarrativeCopy({ copy, category }: VilaoNarrativeCopyProps) {
  return (
    <Card ariaLabel="Análise do vilão do mês">
      <div className="gap-sm flex items-start" aria-live="polite">
        <span aria-hidden="true" style={{ fontSize: 28, lineHeight: 1.4, flexShrink: 0 }}>
          {CATEGORY_ICONS[category]}
        </span>
        <p className="text-text text-(length:--font-size-lg)">{copy}</p>
      </div>
    </Card>
  )
}
