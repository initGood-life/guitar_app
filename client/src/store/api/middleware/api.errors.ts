import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

import type { SerializedError } from '@/store/types/serialized.types';
import { showSwal } from '@/utils';

/**
 * Global RTKQuery handling error exceptions Middleware
 */
type UnknownNext = (action: unknown)=> unknown;

const RTKQueryLogger: Middleware = (
  _api: MiddlewareAPI,
) => (next: UnknownNext) => (action: unknown) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload as SerializedError;
    const { error } = action;

    if (error && data && (data.statusCode ?? 500) >= 500) {
      const title = `${data.name ?? error.name ?? 'Api Error'} ${data.statusCode ?? ''}`;
      const text = data.message ?? 'Something went wrong. Please try again.';
      showSwal({ title, text, icon: 'error' });
    }
  }
  return next(action);
};

export default RTKQueryLogger;
