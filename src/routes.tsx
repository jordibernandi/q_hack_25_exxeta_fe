import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { HomePage } from './pages/home';
import { ErrorPage } from './pages/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
    ],
  },
]);
