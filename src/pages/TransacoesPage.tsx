import { CategoryFilter } from '@components/CategoryFilter'
import { MonthSummaryHeader } from '@components/MonthSummaryHeader'
import { TotalFiltered } from '@components/TotalFiltered'
import { TransactionCard } from '@components/TransactionCard'
import { useMonth } from '@contexts/useMonth'
import { getTransactionsByMonth } from '@services/transactionService'
import { getTotalByCategory } from '@utils/aggregations'
import { CATEGORY_ICONS } from '@utils/categoryMaps'
import { formatMonthLabel } from '@utils/formatters'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { Category } from '../types'

const VALID_CATEGORIES = Object.keys(CATEGORY_ICONS) as Category[]
function parseCategory(s: string | null): Category | null {
  return s && (VALID_CATEGORIES as string[]).includes(s) ? (s as Category) : null
}

export default function TransacoesPage() {
  const { selectedMonth } = useMonth()
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() =>
    parseCategory(searchParams.get('categoria')),
  )
  const [prevMonth, setPrevMonth] = useState(selectedMonth)

  if (prevMonth !== selectedMonth) {
    setPrevMonth(selectedMonth)
    setSelectedCategory(null)
  }

  const transactions = useMemo(() => getTransactionsByMonth(selectedMonth), [selectedMonth])

  const availableCategories = useMemo(
    () => getTotalByCategory(transactions).map((t) => t.category),
    [transactions],
  )

  const filteredTransactions = useMemo(
    () =>
      selectedCategory ? transactions.filter((t) => t.category === selectedCategory) : transactions,
    [transactions, selectedCategory],
  )

  const monthTotal = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  )

  const filteredTotal = useMemo(
    () => filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions],
  )

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-lg)]">
      <MonthSummaryHeader
        monthLabel={formatMonthLabel(selectedMonth)}
        totalAmount={monthTotal}
        transactionCount={transactions.length}
      />

      <CategoryFilter
        categories={availableCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <ul
        role="list"
        aria-label="Lista de transações"
        aria-live="polite"
        className="flex flex-col gap-[var(--spacing-sm)]"
      >
        {filteredTransactions.length === 0 ? (
          <li
            role="listitem"
            className="py-[var(--spacing-lg)] text-center text-[var(--color-inactive-text)]"
          >
            Nenhuma transação em {selectedCategory} este mês.
          </li>
        ) : (
          filteredTransactions.map((tx) => (
            <li key={tx.id} role="listitem">
              <TransactionCard transaction={tx} />
            </li>
          ))
        )}
      </ul>

      <TotalFiltered
        filteredTotal={filteredTotal}
        monthTotal={monthTotal}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}
