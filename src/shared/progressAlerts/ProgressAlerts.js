import SnackbarAlert from './SnackbarAlert';
import LoadingBackdrop from './LoadingBackdrop';
import CustomLoader from './CustomLoader';

const ProgressAlerts = () => {
  return (
    <>
      <SnackbarAlert />
      <LoadingBackdrop />
      <CustomLoader />
    </>
  );
};

export default ProgressAlerts;
