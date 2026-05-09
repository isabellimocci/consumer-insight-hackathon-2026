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
    <div className="px-md py-sm mx-10 flex h-full flex-col gap-4 overflow-hidden pb-8">
      <div className="gap-xs flex shrink-0 flex-col">
        <h1 className="text-text text-2xl font-bold">Meu Orçamento</h1>
        <p className="py-xs text-sm text-(--color-inactive-text)">
          Como usar: preencha sua renda mensal à esquerda, ajuste as porcentagens por categoria até
          o total chegar a <strong>100%</strong> e clique em <strong>Aplicar orçamento</strong> para
          salvar. A distribuição sugerida é baseada no método 50/30/20.
        </p>
      </div>

      <div className="gap-md mt-4 flex min-h-0 flex-1 overflow-hidden">
        <div className="gap-md flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 flex-col gap-1">
            <h2 className="text-text text-sm font-semibold">Renda mensal</h2>
            <div className="p-md rounded-2xl bg-[#1F2A1E]">
              <IncomeInput month={selectedMonth} value={localIncome} onChange={setLocalIncome} />
            </div>
          </div>

          {localIncome > 0 && (
            <div className="flex shrink-0 flex-col gap-1">
              <h2 className="text-text text-sm font-semibold">Distribuição sugerida</h2>
              <SuggestedBudgetCard income={localIncome} suggested={suggested} />
            </div>
          )}
        </div>

        <div className="gap-md flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col gap-1">
            <h2 className="text-text text-sm font-semibold">Ajuste por categoria</h2>
            <div className="gap-sm bg-primary p-md flex flex-col rounded-2xl">
              <div className="gap-sm flex max-h-96 flex-col overflow-y-auto">
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
              </div>
              <BudgetTotalIndicator total={totalAllocated} />
              <Button
                variant="primary"
                label="Aplicar orçamento"
                onClick={handleApply}
                ariaLabel="Aplicar orçamento e ir para o Dashboard"
                disabled={totalAllocated !== 100 || localIncome <= 0}
                className="w-full shrink-0"
              />
            </div>
          </div>
        </div>
      </div>

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
