import { Navbar } from '@components/Navbar'
import { MonthProvider } from '@contexts/MonthProvider'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <MonthProvider>
      <Navbar />
      <main role="main">
        <Outlet />
      </main>
    </MonthProvider>
  )
}
