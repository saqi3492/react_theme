import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, IconButton, Typography, useMediaQuery, Divider, Stack, useTheme } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StyledAvatar from './StyledAvatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const userDetail = useSelector(state => state.User.userDetail);

  return (
    <>
      <IconButton size="small" onClick={event => setAnchorEl(event.currentTarget)} disableRipple sx={{ ml: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <StyledAvatar />
          {downMd ? null : (
            <>
              <Stack alignItems="center">
                <Typography variant="body1" fontWeight="bold" color="white">
                  {userDetail.name}
                </Typography>
                <Typography variant="body2" color="white">
                  {userDetail.email}
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
              {userDetail.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userDetail.email}
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
        <MenuItem onClick={() => navigate('signin')}>
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
