import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { maestro } from 'maestro-express-async-errors';

import type { ISiteModel } from '../models/types/site.types';
import { siteService } from '../services/index';
import { ApiError } from '../utils/middleware/middleware';

const { OK, CREATED } = httpStatus;

const siteController = {
  getInfo: maestro(
    async (_req: Request, res: Response): Promise<void> => {
      const { getAllInfo } = siteService;
      const site = await getAllInfo();

      res.status(OK).json(site[0]);
    },
  ),
  addInfo: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { addSiteInfo } = siteService;
      const info = await addSiteInfo(req.body as ISiteModel);

      if (!info) throw ApiError.NotFoundError('Site not found');

      req.log.info({
        res,
        message: 'Site info updated successfully',
      });

      res.status(CREATED).json(info);
    },
  ),
  updateInfo: maestro(
    async (req: Request, res: Response): Promise<void> => {
      const { updateSite } = siteService;
      const site = await updateSite(req.body as ISiteModel);

      if (!site) throw ApiError.NotFoundError('Updated site info not found');

      req.log.info('Site info updated successfully');
      res.status(CREATED).json(site);
    },
  ),
};

export default siteController;
