import type { Dispatch } from '@reduxjs/toolkit';
import type { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/query';
import type { MutationTrigger } from 'node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';
import type { NavigateFunction } from 'react-router-dom';

import type {
  AuthCheckResponse,
  AuthProps, LoginResponse,
  RegisterArgs, RegisterResponse,
} from '@/store/types/api_types/auth.types';
import type { SerializedError } from '@/store/types/serialized.types';

type RegisterRTKQuery = MutationTrigger<MutationDefinition<Partial<RegisterArgs>, BaseQueryFn<unknown, unknown, SerializedError>, never, RegisterResponse, 'authApi'>>;
type LoginRTKQuery = MutationTrigger<MutationDefinition<AuthProps, BaseQueryFn<unknown, unknown, SerializedError>, never, LoginResponse, 'authApi'>>;

/**
 * Interface for submit form response
 */
export interface SubmitFormArgs {
  email: string;
  password: string;
  isLogin: boolean;
  navigate: NavigateFunction;
  handleSetCookie: (args: { token: string })=> void;
  handleRegister: RegisterRTKQuery;
  handleLogin: LoginRTKQuery;
  dispatch: Dispatch;
  setIsLogin: (isLogin: boolean)=> void;
}

// values to submit from user
export interface SubmitValue {
  email: string;
  password: string;
}

export interface OtherFieldsProps {
  isLogin: boolean;
  handleAuth: ()=> void;
}

export interface FormFieldProps {
  handleSubmit?: ()=> void;
  errors: {
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
  };
  touched: {
    email?: boolean;
    password?: boolean;
    firstname?: boolean;
    lastname?: boolean;
  };
  isSubmitting: boolean;
  getFieldProps: (name: string)=> {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>)=> void;
  };
  isLogin: boolean
}

export interface LoginToggle {
  isLogin: boolean;
  setIsLogin: (value: boolean)=> void;
}

export interface ErrorTypes {
  error: string | undefined;
  field: string;
}
export interface AuthStateWithUser {
  userData?: AuthState | null
  handlePrevPage?: ()=> void;
}

// auth guard types
export interface IAuthGuardProps {
  children: React.ReactNode;
  data?: AuthState
  route?: string
}

export type AuthState = AuthCheckResponse | undefined | null;
