import {
  Carousel as SCarousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselOptions,
  CarouselPrevious,
} from '@components/ui/carousel'
import * as React from 'react'

import { cn } from './lib/utils'

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  setApi?: (api: CarouselApi) => void
  opts?: CarouselOptions
}

export function Carousel({
  children,
  className,
  setApi,
  opts = { align: 'center' as const, loop: false },
}: CarouselProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-100 items-center justify-center overflow-visible',
        className,
      )}
    >
      <SCarousel
        setApi={setApi}
        opts={opts}
        className={cn('relative flex w-full max-w-80', className)}
      >
        <div className="flex items-center justify-center">
          <CarouselPrevious
            className={cn(
              'static shrink-0 translate-y-0',
              'bg-background hover:bg-muted/50 border shadow-sm',
              'mr-2',
            )}
          />
        </div>

        <div className="flex flex-1 items-center overflow-hidden">
          <CarouselContent>
            {children.map((child, index) => (
              <CarouselItem
                key={index}
                className="flex min-w-0 basis-full items-center justify-center"
              >
                <div className="w-37.5 text-center">{child}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <div className="flex items-center justify-center">
          <CarouselNext
            className={cn(
              'static shrink-0 translate-y-0',
              'bg-background hover:bg-muted/50 border shadow-sm',
              'ml-2',
            )}
          />
        </div>
      </SCarousel>
    </div>
  )
}
