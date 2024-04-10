import type { ErrorWithStatus } from '../utils/types/types';

const isErrorWithStatus = (
  error: Error,
): error is ErrorWithStatus => 'statusCode' in error && 'message' in error && 'name' in error;

export default isErrorWithStatus;
