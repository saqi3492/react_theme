import { Box, styled } from '@mui/material';
import FlexBox from 'components/flexbox/FlexBox';
import Scrollbar from 'components/ScrollBar';
import LayoutDrawer from './LayoutDrawer';
import MultiLevelMenu from './MultiLevelMenu';
import { useDispatch, useSelector } from 'react-redux';
import { SIDEBAR_TOP_HEADER_AREA } from 'utils/constants';
import { setToggleMobileSidebar } from 'redux/reducers/themeOptionsSlice';

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

const MobileSidebar = ({ sidebarCompact }) => {
  const dispatch = useDispatch();
  const showMobileSideBar = useSelector((state) => state.ThemeOptions.showMobileSideBar);

  return (
    <LayoutDrawer open={showMobileSideBar} onClose={() => dispatch(setToggleMobileSidebar())}>
      <Box p={2} maxHeight={SIDEBAR_TOP_HEADER_AREA}>
        <FlexBox ml={1.5}>
          <img src="/static/logo/logo.svg" alt="logo" width={18} />
          <StyledLogo>UKO</StyledLogo>
        </FlexBox>
      </Box>

      <Scrollbar
        autoHide
        clickOnTrack={false}
        sx={{
          overflowX: 'hidden',
          maxHeight: `calc(100vh - ${SIDEBAR_TOP_HEADER_AREA}px)`
        }}
      >
        <NavWrapper compact={sidebarCompact}>
          <MultiLevelMenu sidebarCompact={false} />
        </NavWrapper>
      </Scrollbar>
    </LayoutDrawer>
  );
};

export default MobileSidebar;
