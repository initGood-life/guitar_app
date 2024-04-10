import type { NextFunction, Request, Response } from 'express';

import { Operation, Resource } from '../enums.js';

interface ErrorWithStatus extends Error {
  field?: string;
  statusCode: number;
}

interface IErrorResponse {
  statusCode: number;
  field?: string;
  message: string;
  name: string;
}

interface JWTPayload {
  sub: string;
}

type AuthFunction = (
  rights: Operation[],
  resource: Resource,
)=> (req: Request, res: Response, next: NextFunction)=> Promise<void>;

export type {
  AuthFunction, ErrorWithStatus, IErrorResponse, JWTPayload,
};

