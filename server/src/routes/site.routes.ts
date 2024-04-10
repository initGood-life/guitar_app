import { Router } from 'express';

import siteController from '../controllers/site.controller';
import auth from '../utils/auth';
import { Create, Site, Update } from '../utils/enums';

const routes = Router();

routes.route('/')
  .get(siteController.getInfo.bind(siteController))
  .post(
    auth([Create, Update], Site),
    siteController.addInfo.bind(siteController),
  )
  .patch(
    auth([Create, Update], Site),
    siteController.updateInfo.bind(siteController),
  );

export default routes;
