import { Button } from '@components/Button'
import { ROUTES } from '@utils/routes'
import { useNavigate } from 'react-router-dom'

export function VilaoVazio() {
  const navigate = useNavigate()
  return (
    <div
      className="gap-md mx-auto flex h-[80vh] max-w-2xl flex-col items-center justify-center px-4 text-center"
      aria-live="polite"
    >
      <span aria-hidden="true" style={{ fontSize: '4rem', lineHeight: 1 }}>
        🎉
      </span>
      <h2 className="text-text text-2xl font-bold text-balance md:text-4xl lg:text-5xl">
        Você ficou dentro de todas as metas!
      </h2>
      <p className="text-base text-(--color-inactive-text) md:text-(length:--font-size-base)">
        Esse mês foi de mestre.
        <br />
        Continue assim.
      </p>
      <Button
        variant="primary"
        label="Ver meus gastos"
        onClick={() => void navigate(ROUTES.TRANSACOES)}
        ariaLabel="Ver lista de transações do mês"
        className="bg-[#364935] px-3 py-2 text-(--color-primary) transition-all hover:bg-[#486147]"
      />
    </div>
  )
}
