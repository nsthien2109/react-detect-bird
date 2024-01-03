import { RouteType } from '../../types/router.type';
import Dashboard from './container/Dashboard';

export const dashboardRoutes: RouteType[] = [
  {
    path: '/',
    component: Dashboard,
  },
];
