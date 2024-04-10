import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { maestro } from 'maestro-express-async-errors';

import type { IBrand } from '../models/types/brand.types';
import brandService from '../services/service/brand.service';
import type { ArgsInterface } from '../services/types/service.types';
import { ApiError } from '../utils/middleware/middleware';

const { CREATED, OK, NO_CONTENT } = httpStatus;

const brandsController = {
  postBrand: maestro(async (req: Request, res: Response): Promise<void> => {
    const { addBrand } = brandService;
    const brand = await addBrand(req.body as IBrand);

    if (!brand) throw ApiError.NotFoundError('Brand not found');

    req.log.info('Brand added successfully');
    res.status(CREATED).json(brand);
  }),
  getAllBrands: maestro(async (req: Request, res: Response) => {
    const { getBrands } = brandService;
    const brands = await getBrands(req.query as ArgsInterface);

    if (!brands) throw ApiError.NotFoundError('Brands not found');

    return res.status(OK).json(brands);
  }),
  getBrand: maestro(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { getBrandById } = brandService;
    const brand = await getBrandById(id);

    if (!brand) throw ApiError.NotFoundError('Brand not found');

    res.status(OK).json(brand);
  }),
  deleteBrand: maestro(async (req: Request, res: Response): Promise<void> => {
    const { deleteBrandById } = brandService;
    const { id } = req.params;
    await deleteBrandById(id);

    req.log.info(`Brand with id ${id} deleted successfully`);
    res.status(NO_CONTENT).end();
  }),
};

export default brandsController;
