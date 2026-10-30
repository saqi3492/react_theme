import { memo } from 'react';
import { Stack } from '@mui/material';
import UserMenu from './UserMenu';
import HeaderLogo from './HeaderLogo';

const HeaderContent = () => {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', px: { xs: 1.5, md: 2.5 } }}>
      <HeaderLogo />
      <UserMenu />
    </Stack>
  );
};

export default memo(HeaderContent);
