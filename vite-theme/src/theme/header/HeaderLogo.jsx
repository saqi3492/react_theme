import { useDispatch, useSelector } from 'react-redux';
import { setSidebarCompact } from '@/store/reducers/themeOptionsSlice';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Logo from '@/assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { HEADER_HEIGHT } from '@/utils/constants';

const HeaderLogo = () => {
  const dispatch = useDispatch();
  const sidebarCompact = useSelector(state => state.ThemeOptions.sidebarCompact);

  return (
    <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center', height: HEADER_HEIGHT }}>
      <img src={Logo} alt="logo" width={120} style={{ display: 'block' }} />
      <IconButton
        size="small"
        onClick={() => dispatch(setSidebarCompact())}
        sx={theme => ({
          width: 36,
          height: 36,
          borderRadius: '10px',
          color: 'text.secondary',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.15s ease',
          '&:hover': {
            color: 'primary.main',
            borderColor: alpha(theme.palette.primary.main, 0.4),
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        })}
      >
        {sidebarCompact ? <MenuIcon fontSize="small" /> : <MenuOpenIcon fontSize="small" />}
      </IconButton>
    </Stack>
  );
};

export default HeaderLogo;
