import { Router } from 'express';

import productsController from '../controllers/products.controller';
import auth from '../utils/auth';
import {
  Create, Delete, Product,
  Update,
} from '../utils/enums';
import { productValidator } from '../utils/middleware/validation';

const routes = Router();

routes.route('/')
  .post(
    auth([Create], Product),
    productValidator,
    productsController.addProducts.bind(productsController),
  );

routes.route('/all').get(productsController.getProducts.bind(productsController));
routes.route('/paginate/all').post(productsController.paginateProducts.bind(productsController));

routes.route('/product/:id')
  .get(productsController.getProduct.bind(productsController))
  .patch(
    auth([Update], Product),
    productsController.updateProduct.bind(productsController),
  )
  .delete(
    auth([Delete], Product),
    productsController.deleteProduct.bind(productsController),
);

routes.route('/admin_images')
  .delete(
  auth([Delete, Update], Product),
  productsController.deleteImageByURL.bind(productsController),
)
  .post(
    auth([Create, Update], Product),
    productsController.addImageById.bind(productsController),
  )

export default routes;
