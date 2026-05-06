import { dispatch } from '@/store/store';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import axios from 'axios';
import { setUserDetail } from '@/store/reducers/userSlice';
import { handleCatchError, handleErrorMessages, handleLogout, setItemInLocalStorage } from '@/utils/helpers';

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('/reset-password', { token, newPassword });
    if (response.status) {
      dispatch(setSnackbarObj({ message: 'Password reset successful. Please login with your new password.', severity: 'success' }));
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const forgotPassword = async email => {
  try {
    const response = await axios.post('/forgot-password', { email });
    if (response.status) {
      dispatch(setSnackbarObj({ message: 'Password reset email sent. Please check your email.', severity: 'success' }));
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const handleSignUp = async userDetails => {
  try {
    const response = await axios.post('/register', userDetails);

    if (response.status && response.data?.token?.token) {
      dispatch(setSnackbarObj({ message: 'Sign-up successful. Thank you for joining!', severity: 'success' }));
      setItemInLocalStorage('authentication_token', response.data.token.token);
      formatAndSetUserDetail(response.data);
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

const formatAndSetUserDetail = data => {
  dispatch(setUserDetail({ id: data.id, name: data.fullName, email: data.email }));
};

export const handleSignIn = async userDetails => {
  try {
    const response = await axios.post('/login', { email: userDetails.email, password: userDetails.password });
    if (response.status && response.data?.token?.token) {
      setItemInLocalStorage('authentication_token', response.data.token.token);
      formatAndSetUserDetail(response.data);
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const fetchUserByAuthToken = async () => {
  try {
    const response = await axios.get('/me');

    if (response.status && response.data) {
      formatAndSetUserDetail(response.data);
      return true;
    }
    handleLogout();
  } catch (error) {
    handleCatchError(error);
    handleLogout();
  }
};

// export const fetchMasterData = async key => {
//   try {
//     if (getState().MasterData[key]?.length) return;

//     const response = await axios.post(`/${key}/listing`, { page_size: 2000 });
//     if (response.status && response.data?.data) {
//     }
//   } catch (error) {
//     handleCatchError(error);
//   }
// };
