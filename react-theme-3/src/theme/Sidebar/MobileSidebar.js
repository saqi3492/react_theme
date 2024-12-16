import MultiLevelMenu from './MultiLevelMenu';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from 'utils/constants';
import { setSidebarCompact } from 'store/reducers/themeOptionsSlice';
import Logo from 'assets/logo.png';
import { Box, Drawer, useTheme } from '@mui/material';

const MobileSidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sidebarCompact = useSelector(state => state.ThemeOptions.sidebarCompact);

  const closeSidebar = () => {
    dispatch(setSidebarCompact());
  };

  return (
    <Drawer anchor="left" open={!sidebarCompact} onClose={closeSidebar} PaperProps={{ sx: { width: SIDEBAR_WIDTH } }}>
      <Box height="100%" width="inherit" sx={{ position: 'fixed', overflow: 'hidden', zIndex: theme.zIndex.drawer + 3 }}>
        <Box p={2} maxHeight={HEADER_HEIGHT}>
          <img src={Logo} alt="logo" width={130} />
        </Box>

        <MultiLevelMenu />
      </Box>
    </Drawer>
  );
};

export default MobileSidebar;
