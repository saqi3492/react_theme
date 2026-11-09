import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Collapse } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavItemButton, BulletIcon, BadgeValue, Span } from './SidebarComponents';

const NavExpandRoot = styled(Box)(({ theme }) => ({
  '& .subMenu': {
    padding: 0,
  },
  '& .expansion-panel': {
    '& .expansion-panel': {
      paddingLeft: 8,
      '&::before': { left: 37 },
      '& .navItem::before': { left: 29 },
    },
    position: 'relative',
    // vertical tree line under the parent icon
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 29,
      top: 0,
      bottom: 6,
      width: 2,
      borderRadius: 2,
      backgroundColor: theme.palette.divider,
    },
    // active child highlights its segment of the tree line
    '& .navItem::before': {
      left: 29,
      top: 8,
      bottom: 8,
      width: 2,
      borderRadius: 2,
    },
  },
}));

const ChevronIconStyled = styled(ChevronRightIcon)(({ collapsed, compact }) => ({
  fontSize: 18,
  transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
  transform: collapsed ? 'rotate(90deg)' : 'rotate(0deg)',
  ...(compact && {
    opacity: 0,
    width: 0,
  }),
}));

const ItemText = styled(Span)(({ theme, compact, active }) => ({
  whiteSpace: 'nowrap',
  paddingLeft: '0.8rem',
  fontSize: '13px',
  fontWeight: 500,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  verticalAlign: 'middle',
  transition: 'all 0.15s ease',
  ...(compact && {
    opacity: 0,
    width: 0,
    paddingLeft: 0,
  }),
}));

const SidebarAccordion = props => {
  const { item, children, sidebarCompact } = props;
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(item.defaultOpen ?? false);
  const [prevPathname, setPrevPathname] = useState(null);
  const hasActive = item.children.some(child => child.path === pathname);

  // OPEN DROPDOWN IF CHILD IS ACTIVE
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (hasActive) setCollapsed(true);
  }

  const { name, icon, iconText, badge } = item;

  const handleClick = () => setCollapsed(!collapsed);

  return (
    <NavExpandRoot className="subMenu">
      <NavItemButton sx={{ padding: '0 12px', justifyContent: 'space-between' }} onClick={handleClick}>
        <Box sx={{ pl: '7px', display: 'flex', alignItems: 'center' }}>
          {icon && (
            <item.icon
              sx={{
                fontSize: 18,
                color: hasActive ? 'primary.main' : 'text.secondary',
                mr: '4px',
              }}
            />
          )}
          {iconText && <BulletIcon sx={{ marginLeft: '8px', marginRight: '6px', width: 6, height: 6 }} active={hasActive ? 1 : 0} />}
          <ItemText compact={sidebarCompact} active={hasActive ? 1 : 0}>
            {name}
          </ItemText>
        </Box>

        {badge && (
          <BadgeValue sidebarCompact={sidebarCompact} className="itemIcon">
            {badge.value}
          </BadgeValue>
        )}
        <ChevronIconStyled color="disabled" compact={sidebarCompact ? 1 : 0} collapsed={collapsed ? 1 : 0} className="accordionArrow" />
      </NavItemButton>

      <Collapse in={collapsed} timeout={250} className="expansion-panel">
        {children}
      </Collapse>
    </NavExpandRoot>
  );
};

export default SidebarAccordion;
