import { ToastObj } from '@/lib/toast';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AlertsState {
  toastObj: ToastObj | null;
}

const initialState: AlertsState = {
  toastObj: null,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setToastObj: (state, action: PayloadAction<ToastObj | null>) => {
      state.toastObj = action.payload;
    },
  },
});

export const { setToastObj } = alertsSlice.actions;
export default alertsSlice.reducer;
