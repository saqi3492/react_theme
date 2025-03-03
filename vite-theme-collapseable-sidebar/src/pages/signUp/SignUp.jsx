import { Grid2 as Grid } from '@mui/material';
import SignUpForm from './SignUpForm';
import AuthCard from '@/shared/AuthCard';
import Description from '../signIn/Description';

const SignUp = () => {
  return (
    <Grid container px={1} sx={{ minHeight: '100vh' }}>
      <Grid my={1} size={{ xs: 12, md: 6 }}>
        <AuthCard>
          <Description />
        </AuthCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} container justifyContent="center" alignItems="center">
        <SignUpForm />
      </Grid>
    </Grid>
  );
};

export default SignUp;
