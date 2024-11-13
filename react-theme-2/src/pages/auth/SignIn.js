import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Box, Grid2 as Grid, InputAdornment, IconButton, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomLink from 'components/CustomLink';
import Logo from 'assets/logo-dark.png';
import { signIn } from './AuthApiCalls';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

// Validation schema for login
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
});

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    await signIn(values, navigate);
    setLoading(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid size={{ xs: 11, sm: 8, lg: 4 }}>
        <Card elevation={10} sx={{ padding: '20px', borderRadius: '12px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <img src={Logo} alt="logo" width={150} />
              <Typography variant="h5" gutterBottom my={2}>
                Sign In
              </Typography>
            </Box>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched, handleChange }) => (
                <Form noValidate autoComplete="off" sx={{ marginTop: '20px' }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      size="small"
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      name="password"
                      label="Password"
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
                        )
                      }}
                    />
                    <LoadingButton size="small" type="submit" fullWidth variant="contained" color="primary" loading={loading}>
                      Sign In
                    </LoadingButton>
                    <Grid container justifyContent="space-between">
                      <Grid>
                        <CustomLink to="/forgotpassword">Forgot password</CustomLink>
                      </Grid>
                      <Grid>
                        <CustomLink to="/signup"> Don't have an account? Sign Up</CustomLink>
                      </Grid>
                    </Grid>
                  </Stack>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignIn;
