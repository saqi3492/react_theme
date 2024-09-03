import HeaderContent from './HeaderContent';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HEADER_HEIGHT } from 'utils/constants';

const Header = () => {
  return (
    <MuiAppBar position="static">
      <HeaderContent />
    </MuiAppBar>
  );
};
export default Header;

const MuiAppBar = styled(AppBar)(({ theme }) => ({
  height: HEADER_HEIGHT,
  position: 'sticky',
  top: 0,
  padding: '0 10px',
  justifyContent: 'center',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
}));
