import HeaderContent from './HeaderContent';
import { AppBar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { HEADER_HEIGHT } from '@/utils/constants';

const Header = () => {
  return (
    <MuiAppBar elevation={0}>
      <HeaderContent />
    </MuiAppBar>
  );
};
export default Header;

const MuiAppBar = styled(AppBar)(({ theme }) => ({
  height: HEADER_HEIGHT,
  position: 'fixed',
  top: 0,
  justifyContent: 'center',
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.background.paper, 0.85),
  backdropFilter: 'blur(8px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 1px 8px rgba(16, 24, 40, 0.04)',
}));
