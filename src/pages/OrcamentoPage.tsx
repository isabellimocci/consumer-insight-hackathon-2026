import { BudgetTotalIndicator } from '@components/BudgetTotalIndicator'
import { Button } from '@components/Button'
import { CategorySliderItem } from '@components/CategorySliderItem'
import { IncomeInput } from '@components/IncomeInput'
import { SuggestedBudgetCard } from '@components/SuggestedBudgetCard'
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
    currentBudget,
    income,
    setIncome,
    updateCategoryPercent,
    applyBudget,
    getCategoryStatus,
  } = useBudget()
  const navigate = useNavigate()

  const [localIncome, setLocalIncome] = useState(income?.amount ?? 0)

  const suggested = useMemo(() => getSuggestedBudget(), [])

  const [localPercents, setLocalPercents] = useState<BudgetAdjustments>(() => {
    if (currentBudget) {
      return Object.fromEntries(currentBudget.categories.map((c) => [c.category, c.userPercent]))
    }
    return { ...suggested }
  })

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
    setIncome(localIncome)
    applyBudget()
    void navigate(ROUTES.DASHBOARD)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-lg)]">
      <div className="flex flex-col gap-[var(--spacing-xs)]">
        <h1 className="text-[length:var(--font-size-xl)] font-bold text-[var(--color-text)]">
          💰 Planejamento financeiro
        </h1>
        <p className="text-[length:var(--font-size-sm)] text-[var(--color-inactive-text)]">
          Defina sua renda e distribua seu orçamento por categoria. Vamos juntas acompanhar o que
          realmente importa!
        </p>
      </div>

      <div className="rounded-2xl bg-[var(--color-surface)] p-[var(--spacing-md)] shadow-sm">
        <IncomeInput month={selectedMonth} value={localIncome} onChange={setLocalIncome} />
      </div>

      {localIncome > 0 && <SuggestedBudgetCard income={localIncome} suggested={suggested} />}

      <div className="flex flex-col gap-[var(--spacing-md)] rounded-2xl bg-[var(--color-surface)] p-[var(--spacing-md)] shadow-sm">
        <p className="text-[length:var(--font-size-base)] font-semibold text-[var(--color-text)]">
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
    </div>
  )
}
