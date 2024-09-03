import axios from 'axios';
import { config } from 'config/config';
import { handleLogout } from './helpers';

const axiosInstance = {
  initialize: () => {
    axios.defaults.baseURL = config.backendUrl;
    axios.interceptors.request.use(
      (axiosConfig) => {
        const authToken = localStorage.getItem('access_token');
        if (authToken && !axiosConfig.ignoreToken) {
          axiosConfig.headers['Authorization'] = `Bearer ${authToken}`;
        }
        if (!axiosConfig.rawHeader) {
          axiosConfig.headers['Content-Type'] = 'application/json';
        }
        return axiosConfig;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        if (response.headers.get('X-Authorization-Refresh')) {
          localStorage.setItem('access_token', response.headers.get('Authorization'));
        }
        return response.data;
      },
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
  }
};

export default axiosInstance;
