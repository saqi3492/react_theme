import Toolbar from '@mui/material/Toolbar';
import ToogleSidebar from './ToogleSidebar';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLLAPSED_SIDEBAR_WIDTH, SIDEBAR_WIDTH } from 'utils/constants';
import { useSelector } from 'react-redux';

const Header = () => {
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  return (
    <MuiAppBar sidebarCompact={sidebarCompact} position="static">
      <Toolbar disableGutters>
        <ToogleSidebar />
      </Toolbar>
    </MuiAppBar>
  );
};
export default Header;

const MuiAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'sidebarCompact' })(({ theme, sidebarCompact }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  backgroundColor: 'transparent',

  marginLeft: sidebarCompact ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
}));
