import { Router } from 'express';

import usersController from '../controllers/users.controller';
import auth from '../utils/auth';
import { Profile, Read, Update } from '../utils/enums';

const routes = Router();

routes.route('/profile/:id').get(
  auth([Read], Profile),
  usersController.profile.bind(usersController),
).patch(
  auth([Update], Profile),
  usersController.updateProfile.bind(usersController),
);

routes.route('/email/:id').patch(
  auth([Update], Profile),
  usersController.updateEmail.bind(usersController),
);
routes.route('/verify').get(usersController.verifyAcc.bind(usersController));

export default routes;
