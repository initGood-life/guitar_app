import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { maestro } from 'maestro-express-async-errors';

import Product from '../models/product';
import type { IProduct } from '../models/types/product.types';
import { productsService } from '../services/index';
import type { ArgsInterface } from '../services/types/service.types';
import { ApiError } from '../utils/middleware/middleware';

const { OK, CREATED, NO_CONTENT, NOT_FOUND } = httpStatus;

const productsController = {
  addProducts: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { addProduct } = productsService;
      const products = await addProduct(req.body as IProduct);

      if (!products) throw ApiError.NotFoundError('Products not found');

      res.status(CREATED).json(products);
      req.log.info('New product added');
    },
  ),
  getProduct: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { getProductById } = productsService;
      const product = await getProductById(req.params.id);

      if (!product) throw ApiError.NotFoundError('Product not found');

      res.status(OK).json(product);
    },
  ),
  getProducts: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { getAllProducts } = productsService;
      const product = await getAllProducts(req.query as ArgsInterface);

      if (!product) throw ApiError.NotFoundError('Products not found');

      req.log.info('Products found');
      res.status(OK).json(product);
    },
  ),
  updateProduct: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { updateProductById } = productsService;
      const { id } = req.params;
      const product = await updateProductById(req.body as IProduct, id);

      if (!product) throw ApiError.NotFoundError('Product not found');

      req.log.info('Product updated');
      res.status(CREATED).json(product);
    },
  ),
  deleteProduct: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { deleteProductById } = productsService;
      const { id } = req.params;
      await deleteProductById(id);

      req.log.info(`Product with id: ${id}; deleted`);
      res.status(NO_CONTENT).end();
    },
  ),
  deleteImageByURL: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { imageUrl, id } = req.body;

      const { deleteOneImageByUrl } = productsService;

      if (!imageUrl) throw ApiError.ValidationError('Image URL is required');

      const data = await deleteOneImageByUrl(id, imageUrl);

      if (data.modifiedCount === 0) {
        res.status(NOT_FOUND).send('Image not found');
      }

      res.status(NO_CONTENT).end();
      req.log.info('Image deleted');
    }),
    addImageById: maestro(
      async (req: Request, res: Response): Promise<void> => {
        const { imageUrl, id } = req.body;
        const { addImageUrl } = productsService;

      if (!imageUrl || !id) {
        res.status(NOT_FOUND).send('Image URL or Product ID is required');
      };

        await addImageUrl(id, imageUrl);

      res.status(CREATED).send('Image added');
      req.log.info('Image Added');
      }),
  paginateProducts: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { paginateAll } = productsService;
      const products = await paginateAll(req.body as ArgsInterface);
      const populateProducts = await Product.populate(products.docs, {
        path: 'brand',
        select: 'name',
      });

      const { docs, ...rest } = products;

      req.log.info({ req });
      res.status(OK).json({ docs: populateProducts, rest });
    },
  ),
};

export default productsController;
