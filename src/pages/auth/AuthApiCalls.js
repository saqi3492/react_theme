import { dispatch } from 'redux/store';
import { setSnackbarObj } from 'redux/reducers/alertsSlice';

export const signIn = async (credentials, navigate) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const isSuccessful = true;

    if (isSuccessful) {
      dispatch(setSnackbarObj({ message: 'Login successful!', severity: 'success' }));
      navigate('/dashboard');
    } else {
      dispatch(setSnackbarObj({ message: 'Error during sign-in', severity: 'error' }));
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};

export const signUp = async (userDetails) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSuccessful = true;

    if (isSuccessful) {
      dispatch(setSnackbarObj({ message: 'Sign up successful!', severity: 'success' }));
    } else {
      dispatch(setSnackbarObj({ message: 'Error during sign-up', severity: 'error' }));
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};

export const forgotPassword = async (email) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSuccessful = true;

    if (isSuccessful) {
      dispatch(setSnackbarObj({ message: 'Password reset link sent!', severity: 'success' }));
    } else {
      dispatch(setSnackbarObj({ message: 'Error during password recovery', severity: 'error' }));
    }
  } catch (error) {
    console.error('Error during forgot password:', error);
  }
};
