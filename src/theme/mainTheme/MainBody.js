import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { COLLAPSED_SIDEBAR_WIDTH, SIDEBAR_WIDTH } from 'utils/constants';
import { useSelector } from 'react-redux';

const MainBody = () => {
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  return (
    <StyledBox sidebarCompact={sidebarCompact}>
      <Outlet />
    </StyledBox>
  );
};

export default MainBody;

const StyledBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'sidebarCompact' })(({ theme, sidebarCompact }) => ({
  zIndex: theme.zIndex.drawer + 1,
  padding: '10px',
  marginLeft: sidebarCompact ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
}));
