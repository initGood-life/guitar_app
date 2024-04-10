/* eslint-disable @typescript-eslint/no-unsafe-call */
import passport from 'passport';

import rbac from '../config/access.config';
import type { IUser } from '../models/types/user.types';
import { ApiError } from './middleware/middleware';
import type { AuthFunction } from './types/types';

const auth: AuthFunction = (rights, resource) => async (req, res, next) => {
  try {
    await new Promise<void>((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        (error: Error | null, user: IUser | null) => {
          if (error || !user) {
            return reject(
              ApiError.UnauthorizedError(error?.message ?? 'Authentication failed'),
            );
          }

          req.user = user;

          const permissionsAllowed = rights.map((right) => rbac.can(user.role, [right], resource));

          if (!permissionsAllowed.every((allowed) => allowed)) {
            return reject(
              ApiError.ValidationError(
                `Insufficient permissions for role: "${
                  user.role
                }" to perform ${rights.join(', ')} on ${resource} route`,
              ),
            );
          }

          resolve();
          return true;
        },
      )(req, res, next);
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
