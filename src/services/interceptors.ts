import { AxiosError, AxiosInstance } from 'axios';
import { store } from '../store';
import { showAlert } from '../store/alertsSlice';

export const addInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use((res) => res, (error: AxiosError) => {
    if ((<any>error.response?.data)?.message) {
      store.dispatch(showAlert({ text: (<any>error.response!.data).message, variant: 'danger' }))
    }
    return error.response;
  });
}
