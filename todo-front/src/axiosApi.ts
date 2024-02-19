import axios from 'axios';
import { apiURL } from './constants';

const axiosApi = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});
axiosApi.interceptors.request.use((config) => {
  const token  = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `_bearer${token}`;
  }
  return config;
});

export default axiosApi;