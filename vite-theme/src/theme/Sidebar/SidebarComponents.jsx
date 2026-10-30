import { styled, alpha } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const StyledNavItemButton = styled(ButtonBase)(({ theme, active }) => ({
  position: 'relative',
  height: 44,
  width: '100%',
  padding: '0 18px',
  borderRadius: 10,
  marginBottom: 4,
  justifyContent: 'flex-start',
  transition: 'all 0.15s ease',
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  color: active ? theme.palette.primary.main : 'inherit',
  '&:hover': {
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.14) : alpha(theme.palette.primary.main, 0.05),
    '& .bulletDot::after': { borderColor: theme.palette.primary.main },
  },
  '&.navItem::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 3,
    borderRadius: '0 3px 3px 0',
    backgroundColor: theme.palette.primary.main,
    transition: 'opacity 0.15s ease',
    opacity: active ? 1 : 0,
  },
}));

export const NavItemButton = ({ active, sx, children, ...props }) => {
  return (
    <StyledNavItemButton active={active} sx={{ ...sx }} {...props}>
      {children}
    </StyledNavItemButton>
  );
};

// Spacer that keeps child text aligned and draws a dot centered on the tree line from SidebarAccordion
const StyledBulletIcon = styled(Box, { shouldForwardProp: prop => prop !== 'active' })(({ theme, active }) => ({
  position: 'relative',
  width: 4,
  height: 4,
  flexShrink: 0,
  marginLeft: '10px',
  marginRight: '8px',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.15s ease',
    backgroundColor: active ? theme.palette.primary.main : theme.palette.background.paper,
    border: `2px solid ${active ? theme.palette.primary.main : theme.palette.text.disabled}`,
    boxShadow: active ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
  },
}));

export const BulletIcon = ({ active, sx, className, ...props }) => {
  return <StyledBulletIcon active={active} className={clsx('bulletDot', className)} sx={{ ...sx }} {...props} />;
};

const StyledBadgeValue = styled(Box, { shouldForwardProp: prop => prop !== 'sidebarCompact' })(({ theme, compact, sidebarCompact }) => ({
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
    width: 0,
  }),
}));

export const BadgeValue = ({ compact, sx, ...props }) => {
  const sidebarCompact = useSelector(state => state.ThemeOptions.sidebarCompact);
  return <StyledBadgeValue compact={compact} sidebarCompact={sidebarCompact} sx={{ ...sx }} {...props} />;
};

const StyledBox = styled(Box)(({ ellipsis }) => ({
  ...(ellipsis && {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
}));

export const Paragraph = props => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={14}
      component="p"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || '']: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const Span = props => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={14}
      component="span"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || '']: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
