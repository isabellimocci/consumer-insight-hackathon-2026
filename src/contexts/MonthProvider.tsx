import { getAvailableMonths } from '@services/transactionService'
import { useCallback, useMemo, useState } from 'react'

import { MonthContext } from './MonthContext'

export function MonthProvider({ children }: { children: React.ReactNode }) {
  const [transactionsVersion, setTransactionsVersion] = useState(0)

  const availableMonths = useMemo(() => getAvailableMonths(), [transactionsVersion])

  const [selectedMonth, setSelectedMonth] = useState<string>(() => availableMonths.at(-1) ?? '')

  const refreshTransactions = useCallback(() => setTransactionsVersion((v) => v + 1), [])

  const value = useMemo(
    () => ({
      selectedMonth,
      setSelectedMonth,
      availableMonths,
      transactionsVersion,
      refreshTransactions,
    }),
    [selectedMonth, availableMonths, transactionsVersion, refreshTransactions],
  )

  return <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
}
