import { User } from '../types/user';
import { getAxiosInstance } from './axios-instance';

export const getUsers = async () => {
  const res = await getAxiosInstance().get<User[]>('/users');
  return res.status === 200 ? res.data : [];
}
