import { Card } from '@components/Card'
import { CATEGORY_COLORS, CATEGORY_ICONS_PI } from '@utils/categoryMaps'

import type { Category } from '../types'

interface VilaoNarrativeCopyProps {
  copy: string
  category: Category
}

export function VilaoNarrativeCopy({ copy, category }: VilaoNarrativeCopyProps) {
  const IconComponent = CATEGORY_ICONS_PI[category]
  return (
    <Card ariaLabel="Análise do vilão do mês">
      <div className="gap-sm flex items-start" aria-live="polite">
        <IconComponent
          size={28}
          aria-hidden={true}
          style={{ color: CATEGORY_COLORS[category], flexShrink: 0 }}
        />
        <p className="text-text text-(length:--font-size-lg)">{copy}</p>
      </div>
    </Card>
  )
}
