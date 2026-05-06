import axios from 'axios';
import queryClient from '@/lib/queryClient';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import { dispatch } from '@/store/store';
import { getFormattedDate, handleCatchError, handleErrorMessages } from '@/utils/helpers';

const refreshUsers = () => queryClient.invalidateQueries({ queryKey: ['users'] });

const getFormattedUser = user => ({
  id: user.id,
  fullName: user.fullName || '',
  email: user.email || '',
  isActive: Boolean(user.isActive),
  createdAt: getFormattedDate(user.createdAt, '', true),
});

export const fetchUsers = async ({ searchedText, pageSize, page } = {}) => {
  try {
    const payload = { page, pageSize };

    if (searchedText) {
      payload.filters = [
        { columnName: 'email', type: 'like', value: searchedText },
        { columnName: 'full_name', type: 'like', value: searchedText },
      ];
    }

    const response = await axios.post('/users/listing', payload);

    if (response.status && response.data.data) {
      return { users: response.data.data.map(getFormattedUser), totalPages: response.data.total_page_count };
    }

    handleErrorMessages(response?.errors);
    return { logs: [], totalPages: 0 };
  } catch (error) {
    handleCatchError(error);
    throw error;
  }
};

export const createUser = async userData => {
  try {
    const response = await axios.post('/users', userData);

    if (response.status) {
      dispatch(setSnackbarObj({ message: 'User created successfully.', severity: 'success' }));
      refreshUsers();
      return true;
    }
    handleErrorMessages(response?.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const response = await axios.patch(`/users/${userId}`, payload);

    if (response.status) {
      dispatch(setSnackbarObj({ message: 'User updated successfully.', severity: 'success' }));
      refreshUsers();
      return true;
    }
    handleErrorMessages(response?.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const deleteUser = async userId => {
  try {
    const response = await axios.delete(`/users/${userId}`);

    if (response.status) {
      dispatch(setSnackbarObj({ message: 'User deleted successfully.', severity: 'success' }));
      refreshUsers();
      return true;
    }

    handleErrorMessages(response?.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const fetchUserDetail = async userId => {
  try {
    const response = await axios.get(`/users/${userId}`);
    if (response.status && response.data) {
      return getFormattedUser(response.data);
    }
    handleErrorMessages(response?.errors);
  } catch (error) {
    handleCatchError(error);
  }
};
