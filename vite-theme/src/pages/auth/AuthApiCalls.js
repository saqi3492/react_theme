import { dispatch } from '@/store/store';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import axios from 'axios';
import { setUserDetail } from '@/store/reducers/userSlice';
import { handleCatchError, handleErrorMessages, handleLogout } from '@/utils/helpers';

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
    const response = await axios.post('/auth/signup', {
      fullName: userDetails.fullName,
      email: userDetails.email,
      password: userDetails.password,
      passwordConfirmation: userDetails.password,
    });

    if (response.status && response.data?.user) {
      dispatch(setSnackbarObj({ message: 'Sign-up successful. Thank you for joining!', severity: 'success' }));
      formatAndSetUserDetail(response.data.user);
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
    const response = await axios.post('/auth/login', { email: userDetails.email, password: userDetails.password });
    if (response.status && response.data?.user) {
      formatAndSetUserDetail(response.data.user);
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const requestLoginOtp = async email => {
  try {
    const response = await axios.post('/auth/otp/request', { email });
    if (response.status) {
      dispatch(setSnackbarObj({ message: response.message || 'We sent a login code to your email.', severity: 'success' }));
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const verifyLoginOtp = async (email, otp) => {
  try {
    const response = await axios.post('/auth/otp/verify', { email, otp });
    if (response.status && response.data?.user) {
      formatAndSetUserDetail(response.data.user);
      return true;
    }
    handleErrorMessages(response.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const fetchUserByAuthToken = async () => {
  try {
    const response = await axios.get('/auth/me');
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
