import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Grid, Box, InputAdornment, IconButton, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomLink from 'components/CustomLink';
import Logo from 'assets/logo.png';

// Validation schema for signup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Full name must be at least 2 characters long').required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={11} sm={8} lg={4}>
        <Card elevation={10} sx={{ padding: '20px', borderRadius: '12px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <img src={Logo} alt="logo" width={50} />
              <Typography variant="h5" gutterBottom>
                Sign Up
              </Typography>
            </Box>
            <Formik
              initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('Signup Form Values:', values);
              }}
            >
              {({ errors, touched, handleChange }) => (
                <Form noValidate autoComplete="off" sx={{ marginTop: '20px' }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      name="fullName"
                      label="Full Name"
                      size="small"
                      onChange={handleChange}
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      size="small"
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      size="small"
                      type={showPassword ? 'text' : 'password'}
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
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      size="small"
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button size="small" type="submit" fullWidth variant="contained" color="primary">
                      Sign Up
                    </Button>
                    <Stack alignItems="flex-end">
                      <CustomLink to="/signin">Already have an account? Sign In</CustomLink>
                    </Stack>
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

export default SignupPage;
