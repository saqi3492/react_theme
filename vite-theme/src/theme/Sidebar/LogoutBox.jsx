import { Box, Divider } from '@mui/material';
import { iconStyle, StyledText } from './MultiLevelMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import { handleSignOut } from '@/pages/auth/AuthApiCalls';
import { NavItemButton } from './SidebarComponents';

const LogoutBox = ({ isCompact }) => {
  return (
    <Box sx={{ p: '0 7px' }}>
      <Divider sx={{ borderWidth: '1px', marginBottom: '4px' }} />
      <NavItemButton onClick={handleSignOut}>
        <LogoutIcon sx={iconStyle()} />
        <StyledText compact={isCompact}>Log Out</StyledText>
      </NavItemButton>
    </Box>
  );
};

export default LogoutBox;
