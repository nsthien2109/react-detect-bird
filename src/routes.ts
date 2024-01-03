import { birdRoutes } from './app/pages/birds/bird.routes';
import { dashboardRoutes } from './app/pages/dashboard/dashboard.routes';
import { userRoutes } from './app/pages/users/user.routes';
import { RouteType } from './app/types/router.type';
import { predictionRoutes } from './app/pages/prediction/prediction.routes';

export const routes: RouteType[] = [...dashboardRoutes, ...birdRoutes, ...userRoutes, ...predictionRoutes];
