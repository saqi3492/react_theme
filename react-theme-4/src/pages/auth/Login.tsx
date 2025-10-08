import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '@/lib/toast';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InputField from '@/shared/InputField';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  showPassword?: boolean;
}

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async values => {
      localStorage.setItem('authentication_token', 'mock_token_12345');

      if (values.rememberMe) {
        localStorage.setItem('remember_me', 'true');
      }

      showToast.success('Login successful! Welcome back.');

      navigate('/dashboard');
    },
  });

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
            <span className="text-2xl font-bold">R</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to your account to continue</p>
        </div>

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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="border-input h-4 w-4 rounded"
                />
                <label htmlFor="rememberMe" className="text-muted-foreground ml-2 text-sm">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="text-primary text-sm font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
