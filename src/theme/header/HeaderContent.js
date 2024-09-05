import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarCompact } from 'redux/reducers/themeOptionsSlice';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import Logo from 'assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import UserMenu from './UserMenu';

const HeaderContent = () => {
  const dispatch = useDispatch();
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center">
        <img src={Logo} alt="logo" width={130} />
        <IconButton
          onClick={() => dispatch(setSidebarCompact())}
          sx={{ color: '#f4f4f4', '&:hover': { backgroundColor: 'transparent' }, mt: 1 }}
        >
          {sidebarCompact ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Stack>

      <UserMenu />
    </Stack>
  );
};

export default memo(HeaderContent);
