import { Box, Button, Link, Typography } from '@mui/material';
import CustomLink from '@/components/CustomLink';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { handleSignIn, requestLoginOtp, verifyLoginOtp } from '../auth/AuthApiCalls';
import PasswordInputField from '@/shared/PasswordInputField';
import InputField from '@/shared/InputField';

const passwordValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

const otpRequestValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const otpVerifyValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'Enter the 6-digit code')
    .required('Verification code is required'),
});

const ToggleLink = ({ onClick, children }) => (
  <Link component="button" type="button" onClick={onClick} sx={{ fontSize: '15px', textDecoration: 'none' }}>
    {children}
  </Link>
);

const SignInForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('password');
  const [otpStep, setOtpStep] = useState('request');
  const [otpEmail, setOtpEmail] = useState('');

  const passwordFormik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: passwordValidationSchema,
    onSubmit: async values => {
      const isSuccess = await handleSignIn(values);
      if (isSuccess) navigate('/users', { replace: true });
    },
  });

  const otpRequestFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: otpRequestValidationSchema,
    onSubmit: async values => {
      const isSuccess = await requestLoginOtp(values.email);
      if (isSuccess) {
        setOtpEmail(values.email);
        setOtpStep('verify');
      }
    },
  });

  const otpVerifyFormik = useFormik({
    initialValues: { otp: '' },
    validationSchema: otpVerifyValidationSchema,
    onSubmit: async values => {
      const isSuccess = await verifyLoginOtp(otpEmail, values.otp);
      if (isSuccess) navigate('/users', { replace: true });
    },
  });

  const switchToOtpMode = () => {
    setMode('otp');
    setOtpStep('request');
    otpRequestFormik.resetForm();
    otpVerifyFormik.resetForm();
  };

  const switchToPasswordMode = () => {
    setMode('password');
    setOtpStep('request');
  };

  const handleUseDifferentEmail = () => {
    setOtpStep('request');
    otpVerifyFormik.resetForm();
  };

  const handleResendCode = () => requestLoginOtp(otpEmail);

  return (
    <Box sx={{ p: { xs: 5, lg: 12 }, width: '100%', maxWidth: '800px' }}>
      <Typography sx={{ fontWeight: '500', fontSize: '28px' }} gutterBottom>
        Welcome back
      </Typography>
      <Typography sx={{ fontWeight: '400', fontSize: '16px', color: 'text.secondary', mb: 3 }}>
        {mode === 'password'
          ? 'Please sign-in to your account and start the adventure.'
          : otpStep === 'request'
            ? 'Enter your email and we will send you a login code.'
            : `Enter the 6-digit code we sent to ${otpEmail}.`}
      </Typography>

      {mode === 'password' && (
        <form onSubmit={passwordFormik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '20px' }}>
          <InputField formik={passwordFormik} name="email" label="Email Address" />
          <PasswordInputField formik={passwordFormik} name="password" label="Password" size="small" />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <CustomLink to="/forgot-password" sx={{ fontSize: '13px', fontWeight: 500 }}>
              Forgot Password?
            </CustomLink>
          </Box>
          <Button size="large" type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={passwordFormik.isSubmitting}>
            Sign In
          </Button>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            <ToggleLink onClick={switchToOtpMode}>Sign in with a code instead</ToggleLink>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
            New on our platform? <CustomLink to="/sign-up">Create a New Account</CustomLink>
          </Typography>
        </form>
      )}

      {mode === 'otp' && otpStep === 'request' && (
        <form onSubmit={otpRequestFormik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '20px' }}>
          <InputField formik={otpRequestFormik} name="email" label="Email Address" />
          <Button size="large" type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={otpRequestFormik.isSubmitting}>
            Send Code
          </Button>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            <ToggleLink onClick={switchToPasswordMode}>Sign in with password instead</ToggleLink>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
            New on our platform? <CustomLink to="/sign-up">Create a New Account</CustomLink>
          </Typography>
        </form>
      )}

      {mode === 'otp' && otpStep === 'verify' && (
        <form onSubmit={otpVerifyFormik.handleSubmit} noValidate autoComplete="off" style={{ marginTop: '20px' }}>
          <InputField formik={otpVerifyFormik} name="otp" label="Verification Code" placeholder="Enter 6-digit code" />
          <Button size="large" type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={otpVerifyFormik.isSubmitting}>
            Verify & Sign In
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ToggleLink onClick={handleUseDifferentEmail}>Use a different email</ToggleLink>
            <ToggleLink onClick={handleResendCode}>Resend code</ToggleLink>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default SignInForm;
