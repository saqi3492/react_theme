import { lazy, useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getLocalStorageItem } from '@/utils/helper';

const MainLayout = lazy(() => import('@/components/layout/MainLayout'));
const SimpleLayout = lazy(() => import('@/theme/simpleLayout/SimpleLayout'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Users = lazy(() => import('@/pages/Users'));
const Tasks = lazy(() => import('@/pages/Tasks'));
const StaffTypes = lazy(() => import('@/pages/configuration/StaffTypes'));
const Documents = lazy(() => import('@/pages/configuration/Documents'));
const CentralRecord = lazy(() => import('@/pages/CentralRecord'));
const Venues = lazy(() => import('@/pages/Venues'));
const Billing = lazy(() => import('@/pages/Billing'));
const Settings = lazy(() => import('@/pages/Settings'));
const Help = lazy(() => import('@/pages/Help'));

const getAuthToken = () => getLocalStorageItem('authentication_token');

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getAuthToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const Routes = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'configuration/staff-types', element: <StaffTypes /> },
        { path: 'configuration/documents', element: <Documents /> },
        { path: 'tasks', element: <Tasks /> },
        { path: 'central-record', element: <CentralRecord /> },
        { path: 'users', element: <Users /> },
        { path: 'venues', element: <Venues /> },
        { path: 'billing', element: <Billing /> },
        { path: 'settings', element: <Settings /> },
        { path: 'help', element: <Help /> },
      ],
    },
    {
      path: '/',
      element: (
        <PublicRoute>
          <SimpleLayout />
        </PublicRoute>
      ),
      children: [
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
      ],
    },
    { path: '*', element: <Navigate to="/dashboard" replace /> },
  ]);

  if (isInitializing) {
    return <LoadingSpinner type="fullPage" />;
  }

  return <>{routes}</>;
};

export default Routes;
