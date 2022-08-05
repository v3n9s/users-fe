import { AxiosError, AxiosInstance } from 'axios';
import { store } from '../store';
import { showAlert } from '../store/alertsSlice';
import { removeUser } from '../store/userSlice';

export const addInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use((res) => {
    if (res.data?.message) {
      store.dispatch(showAlert({ text: res.data.message }));
    }
    return res;
  }, (error: AxiosError) => {
    if ((<any>error.response?.data)?.message) {
      store.dispatch(showAlert({ text: (<any>error.response!.data).message, variant: 'danger' }))
    }
    if (error.response?.status === 401) {
      store.dispatch(removeUser());
    }
    return error.response;
  });
}
