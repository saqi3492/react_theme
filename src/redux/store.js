import { configureStore } from '@reduxjs/toolkit';
import User from './reducers/userSlice';
import Alerts from './reducers/alertsSlice';
import ThemeOptions from './reducers/themeOptionsSlice';

const store = configureStore({
  reducer: { User, Alerts, ThemeOptions }
});

export const { dispatch, getState } = store;
export default store;
