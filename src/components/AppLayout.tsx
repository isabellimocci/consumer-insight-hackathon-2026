import { MonthSelector } from '@components/MonthSelector'
import { Navbar } from '@components/Navbar'
import { NovaTransacaoModal } from '@components/NovaTransacaoModal'
import { BudgetProvider } from '@contexts/BudgetProvider'
import { MonthProvider } from '@contexts/MonthProvider'
import { UserProvider } from '@contexts/UserContext'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { TooltipProvider } from './ui/tooltip'

export function AppLayout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MonthProvider>
      <UserProvider>
        <section className="bg-bg flex h-screen flex-col md:flex-row">
          <BudgetProvider>
            <TooltipProvider>
              <Navbar />
              <div className="flex h-full flex-1 flex-col overflow-hidden">
                <div className="flex shrink-0 items-center justify-end gap-3 px-6 py-3">
                  <MonthSelector />
                  <button
                    aria-label="Nova transação"
                    onClick={() => setIsOpen(true)}
                    className="bg-text text-bg flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95"
                  >
                    <span className="text-base leading-none font-bold">+</span>
                    <span>Nova Despesa</span>
                  </button>
                </div>
                <main role="main" className="flex-1 overflow-hidden">
                  <Outlet />
                </main>
              </div>
            </TooltipProvider>
            <NovaTransacaoModal open={isOpen} onClose={() => setIsOpen(false)} />
          </BudgetProvider>
        </section>
      </UserProvider>
    </MonthProvider>
  )
}
