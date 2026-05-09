import { CategoryFilter } from '@components/CategoryFilter'
import { ConfirmarDelecaoModal } from '@components/ConfirmarDelecaoModal'
import { EditarTransacaoModal } from '@components/EditarTransacaoModal'
import { MonthVariationBanner } from '@components/MonthVariationBanner'
import { TotalFiltered } from '@components/TotalFiltered'
import { TransactionCard } from '@components/TransactionCard'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getTransactionsByMonth } from '@services/transactionService'
import { getAvailableMonths } from '@services/transactionService'
import { getTotalByCategory } from '@utils/aggregations'
import { CATEGORY_ICONS_PI } from '@utils/categoryMaps'
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

  const availableMonths = useMemo(() => getAvailableMonths(), [])

  const previousMonth = useMemo(() => {
    const idx = availableMonths.indexOf(selectedMonth)
    return idx > 0 ? availableMonths[idx - 1] : null
  }, [selectedMonth, availableMonths])

  const currentTxs = useMemo(
    () => getTransactionsByMonth(selectedMonth),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMonth, transactionsVersion],
  )

  const previousTxs = useMemo(
    () => (previousMonth ? getTransactionsByMonth(previousMonth) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previousMonth, transactionsVersion],
  )

  const currentTotal = useMemo(() => currentTxs.reduce((s, t) => s + t.amount, 0), [currentTxs])
  const previousTotal = useMemo(() => previousTxs.reduce((s, t) => s + t.amount, 0), [previousTxs])
  const totalVariation = useMemo(() => {
    if (previousTotal === 0) return 0
    return Math.round(((currentTotal - previousTotal) / previousTotal) * 1000) / 10
  }, [currentTotal, previousTotal])

  const totalBudget = useMemo(
    () =>
      isConfigured
        ? (currentBudget?.categories.reduce((s, c) => s + c.targetAmount, 0) ?? undefined)
        : undefined,
    [isConfigured, currentBudget],
  )

  return (
    <div className="px-md mx-6 flex h-full flex-col gap-4 overflow-hidden pb-8" aria-live="polite">
      <div className="m-2 flex flex-1 flex-col gap-1">
        <div className="mb-8 flex flex-col items-start scroll-auto">
          <h1 className="text-text text-2xl font-bold">Transações</h1>
          <div className="flex">
            <span className="text-(--color-inactive-text)">{transactions.length} transações ·</span>
            &nbsp;
            <TotalFiltered
              filteredTotal={filteredTotal}
              monthTotal={monthTotal}
              selectedCategory={selectedCategory}
              targetAmount={categoryTargetAmount ?? totalBudget}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <section className="max-h-75 flex-1 flex-col gap-3">
            <MonthVariationBanner
              currentTotal={currentTotal}
              previousTotal={previousTotal}
              variationPercent={totalVariation}
              previousMonth={previousMonth}
              totalBudget={isConfigured ? totalBudget : undefined}
            />
            <div className="mt-6">
              <p className="shrink-0 pb-4 text-sm font-semibold text-(--color-text)">
                Filtrar por categoria
              </p>
              <CategoryFilter
                categories={availableCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </section>
          <section className="w-full flex-2 flex-col">
            <p className="mb-3 shrink-0 text-sm font-semibold text-(--color-text)">
              Todas as transações · {transactions.length} transações
            </p>
            <div
              className="max-h-[70vh] w-full flex-1 overflow-y-auto pr-3"
              style={{ scrollbarColor: 'var(--color-success) transparent', scrollbarWidth: 'thin' }}
            >
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
            </div>
          </section>
        </div>
      </div>

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
