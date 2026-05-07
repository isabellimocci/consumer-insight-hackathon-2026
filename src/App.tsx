import { AppLayout } from '@components/AppLayout'
import DashboardPage from '@pages/DashboardPage'
import InsightsPage from '@pages/InsightsPage'
import TransacoesPage from '@pages/TransacoesPage'
import VilaoPage from '@pages/VilaoPage'
import { ROUTES } from '@utils/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.TRANSACOES, element: <TransacoesPage /> },
      { path: ROUTES.VILAO, element: <VilaoPage /> },
      { path: ROUTES.INSIGHTS, element: <InsightsPage /> },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <div>
        <h1>404 - Página não encontrada</h1>
      </div>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
