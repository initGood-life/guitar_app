import type { Document } from 'mongoose';

import { Roles } from '../../utils/enums';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

interface AuthToken {
  token: string;
  expiresAt: Date;
  payload: TokenPayload;
}

interface UserInterface {
  email: string;
  password: string;
}

// user interface definition
interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  role: Roles;
  firstname?: string;
  lastname?: string;
  cart: string[];
  history?: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken: ()=> Promise<AuthToken>;
  generateRegisterToken: ()=> Promise<AuthToken>;
}

export type {
  AuthToken, IUser,
  UserInterface,
};

