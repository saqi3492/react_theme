import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField, Typography } from '@mui/material';
import CustomLink from 'components/CustomLink';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ForgotPasswordForm = ({ formik, loading }) => {
  return (
    <Box
      sx={{
        p: { xs: 5, lg: 16 },
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Typography fontSize={28} fontWeight="500" gutterBottom>
        Forgot Password
      </Typography>
      <Typography fontSize={16} fontWeight="400" color="textSecondary" mb={4}>
        Enter your email and we will send you instructions to reset your password.
      </Typography>

      <Typography fontSize={14} fontWeight="500" gutterBottom>
        Email Address
      </Typography>
      <TextField
        fullWidth
        size="small"
        id="email"
        name="email"
        placeholder="Email Address"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <LoadingButton size="large" type="submit" fullWidth variant="contained" color="primary" loading={loading} sx={{ mt: 5 }}>
        Submit
      </LoadingButton>
      <Stack alignItems="center" mt={1}>
        <CustomLink to="/signin" sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIosNewIcon fontSize="small" />
          Back to Sign In
        </CustomLink>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
