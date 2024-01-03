import { ApiService } from '.';
import { ENDPOINT } from '../constants';

type LoginProps = {
  email: string;
  password: string;
};
export const login = (data: LoginProps) => {
  const api = new ApiService();
  return api.post(ENDPOINT.auth.login, data);
};
