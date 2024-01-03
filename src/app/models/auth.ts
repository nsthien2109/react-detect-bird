export interface UserInfo {
  id: number;
  username: string;
  email: string;
  isActive: string;
  roleId: number;
  createdAt: string;
}

export interface AuthState {
  userInfo: UserInfo;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
