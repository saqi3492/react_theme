import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import CustomLink from '@/components/CustomLink';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { handleSignIn } from '../auth/AuthApiCalls';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    const isSuccess = await handleSignIn(values);
    if (isSuccess) {
      navigate('/sessions', { replace: true });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        p: { xs: 5, lg: 16 },
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Typography fontWeight="500" fontSize={28} gutterBottom>
        Welcome back
      </Typography>
      <Typography fontWeight="400" fontSize={16} color="textSecondary" mb={3}>
        Please sign-in to your account and start the adventure.
      </Typography>
      <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange }) => (
          <Form noValidate autoComplete="off" sx={{ marginTop: '20px' }}>
            <Typography fontSize={14} fontWeight="500" gutterBottom>
              Email Address
            </Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Email Address"
              size="small"
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Typography fontSize={14} fontWeight="500" gutterBottom mt={3}>
              Password
            </Typography>
            <TextField
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              size="small"
              fullWidth
              onChange={handleChange}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
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

            <Box display="flex" justifyContent="flex-end" mt={1}>
              <CustomLink to="/forgot-password" sx={{ fontSize: '13px', fontWeight: 500 }}>
                Forgot Password?
              </CustomLink>
            </Box>

            <Button size="large" type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={loading}>
              Sign In
            </Button>

            <Typography variant="body2" color="textSecondary" align="center" mt={2}>
              New on our platform? <CustomLink to="/signup">Create a New Account</CustomLink>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignInForm;
