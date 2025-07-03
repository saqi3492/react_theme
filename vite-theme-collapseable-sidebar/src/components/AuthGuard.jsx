import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClimbingLoader } from '@/theme/Loader/Loader';
import { getUserByAuthToken } from '@/pages/auth/AuthApiCalls';
import { handleLogout } from '@/utils/helpers';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);

  useEffect(() => {
    (async () => {
      const isValidUser = await getUserByAuthToken();

      if (!isValidUser) handleLogout();

      setIsVerifyingUser(false);
    })();
  }, [navigate]);

  if (isVerifyingUser) return <ClimbingLoader />;
  return children;
};

export default AuthGuard;
