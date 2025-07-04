import { useEffect, useState } from 'react';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import { getUserByAuthToken } from '@/pages/auth/AuthApiCalls';

const AuthGuard = ({ children }) => {
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);

  useEffect(() => {
    (async () => {
      const isValidUser = await getUserByAuthToken();

      if (isValidUser) setIsVerifyingUser(false);
    })();
  }, []); // if you want to run this effect on every route change then add navigate in dependency

  return isVerifyingUser ? <ClimbingLoader /> : children;
};

export default AuthGuard;
