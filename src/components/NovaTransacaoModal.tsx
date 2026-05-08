import { Dialog, DialogContent } from '@components/ui/dialog'
import { useMonth } from '@contexts/useMonth'
import { addTransaction } from '@services/transactionService'
import { autoCategorizacao } from '@utils/autoCategorize'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@utils/categoryMaps'
import { ROUTES } from '@utils/routes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Category } from '../types'
import { CATEGORIES } from '../types'

interface Props {
  open: boolean
  onClose: () => void
}

export function NovaTransacaoModal({ open, onClose }: Props) {
  const { refreshTransactions } = useMonth()
  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategory, setSubcategory] = useState('')
  const [categoryTouched, setCategoryTouched] = useState(false)

  const handleClose = () => {
    setDescription('')
    setAmount('')
    const d = new Date()
    setDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    )
    setCategory(null)
    setSubcategory('')
    setCategoryTouched(false)
    onClose()
  }

  const handleDescriptionChange = (val: string) => {
    setDescription(val)
    if (!categoryTouched) {
      const suggested = autoCategorizacao(val)
      if (suggested) setCategory(suggested)
    }
  }

  const isValid = description.trim() !== '' && parseFloat(amount) > 0 && category !== null

  const handleSubmit = () => {
    if (!isValid || category === null) return
    addTransaction({
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="h-full! max-w-full! rounded-none md:h-auto! md:max-w-3xl! md:rounded-xl">
        <div className="gap-md flex flex-col">
          <h1 className="text-text text-2xl font-bold">Novo gasto</h1>

          <div className="gap-sm flex flex-col">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-(--color-inactive-text)">
                Descrição *
              </span>
              <input
                type="text"
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Ex: iFood, Uber, Netflix..."
                className="border-card bg-card text-text focus:ring-text w-full rounded-xl border px-4 py-3 outline-none placeholder:text-(--color-inactive-text) focus:ring-2"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-(--color-inactive-text)">
                Valor *
              </span>
              <div className="border-card bg-card flex items-center gap-2 rounded-xl border px-4 py-3">
                <span className="font-semibold text-(--color-inactive-text)">R$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className="text-text w-full bg-transparent text-lg font-semibold outline-none placeholder:text-(--color-inactive-text)"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-(--color-inactive-text)">
                Data
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-card bg-card text-text focus:ring-text w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
              />
            </label>

            <div>
              <span className="mb-2 block text-sm font-medium text-(--color-inactive-text)">
                Categoria *
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {CATEGORIES.map((cat) => {
                  const isActive = category !== null && category === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat)
                        setCategoryTouched(true)
                      }}
                      className="flex shrink-0 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                      style={{
                        backgroundColor: isActive ? CATEGORY_COLORS[cat] : 'var(--color-card)',
                        color: isActive ? '#fff' : 'var(--color-inactive-text)',
                        border: `2px solid ${isActive ? CATEGORY_COLORS[cat] : 'transparent'}`,
                      }}
                    >
                      <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
                      <span>{cat}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-(--color-inactive-text)">
                Subcategoria (opcional)
              </span>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="Ex: Delivery, Combustível..."
                className="border-card bg-card text-text focus:ring-text w-full rounded-xl border px-4 py-3 outline-none placeholder:text-(--color-inactive-text) focus:ring-2"
              />
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="bg-text text-bg mt-2 w-full rounded-full px-6 py-3 font-semibold transition-opacity disabled:opacity-40"
          >
            Adicionar gasto
          </button>

          <p className="text-center text-xs text-(--color-inactive-text)">
            Navegue para{' '}
            <button
              onClick={() => {
                void navigate(ROUTES.RENDA)
                handleClose()
              }}
              className="hover:text-text underline"
            >
              configurar sua renda
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
