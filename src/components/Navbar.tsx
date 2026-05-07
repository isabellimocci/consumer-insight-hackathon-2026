import { MonthSelector } from '@components/MonthSelector'
import { ROUTES } from '@utils/routes'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard' },
  { to: ROUTES.TRANSACOES, label: 'Transações' },
  { to: ROUTES.VILAO, label: 'Vilão' },
  { to: ROUTES.INSIGHTS, label: 'Insights' },
]

export function Navbar() {
  return (
    <header>
      <nav aria-label="Navegação principal">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <MonthSelector />
    </header>
  )
}
