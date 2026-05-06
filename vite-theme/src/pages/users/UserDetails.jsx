import { useMemo } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PaperBox from '@/components/PaperBox';
import BackButton from '@/components/BackButton';
import { fetchUserDetail } from './UsersApiCalls';

const DetailRow = ({ label, value }) => (
  <Stack direction="row" spacing={1}>
    <Typography sx={{ fontWeight: 600 }}>{label}:</Typography>
    <Typography>{value || '-'}</Typography>
  </Stack>
);

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const parsedUserId = useMemo(() => Number(userId), [userId]);
  const isValidUserId = Number.isInteger(parsedUserId) && parsedUserId > 0;

  const { data: user, isLoading } = useQuery({
    queryKey: ['user-detail', parsedUserId],
    queryFn: () => fetchUserDetail(parsedUserId),
    enabled: isValidUserId,
  });

  return (
    <PaperBox sx={{ p: 2 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
        <BackButton handleBack={() => navigate(-1)} />
        <Typography variant="h6">User Details</Typography>
      </Stack>

      {!isValidUserId ? <Typography sx={{ color: 'error.main', textAlign: 'center' }}>Invalid user id.</Typography> : null}
      {isValidUserId && isLoading ? <Typography sx={{ textAlign: 'center' }}>Loading user details...</Typography> : null}
      {isValidUserId && !isLoading && !user ? <Typography sx={{ textAlign: 'center' }}>User not found.</Typography> : null}

      {user ? (
        <Box>
          <Stack spacing={1.5}>
            <DetailRow label="ID" value={user.id} />
            <DetailRow label="Full Name" value={user.fullName} />
            <DetailRow label="Email" value={user.email} />
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 600 }}>Status:</Typography>
              <Chip size="small" label={user.isActive ? 'Active' : 'Inactive'} color={user.isActive ? 'success' : 'default'} />
            </Stack>
            <DetailRow label="Created At" value={user.createdAt} />
          </Stack>
        </Box>
      ) : null}
    </PaperBox>
  );
};

export default UserDetails;
