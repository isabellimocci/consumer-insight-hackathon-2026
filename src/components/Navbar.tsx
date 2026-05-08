import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { ROUTES } from '@utils/routes'
import { Brain, HomeIcon, Settings, Sparkles, VenetianMask, Wallet } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: <HomeIcon size={20} /> },
  { to: ROUTES.TRANSACOES, label: 'Transações', icon: <Wallet size={20} /> },
  { to: ROUTES.VILAO, label: 'Vilão', icon: <VenetianMask size={20} /> },
  { to: ROUTES.INSIGHTS, label: 'Insights', icon: <Brain size={20} /> },
]

export function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="flex h-screen">
      <nav
        aria-label="Navegação principal"
        className="flex flex-col items-center justify-between gap-4 bg-[#1F2A1E] px-3 py-4 text-center"
      >
        <Sparkles color="#fff" size={20} />
        <section>
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `${isActive ? 'font-semibold text-[var(--color-surface)]' : 'text-muted-foreground'} my-6 flex flex-col items-center gap-2 text-xs hover:text-[var(--color-surface)]`
              }
            >
              <span className="hover:text-[var(--color-surface)]">{icon}</span>
              {label}
            </NavLink>
          ))}
        </section>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Configurações" className="text-white hover:opacity-80">
              <Settings size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuItem onClick={() => void navigate(ROUTES.ORCAMENTO)}>
              Definir Orçamento
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Conta</DropdownMenuItem>
            <DropdownMenuItem disabled>Configurações</DropdownMenuItem>
            <DropdownMenuItem disabled>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
