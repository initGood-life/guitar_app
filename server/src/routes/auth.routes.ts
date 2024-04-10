import { Router } from 'express';

import authController from '../controllers/auth.controller';
import auth from '../utils/auth';
import { Auth, Read } from '../utils/enums';

const routes = Router();

routes.post('/register', authController.auth.bind(authController));
routes.post('/signin', authController.signin.bind(authController));
routes.post('/logout', authController.logout.bind(authController));
routes.get(
  '/authstate',
  auth([Read], Auth),
  authController.authstate.bind(authController),
);

export default routes;
