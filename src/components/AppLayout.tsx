import { FAB } from '@components/FAB'
import { Navbar } from '@components/Navbar'
import { NovaTransacaoModal } from '@components/NovaTransacaoModal'
import { BudgetProvider } from '@contexts/BudgetProvider'
import { MonthProvider } from '@contexts/MonthProvider'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { TooltipProvider } from './ui/tooltip'

export function AppLayout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MonthProvider>
      <section className="flex h-screen bg-[var(--color-bg)]">
        <BudgetProvider>
          <TooltipProvider>
            <Navbar />
            <main role="main" className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </TooltipProvider>
          <FAB onOpen={() => setIsOpen(true)} />
          <NovaTransacaoModal open={isOpen} onClose={() => setIsOpen(false)} />
        </BudgetProvider>
      </section>
    </MonthProvider>
  )
}
