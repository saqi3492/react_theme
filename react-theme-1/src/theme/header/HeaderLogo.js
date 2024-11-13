import { useDispatch, useSelector } from 'react-redux';
import { setSidebarCompact } from 'store/reducers/themeOptionsSlice';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import Logo from 'assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const HeaderLogo = () => {
  const dispatch = useDispatch();
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img src={Logo} alt="logo" width={130} />
      <IconButton onClick={() => dispatch(setSidebarCompact())} sx={{ color: '#f4f4f4', '&:hover': { backgroundColor: 'transparent' } }}>
        {sidebarCompact ? <MenuIcon /> : <MenuOpenIcon />}
      </IconButton>
    </Stack>
  );
};

export default HeaderLogo;
