import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const StyledNavItemButton = styled(ButtonBase)(({ theme, active }) => ({
  height: 44,
  width: '100%',
  padding: '0 18px',
  borderRadius: 8,
  marginBottom: 4,
  justifyContent: 'flex-start',
  transition: 'all 0.15s ease',
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
  color: active ? theme.palette.primary.main : 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const NavItemButton = ({ active, sx, children, ...props }) => {
  return (
    <StyledNavItemButton active={active} sx={{ ...sx }} {...props}>
      {children}
    </StyledNavItemButton>
  );
};

export default NavItemButton;
