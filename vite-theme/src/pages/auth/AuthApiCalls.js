import { dispatch } from '@/store/store';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import axios from 'axios';
import { setAuthUser } from '@/store/reducers/userSlice';
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
  dispatch(setAuthUser({ id: data.id, name: data.fullName, email: data.email }));
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

export const handleSignOut = async () => {
  try {
    await axios.post('/auth/logout');
  } catch (error) {
    handleCatchError(error);
  } finally {
    handleLogout();
  }
};

// Probes the AdonisJS session cookie against the backend and pushes the result into
// the Redux auth slice. This is the sole source of truth for "am I logged in" -
// auth state is never mirrored into localStorage. Failure just means "not logged in",
// so it stays silent instead of surfacing an error toast or forcing a logout redirect.
export const loadCurrentUser = async () => {
  try {
    const response = await axios.get('/account/profile');
    if (response.status && response.data) {
      formatAndSetUserDetail(response.data);
      return;
    }
    dispatch(setAuthUser(null));
  } catch {
    dispatch(setAuthUser(null));
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
