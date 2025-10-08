import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import alertsReducer from './slices/alertsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
