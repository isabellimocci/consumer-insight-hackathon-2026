import { useContext } from 'react'

import { MonthContext, type MonthContextType } from './MonthContext'

export function useMonth(): MonthContextType {
  const ctx = useContext(MonthContext)

  if (!ctx) {
    throw new Error('useMonth must be used within MonthProvider')
  }

  return ctx
}
