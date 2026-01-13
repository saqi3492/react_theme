import axios, { AxiosError } from 'axios';
import { handleCatchMessages, setLocalStorageItem } from '@/utils/helper';
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
    const response = await axios.post('/api/login', payload);

    if (response.status && response.data?.token?.token) {
      setLocalStorageItem('authentication_token', response.data.token.token);
      dispatch(setUser(getFormattedUser(response.data.user)));
      return true;
    }
    showToast.error('Login failed! Please check your credentials and try again.');
    return false;
  } catch (error: any) {
    handleCatchMessages(error);
    return false;
  }
};

export const handleSignUp = async (payload: { fullName: string; email: string; password: string }): Promise<boolean> => {
  try {
    const response = await axios.post('/api/register', payload);

    if (response.status && response.data?.token?.token) {
      setLocalStorageItem('authentication_token', response.data.token.token);
      dispatch(setUser(getFormattedUser(response.data.user)));
      return true;
    }
    showToast.error('Sign up failed! Please check your credentials and try again.');
    return false;
  } catch (error: any) {
    handleCatchMessages(error);
    return false;
  }
};

export const fetchUserByAuthToken = async (): Promise<boolean> => {
  try {
    const response = await axios.get('/api/me');
    if (response.status && response.data) {
      dispatch(setUser(getFormattedUser(response.data)));
      return true;
    }
    return false;
  } catch (error) {
    handleCatchMessages(error as AxiosError<{ message?: string }>);
    return false;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    const response = { status: true }; //await axios.post('/api/logout');

    if (response.status) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    handleCatchMessages(error as AxiosError<{ message?: string }>);
    return false;
  }
};
