import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

const ResetPasswordForm = ({ formik, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box
      sx={{
        p: { xs: 5, lg: 16 },
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Typography fontSize={28} fontWeight="500" gutterBottom>
        Reset Password
      </Typography>
      <Typography fontSize={16} fontWeight="400" color="textSecondary" mb={4}>
        Please input your new desired password in the fields below to create a new password and regain access to your account.
      </Typography>

      <Typography fontSize={14} fontWeight="500" gutterBottom>
        New Password
      </Typography>
      <TextField
        name="password"
        placeholder="New Password"
        type={showPassword ? 'text' : 'password'}
        size="small"
        fullWidth
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography fontSize={14} fontWeight="500" gutterBottom mt={2}>
        Confirm Password
      </Typography>
      <TextField
        name="confirmPassword"
        placeholder="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        size="small"
        fullWidth
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button size="large" type="submit" fullWidth variant="contained" color="primary" loading={loading} sx={{ mt: 5 }}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
