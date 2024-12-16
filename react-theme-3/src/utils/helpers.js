import { config } from 'config/config';
import moment from 'moment/moment';
import { setSnackbarObj } from 'store/reducers/alertsSlice';
import { dispatch } from 'store/store';

export const getFormattedDate = isoDate => {
  const momentObj = moment(isoDate);

  if (momentObj.isValid()) {
    return momentObj.format(config.dateFormat);
  }
  return '';
};

export const setItemInLocalStorage = (key, value, isStringify = true) => {
  localStorage.setItem(key, isStringify ? JSON.stringify(value) : value);
};

export const getLocalStorageItem = (key, defaultValue = null, isParse = true) => {
  try {
    const value = localStorage.getItem(key);
    return (isParse ? JSON.parse(value) : value) ?? defaultValue;
  } catch (e) {
    console.log('getItemFromLocalStorage: ', e);
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
