import { Router } from 'express';

import type { RoutesType } from '../services/types/service.types';
import authRoutes from './auth.routes';
import brandsRoutes from './brands.routes';
import productsRoutes from './product.routes';
import siteRoutes from './site.routes';
import usersRoutes from './users.routes';

const router = Router();

const routesIndex: RoutesType[] = [
  {
    path: '/auth',
    router: authRoutes,
  },
  {
    path: '/users',
    router: usersRoutes,
  },
  {
    path: '/products',
    router: productsRoutes,
  },
  {
    path: '/brands',
    router: brandsRoutes,
  },
  {
    path: '/site',
    router: siteRoutes,
  },
];

routesIndex.forEach((routes) => {
  router.use(routes.path, routes.router);
});

export default router;
