import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCompact: true
};

export const themeOptionsSlice = createSlice({
  name: 'themeOptions',
  initialState,
  reducers: {
    setToggleSidebarCompact: (state) => {
      state.sidebarCompact = !state.sidebarCompact;
    }
  }
});

export const { setToggleSidebarCompact } = themeOptionsSlice.actions;

export default themeOptionsSlice.reducer;
