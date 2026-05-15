import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { ROUTES } from '@utils/routes'
import { useState } from 'react'
import {
  PiArrowsLeftRightLight,
  PiBombLight,
  PiChartLineUpLight,
  PiGearLight,
  PiHouseLight,
  PiListLight,
} from 'react-icons/pi'
import { NavLink, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Início', icon: <PiHouseLight size={28} /> },
  { to: ROUTES.TRANSACOES, label: 'Transações', icon: <PiArrowsLeftRightLight size={28} /> },
  { to: ROUTES.VILAO, label: 'Vilão', icon: <PiBombLight size={28} /> },
  { to: ROUTES.INSIGHTS, label: 'Insights', icon: <PiChartLineUpLight size={28} /> },
]

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Ir para o início"
      className="cursor-pointer rounded-xl transition-opacity hover:opacity-80"
    >
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
    </button>
  )
}

function SettingsDropdown({
  navigate,
  side = 'right',
}: {
  navigate: ReturnType<typeof useNavigate>
  side?: 'right' | 'top'
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="Configurações" className="mb-6 text-white hover:opacity-80">
          <PiGearLight size={28} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align="end"
        className="min-w-45 border border-white/15 bg-[#253323] text-white shadow-xl"
      >
        <DropdownMenuItem
          onClick={() => void navigate(ROUTES.ORCAMENTO)}
          className="cursor-pointer text-white/90 focus:bg-white/10 focus:text-white"
        >
          Adicionar orçamento
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-white/35">
          Editar conta
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-white/35">
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-white/35">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {/* MOBILE: top bar */}
      <header className="flex items-center justify-between bg-[#1F2A1E] px-4 py-3 md:hidden">
        <Logo onClick={() => void navigate(ROUTES.DASHBOARD)} />
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="text-white hover:opacity-80"
        >
          <PiListLight size={28} />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            className="flex w-56 flex-col justify-between bg-[#1F2A1E] py-6 pl-6 text-white"
          >
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <div className="flex flex-col gap-2">
              <Logo
                onClick={() => {
                  void navigate(ROUTES.DASHBOARD)
                  setOpen(false)
                }}
              />
              <nav className="mt-4">
                {NAV_LINKS.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === ROUTES.DASHBOARD}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `${isActive ? 'text-surface font-semibold' : 'text-muted-foreground'} hover:text-surface my-4 flex items-center gap-3 text-sm`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <SettingsDropdown navigate={navigate} side="top" />
          </SheetContent>
        </Sheet>
      </header>

      {/* DESKTOP: sidebar vertical */}
      <header className="hidden h-screen md:flex">
        <nav
          aria-label="Navegação principal"
          className="flex flex-col items-center justify-between bg-[#1F2A1E] px-4 py-4 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <Logo onClick={() => void navigate(ROUTES.DASHBOARD)} />
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
          <SettingsDropdown navigate={navigate} />
        </nav>
      </header>
    </>
  )
}
