import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import alertsReducer from './slices/alertsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    alerts: alertsReducer,
  },
});
export const { dispatch, getState } = store;

export type RootState = ReturnType<typeof store.getState>;
