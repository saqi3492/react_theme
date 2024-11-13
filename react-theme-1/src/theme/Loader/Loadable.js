import { Suspense } from 'react';
import { ClimbingLoader } from './Loader';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<ClimbingLoader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
