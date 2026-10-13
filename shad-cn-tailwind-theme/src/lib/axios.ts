import axios, { AxiosError, AxiosResponse } from 'axios';
import { handleLogout } from '@/utils/helper';
import { config } from '@/config/config';

const AxiosInterceptor = {
  initialized: false,

  initialize: (): void => {
    if (AxiosInterceptor.initialized) return;
    AxiosInterceptor.initialized = true;

    axios.defaults.baseURL = config.backendUrl;
    axios.defaults.timeout = 10000;
    axios.defaults.headers['Content-Type'] = 'application/json';
    // Adonis backend uses session-cookie auth, so cookies must be sent on every request.
    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        if (error.response?.status === 401) handleLogout();
        return Promise.reject(error);
      },
    );
  },
};

export default AxiosInterceptor;
