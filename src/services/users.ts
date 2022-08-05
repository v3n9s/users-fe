import { User } from '../types/user';
import { getAxiosInstance } from './axios-instance';

export const getUsers = async () => {
  const res = await getAxiosInstance().get<User[]>('/users');
  return res.status === 200 ? res.data : [];
}

export const updateUser = async (id: number, body: Pick<User, 'isBlocked'>) => {
  const res = await getAxiosInstance().patch(`/users/${id}`, body);
  return res.status === 200;
}

export const deleteUser = async (id: number) => {
  const res = await getAxiosInstance().delete(`/users/${id}`);
  return res.status === 200;
}
