import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { CallbackWithoutResultAndOptionalError, Model, ValidatorProps } from 'mongoose';
import { model, Schema } from 'mongoose';
import validator from 'validator';

import { JWT_SECRET } from '../config/env.config';
import { Roles } from '../utils/enums';
import type { IUser } from './types/user.types';
const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value, {
        allow_ip_domain: false,
        allow_utf8_local_part: true,
        require_tld: true,
      }),
      message: (props: ValidatorProps) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
    trim: true,
    validate: {
      validator: (value: string) => validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 2,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      }),
      message: (props: ValidatorProps) => `${props.value} is not a strong password`,
    },
  },
  phone: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'uk-UA'),
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male',
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.User,
  },
  firstname: {
    type: String,
    minlength: [2, 'Firstname must be at least 2 characters long'],
    maxlength: [50, 'Firstname must be at most 50 characters long'],
    trim: true,
    default: '',
  },
  lastname: {
    type: String,
    minlength: [2, 'Lastname must be at least 2 characters long'],
    maxlength: [50, 'Lastname must be at most 50 characters long'],
    trim: true,
    default: '',
  },
  cart: {
    type: [String],
    default: [],
  },
  history: {
    type: [String],
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Password encryption hook
userSchema.pre(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError) {
    const user = this as IUser;
    if (user.isModified('password')) {
      user.password = await hash(user.password, 12);
    }
    next();
  },
);

// Static method to check if email is taken
userSchema.statics.emailTaken = async function (email: string) {
  const user = (await this.findOne({ email })) as IUser | null;
  return !!user;
};

// token generator for first time registered users
userSchema.methods.generateAuthToken = function () {
  const user = this as IUser;
  const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

userSchema.methods.generateRegisterToken = function () {
  const user = this as IUser;
  const token = jwt.sign({ sub: user._id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

// remove the id and __v from the output
userSchema.set('toJSON', {
  transform: (_document, returnedObj): void => {
    returnedObj.id = String(returnedObj._id);
    delete returnedObj.id;
  },
  versionKey: false,
});

interface UserModel extends Model<IUser> {
  emailTaken(email: string): Promise<boolean>;
}

export default model<IUser, UserModel>('User', userSchema);
