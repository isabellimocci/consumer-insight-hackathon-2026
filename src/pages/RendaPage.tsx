import { useBudget } from '@contexts/useBudget'
import { useMonth } from '@contexts/useMonth'
import { formatMonthLabel } from '@utils/formatters'
import { ROUTES } from '@utils/routes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RendaPage() {
  const { selectedMonth } = useMonth()
  const { setIncome } = useBudget()
  const navigate = useNavigate()
  const [rawValue, setRawValue] = useState('')

  const parsed = parseFloat(rawValue)
  const isValid = rawValue !== '' && !isNaN(parsed) && parsed > 0

  const handleContinue = () => {
    if (!isValid) return
    setIncome(parsed)
    void navigate(ROUTES.ORCAMENTO)
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col items-center justify-center gap-[var(--spacing-lg)] px-[var(--spacing-md)]">
      <div className="text-5xl">💰</div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Qual é a sua renda em {formatMonthLabel(selectedMonth)}?
        </h1>
        <p className="mt-2 text-sm text-[var(--color-inactive-text)]">
          Informe o valor líquido (já descontado impostos)
        </p>
      </div>

      <div className="w-full rounded-2xl bg-[var(--color-card)] p-[var(--spacing-lg)] shadow-sm">
        <label className="mb-2 block text-sm font-medium text-[var(--color-inactive-text)]">
          Renda mensal
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[var(--color-inactive-text)]">R$</span>
          <input
            type="number"
            inputMode="decimal"
            aria-label="Campo de renda mensal"
            placeholder="0,00"
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            className="w-full bg-transparent text-2xl font-bold text-[var(--color-text)] outline-none placeholder:text-[var(--color-inactive-text)]"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full rounded-full bg-[var(--color-text)] px-6 py-3 font-semibold text-[var(--color-bg)] transition-opacity disabled:opacity-40"
        >
          Continuar →
        </button>
        <button
          onClick={() => void navigate(ROUTES.DASHBOARD)}
          className="w-full rounded-full px-6 py-3 text-sm font-medium text-[var(--color-inactive-text)] hover:text-[var(--color-text)]"
        >
          Pular por agora
        </button>
      </div>
    </div>
  )
}
