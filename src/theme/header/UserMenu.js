import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, IconButton, Typography, useMediaQuery, Divider, Stack, useTheme } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StyledAvatar from './StyledAvatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const UserMenu = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <IconButton size="small" onClick={(event) => setAnchorEl(event.currentTarget)} disableRipple sx={{ ml: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <StyledAvatar />
          {downMd ? null : (
            <>
              <Stack alignItems="center">
                <Typography variant="body1" fontWeight="bold" color="white">
                  Hassan Siddique
                </Typography>
                <Typography variant="body2" color="white">
                  imhassan66@gmail.com
                </Typography>
              </Stack>
              <KeyboardArrowDownIcon fontSize="small" sx={{ color: 'white' }} />
            </>
          )}
        </Stack>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Stack alignItems="center">
            <StyledAvatar />
            <Typography variant="body1" fontWeight="bold">
              Hassan Siddique
            </Typography>
            <Typography variant="body2" color="text.secondary">
              imhassan66@gmail.com
            </Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
