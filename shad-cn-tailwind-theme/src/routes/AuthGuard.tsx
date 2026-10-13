import { useEffect, useState } from 'react';
import { fetchUserByAuthToken } from '@/pages/auth/authApiCalls';
import { FallBackLoader } from '@/components/layout/loader/FallBackLoader';
import MainLayout from '@/components/layout/MainLayout';

const AuthGuard = () => {
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    (async () => {
      const isValidUser = await fetchUserByAuthToken();
      if (isValidUser) {
        setIsVerifying(false);
      }
    })();
  }, []);

  return isVerifying ? <FallBackLoader type="fullPage" /> : <MainLayout />;
};

export default AuthGuard;
