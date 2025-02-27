import { configureStore } from '@reduxjs/toolkit';
import User from './reducers/userSlice';
import Alerts from './reducers/alertsSlice';
import ThemeOptions from './reducers/themeOptionsSlice';
import MasterData from './reducers/masterDataSlice';
import Session from './reducers/sessionSLice';

const store = configureStore({
  reducer: { User, Alerts, ThemeOptions, MasterData, Session },
});

export const { dispatch, getState } = store;
export default store;
