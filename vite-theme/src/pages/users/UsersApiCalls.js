import axios from 'axios';
import queryClient from '@/lib/queryClient';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import { dispatch } from '@/store/store';
import { getFormattedDate, handleCatchError, handleErrorMessages } from '@/utils/helpers';

const refreshUsers = () => queryClient.invalidateQueries({ queryKey: ['users'] });

const getFormattedUser = todo => ({
  id: todo.id,
  headline: todo.headline || '',
  description: todo.description || '',
  ageOfWork: todo.ageOfWork ?? '',
  createdAt: getFormattedDate(todo.createdAt, '', true),
});

export const fetchUsers = async ({ searchedText } = {}) => {
  try {
    const response = await axios.get('/todos');

    if (response.status && response.data) {
      let todos = response.data;

      if (searchedText) {
        const search = searchedText.toLowerCase();
        todos = todos.filter(todo => todo.headline?.toLowerCase().includes(search) || todo.description?.toLowerCase().includes(search));
      }

      return { users: todos.map(getFormattedUser), totalPages: 1 };
    }

    handleErrorMessages(response?.errors);
    return { users: [], totalPages: 0 };
  } catch (error) {
    handleCatchError(error);
    throw error;
  }
};

export const deleteTodo = async todoId => {
  try {
    const response = await axios.delete(`/todos/${todoId}`);

    if (response.status) {
      dispatch(setSnackbarObj({ message: 'Todo deleted successfully.', severity: 'success' }));
      refreshUsers();
      return true;
    }

    handleErrorMessages(response?.errors);
  } catch (error) {
    handleCatchError(error);
  }
};

export const createTodo = async todoData => {
  try {
    const response = await axios.post('/todos', todoData);

    if (response.status) {
      dispatch(setSnackbarObj({ message: 'Todo created successfully.', severity: 'success' }));
      refreshUsers();
      return true;
    }
    handleErrorMessages(response?.errors);
  } catch (error) {
    handleCatchError(error);
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
