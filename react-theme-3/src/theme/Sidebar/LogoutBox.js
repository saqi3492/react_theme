import { Box, Divider } from '@mui/material';
import { StyledNavItemButton, StyledText } from './MultiLevelMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import { handleLogout } from 'utils/helpers';

const LogoutBox = ({ iscompact }) => {
  return (
    <Box>
      <Divider sx={{ borderWidth: '1px', marginBottom: '4px' }} />
      <StyledNavItemButton onClick={handleLogout}>
        <LogoutIcon sx={{ fontSize: 22 }} />
        <StyledText compact={iscompact}>Log Out</StyledText>
      </StyledNavItemButton>
    </Box>
  );
};

export default LogoutBox;
