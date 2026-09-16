import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetail: null,
  // 'loading' until the session cookie has been probed against the backend.
  status: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Records the result of a session probe: a user object, or null when signed out.
    setAuthUser(state, actions) {
      state.userDetail = actions.payload;
      state.status = actions.payload ? 'authenticated' : 'unauthenticated';
    },
  },
});

export default userSlice.reducer;

export const { setAuthUser } = userSlice.actions;
