import { Box, useTheme } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';

const CustomLoader = () => {
  const theme = useTheme();
  return (
    <Box textAlign="center">
      <BeatLoader size={13} color={theme.palette.primary.main} />
    </Box>
  );
};

export default CustomLoader;
