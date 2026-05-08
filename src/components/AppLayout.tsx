import { FAB } from '@components/FAB'
import { Navbar } from '@components/Navbar'
import { NovaTransacaoModal } from '@components/NovaTransacaoModal'
import { BudgetProvider } from '@contexts/BudgetProvider'
import { MonthProvider } from '@contexts/MonthProvider'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MonthProvider>
      <BudgetProvider>
        <Navbar />
        <main role="main" className="pb-24">
          <Outlet />
        </main>
        <FAB onOpen={() => setIsOpen(true)} />
        <NovaTransacaoModal open={isOpen} onClose={() => setIsOpen(false)} />
      </BudgetProvider>
    </MonthProvider>
  )
}
