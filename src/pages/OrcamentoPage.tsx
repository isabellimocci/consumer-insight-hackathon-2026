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
    <div className="flex h-full flex-col gap-4 overflow-y-auto px-4 py-4 pb-8 md:px-6 lg:px-10">
      <div className="gap-xs flex shrink-0 flex-col">
        <h1 className="text-text text-xl font-bold md:text-2xl">Meu Orçamento</h1>
        <p className="mt-1 text-xs leading-relaxed text-(--color-inactive-text) md:text-sm">
          Como usar: preencha sua renda mensal à esquerda, ajuste as porcentagens por categoria até
          o total chegar a <strong>100%</strong> e clique em <strong>Aplicar orçamento</strong> para
          salvar. A distribuição sugerida é baseada no método 50/30/20.
        </p>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:overflow-hidden">
        <div className="flex shrink-0 flex-col gap-4 lg:min-h-0 lg:flex-1">
          <div className="flex shrink-0 flex-col gap-1">
            <h2 className="text-text text-xs font-semibold tracking-wide uppercase">
              Renda mensal
            </h2>
            <div className="p-md rounded-2xl bg-[#1F2A1E]">
              <IncomeInput month={selectedMonth} value={localIncome} onChange={setLocalIncome} />
            </div>
          </div>

          {localIncome > 0 && (
            <div className="flex shrink-0 flex-col gap-1">
              <h2 className="text-text text-xs font-semibold tracking-wide uppercase">
                Distribuição sugerida
              </h2>
              <SuggestedBudgetCard income={localIncome} suggested={suggested} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
          <div className="flex min-h-0 flex-1 flex-col gap-1">
            <h2 className="text-text text-xs font-semibold tracking-wide uppercase">
              Ajuste por categoria
            </h2>
            <div className="bg-primary p-md mb-6 flex flex-col gap-6 rounded-2xl">
              <div className="flex flex-col gap-2 gap-8 overflow-y-auto lg:max-h-96">
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
        <DialogContent className="h-full max-w-full rounded-none sm:h-auto sm:max-w-2xl sm:rounded-2xl">
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
            className="bg-surface text-text focus:border-primary w-full rounded-xl border border-(--color-surface) px-3 py-2 text-sm focus:ring-2 focus:ring-white/20 focus:outline-none"
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
