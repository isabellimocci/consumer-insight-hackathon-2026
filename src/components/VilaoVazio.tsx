import { Button } from '@components/Button'
import { ROUTES } from '@utils/routes'
import { useNavigate } from 'react-router-dom'

import { MonthSelector } from './MonthSelector'

export function VilaoVazio() {
  const navigate = useNavigate()
  return (
    <div
      className="mx-auto flex max-w-2xl flex-col items-center gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-xl)] text-center"
      aria-live="polite"
    >
      <span className="flex items-center">
        <MonthSelector />
      </span>
      <span aria-hidden="true" style={{ fontSize: '4rem', lineHeight: 1 }}>
        🎉
      </span>
      <h2 className="text-[length:var(--font-size-xl)] font-bold text-[var(--color-text)]">
        Você ficou dentro de todas as metas!
      </h2>
      <p className="text-[length:var(--font-size-base)] text-[var(--color-inactive-text)]">
        Esse mês foi de mestre. Continue assim.
      </p>
      <Button
        variant="primary"
        label="Ver meus gastos"
        onClick={() => void navigate(ROUTES.TRANSACOES)}
        ariaLabel="Ver lista de transações do mês"
      />
    </div>
  )
}
