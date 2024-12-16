import { Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

const SessionHeader = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartSession = async () => {
    setLoading(true);
    navigate('/');
    setLoading(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5} mb={2.5}>
        <Typography variant="h6" fontWeight="500">
          Previous Sessions
        </Typography>
        <LoadingButton variant="contained" onClick={handleStartSession} startIcon={<AddIcon />} loading={loading}>
          Start Session
        </LoadingButton>
      </Stack>
    </>
  );
};

export default SessionHeader;
