import { getAvailableMonths } from '@services/transactionService'
import { useMemo, useState } from 'react'

import { MonthContext } from './MonthContext'

export function MonthProvider({ children }: { children: React.ReactNode }) {
  const availableMonths = useMemo(() => getAvailableMonths(), [])

  const [selectedMonth, setSelectedMonth] = useState<string>(() => availableMonths.at(-1) ?? '')

  const value = useMemo(
    () => ({
      selectedMonth,
      setSelectedMonth,
      availableMonths,
    }),
    [selectedMonth, availableMonths],
  )

  return <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
}
