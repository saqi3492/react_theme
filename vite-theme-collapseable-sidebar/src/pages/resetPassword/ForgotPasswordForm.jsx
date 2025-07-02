import { Box, Button, Stack, Typography } from '@mui/material';
import CustomLink from '@/components/CustomLink';
import InputField from '@/shared/InputField';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
const ForgotPasswordForm = ({ formik }) => {
  return (
    <Box sx={{ p: { xs: 5, lg: 12 }, width: '100%', maxWidth: '800px' }}>
      <Typography fontSize={28} fontWeight="500" gutterBottom>
        Forgot Password
      </Typography>
      <Typography fontSize={16} fontWeight="400" color="textSecondary" mb={4}>
        Enter your email and we will send you instructions to reset your password.
      </Typography>

      <InputField formik={formik} name="email" label="Email Address" />

      <Button size="large" type="submit" fullWidth variant="contained" color="primary" loading={formik.isSubmitting} sx={{ mt: 5 }}>
        Submit
      </Button>
      <Stack alignItems="center" mt={1}>
        <CustomLink to="/signin" sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIosNewRoundedIcon fontSize="small" />
          Back to Sign In
        </CustomLink>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
