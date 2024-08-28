import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleSidebarCompact } from 'redux/reducers/themeOptionsSlice';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import Logo from 'assets/logo.png';
import FlexBox from 'components/flexbox/FlexBox';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import UserMenu from './UserMenu';

const HeaderContent = () => {
  const dispatch = useDispatch();
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);

  const handleDrawerOpen = () => {
    dispatch(setToggleSidebarCompact());
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <FlexBox>
        <img src={Logo} alt="logo" width={130} />
        <IconButton onClick={handleDrawerOpen} sx={{ color: '#f4f4f4', '&:hover': { backgroundColor: 'transparent' }, mt: 1 }}>
          {sidebarCompact ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </FlexBox>
      <UserMenu />
    </Stack>
  );
};

export default memo(HeaderContent);
