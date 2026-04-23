import axios from 'axios';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import { deleteUserAction, createUserAction, updateUserAction } from '@/store/reducers/usersSlice';
import { dispatch } from '@/store/store';
import { getFormattedDate, handleCatchError, handleErrorMessages } from '@/utils/helpers';

const isSuccessResponse = response => response?.status === undefined || Boolean(response?.status);

const getNormalizedUser = user => ({
  id: user.id,
  fullName: user.fullName || '',
  email: user.email || '',
  isActive: Boolean(user.isActive),
  createdAt: getFormattedDate(user.createdAt, '', true),
});

export const fetchUsers = async ({ filter = '', page = 1, pageSize = 10 } = {}) => {
  try {
    const requestBody = {
      page,
      pageSize,
      sorts: [{ columnName: 'id', orderBy: 'desc' }],
    };

    if (filter?.trim()) {
      requestBody.filters = [{ columnName: 'email', type: 'like', value: filter.trim() }];
    }

    const response = await axios.post('/users/listing', requestBody);
    const payload = response?.data || {};
    const users = Array.isArray(payload?.data) ? payload.data : [];
    const pagination = {
      count: payload?.count ?? users.length,
      totalCount: payload?.total_count ?? users.length,
      totalPageCount: payload?.total_page_count ?? 1,
      page: payload?.page ?? page,
      pageSize: payload?.page_size ?? pageSize,
    };

    if (isSuccessResponse(response)) {
      return {
        rows: users.map(getNormalizedUser),
        pagination,
      };
    }

    handleErrorMessages(response?.errors);
    return { rows: [], pagination };
  } catch (error) {
    handleCatchError(error);
    return {
      rows: [],
      pagination: { count: 0, totalCount: 0, totalPageCount: 1, page, pageSize },
    };
  }
};

export const createUser = async userData => {
  try {
    const response = await axios.post('/users', userData);

    if (isSuccessResponse(response) && response.data) {
      dispatch(createUserAction(getNormalizedUser(response.data)));
      dispatch(setSnackbarObj({ message: 'User created successfully.', severity: 'success' }));
      return response.data;
    }

    handleErrorMessages(response?.errors);
    return null;
  } catch (error) {
    handleCatchError(error);
    return null;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`/users/${userId}`, userData);

    if (isSuccessResponse(response) && response.data) {
      dispatch(updateUserAction(getNormalizedUser(response.data)));
      dispatch(setSnackbarObj({ message: 'User updated successfully.', severity: 'success' }));
      return response.data;
    }

    handleErrorMessages(response?.errors);
    return null;
  } catch (error) {
    handleCatchError(error);
    return null;
  }
};

export const deleteUser = async userId => {
  try {
    const response = await axios.delete(`/users/${userId}`);

    if (isSuccessResponse(response)) {
      dispatch(deleteUserAction(userId));
      dispatch(setSnackbarObj({ message: 'User deleted successfully.', severity: 'success' }));
      return true;
    }

    handleErrorMessages(response?.errors);
    return false;
  } catch (error) {
    handleCatchError(error);
    return false;
  }
};

export const fetchUserDetail = async userId => {
  try {
    const response = await axios.get(`/users/${userId}`);
    if (isSuccessResponse(response) && response.data) {
      return getNormalizedUser(response.data);
    }
    handleErrorMessages(response?.errors);
    return null;
  } catch (error) {
    handleCatchError(error);
    return null;
  }
};
