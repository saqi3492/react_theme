import { useState } from 'react';
import { Typography, useMediaQuery, Stack, useTheme, Menu, MenuItem, Divider, ButtonBase, ListItemIcon, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import StyledAvatar from './StyledAvatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '@/utils/helpers';
import { ChevronRight, ExpandMore, Logout, SettingsOutlined } from '@mui/icons-material';

const UserMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const userDetail = useSelector(state => state.User.userDetail);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <ButtonBase
        onClick={event => setAnchorEl(event.currentTarget)}
        sx={{
          gap: 1.5,
          py: 0.5,
          pl: 0.5,
          pr: downMd ? 0.5 : 1.25,
          borderRadius: '999px',
          border: `1px solid ${open ? alpha(theme.palette.primary.main, 0.4) : theme.palette.divider}`,
          backgroundColor: open ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
          transition: 'all 0.15s ease',
          '&:hover': { backgroundColor: theme.palette.action.hover },
        }}
      >
        <StyledAvatar />
        {downMd ? null : (
          <>
            <Stack sx={{ textAlign: 'left', maxWidth: 180 }}>
              <Typography variant="body2" noWrap sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
                {userDetail.name}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
                {userDetail.email}
              </Typography>
            </Stack>
            <ExpandMore
              fontSize="small"
              sx={{ color: 'text.secondary', transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'none' }}
            />
          </>
        )}
      </ButtonBase>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              width: 280,
              borderRadius: '14px',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: '0 16px 40px rgba(16, 24, 40, 0.14)',
            },
          },
          list: { sx: { p: 1 } },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: 'center',
            p: 1.5,
            mb: 1,
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.03)})`,
          }}
        >
          <StyledAvatar size={48} />
          <Stack sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
              {userDetail.name}
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
              {userDetail.email}
            </Typography>
          </Stack>
        </Stack>

        <MenuItem
          sx={menuItemSx(theme.palette.primary.main)}
          onClick={() => {
            setAnchorEl(null);
            navigate('/settings');
          }}
        >
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" secondary="Preferences & account" />
          <ChevronRight fontSize="small" className="chevron" />
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          sx={{ ...menuItemSx(theme.palette.error.main), color: 'error.main' }}
          onClick={() => {
            setAnchorEl(null);
            handleLogout();
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

const menuItemSx = color => ({
  py: 1,
  borderRadius: '8px',
  transition: 'all 0.15s ease',
  '& .MuiListItemIcon-root': { minWidth: 36, color: 'text.secondary' },
  '& .MuiListItemText-primary': { fontSize: 14, fontWeight: 500 },
  '& .MuiListItemText-secondary': { fontSize: 12 },
  '& .chevron': { color: 'text.disabled', transition: 'transform 0.15s ease' },
  '&:hover': {
    backgroundColor: alpha(color, 0.08),
    '& .MuiListItemIcon-root': { color },
    '& .chevron': { transform: 'translateX(2px)', color },
  },
});
