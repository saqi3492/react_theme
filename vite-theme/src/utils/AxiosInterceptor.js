import axios from 'axios';
import { config } from '@/config/config';
import { handleLogout } from './helpers';

const AxiosInterceptor = {
  initialize: () => {
    axios.defaults.baseURL = config.backendUrl;
    // Adonis backend uses session-cookie auth, so cookies must be sent on every request.
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use(
      axiosConfig => {
        if (!axiosConfig.rawHeader) {
          axiosConfig.headers['Content-Type'] = 'application/json';
        }
        return axiosConfig;
      },
      error => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
  },
};

export default AxiosInterceptor;
