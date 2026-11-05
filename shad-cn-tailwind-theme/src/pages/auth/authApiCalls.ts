import axios from 'axios';
import { handleCatchMessages, handleLogout } from '@/utils/helper';
import { showToast } from '../../lib/toast';
import { dispatch } from '@/store/store';
import { setUser } from '@/store/slices/userSlice';

const getFormattedUser = (userData: any) => {
  return {
    id: userData.id,
    name: userData.fullName,
    email: userData.email,
  };
};

export const handleSignIn = async (payload: { email: string; password: string }): Promise<boolean> => {
  try {
    const response = await axios.post('/auth/login', payload);

    if (response.status && response.data?.user) {
      dispatch(setUser(getFormattedUser(response.data.user)));
      return true;
    }
    showToast.error('Login failed! Please check your credentials and try again.');
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};

export const handleSignUp = async (payload: { fullName: string; email: string; password: string }): Promise<boolean> => {
  try {
    const response = await axios.post('/auth/signup', { ...payload, passwordConfirmation: payload.password });

    if (response.status && response.data?.user) {
      showToast.success('Sign-up successful. Thank you for joining!');
      dispatch(setUser(getFormattedUser(response.data.user)));
      return true;
    }
    showToast.error('Sign up failed! Please check your credentials and try again.');
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};

export const requestLoginOtp = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.post('/auth/otp/request', { email });

    if (response.status) {
      showToast.success((response as any).message || 'We sent a login code to your email.');
      return true;
    }
    showToast.error('Could not send the login code. Please try again.');
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};

export const verifyLoginOtp = async (email: string, otp: string): Promise<boolean> => {
  try {
    const response = await axios.post('/auth/otp/verify', { email, otp });

    if (response.status && response.data?.user) {
      dispatch(setUser(getFormattedUser(response.data.user)));
      return true;
    }
    showToast.error('Invalid code. Please try again.');
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};

export const fetchUserByAuthToken = async (): Promise<boolean> => {
  try {
    const response = await axios.get('/auth/me');
    if (response.status && response.data) {
      dispatch(setUser(getFormattedUser(response.data)));
      return true;
    }
    handleLogout();
    return false;
  } catch (error) {
    handleCatchMessages(error);
    handleLogout();
    return false;
  }
};

// Ends the session on the backend so the auth cookie is cleared
export const logoutUser = async (): Promise<boolean> => {
  try {
    const response = await axios.post('/auth/logout');

    if (response.status) {
      return true;
    }
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};
