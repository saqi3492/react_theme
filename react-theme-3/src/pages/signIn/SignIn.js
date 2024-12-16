import { Grid2 as Grid } from '@mui/material';
import AuthCard from 'shared/AuthCard';
import Description from './Description';
import SignInForm from './SignInForm';

const SignIn = () => {
  return (
    <Grid container px={1} sx={{ minHeight: '100vh' }}>
      <Grid my={1} size={{ xs: 12, md: 6 }}>
        <AuthCard>
          <Description />
        </AuthCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} container justifyContent="center" alignItems="center">
        <SignInForm />
      </Grid>
    </Grid>
  );
};

export default SignIn;
