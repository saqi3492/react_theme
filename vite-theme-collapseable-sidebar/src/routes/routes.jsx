import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import AuthGuard from '@/components/AuthGuard';
import PublicLayout from '@/components/PublicLayout';
import MainTheme from '@/theme/mainTheme/MainTheme';

const Sessions = lazy(() => import('@/pages/sessions'));
const Training = lazy(() => import('@/pages/training'));
const Incidents = lazy(() => import('@/pages/incidents'));
const SignIn = lazy(() => import('@/pages/signIn/SignIn'));
const SignUp = lazy(() => import('@/pages/signUp/SignUp'));
const ForgotPassword = lazy(() => import('@/pages/resetPassword/ForgotPassword'));

const Routes = () => {
  const routes = useRoutes([
    {
      element: (
        <AuthGuard>
          <MainTheme />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/sessions" />, index: true },
        { path: '/sessions', element: <Sessions /> },
        { path: '/training', element: <Training /> },
        { path: '/incidents', element: <Incidents /> },
      ],
    },
    {
      element: <PublicLayout />,
      children: [
        { path: '/sign-in', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
      ],
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return <Suspense fallback={<ClimbingLoader />}>{routes}</Suspense>;
};

export default Routes;
