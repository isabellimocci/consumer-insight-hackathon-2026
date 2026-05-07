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
      <div className="flex items-start gap-[var(--spacing-sm)]" aria-live="polite">
        <span aria-hidden="true" style={{ fontSize: 28, lineHeight: 1.4, flexShrink: 0 }}>
          {CATEGORY_ICONS[category]}
        </span>
        <p className="text-[length:var(--font-size-lg)] text-[var(--color-text)]">{copy}</p>
      </div>
    </Card>
  )
}
