import type { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { maestro } from 'maestro-express-async-errors';

import registerEmail from '../config/email.config';
import { errorLogger } from '../config/logger.config';
import type { IUser, UserInterface } from '../models/types/user.types';
import { service } from '../services/index';
import type { CustomRequest } from '../services/types/service.types';
import { COOKIE_NAME } from '../utils/constants';
import { ApiError } from '../utils/middleware/middleware';

const { OK, CREATED, INTERNAL_SERVER_ERROR } = status;

type AuthInterface = string | IUser | Response<unknown, Record<string, unknown>>;

const authController = {
  auth: maestro(
    async (req: Request, res: Response): Promise<AuthInterface> => {
      const body = req.body as UserInterface;
      const { email, password } = body;

      if (!email || !password) throw ApiError.NotFoundError('Email or password not defined');
      const { createUser, generateToken } = service;

      const user = await createUser({ email, password });
      const token = await generateToken(user);
      try {
        await Promise.all([
          registerEmail(email, user, 'registration'),
          new Promise<void>((resolve, _reject) => {
            res.cookie(COOKIE_NAME, token, {
              path: '/',
              domain: 'localhost',
            });
            resolve();
          }),
        ]);
        return res.status(CREATED).send({ user, token });
      } catch (error) {
        errorLogger.error(error);
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        error: 'Internal server error',
      });
    },
  ),
  signin: maestro(
    async (req: Request, res: Response): Promise<AuthInterface> => {
      const body = req.body as UserInterface;
      const { email, password } = body;
      const { userSigninService, generateToken } = service;
      const serviceResponse = await userSigninService({ email, password });
      const token = await generateToken(serviceResponse);

      return res
        .cookie(COOKIE_NAME, token, {
          path: '/',
          domain: 'localhost',
        })
        .status(OK)
        .send({ serviceResponse, token });
    },
  ),
  logout: maestro(
    (req: CustomRequest, res: Response): void => {
      if (req.cookies[COOKIE_NAME]) {
        res.clearCookie(COOKIE_NAME, { path: '/' });
        res.status(OK).send({ message: 'Logout successful' });
      } else {
        res.status(OK).send({ message: 'No cookie found' });
      }
    },
  ),
  authstate: maestro(
    (req: Request, res: Response, next: NextFunction): void => {
      res.status(OK).json({
        user: req.user,
      });
      console.log(req.user);

      req.log.info('User auth state checked');
      next();
    },
  ),
};

export default authController;

// user to check { "email": "vladvip8acc041022@gmail.com", "password":"jQts88"}
