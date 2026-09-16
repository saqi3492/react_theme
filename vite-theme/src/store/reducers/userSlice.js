import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetail: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Records the result of a session probe: a user object, or null when signed out.
    setUserDetail(state, actions) {
      state.userDetail = actions.payload;
      state.status = actions.payload ? 'authenticated' : 'unauthenticated';
    },
  },
});

export default userSlice.reducer;

export const { setUserDetail } = userSlice.actions;
