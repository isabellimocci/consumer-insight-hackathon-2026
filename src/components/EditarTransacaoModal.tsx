import { Dialog, DialogClose, DialogContent } from '@components/ui/dialog'
import { useMonth } from '@contexts/useMonth'
import { updateTransaction } from '@services/transactionService'
import { CATEGORY_COLORS, CATEGORY_ICONS_BOLD_PI, CATEGORY_ICONS_PI } from '@utils/categoryMaps'
import { useState } from 'react'
import { PiX } from 'react-icons/pi'

import type { Category, Transaction } from '../types'
import { CATEGORIES } from '../types'

interface Props {
  open: boolean
  onClose: () => void
  transaction: Transaction
  month: string
}

export function EditarTransacaoModal({ open, onClose, transaction, month }: Props) {
  const { refreshTransactions } = useMonth()

  const [description, setDescription] = useState(transaction.description)
  const [amount, setAmount] = useState(String(transaction.amount))
  const [date, setDate] = useState(transaction.date)
  const [category, setCategory] = useState<Category>(transaction.category)
  const [subcategory, setSubcategory] = useState(transaction.subcategory)

  const isValid = description.trim() !== '' && parseFloat(amount) > 0

  const handleSubmit = () => {
    if (!isValid) return
    updateTransaction(transaction.id, month, {
      date,
      category,
      subcategory,
      description: description.trim(),
      amount: parseFloat(amount),
    })
    refreshTransactions()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="flex h-full! max-w-full! flex-col gap-0 rounded-none p-0 md:h-auto! md:max-w-3xl! md:rounded-2xl"
      >
        {/* Header fixo */}
        <div className="flex items-center justify-between border-b border-(--color-inactive-bg-dark) px-6 pt-6 pb-4">
          <h2 className="text-text text-xl font-bold tracking-tight">Editar gasto</h2>
          <DialogClose asChild>
            <button className="hover:text-text rounded-lg p-1 text-(--color-inactive-text) transition-colors">
              <PiX size={20} />
              <span className="sr-only">Fechar</span>
            </button>
          </DialogClose>
        </div>

        {/* Corpo scrollável */}
        <div className="gap-md flex flex-1 flex-col overflow-y-auto px-6 py-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-(--color-inactive-text)">
              Descrição *
            </span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: iFood, Uber, Netflix..."
              className="bg-card text-text focus:ring-text w-full rounded-xl border border-(--color-inactive-bg-dark) px-4 py-3 outline-none placeholder:text-(--color-inactive-text) focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="text-text mb-1.5 block text-sm font-semibold">Valor *</span>
            <div className="bg-card flex items-center gap-2 rounded-xl border border-(--color-inactive-bg-dark) px-4 py-3 focus-within:ring-2 focus-within:ring-(--color-text)">
              <span className="text-lg font-bold text-(--color-inactive-text)">R$</span>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="text-text w-full bg-transparent text-2xl font-bold outline-none placeholder:text-(--color-inactive-text)"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-(--color-inactive-text)">
              Data
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-card text-text focus:ring-text w-full rounded-xl border border-(--color-inactive-bg-dark) px-4 py-3 outline-none focus:ring-2"
            />
          </label>

          <div>
            <span className="mb-2 block text-sm font-semibold text-(--color-inactive-text)">
              Categoria *
            </span>
            <div className="relative">
              <div className="from-popover pointer-events-none absolute top-0 right-0 z-10 h-full w-10 bg-gradient-to-l to-transparent" />
              <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat
                  const IconComponent = isActive
                    ? CATEGORY_ICONS_BOLD_PI[cat]
                    : CATEGORY_ICONS_PI[cat]
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className="flex min-w-[72px] shrink-0 flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150"
                      style={{
                        backgroundColor: isActive ? CATEGORY_COLORS[cat] : 'var(--color-card)',
                        color: isActive ? '#fff' : 'var(--color-inactive-text)',
                        border: `2px solid ${isActive ? CATEGORY_COLORS[cat] : 'var(--color-inactive-bg-dark)'}`,
                      }}
                    >
                      <IconComponent
                        size={22}
                        style={{ color: isActive ? '#fff' : CATEGORY_COLORS[cat] }}
                      />
                      <span>{cat}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-(--color-inactive-text)">
              Subcategoria <span className="text-xs opacity-60">(opcional)</span>
            </span>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="Ex: Delivery, Combustível..."
              className="bg-card text-text focus:ring-text w-full rounded-xl border border-(--color-inactive-bg-dark) px-4 py-3 outline-none placeholder:text-(--color-inactive-text) focus:ring-2"
            />
          </label>
        </div>

        {/* Footer sticky */}
        <div className="border-t border-(--color-inactive-bg-dark) px-6 py-5">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="bg-text text-bg w-full rounded-xl px-6 py-3.5 text-base font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Salvar alterações
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
