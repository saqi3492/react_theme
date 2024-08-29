import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from 'theme/Loader/Loadable';
import AuthGuard from 'theme/guards/AuthGuard';
import { Navigate } from 'react-router-dom';

const MainTheme = Loadable(lazy(() => import('theme/mainTheme/MainTheme')));
const DummyListing = Loadable(lazy(() => import('pages/dashboard/DummyListing')));
const Details = Loadable(lazy(() => import('pages/dashboard/Details')));
const SignIn = Loadable(lazy(() => import('pages/auth/SignIn')));
const SignUp = Loadable(lazy(() => import('pages/auth/SignUp')));
const ForgotPassword = Loadable(lazy(() => import('pages/auth/ForgotPassword')));

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
        { path: '/dashboard', element: <DummyListing /> },
        { path: '/details/:id', element: <Details /> }
      ]
    },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/forgotpassword', element: <ForgotPassword /> },
    { path: '*', element: <Navigate to="/" /> }
  ]);
};

export default Routes;
