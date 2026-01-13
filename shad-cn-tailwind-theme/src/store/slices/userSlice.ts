import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  user: null | {
    id: number | string;
    name: string;
    email: string;
  };
}

const initialState: UIState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
