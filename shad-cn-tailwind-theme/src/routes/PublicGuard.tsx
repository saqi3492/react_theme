import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '@/utils/helper';
import SimpleLayout from '@/theme/simpleLayout/SimpleLayout';

const PublicGuard = () => {
  const authToken = getLocalStorageItem('authentication_token');

  if (authToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <SimpleLayout />;
};

export default PublicGuard;
