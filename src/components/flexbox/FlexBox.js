import { Box } from '@mui/material';

const FlexBox = ({ children, ...props }) => (
  <Box display="flex" alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>
);

export default FlexBox;
