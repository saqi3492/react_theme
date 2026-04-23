import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import AuthGuard from '@/components/AuthGuard';
import PublicLayout from '@/components/PublicLayout';

const Users = lazy(() => import('@/pages/users/Users'));
const UserDetails = lazy(() => import('@/pages/users/UserDetails'));
const Training = lazy(() => import('@/pages/training'));
const Incidents = lazy(() => import('@/pages/incidents'));
const SignIn = lazy(() => import('@/pages/signIn/SignIn'));
const SignUp = lazy(() => import('@/pages/signUp/SignUp'));
const ForgotPassword = lazy(() => import('@/pages/forgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/resetPassword/ResetPassword'));
const Routes = () => {
  const routes = useRoutes([
    {
      element: <AuthGuard />,
      children: [
        { element: <Navigate to="/users" />, index: true },
        { path: '/users', element: <Users /> },
        { path: '/users/details/:userId', element: <UserDetails /> },
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
        { path: '/reset-password', element: <ResetPassword /> },
      ],
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return <Suspense fallback={<ClimbingLoader />}>{routes}</Suspense>;
};

export default Routes;
