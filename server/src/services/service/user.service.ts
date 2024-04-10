import { compare } from 'bcrypt';
import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/env.config';
import type { IUser } from '../../models/types/user.types';
import User from '../../models/user';
import { ApiError } from '../../utils/middleware/middleware';
import type { NewEmailInterface, RequestWithUser } from '../types/service.types';

// *token validation
const validateToken = (token: string): string | JwtPayload => {
  if (!token) throw ApiError.NotFoundError('Token not found');
  return jwt.verify(token, JWT_SECRET);
};

const IsOwnProfile = (req: Request) => {
  const { _id } = req.user as RequestWithUser;
  const { id } = req.params;
  if (id !== String(_id)) throw ApiError.ValidationError('User id does not match');
};

// * service for finding user by email
const findUserByEmail = async (email: string) => User.findOne({ email })
  .select('+password');

// * service for updating existing user email
const setEmail = async (
  { newemail }: NewEmailInterface,
  req: RequestWithUser,
): Promise<string> => {
  if (await User.emailTaken(newemail)) {
    throw ApiError.ValidationError('Email is already taken', 'email');
  }
  const updatedEmail = await User.findOneAndUpdate(
    { _id: (req.user as RequestWithUser)._id },
    {
      $set: {
        email: newemail,
        verified: false,
      },
    },
    { new: true },
  );

  if (!updatedEmail) throw ApiError.NotFoundError('Sorry, email not found!');

  return updatedEmail.email;
};

// * service for getting user object by id
const findUserById = async (id: string) => User.findById(id).select('+_id');

// * service for comparing password
const comparePassword = async (
  password: string,
  storedPassword: string,
) => compare(password, storedPassword);

// * service for updating existing user profile
const updateUserProfile = async (req: Request): Promise<IUser> => {
  const { email, password, ...updatedFields } = req.body as IUser;
  const updatedUser = await User.findOneAndUpdate(
    { _id: (req.user as RequestWithUser)._id },
    { $set: { ...updatedFields } },
    { new: true },
  ).select('-_id');

  if (!updatedUser) throw ApiError.NotFoundError('User not found');

  return updatedUser;
};

export {
  IsOwnProfile, comparePassword,
  findUserByEmail, findUserById,
  setEmail, updateUserProfile, validateToken,
};

