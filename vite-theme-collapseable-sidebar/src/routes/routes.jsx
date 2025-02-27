import { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import { getLocalStorageItem } from '@/utils/helpers';
import { getUserByAuthToken } from '@/pages/auth/AuthApiCalls';

const MainTheme = lazy(() => import('@/theme/mainTheme/MainTheme'));
const Sessions = lazy(() => import('@/pages/sessions'));
const Training = lazy(() => import('@/pages/training'));
const Incidents = lazy(() => import('@/pages/incidents'));
const SignIn = lazy(() => import('@/pages/signIn/SignIn'));
const SignUp = lazy(() => import('@/pages/signUp/SignUp'));
const ForgotPassword = lazy(() => import('@/pages/resetPassword/ForgotPassword'));

const Routes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);

  useEffect(() => {
    (async () => {
      const authToken = getLocalStorageItem('authentication_token');
      const isPublicPage = ['/signin', '/signup', '/forgot-password'].includes(location.pathname);

      if (authToken) {
        const isValidUser = await getUserByAuthToken();
        if (isValidUser) {
          if (isPublicPage) navigate('/');
        } else {
          localStorage.removeItem('auth_token');
          navigate('/signin');
        }
      } else if (!isPublicPage) {
        navigate('/signin');
      }
      setIsVerifyingUser(false);
    })();
  }, [location, navigate]);

  const routes = useRoutes([
    {
      path: '/',
      element: <MainTheme />,
      children: [
        { element: <Navigate to="/sessions" />, index: true },
        { path: '/sessions', element: <Sessions /> },
        { path: '/training', element: <Training /> },
        { path: '/incidents', element: <Incidents /> },
      ],
    },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return isVerifyingUser ? <ClimbingLoader /> : <Suspense fallback={<ClimbingLoader />}>{routes}</Suspense>;
};

export default Routes;
