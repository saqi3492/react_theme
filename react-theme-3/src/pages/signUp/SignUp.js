import { Grid2 as Grid } from '@mui/material';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <Grid container px={1} sx={{ minHeight: '100vh' }}>
      <Grid size={{ xs: 12, md: 6 }} container justifyContent="center" alignItems="center">
        <SignUpForm />
      </Grid>
    </Grid>
  );
};

export default SignUp;
