import { Box, Stack, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import navigations from './navigation';
import ButtonBase from '@mui/material/ButtonBase';
import LogoutBox from './LogoutBox';
import { HEADER_HEIGHT } from 'utils/constants';

export const StyledNavItemButton = styled(ButtonBase)(({ theme, active }) => ({
  height: 44,
  width: '100%',
  padding: '0 18px',
  borderRadius: 8,
  marginBottom: 4,
  justifyContent: 'flex-start',
  transition: 'all 0.15s ease',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? 'white' : 'inherit',
  '&:hover': {
    backgroundColor: !active && theme.palette.action.hover,
  },
}));

export const StyledText = styled('span')(({ compact }) => ({
  whiteSpace: 'nowrap',
  paddingLeft: '0.8rem',
  transition: 'all 0.15s ease',
  fontSize: '14px',
  ...(compact && {
    opacity: 0,
    width: 0,
  }),
}));

const MultiLevelMenu = ({ iscompact = 0 }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderLevels = data => {
    return data.map((item, index) => {
      return (
        <Box key={index}>
          <StyledNavItemButton active={pathname.startsWith(item.path) ? 1 : 0} onClick={() => navigate(item.path)}>
            <item.icon sx={{ fontSize: 18 }} />
            <StyledText compact={iscompact ? 1 : 0}>{item.name}</StyledText>
          </StyledNavItemButton>
        </Box>
      );
    });
  };

  return (
    <Stack direction="column" justifyContent="space-between" height={`calc(100% - ${HEADER_HEIGHT}px)`} sx={{ p: '25px 10px' }}>
      <Box>{renderLevels(navigations)}</Box>
      <LogoutBox iscompact={iscompact} />
    </Stack>
  );
};

export default MultiLevelMenu;
