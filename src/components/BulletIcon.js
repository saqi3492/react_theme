import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const StyledBulletIcon = styled(Box)(({ theme, active }) => ({
  width: 4,
  height: 4,
  marginLeft: '10px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '50%',
  background: active ? theme.palette.primary.main : theme.palette.text.disabled,
  boxShadow: active ? `0px 0px 0px 3px ${theme.palette.primary[200]}` : 'none'
}));

const BulletIcon = ({ active, sx, ...props }) => {
  return <StyledBulletIcon active={active} sx={{ ...sx }} {...props} />;
};

export default BulletIcon;
