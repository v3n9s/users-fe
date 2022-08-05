import { getAxiosInstance } from './axios-instance';

export const registerUser = async (
  user: { name: string, email: string, password: string }
) => {
  const res = await getAxiosInstance().post('/register', user);
  return res.status === 201;
}

export const loginUser = async (user: { name: string, password: string }) => {
  const res = await getAxiosInstance().post('/login', user);
  if (res.status === 201) return <string>res.data.token;
  return false;
}
