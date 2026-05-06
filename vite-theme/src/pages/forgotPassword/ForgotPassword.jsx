import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import AuthCard from '@/shared/AuthCard';
import ForgotPasswordForm from './ForgotPasswordForm';
import { forgotPassword } from '../auth/AuthApiCalls';
import Description from '../signIn/Description';

const validationSchemaEmail = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: validationSchemaEmail,
    enableReinitialize: true,
    onSubmit: values => forgotPassword(values.email),
  });

  return (
    <Grid container sx={{ minHeight: '100vh', px: 1 }}>
      <Grid size={{ xs: 12, md: 6 }} sx={{ my: 1 }}>
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
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <ForgotPasswordForm formik={formik} />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
