import type { Request, Response } from 'express';
import status from 'http-status';
import { maestro } from 'maestro-express-async-errors';

import registerEmail from '../config/email.config';
import { errorLogger } from '../config/logger.config';
import type { IUser } from '../models/types/user.types.js';
import { service } from '../services/index';
import {
  findUserByEmail,
  findUserById,
  IsOwnProfile,
  setEmail,
  updateUserProfile,
  validateToken,
} from '../services/service/user.service.js';
import type { NewEmailInterface, RequestWithUser } from '../services/types/service.types.js';
import { COOKIE_NAME } from '../utils/constants.js';
import { ApiError } from '../utils/middleware/middleware.js';

const { OK, CREATED, INTERNAL_SERVER_ERROR } = status;

const usersController = {
  profile: maestro(
    async (req: Request, res: Response): Promise<Response> => {
      IsOwnProfile(req);

      const { _id } = req.user as RequestWithUser;
      const user = await findUserById(_id);

      if (!user) throw ApiError.NotFoundError('User not found');

      req.log.info('User profile retrieved');
      return res.status(OK).json(user);
    },
  ),
  updateProfile: maestro(
    async (req: Request, res: Response): Promise<Response> => {
      IsOwnProfile(req);
      console.log(req.body);

      const user = await updateUserProfile(req);

      if (!user) throw ApiError.NotFoundError('User not found');

      req.log.info('User profile updated');
      return res.status(OK).json(user);
    },
  ),
  updateEmail: maestro(
    async (req: Request, res: Response): Promise<Response> => {
      IsOwnProfile(req);

      const body = req.body as NewEmailInterface;
      const userEmail = await setEmail(body, req as RequestWithUser);
      const { generateToken } = service;

      if (!userEmail) throw ApiError.NotFoundError('User not found');

      const userObj = (await findUserByEmail(userEmail)) as IUser;
      const token = await generateToken(userObj);

      try {
        await Promise.all([
          registerEmail(userEmail, userObj, 'emailUpdate'),
          new Promise<void>((resolve, _reject) => {
            res.cookie(COOKIE_NAME, token, {
              httpOnly: true,
              signed: true,
              path: '/',
              domain: 'localhost',
            });
            resolve();
          }),
        ]);
        req.log.info(`email: ${userEmail} is now changed`);
        return res.status(CREATED).json({ userObj, token });
      } catch (error) {
        errorLogger.error(error);
        return res.status(INTERNAL_SERVER_ERROR).json({
          error: 'Email update failed',
        });
      }
    },
  ),
  verifyAcc: maestro(
    async (req: Request, res: Response): Promise<Response> => {
      const { validation } = req.query as { validation: string };
      const decodedToken = validateToken(validation);
      const user = await findUserById(decodedToken.sub as string);

      if (!user) throw ApiError.NotFoundError('User not found');
      if (user.verified) throw ApiError.ValidationError('User already verified');

      user.verified = true;
      await user.save();

      req.log.info('User account verified');
      return res.status(OK).json(user);
    },
  ),
};

export default usersController;
