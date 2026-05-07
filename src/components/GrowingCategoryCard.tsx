import { CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatCurrency } from '@utils/formatters'

import type { GrowingCategoryResult, MonthData } from '../types'

interface GrowingCategoryCardProps {
  result: GrowingCategoryResult | null
  allMonthsData: MonthData[]
}

const MONTH_ABBR: Record<string, string> = {
  '01': 'Jan',
  '02': 'Fev',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'Mai',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Set',
  '10': 'Out',
  '11': 'Nov',
  '12': 'Dez',
}

function shortMonthLabel(monthStr: string): string {
  const part = monthStr.split('-')[1]
  return MONTH_ABBR[part] ?? monthStr
}

export function GrowingCategoryCard({ result, allMonthsData }: GrowingCategoryCardProps) {
  if (!result) return null

  const last3 = allMonthsData.slice(-3)

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-[var(--spacing-md)]"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        <span className="text-[length:var(--font-size-base)] font-bold text-[var(--color-text)]">
          {result.category} {CATEGORY_ICONS[result.category]} crescendo
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1 text-[length:var(--font-size-sm)] text-[var(--color-text)]">
        {last3.map((m, i) => (
          <span key={m.month} className="flex items-center gap-1">
            <span className="font-semibold">{shortMonthLabel(m.month)}</span>
            <span>{formatCurrency(result.totals[i])}</span>
            {i < 2 && <span className="text-[var(--color-inactive-text)]">→</span>}
          </span>
        ))}
      </div>

      <span className="text-[length:var(--font-size-sm)] text-[var(--color-text)]">
        Taxa de crescimento médio:{' '}
        <span className="font-bold">{result.growthRate.toFixed(1)}% ao mês</span>
      </span>

      <span className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
        {result.category} cresceu 3 meses seguidos. Está na hora de prestar atenção.
      </span>
    </div>
  )
}
