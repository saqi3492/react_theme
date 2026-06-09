import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { showToast } from '@/lib/toast';
import { config } from '@/config/config';

export interface ErrorMessage {
  message: string;
  field?: string;
  code?: string;
}

export const handleLogout = (): void => {
  localStorage.clear();
  window.location.reload();
};

export const getLocalStorageItem = <T>(key: string, defaultValue: T | null = null): T | string | null => {
  try {
    const rawValue = localStorage.getItem(key);
    if (rawValue === null) return defaultValue;

    return JSON.parse(rawValue) as T;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorageItem = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
};

export const handleCatchMessages = (error: unknown): void => {
  if (axios.isCancel(error)) return;
  const axiosError = error as AxiosError<{ message?: string; errors?: ErrorMessage[] }>;

  let message = 'Oops! Something went wrong.';

  if (axiosError.response?.data) {
    const responseData = axiosError.response.data;
    if (responseData.message) {
      message = responseData.message;
    } else if (responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      message = responseData.errors.map((e: ErrorMessage) => e.message).join('\n');
    }
  } else if (axiosError.message) {
    message = axiosError.message;
  }

  console.error('API Error:', message);
  showToast.error(message);
};

export const handleErrorMessages = (errors?: ErrorMessage[]): void => {
  if (errors && errors.length > 0) {
    const message = errors.map(e => e.message).join('\n') || 'Oops! Something went wrong.';
    showToast.error(message);
  }
};

export const getFormattedDate = (isoDate: string | Date | null | undefined, defaultValue = '', isTime = false): string => {
  if (!isoDate) return defaultValue;
  const dateObj = dayjs(isoDate);
  if (dateObj.isValid()) {
    return dateObj.format(`${config.dateFormat} ${isTime ? config.timeFormat : ''}`).trim();
  }
  return defaultValue;
};
