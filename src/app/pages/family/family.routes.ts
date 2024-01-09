import { RouteType } from '../../types/router.type';
import FamilyPage from './container/index';
import FamilyList from './components/FamilyList';

export const familyRoutes: RouteType[] = [
  {
    path: '/families',
    component: FamilyPage,
    children: [
      {
        path: '',
        component: FamilyList,
      },
      {
        path: ':familyId',
        component: FamilyList,
      },
    ],
  },
];
