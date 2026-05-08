import { CategoryFilter } from '@components/CategoryFilter'
import { ConfirmarDelecaoModal } from '@components/ConfirmarDelecaoModal'
import { EditarTransacaoModal } from '@components/EditarTransacaoModal'
import { MonthSummaryHeader } from '@components/MonthSummaryHeader'
import { TotalFiltered } from '@components/TotalFiltered'
import { TransactionCard } from '@components/TransactionCard'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getTransactionsByMonth } from '@services/transactionService'
import { getTotalByCategory } from '@utils/aggregations'
import { CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { formatMonthLabel } from '@utils/formatters'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { Category, Transaction } from '../types'

const VALID_CATEGORIES = Object.keys(CATEGORY_ICONS_PI) as Category[]
function parseCategory(s: string | null): Category | null {
  return s && (VALID_CATEGORIES as string[]).includes(s) ? (s as Category) : null
}

export default function TransacoesPage() {
  const { selectedMonth, transactionsVersion } = useMonth()
  const { currentBudget, isConfigured } = useBudget()
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() =>
    parseCategory(searchParams.get('categoria')),
  )
  const [prevMonth, setPrevMonth] = useState(selectedMonth)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null)

  if (prevMonth !== selectedMonth) {
    setPrevMonth(selectedMonth)
    setSelectedCategory(null)
  }

  const transactions = useMemo(
    () => getTransactionsByMonth(selectedMonth),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMonth, transactionsVersion],
  )

  const availableCategories = useMemo(
    () => getTotalByCategory(transactions).map((t) => t.category),
    [transactions],
  )

  const filteredTransactions = useMemo(() => {
    const base = selectedCategory
      ? transactions.filter((t) => t.category === selectedCategory)
      : transactions
    return [...base].sort((a, b) => b.date.localeCompare(a.date))
  }, [transactions, selectedCategory])

  const monthTotal = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  )

  const filteredTotal = useMemo(
    () => filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions],
  )

  const categoryTargetAmount = useMemo(() => {
    if (!isConfigured || !selectedCategory) return undefined
    return currentBudget?.categories.find((c) => c.category === selectedCategory)?.targetAmount
  }, [isConfigured, selectedCategory, currentBudget])

  const totalBudget = useMemo(
    () =>
      isConfigured
        ? (currentBudget?.categories.reduce((s, c) => s + c.targetAmount, 0) ?? undefined)
        : undefined,
    [isConfigured, currentBudget],
  )

  return (
    <div className="gap-md px-md py-lg mx-auto flex max-w-2xl flex-col">
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
        className="gap-sm flex flex-col"
      >
        {filteredTransactions.length === 0 ? (
          <li role="listitem" className="py-lg text-center text-(--color-inactive-text)">
            Nenhuma transação em {selectedCategory} este mês.
          </li>
        ) : (
          filteredTransactions.map((tx) => (
            <li key={tx.id} role="listitem">
              <TransactionCard
                transaction={tx}
                onEdit={() => setEditingTransaction(tx)}
                onDelete={() => setDeletingTransaction(tx)}
              />
            </li>
          ))
        )}
      </ul>

      <TotalFiltered
        filteredTotal={filteredTotal}
        monthTotal={monthTotal}
        selectedCategory={selectedCategory}
        targetAmount={categoryTargetAmount ?? totalBudget}
      />

      {editingTransaction && (
        <EditarTransacaoModal
          open
          transaction={editingTransaction}
          month={selectedMonth}
          onClose={() => setEditingTransaction(null)}
        />
      )}
      <ConfirmarDelecaoModal
        open={deletingTransaction !== null}
        transaction={deletingTransaction}
        month={selectedMonth}
        onClose={() => setDeletingTransaction(null)}
      />
    </div>
  )
}
