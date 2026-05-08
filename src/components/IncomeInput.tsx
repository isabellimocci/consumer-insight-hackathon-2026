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
    <div className="gap-xs flex flex-col">
      <label htmlFor="income-input" className="text-text text-(length:--font-size-sm) font-medium">
        Minha renda em {formatMonthLabel(month)}
      </label>
      <div className="relative flex items-center">
        <span className="left-sm absolute text-(length:--font-size-base) text-(--color-inactive-text)">
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
          className="border-border bg-surface py-sm pr-sm text-text focus:border-primary focus:ring-primary w-full rounded-xl border pl-10 text-(length:--font-size-base) outline-none focus:ring-2"
          style={{ transition: 'border-color 150ms ease, box-shadow 150ms ease' }}
        />
      </div>
    </div>
  )
}
