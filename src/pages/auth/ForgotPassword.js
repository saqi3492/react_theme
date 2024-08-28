import React from 'react';
import { Card, CardContent, TextField, Button, Typography, Grid, Box, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomLink from 'components/CustomLink';
import Logo from 'assets/logo.png';

// Validation schema for login
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
});

const ForgotPassword = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={11} sm={8} lg={4}>
        <Card elevation={10} sx={{ padding: '20px', borderRadius: '12px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <img src={Logo} alt="logo" width={50} />
              <Typography variant="h5" gutterBottom>
                Forgot Password
              </Typography>
            </Box>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('Login Form Values:', values);
              }}
            >
              {({ errors, touched, handleChange }) => (
                <Form noValidate autoComplete="off" sx={{ marginTop: '20px' }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Email Address"
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Button size="small" type="submit" fullWidth variant="contained" color="primary">
                      Submit
                    </Button>
                    <Stack alignItems="flex-end">
                      <CustomLink to="/signin">Back to Sign In</CustomLink>
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

export default ForgotPassword;
