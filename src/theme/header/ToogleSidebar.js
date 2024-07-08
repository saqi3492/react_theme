import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setToggleMobileSidebar } from 'redux/reducers/themeOptionsSlice';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';

const ToogleSidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDrawerOpen = () => {
    dispatch(setToggleMobileSidebar());
  };

  return downLg ? (
    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="end" sx={{ color: 'black' }}>
      <MenuIcon />
    </IconButton>
  ) : null;
};

export default memo(ToogleSidebar);
