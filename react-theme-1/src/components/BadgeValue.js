import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const StyledBadgeValue = styled(Box, { shouldForwardProp: (prop) => prop !== 'sidebarCompact' })(({ theme, compact, sidebarCompact }) => ({
  fontSize: '12px',
  fontWeight: 500,
  color: 'white',
  padding: '1px 6px',
  overflow: 'hidden',
  borderRadius: '300px',
  backgroundColor: theme.palette.primary.main,
  transition: 'all 0.15s ease',
  display: compact ? 'none' : 'unset',
  ...(sidebarCompact && {
    opacity: 0,
    width: 0
  })
}));

const BadgeValue = ({ compact, sx, ...props }) => {
  const sidebarCompact = useSelector((state) => state.ThemeOptions.sidebarCompact);
  return <StyledBadgeValue compact={compact} sidebarCompact={sidebarCompact} sx={{ ...sx }} {...props} />;
};

export default BadgeValue;
