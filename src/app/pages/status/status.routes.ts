import { RouteType } from '../../types/router.type';
import StatusPage from './container/index';
import StatusList from './components/StatusList';

export const statusRoutes: RouteType[] = [
  {
    path: '/status',
    component: StatusPage,
    children: [
      {
        path: '',
        component: StatusList,
      },
      {
        path: ':statusId',
        component: StatusList,
      },
    ],
  },
];
