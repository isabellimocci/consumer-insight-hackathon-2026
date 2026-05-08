import { Navbar } from '@components/Navbar'
import { BudgetProvider } from '@contexts/BudgetProvider'
import { MonthProvider } from '@contexts/MonthProvider'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <MonthProvider>
      <BudgetProvider>
        <Navbar />
        <main role="main">
          <Outlet />
        </main>
      </BudgetProvider>
    </MonthProvider>
  )
}
