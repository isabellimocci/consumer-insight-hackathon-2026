import { BudgetTotalIndicator } from '@components/BudgetTotalIndicator'
import { Button } from '@components/Button'
import { CategorySliderItem } from '@components/CategorySliderItem'
import { IncomeInput } from '@components/IncomeInput'
import { SuggestedBudgetCard } from '@components/SuggestedBudgetCard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'
import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { getSuggestedBudget } from '@services/budgetService'
import { ROUTES } from '@utils/routes'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { BudgetAdjustments, Category } from '../types'
import { CATEGORIES } from '../types'

export default function OrcamentoPage() {
  const { selectedMonth } = useMonth()
  const {
    activeGoalPercents,
    income,
    setIncome,
    updateCategoryPercent,
    applyBudget,
    getCategoryStatus,
  } = useBudget()
  const navigate = useNavigate()

  const [localIncome, setLocalIncome] = useState(income?.amount ?? 0)
  const [showDialog, setShowDialog] = useState(false)
  const [startMonth, setStartMonth] = useState(selectedMonth)

  const suggested = useMemo(() => getSuggestedBudget(), [])

  const derivedPercents = useMemo<BudgetAdjustments>(
    () => ({ ...suggested, ...activeGoalPercents }),
    [activeGoalPercents, suggested],
  )

  const [localPercents, setLocalPercents] = useState<BudgetAdjustments>(derivedPercents)
  const [prevMonthState, setPrevMonthState] = useState(selectedMonth)
  const [prevDerived, setPrevDerived] = useState(derivedPercents)

  if (prevDerived !== derivedPercents || prevMonthState !== selectedMonth) {
    setPrevDerived(derivedPercents)
    setPrevMonthState(selectedMonth)
    setLocalPercents(derivedPercents)
  }

  const totalAllocated = useMemo(
    () => CATEGORIES.reduce((s, cat) => s + (localPercents[cat] ?? suggested[cat] ?? 0), 0),
    [localPercents, suggested],
  )

  const handleSliderChange = (category: Category, pct: number) => {
    const newPercents = { ...localPercents, [category]: pct }
    setLocalPercents(newPercents)
    updateCategoryPercent(category, pct)
  }

  const handleApply = () => {
    setStartMonth(selectedMonth)
    setShowDialog(true)
  }

  const handleConfirm = () => {
    setIncome(localIncome)
    applyBudget(startMonth)
    setShowDialog(false)
    void navigate(ROUTES.DASHBOARD)
  }

  return (
    <div className="gap-md px-md py-lg mx-auto flex max-w-2xl flex-col">
      <div className="gap-xs flex flex-col">
        <h1 className="text-text text-(length:--font-size-xl) font-bold">💰 Definir Orçamento</h1>
        <p className="text-(length:--font-size-sm) text-(--color-inactive-text)">
          Defina sua renda e distribua seu orçamento por categoria. Vamos juntas acompanhar o que
          realmente importa!
        </p>
      </div>

      <div className="bg-surface p-md rounded-2xl shadow-sm">
        <IncomeInput month={selectedMonth} value={localIncome} onChange={setLocalIncome} />
      </div>

      {localIncome > 0 && <SuggestedBudgetCard income={localIncome} suggested={suggested} />}

      <div className="gap-md bg-surface p-md flex flex-col rounded-2xl shadow-sm">
        <p className="text-text text-(length:--font-size-base) font-semibold">
          Ajuste por categoria
        </p>
        {CATEGORIES.map((cat) => (
          <CategorySliderItem
            key={cat}
            category={cat}
            userPercent={localPercents[cat] ?? suggested[cat] ?? 0}
            income={localIncome}
            status={getCategoryStatus(cat)}
            onChange={(pct) => handleSliderChange(cat, pct)}
          />
        ))}
        <BudgetTotalIndicator total={totalAllocated} />
      </div>

      <Button
        variant="primary"
        label="Aplicar orçamento"
        onClick={handleApply}
        ariaLabel="Aplicar orçamento e ir para o Dashboard"
        disabled={totalAllocated !== 100 || localIncome <= 0}
        className="w-full"
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="h-full! max-w-full! rounded-none md:h-auto! md:max-w-2xl! md:rounded-xl">
          <DialogHeader>
            <DialogTitle>A partir de qual mês?</DialogTitle>
            <DialogDescription>
              A alteração nas metas entrará em vigor a partir do mês selecionado. Meses anteriores
              manterão as metas anteriores.
            </DialogDescription>
          </DialogHeader>
          <input
            type="month"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="w-full rounded border p-2"
          />
          <DialogFooter>
            <Button variant="ghost" label="Cancelar" onClick={() => setShowDialog(false)} />
            <Button variant="primary" label="Confirmar" onClick={handleConfirm} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
