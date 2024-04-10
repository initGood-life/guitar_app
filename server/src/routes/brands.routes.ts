import { Router } from 'express';

import brandsController from '../controllers/brands.controller';
import auth from '../utils/auth';
import { Brand, Create, Delete } from '../utils/enums';

const routes = Router();

routes.route('/create_brand')
  .post(auth([Create], Brand), brandsController.postBrand.bind(brandsController));

routes.route('/all')
  .get(brandsController.getAllBrands.bind(brandsController));

routes.route('/brand/:id')
  .get(brandsController.getBrand.bind(brandsController))
  .delete(auth([Delete], Brand), brandsController.deleteBrand.bind(brandsController));

export default routes;
