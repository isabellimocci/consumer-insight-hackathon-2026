import { useState } from 'react'

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

function formatCents(cents: number): string {
  if (cents === 0) return ''
  const str = cents.toString().padStart(3, '0')
  const dec = str.slice(-2)
  const int = str.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return int + ',' + dec
}

export function IncomeInput({ month, value, onChange }: IncomeInputProps) {
  const [prevValue, setPrevValue] = useState(value)
  const [display, setDisplay] = useState(() => formatCents(Math.round(value * 100)))

  if (prevValue !== value) {
    setPrevValue(value)
    setDisplay(formatCents(Math.round(value * 100)))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '')
    const cents = parseInt(digits || '0', 10)
    setDisplay(formatCents(cents))
    onChange(cents / 100)
  }

  return (
    <div className="gap-xs flex flex-col">
      <label htmlFor="income-input" className="text-sm font-semibold text-white/90">
        Minha renda em {formatMonthLabel(month)}
      </label>
      <div className="relative flex items-center">
        <span className="left-sm absolute text-(length:--font-size-base) text-white/60">R$</span>
        <input
          id="income-input"
          type="text"
          inputMode="numeric"
          value={display}
          onChange={handleChange}
          placeholder="0,00"
          aria-label={`Renda mensal em ${formatMonthLabel(month)}`}
          aria-live="polite"
          className="py-sm pr-sm w-full rounded-xl border border-white/20 bg-white/10 pl-14 text-(length:--font-size-base) text-white outline-none placeholder:text-white/40 focus:border-white/50 focus:ring-2 focus:ring-white/30"
          style={{ transition: 'border-color 150ms ease, box-shadow 150ms ease' }}
        />
      </div>
    </div>
  )
}
