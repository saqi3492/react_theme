import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { COLLAPSED_SIDEBAR_WIDTH, SIDEBAR_WIDTH } from 'utils/constants';
import { useSelector } from 'react-redux';

const MainBody = () => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  const space = downMd ? 0 : sidebarCompact ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH;
  return (
    <StyledBox space={space}>
      <Outlet />
    </StyledBox>
  );
};

export default MainBody;

const StyledBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'space' })(({ theme, space }) => ({
  zIndex: theme.zIndex.drawer + 1,
  padding: '10px',
  marginLeft: space,
  height: 'calc(100vh - 64px)', // or minHeight?
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
}));
