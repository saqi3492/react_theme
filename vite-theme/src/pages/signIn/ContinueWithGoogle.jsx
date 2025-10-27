import { config } from '@/config/config';
import { Button, Divider, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const ContinueWithGoogle = () => {
  const handleGoogleSignUp = async () => {
    const oauthUrl =
      `${config.cognitoDomain}/oauth2/authorize?` +
      new URLSearchParams({
        identity_provider: 'Google',
        redirect_uri: `${config.frontendUrl}/oauth-callback`,
        response_type: 'code',
        client_id: config.clientId,
        scope: config.openIdConnectScope,
      }).toString();

    window.location.href = oauthUrl;
  };

  return (
    <>
      <Divider sx={{ mt: 1, mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          OR
        </Typography>
      </Divider>

      <Button size="large" fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignUp} sx={{ mb: 1 }}>
        Continue with Google
      </Button>
    </>
  );
};

export default ContinueWithGoogle;
