import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetail: null,
  delegateUserDetail: null,
  delegateUsers: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail(state, actions) {
      state.userDetail = actions.payload;
    },
    setDelegateUserDetail(state, actions) {
      state.delegateUserDetail = actions.payload;
    },
    setDelegateUsers(state, actions) {
      state.delegateUsers = actions.payload;
    }
  }
});

export default userSlice.reducer;

export const { setUserDetail, setDelegateUsers, setDelegateUserDetail } = userSlice.actions;
