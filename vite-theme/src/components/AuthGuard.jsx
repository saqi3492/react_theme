import { useEffect, useState } from 'react';
import { fetchUserByAuthToken } from '@/pages/auth/AuthApiCalls';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import MainTheme from '@/theme/mainTheme/MainTheme';

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

  return isVerifying ? <ClimbingLoader /> : <MainTheme />;
};

export default AuthGuard;
