import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { ROUTES } from '@utils/routes'
import {
  PiArrowsLeftRightLight,
  PiBombLight,
  PiChartLineUpLight,
  PiGearLight,
  PiHouseLight,
} from 'react-icons/pi'
import { NavLink, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Início', icon: <PiHouseLight size={28} /> },
  { to: ROUTES.TRANSACOES, label: 'Transações', icon: <PiArrowsLeftRightLight size={28} /> },
  { to: ROUTES.VILAO, label: 'Vilão', icon: <PiBombLight size={28} /> },
  { to: ROUTES.INSIGHTS, label: 'Insights', icon: <PiChartLineUpLight size={28} /> },
]

export function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="flex h-screen">
      <nav
        aria-label="Navegação principal"
        className="flex flex-col items-center justify-between bg-[#1F2A1E] px-4 py-4 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <svg
            width="56"
            height="56"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="80" height="80" rx="20" fill="#2D4A35" />
            <ellipse cx="40" cy="40" rx="22" ry="14" fill="none" stroke="#C5E0B8" strokeWidth="3" />
            <circle cx="40" cy="40" r="9" fill="#C5E0B8" />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              fontFamily="Inter"
              fontWeight="900"
              fontSize="13"
              fill="#1F2A1E"
            >
              $
            </text>
          </svg>
          <section>
            {NAV_LINKS.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === ROUTES.DASHBOARD}
                aria-label={label}
                className={({ isActive }) =>
                  `${isActive ? 'text-surface font-semibold' : 'text-muted-foreground'} hover:text-surface my-6 flex flex-col items-center gap-2 text-xs`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </section>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Configurações" className="mb-6 text-white hover:opacity-80">
              <PiGearLight size={28} />
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
