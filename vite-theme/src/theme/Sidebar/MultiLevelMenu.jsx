import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { navItems } from './navItems';
import SidebarAccordion from './SidebarAccordion';
import { SIDEBAR_TOP_HEADER_AREA } from '@/utils/constants';
import { NavItemButton, BulletIcon, BadgeValue, Paragraph, Span } from './SidebarComponents';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const ListLabel = styled(Paragraph)(({ theme, compact }) => ({
  fontWeight: 600,
  fontSize: '11px',
  letterSpacing: '0.08em',
  marginTop: '20px',
  marginLeft: '18px',
  marginBottom: '8px',
  textTransform: 'uppercase',
  transition: 'all 0.15s ease',
  color: theme.palette.text.disabled,
  ...(compact && {
    opacity: 0,
    width: 0,
  }),
}));

export const StyledText = styled(Span)(({ theme, compact, active }) => ({
  whiteSpace: 'nowrap',
  paddingLeft: '0.8rem',
  transition: 'all 0.15s ease',
  fontSize: '13px',
  fontWeight: active ? 600 : 500,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  ...(compact && {
    opacity: 0,
    width: 0,
  }),
}));

export const iconStyle = active => ({
  fontSize: 18,
  marginRight: '4px',
  color: active ? 'primary.main' : 'text.secondary',
});

const MultiLevelMenu = ({ sidebarCompact = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeRoute = path => (pathname === path ? 1 : 0);

  const handleNavigation = path => navigate(path);

  const COMPACT = sidebarCompact ? 1 : 0;

  const renderLevels = data => {
    return data.map((item, index) => {
      if (item.type === 'label')
        return (
          <ListLabel key={index} compact={COMPACT}>
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        );
      } else {
        return (
          <Box key={index}>
            <NavItemButton key={item.name} className="navItem" active={activeRoute(item.path)} onClick={() => handleNavigation(item.path)}>
              {item?.icon ? <item.icon sx={iconStyle(activeRoute(item.path))} /> : <BulletIcon active={activeRoute(item.path)} />}

              <StyledText compact={COMPACT} active={activeRoute(item.path)}>
                {item.name}
              </StyledText>

              <Box sx={{ mx: 'auto' }} />

              {item.badge && <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>}
            </NavItemButton>
          </Box>
        );
      }
    });
  };

  return (
    <Stack direction="column" sx={{ justifyContent: 'space-between', height: `calc(100vh - ${SIDEBAR_TOP_HEADER_AREA}px)` }}>
      <SimpleBar style={{ maxHeight: '100%', overflowX: 'hidden' }}>
        <Box sx={{ p: '4px 10px' }}>{renderLevels(navItems)}</Box>
      </SimpleBar>
    </Stack>
  );
};

export default MultiLevelMenu;
