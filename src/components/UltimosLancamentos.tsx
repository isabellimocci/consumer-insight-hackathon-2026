import { ConfirmarDelecaoModal } from '@components/ConfirmarDelecaoModal'
import { EditarTransacaoModal } from '@components/EditarTransacaoModal'
import { TransactionCard } from '@components/TransactionCard'
import { getTransactionsByMonth } from '@services/transactionService'
import { useState } from 'react'

import type { Transaction } from '../types'

interface Props {
  month: string
}

export function UltimosLancamentos({ month }: Props) {
  const [editando, setEditando] = useState<Transaction | null>(null)
  const [deletando, setDeletando] = useState<Transaction | null>(null)

  const transactions = getTransactionsByMonth(month)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <p className="shrink-0 font-semibold text-(--color-text)">Últimos lançamentos</p>
      <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {transactions.map((t) => (
          <li key={t.id}>
            <TransactionCard
              transaction={t}
              onEdit={() => setEditando(t)}
              onDelete={() => setDeletando(t)}
            />
          </li>
        ))}
        {transactions.length === 0 && (
          <li className="py-8 text-center text-sm text-(--color-inactive-text)">
            Nenhum lançamento neste mês.
          </li>
        )}
      </ul>

      {editando && (
        <EditarTransacaoModal
          open={true}
          transaction={editando}
          month={month}
          onClose={() => setEditando(null)}
        />
      )}
      {deletando && (
        <ConfirmarDelecaoModal
          open={true}
          transaction={deletando}
          month={month}
          onClose={() => setDeletando(null)}
        />
      )}
    </div>
  )
}
