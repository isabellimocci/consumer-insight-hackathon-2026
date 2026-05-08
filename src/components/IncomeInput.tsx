interface IncomeInputProps {
  month: string
  value: number
  onChange: (v: number) => void
}

const MONTH_NAMES: Record<string, string> = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro',
}

function formatMonthLabel(month: string): string {
  const [year, mm] = month.split('-')
  return `${MONTH_NAMES[mm] ?? mm} de ${year}`
}

export function IncomeInput({ month, value, onChange }: IncomeInputProps) {
  const displayValue = value === 0 ? '' : value.toString()

  return (
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <label
        htmlFor="income-input"
        className="text-[length:var(--font-size-sm)] font-medium text-[var(--color-text)]"
      >
        Minha renda em {formatMonthLabel(month)}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-[var(--spacing-sm)] text-[length:var(--font-size-base)] text-[var(--color-inactive-text)]">
          R$
        </span>
        <input
          id="income-input"
          type="number"
          min={0}
          step={1}
          value={displayValue}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          placeholder="0,00"
          aria-label={`Renda mensal em ${formatMonthLabel(month)}`}
          aria-live="polite"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--spacing-sm)] pr-[var(--spacing-sm)] pl-10 text-[length:var(--font-size-base)] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{ transition: 'border-color 150ms ease, box-shadow 150ms ease' }}
        />
      </div>
    </div>
  )
}
