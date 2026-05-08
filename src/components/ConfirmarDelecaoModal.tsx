import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { useMonth } from '@contexts/useMonth'
import { deleteTransaction } from '@services/transactionService'

import type { Transaction } from '../types'

interface Props {
  open: boolean
  onClose: () => void
  transaction: Transaction | null
  month: string
}

export function ConfirmarDelecaoModal({ open, onClose, transaction, month }: Props) {
  const { refreshTransactions } = useMonth()

  const handleConfirm = () => {
    if (!transaction) return
    deleteTransaction(transaction.id, month)
    refreshTransactions()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!h-full !max-w-full rounded-none md:!h-auto md:!max-w-2xl md:rounded-xl">
        <div className="flex flex-col gap-[var(--spacing-md)]">
          <h2 className="text-xl font-bold text-[var(--color-text)]">Excluir gasto</h2>
          <p className="text-sm text-[var(--color-inactive-text)]">
            Tem certeza que deseja excluir{' '}
            <span className="font-medium text-[var(--color-text)]">
              &ldquo;{transaction?.description}&rdquo;
            </span>
            ? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
