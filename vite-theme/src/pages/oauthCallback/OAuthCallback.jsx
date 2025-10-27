import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { handleOAuthCallback } from '../auth/AuthApiCalls';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        dispatch(setSnackbarObj({ message: urlParams.get('error_description') || 'OAuth authorization failed' }));
        return;
      }

      if (!code) {
        dispatch(setSnackbarObj({ message: 'No authorization code received' }));
        return;
      }

      const isSuccess = await handleOAuthCallback(code);
      if (isSuccess) {
        setLoading(false);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    })();
  }, [dispatch, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #fce4ec 100%)',
      }}
    >
      <Paper sx={{ width: '400px', p: 4, textAlign: 'center' }}>
        {loading ? (
          <>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.primary" gutterBottom>
              Completing your signup...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we set up your account with Google.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Signup Complete!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Redirecting you to the dashboard...
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default OAuthCallback;
