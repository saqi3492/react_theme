import axios from 'axios';
import { config } from 'config/config';

const axiosInstance = {
  initialize: () => {
    axios.defaults.baseURL = config.backendUrl;
    axios.interceptors.request.use(
      (axiosConfig) => {
        const authToken = localStorage.getItem('ACCESS_TOKEN');
        if (authToken) {
          axiosConfig.headers['Authorization'] = `Bearer ${authToken}`;
        }

        axiosConfig.headers['Content-Type'] = 'application/json';
        return axiosConfig;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response.data,
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

export default axiosInstance;
