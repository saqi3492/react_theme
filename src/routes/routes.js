import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from 'theme/Loader/Loadable';
import AuthGuard from 'theme/guards/AuthGuard';
import { Navigate } from 'react-router-dom';

const MainTheme = Loadable(lazy(() => import('theme/mainTheme/MainTheme')));
const Dashboard = Loadable(lazy(() => import('pages/dashboard/Dashboard')));

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainTheme />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '/dashboard', element: <Dashboard /> }
      ]
    },
    { path: '*', element: <Navigate to="/" /> }
  ]);
};

export default Routes;
