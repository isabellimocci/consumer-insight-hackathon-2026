import { Badge } from '@components/Badge'
import { CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'
import type React from 'react'
import { AiFillAlert } from 'react-icons/ai'

import type { VilaoResult } from '../types'

interface VilaoHeroCardProps {
  vilao: VilaoResult
  style: React.CSSProperties
}

export function VilaoHeroCard({ vilao, style }: VilaoHeroCardProps) {
  const varianceLabel = `+${vilao.variancePercent}% acima da meta`
  const growthLabel =
    (vilao.growthPercent > 0 ? '+' : '') + vilao.growthPercent + '% vs mês anterior'
  const IconComponent = CATEGORY_ICONS_PI[vilao.category]

  return (
    <div
      className="gap-sm p-md flex flex-col items-center rounded-2xl shadow-sm"
      style={style}
      aria-label={`Vilão do mês: ${vilao.category}`}
    >
      <Badge
        label={
          <>
            <p>Vilão do mês</p>
            <AiFillAlert />
          </>
        }
        color="danger"
      />
      <div className={'flex w-full justify-center rounded-full'}>
        <IconComponent
          size={80}
          aria-hidden={true}
          style={{
            color: 'var(--color-danger)',
            backgroundColor: `color-mix(in srgb, #ee6a6a 20%, transparent)`,
            padding: 15,
            borderRadius: 1000,
          }}
        />
      </div>
      <p className="text-text text-xl font-bold md:text-(length:--font-size-xl)">
        {vilao.category}
      </p>
      <p className="text-danger text-4xl font-bold md:text-(length:--font-size-2xl)">
        +{formatCurrency(vilao.variance)}
      </p>
      <p className="text-base text-(--color-inactive-text) md:text-(length:--font-size-sm)">
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
