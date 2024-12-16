import { Typography, useMediaQuery, Stack, useTheme } from '@mui/material';
import StyledAvatar from './StyledAvatar';
import { useSelector } from 'react-redux';

const UserMenu = () => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const userDetail = useSelector(state => state.User.userDetail);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <StyledAvatar />
        {downMd ? null : (
          <>
            <Stack alignItems="flex-start" pr="10px">
              <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {userDetail.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userDetail.email}
              </Typography>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default UserMenu;
