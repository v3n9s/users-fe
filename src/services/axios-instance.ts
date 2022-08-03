import axios from 'axios';
import config from '../config';
import { store } from '../store';

const token = store.getState().user.token;

export const axiosInstance = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {
    authorization: `Bearer ${token}`
  }
});
