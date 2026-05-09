import { Card } from '@components/Card'
import { TbAlertTriangle } from 'react-icons/tb'

import type { Category } from '../types'

interface VilaoNarrativeCopyProps {
  copy: string
  category: Category
}

export function VilaoNarrativeCopy({ copy }: VilaoNarrativeCopyProps) {
  return (
    <Card
      ariaLabel="Análise do vilão do mês"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 40%, transparent)' }}
    >
      <div className="gap-sm flex items-start" aria-live="polite">
        <TbAlertTriangle color="#d6b628" size={30} />
        <p className="text-text text-xl">{copy}</p>
      </div>
    </Card>
  )
}
