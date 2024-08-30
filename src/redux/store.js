import { configureStore } from '@reduxjs/toolkit';
import User from './reducers/userSlice';
import Alerts from './reducers/alertsSlice';
import ThemeOptions from './reducers/themeOptionsSlice';
import Master from './reducers/masterSlice';

const store = configureStore({
  reducer: { User, Alerts, ThemeOptions, Master }
});

export const { dispatch, getState } = store;
export default store;
