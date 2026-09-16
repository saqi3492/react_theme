import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadCurrentUser } from '@/pages/auth/AuthApiCalls';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import MainTheme from '@/theme/mainTheme/MainTheme';

const AuthGuard = () => {
  const status = useSelector(state => state.User.status);

  useEffect(() => {
    // Probe the session cookie once; result lands in the Redux auth slice.
    if (status === 'loading') {
      loadCurrentUser();
    }
  }, [status]);

  if (status === 'loading') {
    return <ClimbingLoader />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/sign-in" replace />;
  }

  return <MainTheme />;
};

export default AuthGuard;
