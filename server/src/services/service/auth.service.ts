import type { AuthToken, IUser, UserInterface } from '../../models/types/user.types';
import User from '../../models/user';
import { ApiError } from '../../utils/middleware/middleware';
import { comparePassword, findUserByEmail } from './user.service';

const createUser = async ({ email, password }: UserInterface): Promise<IUser> => {
  if (await User.emailTaken(email)) throw ApiError.ValidationError('Email already taken', 'email');

  const user = new User({ email, password });
  await user.save();
  return user;
};

const generateToken = async (user: IUser): Promise<AuthToken> => {
  if (!user) throw ApiError.NotFoundError('User not found');

  const token = await user.generateAuthToken();
  return token;
};

const userSigninService = async ({ email, password }: UserInterface): Promise<IUser> => {
  const user = await findUserByEmail(email);

  if (!user) throw ApiError.NotFoundError(`Sorry, the email: ${email.slice(0, 5)}... does not exist!`, 'email');
  if (!(password && user.password)) throw ApiError.NotFoundError('Password is missing!', 'password');
  const comparedUser: boolean = await comparePassword(password, user.password);
  if (!comparedUser) throw ApiError.ValidationError('Incorrect password!', 'password');
  return user;
};

export default {
  createUser,
  generateToken,
  userSigninService,
};
