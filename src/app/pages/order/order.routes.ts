import { RouteType } from '../../types/router.type';
import OrderPage from './container/index';
import OrderList from './components/OrderList';

export const orderRoutes: RouteType[] = [
  {
    path: '/orders',
    component: OrderPage,
    children: [
      {
        path: '',
        component: OrderList,
      },
      {
        path: ':orderId',
        component: OrderList,
      },
    ],
  },
];
