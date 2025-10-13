import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { getLocalStorageItem, handleLogout } from '@/utils/helper';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getLocalStorageItem('authentication_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
