import { getAvailableMonths } from '@services/transactionService'
import { useState } from 'react'

import { MonthContext } from './MonthContext'

export function MonthProvider({ children }: { children: React.ReactNode }) {
  const availableMonths = getAvailableMonths()

  const [selectedMonth, setSelectedMonth] = useState<string>(availableMonths.at(-1) ?? '')

  return (
    <MonthContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        availableMonths,
      }}
    >
      {children}
    </MonthContext.Provider>
  )
}
