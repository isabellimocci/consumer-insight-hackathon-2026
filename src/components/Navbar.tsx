import { ROUTES } from '@utils/routes'
import type { ReactNode } from 'react'
import {
  PiArrowsLeftRightLight,
  PiBombLight,
  PiChartLineUpLight,
  PiGearLight,
  PiHouseLight,
  PiPiggyBankLight,
  PiQuestionLight,
  PiSparkleLight,
} from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

const NAV_LINKS: { to: string; icon: ReactNode }[] = [
  { to: ROUTES.DASHBOARD, icon: <PiHouseLight size={28} /> },
  { to: ROUTES.TRANSACOES, icon: <PiArrowsLeftRightLight size={28} /> },
  { to: ROUTES.VILAO, icon: <PiBombLight size={28} /> },
  { to: ROUTES.INSIGHTS, icon: <PiChartLineUpLight size={28} /> },

  { to: ROUTES.ORCAMENTO, icon: <PiPiggyBankLight size={28} /> },
]

export function Navbar() {
  return (
    <header className="flex h-screen">
      <nav
        aria-label="Navegação principal"
        className="flex flex-col items-center justify-between gap-4 bg-[#1F2A1E] px-3 py-4 text-center"
      >
        <PiSparkleLight color="#fff" size={40} />
        <section>
          {NAV_LINKS.map(({ to, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `${isActive ? 'font-semibold text-(--color-surface)' : 'text-muted-foreground'} my-6 flex flex-col items-center gap-2 text-xs hover:text-(--color-surface)`
              }
            >
              {icon}
            </NavLink>
          ))}
        </section>
        <div className="flex flex-col items-center gap-4">
          <PiGearLight color="#fff" size={24} />
          <PiQuestionLight color="#fff" size={24} />
        </div>
      </nav>
    </header>
  )
}
