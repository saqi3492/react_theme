import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { fetchUserByAuthToken } from '@/pages/auth/authApiCalls';
import { FallBackLoader } from '@/components/layout/loader/FallBackLoader';
import MainLayout from '@/components/layout/MainLayout';

const AuthGuard = () => {
  const authToken = getLocalStorageItem('authentication_token');
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    (async () => {
      if (authToken) {
        const isValidUser = await fetchUserByAuthToken();
        if (isValidUser) {
          setIsVerifying(false);
        }
      }
    })();
  }, [authToken]);

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return isVerifying ? <FallBackLoader type="fullPage" /> : <MainLayout />;
};

export default AuthGuard;
