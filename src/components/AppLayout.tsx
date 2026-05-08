import { Navbar } from '@components/Navbar'
import { MonthProvider } from '@contexts/MonthProvider'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <MonthProvider>
      <section className='flex h-screen bg-[var(--color-bg)]'>
        <Navbar />
        <main role="main" className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </section>
    </MonthProvider>
  )
}
