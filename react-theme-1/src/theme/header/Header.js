import HeaderContent from './HeaderContent';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HEADER_HEIGHT } from 'utils/constants';

const Header = () => {
  return (
    <MuiAppBar>
      <HeaderContent />
    </MuiAppBar>
  );
};
export default Header;

const MuiAppBar = styled(AppBar)(({ theme }) => ({
  height: HEADER_HEIGHT,
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  top: 0,
  padding: '0 10px',
  justifyContent: 'center',
}));
