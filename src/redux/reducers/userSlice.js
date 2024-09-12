import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetail: { name: 'Hassan Saddique', email: 'imhassan66@gmail.com' }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail(state, actions) {
      state.userDetail = actions.payload;
    }
  }
});

export default userSlice.reducer;

export const { setUserDetail } = userSlice.actions;
