import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid2 as Grid } from '@mui/material';
import AuthCard from '@/shared/AuthCard';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import OtpVerification from './OtpVerification';
import { forgotPassword, resetPassword } from '../auth/AuthApiCalls';
import Description from '../signIn/Description';

const validationSchemaEmail = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const validationSchemaPassword = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords not matched')
    .required('Confirm Password is required'),
});

const validationSchemaOtp = Yup.object().shape({
  otpCode: Yup.string().length(4, 'OTP must be 4 characters long').required('OTP is required'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState('forgot');
  const navigate = useNavigate();

  const handleContinue = type => {
    setFormType(type);
  };

  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '', otpCode: '' },
    validationSchema:
      formType === 'forgot' ? validationSchemaEmail : formType === 'otp-verification' ? validationSchemaOtp : validationSchemaPassword,
    enableReinitialize: true,
    onSubmit: async values => {
      setLoading(true);
      if (formType === 'forgot') {
        await forgotPassword(values);
        handleContinue('otp-verification');
      } else if (formType === 'otp-verification') {
        handleContinue('reset');
      } else {
        await resetPassword(values, navigate);
      }
      setLoading(false);
    },
  });

  return (
    <Grid container px={1} sx={{ minHeight: '100vh' }}>
      <Grid my={1} size={{ xs: 12, md: 6 }}>
        <AuthCard>
          <Description />
        </AuthCard>
      </Grid>
      <Grid
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
        autoComplete="off"
        size={{ xs: 12, md: 6 }}
        container
        justifyContent="center"
        alignItems="center"
      >
        {formType === 'forgot' && <ForgotPasswordForm formik={formik} loading={loading} />}
        {formType === 'otp-verification' && <OtpVerification formik={formik} loading={loading} />}
        {formType === 'reset' && <ResetPasswordForm formik={formik} loading={loading} />}
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
