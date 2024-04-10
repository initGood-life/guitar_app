import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  EmailArg, EmailUserResponse, UserArg, UserResponse,
} from '../types/api_types/user.types';
import type { SerializedError } from '../types/serialized.types';

/**
 * User API
 */

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }) as unknown as BaseQueryFn<
  unknown,
  unknown,
  SerializedError
  >,
  endpoints: (build) => ({
    updateUser: build.mutation<UserResponse, Partial<UserArg>>({
      query: ({ userId, userData, token }) => ({
        url: `users/profile/${userId}`,
        method: 'PATCH',
        body: userData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    }),
    updateEmail: build.mutation<EmailUserResponse, Partial<EmailArg>>({
      query: ({ userId, userEmail, token }) => ({
        url: `users/email/${userId}`,
        method: 'PATCH',
        body: userEmail,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdateEmailMutation,
} = userApi;
export default userApi;
