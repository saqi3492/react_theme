import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarCompact } from 'store/reducers/themeOptionsSlice';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import UserMenu from './UserMenu';
import HeaderLogo from './HeaderLogo';

const HeaderContent = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <HeaderLogo />
      <UserMenu />
    </Stack>
  );
};

export default memo(HeaderContent);
