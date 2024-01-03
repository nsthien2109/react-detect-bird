import { RouteType } from '../../types/router.type';
import UserPage from './container/index';
import UserList from './container/UserList';

export const userRoutes: RouteType[] = [
  {
    path: '/users',
    component: UserPage,
    children: [
      {
        path: '',
        component: UserList,
      },
      {
        path: ':userId',
        component: UserList,
      },
    ],
  },
];
