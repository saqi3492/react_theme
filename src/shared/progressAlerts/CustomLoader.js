import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { HEADER_HEIGHT } from 'utils/constants';

const CustomLoader = () => {
  const theme = useTheme();
  const showCustomLoader = useSelector((state) => state.Alerts.showCustomLoader);

  return showCustomLoader ? (
    <Box textAlign="center">
      <BeatLoader size={11} color={theme.palette.primary.main} style={{ position: 'absolute', top: HEADER_HEIGHT + 10 }} />
    </Box>
  ) : null;
};

export default CustomLoader;
