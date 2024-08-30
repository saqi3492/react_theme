import { dispatch } from 'redux/store';
import { setSnackbarObj } from 'redux/reducers/alertsSlice';
import { setLoaderBtn } from 'redux/reducers/masterSlice';

export const signIn = async (credentials, navigate) => {
  try {
    dispatch(setLoaderBtn());
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
  } finally {
    dispatch(setLoaderBtn());
  }
};

export const signUp = async (userDetails) => {
  try {
    dispatch(setLoaderBtn());
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSuccessful = true;

    if (isSuccessful) {
      dispatch(setSnackbarObj({ message: 'Sign up successful!', severity: 'success' }));
    } else {
      dispatch(setSnackbarObj({ message: 'Error during sign-up', severity: 'error' }));
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
  } finally {
    dispatch(setLoaderBtn());
  }
};

export const forgotPassword = async (email) => {
  try {
    dispatch(setLoaderBtn());
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSuccessful = true;

    if (isSuccessful) {
      dispatch(setSnackbarObj({ message: 'Password reset link sent!', severity: 'success' }));
    } else {
      dispatch(setSnackbarObj({ message: 'Error during password recovery', severity: 'error' }));
    }
  } catch (error) {
    console.error('Error during forgot password:', error);
  } finally {
    dispatch(setLoaderBtn());
  }
};
