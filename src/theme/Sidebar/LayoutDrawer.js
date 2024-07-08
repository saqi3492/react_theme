import { Box, Drawer, styled } from '@mui/material';
import { SIDEBAR_WIDTH } from 'utils/constants';

const Wrapper = styled(Box)(({ theme }) => ({
  height: '100%',
  width: 'inherit',
  position: 'fixed',
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
  zIndex: theme.zIndex.drawer + 3
}));

const LayoutDrawer = ({ children, open, onClose, drawerWidth = SIDEBAR_WIDTH }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth
        }
      }}
    >
      <Wrapper>{children}</Wrapper>
    </Drawer>
  );
};

export default LayoutDrawer;
