import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const MainLayout = lazy(() => import('@/components/layout/MainLayout'));
const SimpleLayout = lazy(() => import('@/theme/simpleLayout/SimpleLayout'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Users = lazy(() => import('@/pages/Users'));
const Tasks = lazy(() => import('@/pages/Tasks'));
const Configuration = lazy(() => import('@/pages/Configuration'));
const CentralRecord = lazy(() => import('@/pages/CentralRecord'));
const Venues = lazy(() => import('@/pages/Venues'));
const Billing = lazy(() => import('@/pages/Billing'));
const Settings = lazy(() => import('@/pages/Settings'));
const Help = lazy(() => import('@/pages/Help'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('authentication_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('authentication_token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const Routes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authentication_token');
    const publicPaths = ['/login', '/signup'];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!authToken && !isPublicPath) {
      navigate('/login', { replace: true });
    } else if (authToken && isPublicPath) {
      navigate('/dashboard', { replace: true });
    }

    setIsVerifying(false);
  }, [location.pathname, navigate]);

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
        { path: 'configuration', element: <Configuration /> },
        { path: 'configuration/staff-types', element: <Configuration /> },
        { path: 'configuration/documents', element: <Configuration /> },
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

  if (isVerifying) {
    return <LoadingSpinner fullPage variant="hillclimb" />;
  }

  return <Suspense fallback={<LoadingSpinner fullPage variant="hillclimb" />}>{routes}</Suspense>;
};

export default Routes;
