import { Navbar } from '@components/Navbar'
import { BudgetProvider } from '@contexts/BudgetProvider'
import { MonthProvider } from '@contexts/MonthProvider'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <MonthProvider>
      <BudgetProvider>
        <section className="flex h-screen bg-(--color-bg)">
          <Navbar />
          <main role="main" className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </section>
      </BudgetProvider>
    </MonthProvider>
  )
}
