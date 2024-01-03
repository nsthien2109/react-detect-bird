import { RouteType } from '../../types/router.type';
import BirdList from './container/BirdList';
import BirdDetail from './container/BirdDetail';
import BirdPage from './container/index';

export const birdRoutes: RouteType[] = [
  {
    path: '/birds',
    component: BirdPage,
    children: [
      {
        path: '',
        component: BirdList,
      },
      {
        path: ':id',
        component: BirdDetail,
      },
    ],
  },
];
