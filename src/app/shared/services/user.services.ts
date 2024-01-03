import { ApiService } from '.';
import { ENDPOINT } from '../constants';
import { CreateUserData, User } from '../../models/user';

export const getUsers = () => {
  const api = new ApiService();
  return api.get(ENDPOINT.users.index);
};

export const getUser = (userId: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.users.index}/${userId}`);
};

export const createUser = (data: CreateUserData) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.auth.register}`, data);
};

export const updateUser = (id: number, data: User) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.users.index}/${id}`, data);
};

export const deleteUser = (userId: number) => {
  const api = new ApiService();
  return api.delete(`${ENDPOINT.users.index}/${userId}`);
};
