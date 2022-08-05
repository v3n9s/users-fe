import axios from 'axios';
import config from '../config';
import { store } from '../store';
import { addInterceptors } from './interceptors';

export const getAxiosInstance = () => {
  const token = store.getState().user.token;

  const axiosInstance = axios.create({
    baseURL: config.BACKEND_URL,
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  addInterceptors(axiosInstance);
  return axiosInstance;
}
