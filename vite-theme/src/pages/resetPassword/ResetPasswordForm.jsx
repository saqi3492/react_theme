import { Box, Button, Typography } from '@mui/material';
import PasswordInputField from '@/shared/PasswordInputField';

const ResetPasswordForm = ({ formik }) => {
  return (
    <Box sx={{ p: { xs: 5, lg: 12 }, width: '100%', maxWidth: '800px' }}>
      <Typography fontSize={28} fontWeight="500" gutterBottom>
        Reset Password
      </Typography>
      <Typography fontSize={16} fontWeight="400" color="textSecondary" mb={4}>
        Please input your new desired password in the fields below to create a new password and regain access to your account.
      </Typography>

      <PasswordInputField formik={formik} name="password" label="New Password" size="small" />
      <PasswordInputField formik={formik} name="confirmPassword" label="Confirm Password" size="small" />
      <Button size="large" type="submit" fullWidth variant="contained" color="primary" loading={formik.isSubmitting} sx={{ mt: 5 }}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
