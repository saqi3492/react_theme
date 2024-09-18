import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCompact: true
};

export const themeOptionsSlice = createSlice({
  name: 'themeOptions',
  initialState,
  reducers: {
    setSidebarCompact: (state) => {
      state.sidebarCompact = !state.sidebarCompact;
    }
  }
});

export const { setSidebarCompact } = themeOptionsSlice.actions;

export default themeOptionsSlice.reducer;
