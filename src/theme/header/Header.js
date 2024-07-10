import Toolbar from '@mui/material/Toolbar';
import ToogleSidebar from './ToogleSidebar';
import { AppBar, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLLAPSED_SIDEBAR_WIDTH, SIDEBAR_WIDTH } from 'utils/constants';
import { useSelector } from 'react-redux';

const Header = () => {
  const theme = useTheme();
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  const space = downLg ? 0 : sidebarCompact ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH;

  return (
    <MuiAppBar space={space} position="static">
      <Toolbar disableGutters>
        <ToogleSidebar />
      </Toolbar>
    </MuiAppBar>
  );
};
export default Header;

const MuiAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'space' })(({ theme, space }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  backgroundColor: 'transparent',

  paddingLeft: space,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
}));
