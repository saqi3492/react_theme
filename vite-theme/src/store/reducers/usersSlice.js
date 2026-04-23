import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    createUserAction(state, action) {
      state.users.unshift(action.payload);
    },
    updateUserAction(state, action) {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUserAction(state, action) {
      const index = state.users.findIndex(user => user.id === action.payload);
      if (index !== -1) state.users.splice(index, 1);
    },
  },
});

export const { setUsers, createUserAction, deleteUserAction, updateUserAction } = usersSlice.actions;
export default usersSlice.reducer;
