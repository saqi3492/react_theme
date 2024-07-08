import { useState } from 'react';
import { ClimbingLoader } from 'theme/Loader/Loader';

const AuthGuard = ({ children }) => {
  const [isLoading] = useState(false);

  return isLoading ? <ClimbingLoader /> : <>{children}</>;
};

export default AuthGuard;
