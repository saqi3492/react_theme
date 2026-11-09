import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import SharedButton from '@/shared/GenericButton';
import InputField from '@/shared/InputField';
import { handleSignIn, requestLoginOtp, verifyLoginOtp } from './authApiCalls';

interface LoginFormValues {
  email: string;
  password: string;
  showPassword?: boolean;
}

const ToggleLink = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} className="text-primary text-sm font-medium hover:underline">
    {children}
  </button>
);

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [otpEmail, setOtpEmail] = useState('');

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      showPassword: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async () => {
      const isSuccess = await handleSignIn({ email: formik.values.email, password: formik.values.password });
      if (isSuccess) navigate('/dashboard');
    },
  });

  const otpRequestFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
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
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, 'Enter the 6-digit code')
        .required('Verification code is required'),
    }),
    onSubmit: async values => {
      const isSuccess = await verifyLoginOtp(otpEmail, values.otp);
      if (isSuccess) navigate('/dashboard');
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

  const subtitle =
    mode === 'password'
      ? 'Sign in to your account to continue'
      : otpStep === 'request'
        ? 'Enter your email and we will send you a login code'
        : `Enter the 6-digit code we sent to ${otpEmail}`;

  const signupLink = (
    <div className="text-center text-sm">
      <span className="text-muted-foreground">Don't have an account? </span>
      <Link to="/signup" className="text-primary font-medium hover:underline">
        Sign up
      </Link>
    </div>
  );

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
            <span className="text-2xl font-bold">R</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>
        </div>

        {mode === 'password' && (
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <div className="bg-card space-y-4 rounded-lg border p-8 shadow-sm">
              <InputField id="email" type="email" label="Email address" placeholder="john@example.com" formik={formik} />

              <InputField
                id="password"
                type={formik.values.showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                formik={formik}
                labelExtraParams
                icon={
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {formik.values.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <SharedButton type="submit" className="w-full" isLoading={formik.isSubmitting}>
                Sign in
              </SharedButton>

              <div className="text-center">
                <ToggleLink onClick={switchToOtpMode}>Sign in with a code instead</ToggleLink>
              </div>
            </div>

            {signupLink}
          </form>
        )}

        {mode === 'otp' && otpStep === 'request' && (
          <form onSubmit={otpRequestFormik.handleSubmit} className="mt-8 space-y-6">
            <div className="bg-card space-y-4 rounded-lg border p-8 shadow-sm">
              <InputField id="email" type="email" label="Email address" placeholder="john@example.com" formik={otpRequestFormik} />

              <SharedButton type="submit" className="w-full" isLoading={otpRequestFormik.isSubmitting}>
                Send code
              </SharedButton>

              <div className="text-center">
                <ToggleLink onClick={switchToPasswordMode}>Sign in with password instead</ToggleLink>
              </div>
            </div>

            {signupLink}
          </form>
        )}

        {mode === 'otp' && otpStep === 'verify' && (
          <form onSubmit={otpVerifyFormik.handleSubmit} className="mt-8 space-y-6">
            <div className="bg-card space-y-4 rounded-lg border p-8 shadow-sm">
              <InputField id="otp" label="Verification code" placeholder="Enter 6-digit code" formik={otpVerifyFormik} />

              <SharedButton type="submit" className="w-full" isLoading={otpVerifyFormik.isSubmitting}>
                Verify & sign in
              </SharedButton>

              <div className="flex justify-between">
                <ToggleLink onClick={handleUseDifferentEmail}>Use a different email</ToggleLink>
                <ToggleLink onClick={() => requestLoginOtp(otpEmail)}>Resend code</ToggleLink>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
