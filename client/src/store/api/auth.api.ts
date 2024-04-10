import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  AuthCheckArg,
  AuthCheckResponse, AuthProps, LoginResponse, RegisterArgs,
  RegisterResponse,
} from '../types/api_types/auth.types';
import type { SerializedError } from '../types/serialized.types';

/**
 * Authentication API
 */

export const authApi = createApi({
  reducerPath: 'authApi',
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
    handleLogin: build.mutation<LoginResponse, AuthProps>({
      query: (body) => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
    handleLogout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    handleRegister: build.mutation<RegisterResponse, Partial<RegisterArgs>>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    userAuthState: build.query<AuthCheckResponse, Partial<AuthCheckArg>>({
      query: ({ token }) => ({
        url: 'auth/authstate',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useHandleLoginMutation,
  useHandleRegisterMutation,
  useLazyUserAuthStateQuery,
  useHandleLogoutMutation,
} = authApi;
export default authApi;
