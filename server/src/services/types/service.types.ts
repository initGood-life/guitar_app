import type { Request, Router } from 'express';
import type { Secret } from 'jsonwebtoken';
import type { SortOrder } from 'mongoose';

import type { IUser } from '../../models/types/user.types';

type IJwtSecret = Secret | string;

interface RequestWithUser extends Request {
  _id: string;
}

interface NewEmailInterface extends IUser {
  email: string;
  newemail: string;
}

interface ArgsInterface {
  page?: number;
  limit?: number;
  order?: SortOrder;
  sort?: string;
  keyword?: string;
  brand?: string[];
  price?: number[];
}

interface AggregatePaginateOptions {
  page?: number;
  limit?: number;
  sort?: object | string;
  pagination?: boolean;
  allowDiscUse?: boolean,
}

interface AggregatePaginateResult<T> {
  docs: T[];
  totalDocs: number;
  page?: number;
  limit: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

interface RoutesType {
  path: string;
  router: Router;
}

export interface CustomRequest extends Request {
  cookies: Record<string, string>;
}

export type {
  AggregatePaginateOptions,
  AggregatePaginateResult, ArgsInterface, IJwtSecret, NewEmailInterface, RequestWithUser, RoutesType,
};

