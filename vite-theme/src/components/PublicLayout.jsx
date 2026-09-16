import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicLayout = () => {
  const status = useSelector(state => state.User.status);

  // Only bounce away once we positively know there is a valid session.
  // While loading (or when unauthenticated) the auth screen renders normally.
  return status === 'authenticated' ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicLayout;
