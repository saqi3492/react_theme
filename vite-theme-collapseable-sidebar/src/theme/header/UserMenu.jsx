import { useState } from 'react';
import { Typography, useMediaQuery, Stack, useTheme, Popover, MenuItem, Paper, Divider } from '@mui/material';
import StyledAvatar from './StyledAvatar';
import { useSelector } from 'react-redux';
import { handleLogout } from '@/utils/helpers';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const UserMenu = () => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const userDetail = useSelector(state => state.User.userDetail);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        px="10px"
        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: theme.palette.action.hover } }}
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        <StyledAvatar />
        {downMd ? null : (
          <>
            <Stack>
              <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {userDetail.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userDetail.email}
              </Typography>
            </Stack>
          </>
        )}
        {anchorEl ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ marginLeft: '10px' }}
        disableAutoFocus
      >
        <Paper sx={{ pt: 2, minWidth: 260 }}>
          <Stack alignItems="center">
            <StyledAvatar />
            <Typography variant="body2" fontWeight="bold" mt={1}>
              {userDetail.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userDetail.email}
            </Typography>
          </Stack>
          <Divider sx={{ borderWidth: '1px', marginTop: '8px' }} />

          <MenuItem sx={{ px: 3, py: 2 }} onClick={handleLogout}>
            Sign Out
          </MenuItem>
        </Paper>
      </Popover>
    </>
  );
};

export default UserMenu;
