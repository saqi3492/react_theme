import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from '@/types/userRole';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    createUser(state, action) {
      state.users.unshift(action.payload);
    },
    updateUser(state, action) {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action) {
      const index = state.users.findIndex(user => user.id === action.payload);
      if (index !== -1) state.users.splice(index, 1);
    },
  },
});

export const { setUsers, createUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
