import { useMonth } from '@contexts/useMonth'
import { useEffect, useState } from 'react'

import { Carousel } from './Carousel'
import { cn } from './lib/utils'
import { type CarouselApi } from './ui/carousel'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-').map(Number)
  const label = monthFormatter.format(new Date(year, month - 1))
  const shortYear = String(year).slice(-2)
  return `${label.charAt(0).toUpperCase() + label.slice(1)}/${shortYear}`
}

export const MonthSelector: React.FC = () => {
  const { selectedMonth, setSelectedMonth, availableMonths } = useMonth()
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return
    const index = availableMonths.indexOf(selectedMonth)
    if (index !== -1) api.scrollTo(index)
  }, [api, selectedMonth, availableMonths])

  useEffect(() => {
    if (!api) return
    const handler = () => {
      const index = api.selectedScrollSnap()
      setSelectedMonth(availableMonths[index])
    }
    api.on('select', handler)
    return () => {
      api.off('select', handler)
    }
  }, [api, availableMonths, setSelectedMonth])

  return (
    <Carousel
      aria-label="Selecionar mês"
      setApi={setApi}
      opts={{ align: 'center', loop: false }}
      className={cn('w-50')}
    >
      {availableMonths.map((month) => {
        return (
          <div
            key={month}
            className={cn(
              'transition-all duration-300 select-none',
              'w-full py-2 text-center whitespace-nowrap',
            )}
          >
            {formatMonth(month)}
          </div>
        )
      })}
    </Carousel>
  )
}
