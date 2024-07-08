import { styled } from '@mui/material/styles';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const loaderCOlor = '#1975d2';

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2001,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& svg path:last-child': {
    opacity: 0.29
  }
}));

export const ClimbingLoader = () => (
  <LoaderWrapper>
    <ClimbingBoxLoader color={loaderCOlor} />
  </LoaderWrapper>
);
