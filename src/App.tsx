import DashboardPage from '@pages/DashboardPage';
import InsightsPage from '@pages/InsightsPage';
import TransacoesPage from '@pages/TransacoesPage';
import VilaoPage from '@pages/VilaoPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/transacoes',
    element: <TransacoesPage />,
  },
  {
    path: '/vilao',
    element: <VilaoPage />,
  },
  {
    path: '/insights',
    element: <InsightsPage />,
  },
  {
    path: '*',
    element: <div><h1>404 - Página não encontrada</h1></div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
