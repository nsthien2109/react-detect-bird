import { RouteType } from '../../types/router.type';
import Login from './container/Login';

export const authRoutes: RouteType[] = [
  {
    path: '/auth/login',
    component: Login,
  },
];
