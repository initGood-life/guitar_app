import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { errorLogger } from '../../config/logger.config';
import { ErrorNames } from '../enums';
import type { ErrorWithStatus, IErrorResponse } from '../types/types';

const {
  BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, UNAUTHORIZED,
} = httpStatus;
const {
  Unauthorized, NotFound, InternalServer, Validation,
} = ErrorNames;

class ApiError extends Error {
  public statusCode: number;

  public field?: string;

  constructor(message: string, name: string, statusCode: number, field?: string) {
    super(message);
    this.statusCode = statusCode;
    this.field = field;
    this.name = name;
  }

  static ValidationError(message: string, field?: string): ApiError {
    return new ApiError(message, Validation, BAD_REQUEST, field);
  }

  static UnauthorizedError(message: string, field?: string): ApiError {
    return new ApiError(message, Unauthorized, UNAUTHORIZED, field);
  }

  static NotFoundError(message: string, field?: string): ApiError {
    return new ApiError(message, NotFound, NOT_FOUND, field);
  }

  static InternalServerError(name: string, message: string = 'Unrecognizable Internal Server Error :('): ApiError {
    return new ApiError(
      message,
      name || InternalServer,
      INTERNAL_SERVER_ERROR);
  }
}

const convertToApiError = (
  err: Error | ErrorWithStatus,
  _req: Request,
  res: Response<IErrorResponse>,
  _next: NextFunction,
) => {
  let apiError: ErrorWithStatus;

  // Check if the error is already an instance of ApiError
  if (err instanceof ApiError) {
    apiError = err;
  } else {
    const { message, name } = err;
    const errorName = Object.values(ErrorNames).includes(name as ErrorNames)
      ? name as ErrorNames
      : undefined;

    switch (errorName) {
      case Validation:
        apiError = ApiError.ValidationError(message);
        break;
      case Unauthorized:
        apiError = ApiError.UnauthorizedError(message);
        break;
      case NotFound:
        apiError = ApiError.NotFoundError(message);
        break;
      default:
        apiError = ApiError.InternalServerError(message, name);
        break;
    }
  }

  const { message, name, statusCode, field } = apiError;

  errorLogger.error({ name, message, statusCode, field });

  // Prepare the error response
  const errorResponse: IErrorResponse = {
    name,
    message,
    statusCode,
    field,
  };
  // Send the error response to the client
  return res.status(statusCode).json(errorResponse);
};


export {
  ApiError, convertToApiError,
};

