import { dispatch, getState } from '@/store/store';
import { setUsers, createUser, updateUser, deleteUser } from '@/store/slices/usersSlice';
// handleErrorMessages and getFormattedDate are used in commented-out axios examples below
import { handleCatchMessages } from '@/utils/helper'; // Used in commented axios examples
import { showToast } from '@/lib/toast';
import type { User } from '@/store/slices/usersSlice';
// import axios from 'axios';

// Dummy data
const dummyUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    createdAt: '2024-01-16T11:20:00.000Z',
    updatedAt: '2024-01-16T11:20:00.000Z',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Manager',
    createdAt: '2024-01-17T09:15:00.000Z',
    updatedAt: '2024-01-17T09:15:00.000Z',
  },
];

export const fetchUsers = async () => {
  try {
    // Real API call example (commented out):
    // const response = await axios.get('/users/list', { params: { page_size: 2000 } });
    // if (response?.status && response.data?.data) {
    //   dispatch(setUsers(response.data.data));
    // } else {
    //   handleErrorMessages(response.errors);
    // }

    // Dummy data implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(setUsers(dummyUsers));
  } catch (error) {
    handleCatchMessages(error);
  }
};

export const createUserApi = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    // Real API call example (commented out):
    // const response = await axios.post('/users/create', userData);
    // if (response?.status && response.data) {
    //   dispatch(createUser(response.data));
    //   showToast.success(response.message || 'User created successfully.');
    // } else {
    //   handleErrorMessages(response.errors);
    // }

    // Dummy data implementation
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(createUser(newUser));
    showToast.success('User created successfully.');
  } catch (error) {
    handleCatchMessages(error);
  }
};

export const updateUserApi = async (id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    // Real API call example (commented out):
    // const response = await axios.put(`/users/${id}`, userData);
    // if (response?.status && response.data) {
    //   dispatch(updateUser(response.data));
    //   showToast.success(response.message || 'User updated successfully.');
    // } else {
    //   handleErrorMessages(response.errors);
    // }

    // Dummy data implementation
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get current user from Redux state to preserve createdAt
    const state = getState();
    const currentUser = state.users.users.find((u: User) => u.id === id);

    const updatedUser: User = {
      id,
      name: userData.name || currentUser?.name || '',
      email: userData.email || currentUser?.email || '',
      role: userData.role || currentUser?.role || '',
      createdAt: currentUser?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateUser(updatedUser));
    showToast.success('User updated successfully.');
  } catch (error) {
    handleCatchMessages(error);
  }
};

export const deleteUserApi = async (id: number) => {
  try {
    // Real API call example (commented out):
    // const response = await axios.delete(`/users/${id}`);
    // if (response?.status) {
    //   dispatch(deleteUser(id));
    //   showToast.success(response.message || 'User deleted successfully.');
    // } else {
    //   handleErrorMessages(response.errors);
    // }

    // Dummy data implementation
    await new Promise(resolve => setTimeout(resolve, 500));

    dispatch(deleteUser(id));
    showToast.success('User deleted successfully.');
  } catch (error) {
    handleCatchMessages(error);
  }
};
