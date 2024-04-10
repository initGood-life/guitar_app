import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_SECRET } from '../config/env.config';
import User from '../models/user';
import type { JWTPayload } from './types/types';

const jwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// verifySignature is the function that will be called to verify the token
const verifySignature = async (
  jwtPayload: JWTPayload,
  done: (err: unknown, user?: Express.User)=> void,
): Promise<boolean | void> => {
  try {
    const user = await User.findById(jwtPayload.sub);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error: unknown) {
    done(error);
  }
  return true;
};

const jwtStrategy = new Strategy(jwtOptions, verifySignature);

export default jwtStrategy;
