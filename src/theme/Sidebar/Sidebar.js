import { Box, IconButton, styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FlexBetween from 'components/flexbox/FlexBetween';
import FlexBox from 'components/flexbox/FlexBox';
import Scrollbar from 'components/ScrollBar';
import { useState } from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import MultiLevelMenu from './MultiLevelMenu';
import MobileSidebar from './MobileSidebar';
import { COLLAPSED_SIDEBAR_WIDTH, SIDEBAR_TOP_HEADER_AREA, SIDEBAR_WIDTH } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleSidebarCompact } from 'redux/reducers/themeOptionsSlice';

const Sidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [onHover, setOnHover] = useState(false);
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  const COMPACT = sidebarCompact && !onHover ? 1 : 0; //   IF MOBILE

  if (downLg) {
    return <MobileSidebar sidebarCompact={!!COMPACT} />;
  }

  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween pt={3} pr={2} pl={4} pb={1} height={SIDEBAR_TOP_HEADER_AREA}>
        <FlexBox>
          <img src="/static/logo/logo.svg" alt="logo" width={18} />
          {!COMPACT && <StyledLogo>UKO</StyledLogo>}
        </FlexBox>
        <Box mx={'auto'}></Box>

        {/* SIDEBAR COLLAPSE BUTTON */}
        <StyledIconButton
          onClick={() => dispatch(setToggleSidebarCompact())}
          sx={{
            display: COMPACT ? 'none' : 'block'
          }}
        >
          <StyledArrow />
        </StyledIconButton>
      </FlexBetween>

      <Scrollbar
        autoHide
        clickOnTrack={false}
        sx={{
          overflowX: 'hidden',
          maxHeight: `calc(100vh - ${SIDEBAR_TOP_HEADER_AREA}px)`
        }}
      >
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

const StyledLogo = styled(Box)(() => ({
  paddingLeft: 8,
  fontWeight: 700,
  fontSize: 20
}));

const StyledArrow = styled(SyncAltIcon)(() => ({
  display: 'block'
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));
