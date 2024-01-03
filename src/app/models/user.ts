import { History } from './history';
export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  isActive: string;
  createdAt: string;
  role: Role;
  histories: History[];
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role: number;
}

export interface UserState {
  users: User[];
  userDetail: User;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
