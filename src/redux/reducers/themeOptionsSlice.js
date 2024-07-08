import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showMobileSideBar: false,
  sidebarCompact: false
};

export const themeOptionsSlice = createSlice({
  name: 'themeOptions',
  initialState,
  reducers: {
    setToggleMobileSidebar: (state) => {
      state.showMobileSideBar = !state.showMobileSideBar;
    },
    setToggleSidebarCompact: (state) => {
      state.sidebarCompact = !state.sidebarCompact;
    }
  }
});

export const { setToggleMobileSidebar, setToggleSidebarCompact } = themeOptionsSlice.actions;

export default themeOptionsSlice.reducer;
