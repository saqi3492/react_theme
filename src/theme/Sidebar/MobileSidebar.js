import { Box, styled } from '@mui/material';
import Scrollbar from 'components/ScrollBar';
import LayoutDrawer from './LayoutDrawer';
import MultiLevelMenu from './MultiLevelMenu';
import { useDispatch, useSelector } from 'react-redux';
import { SIDEBAR_TOP_HEADER_AREA } from 'utils/constants';
import { setSidebarCompact } from 'redux/reducers/themeOptionsSlice';
import LogoDark from 'assets/logo-dark.png';

const MobileSidebar = () => {
  const dispatch = useDispatch();
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  return (
    <LayoutDrawer open={!sidebarCompact} onClose={() => dispatch(setSidebarCompact())}>
      <Box p={2} maxHeight={SIDEBAR_TOP_HEADER_AREA}>
        <img src={LogoDark} alt="logo" width={130} />
      </Box>

      <Scrollbar style={{ maxHeight: `calc(100vh - ${SIDEBAR_TOP_HEADER_AREA}px)` }}>
        <NavWrapper compact={1}>
          <MultiLevelMenu />
        </NavWrapper>
      </Scrollbar>
    </LayoutDrawer>
  );
};

export default MobileSidebar;

const NavWrapper = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  height: '100%'
}));
