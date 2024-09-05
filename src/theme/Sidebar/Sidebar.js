import { Box, styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Scrollbar from 'components/ScrollBar';
import { useState } from 'react';
import MultiLevelMenu from './MultiLevelMenu';
import MobileSidebar from './MobileSidebar';
import { COLLAPSED_SIDEBAR_WIDTH, HEADER_HEIGHT, SIDEBAR_TOP_HEADER_AREA, SIDEBAR_WIDTH } from 'utils/constants';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const theme = useTheme();
  const [onHover, setOnHover] = useState(false);
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  const COMPACT = sidebarCompact && !onHover ? 1 : 0; //   IF MOBILE

  if (downMd) {
    return <MobileSidebar />;
  }

  return (
    <SidebarWrapper compact={sidebarCompact ? 1 : 0} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
      <Scrollbar style={{ maxHeight: `calc(100vh - ${SIDEBAR_TOP_HEADER_AREA}px)` }}>
        <NavWrapper>
          <MultiLevelMenu sidebarCompact={!!COMPACT} />
        </NavWrapper>
      </Scrollbar>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled(Box)(({ theme, compact }) => ({
  height: '100vh',
  marginTop: HEADER_HEIGHT,
  position: 'fixed',
  width: compact ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH,
  transition: 'all .2s ease',
  zIndex: theme.zIndex.drawer,
  backgroundColor: theme.palette.background.paper,
  '&:hover': compact && {
    width: SIDEBAR_WIDTH
  }
}));

const NavWrapper = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  height: '100%'
}));
