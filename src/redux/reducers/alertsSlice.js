import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbarObj: null,
  loadingBackdrop: 0,
  showCustomLoader: false
};

const alertsSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setSnackbarObj(state, actions) {
      state.snackbarObj = actions.payload;
    },
    showLoadingBackdrop(state) {
      state.loadingBackdrop += 1;
    },
    hideLoadingBackdrop(state) {
      state.loadingBackdrop -= 1;
    },
    setShowCustomLoader(state) {
      state.showCustomLoader = !state.showCustomLoader;
    }
  }
});

export default alertsSlice.reducer;

export const { setSnackbarObj, showLoadingBackdrop, hideLoadingBackdrop, setShowCustomLoader } = alertsSlice.actions;
