import { config } from '@/config/config';
import dayjs from 'dayjs';
import { setSnackbarObj } from '@/store/reducers/alertsSlice';
import { dispatch } from '@/store/store';

export const getFormattedDate = (isoDate, defaultValue = '', isTime = false) => {
  const dateObj = dayjs(isoDate);
  if (dateObj.isValid()) {
    return dateObj.format(`${config.dateFormat} ${isTime ? config.timeFormat : ''}`);
  }
  return defaultValue;
};

export const setItemInLocalStorage = (key, value, isStringify = true) => {
  localStorage.setItem(key, isStringify ? JSON.stringify(value) : value);
};

export const getLocalStorageItem = (key, defaultValue = null, isParse = true) => {
  try {
    const value = localStorage.getItem(key);
    return (isParse ? JSON.parse(value) : value) ?? defaultValue;
  } catch (error) {
    handleCatchError(error);
    return defaultValue;
  }
};

export const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

export const handleErrorMessages = errors => {
  const message = errors?.map?.(e => e.message + '\n').join('') || 'Oops! Something went wrong.';

  dispatch(setSnackbarObj({ message, severity: 'error' }));
};

export const handleCatchError = error => {
  console.log('error', error);
};
