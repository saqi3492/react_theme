import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from 'theme/Loader/Loadable';
import AuthGuard from 'theme/guards/AuthGuard';
import { Navigate } from 'react-router-dom';

const MainTheme = Loadable(lazy(() => import('theme/mainTheme/MainTheme')));
const Sessions = Loadable(lazy(() => import('pages/sessions')));
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
        { element: <Navigate to="/sessions" />, index: true },
        { path: '/sessions', element: <Sessions /> }
      ]
    },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/forgotpassword', element: <ForgotPassword /> },
    { path: '*', element: <Navigate to="/" /> }
  ]);
};

export default Routes;
