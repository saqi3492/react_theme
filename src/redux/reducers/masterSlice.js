import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaderBtn: false
};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    setLoaderBtn: (state) => {
      state.loaderBtn = !state.loaderBtn;
    }
  }
});

export const { setLoaderBtn } = masterSlice.actions;

export default masterSlice.reducer;
