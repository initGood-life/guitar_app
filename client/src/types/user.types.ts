import type { Dispatch } from '@reduxjs/toolkit';
import type { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/query';
import type { FormikErrors } from 'formik';
import type { MutationTrigger } from 'node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';

import type {
  EmailArg, EmailUserResponse, UserArg, UserResponse,
} from '@/store/types/api_types/user.types';
import type { SerializedError } from '@/store/types/serialized.types';

// Interface for data passed to updateUser mutation
export interface UserUpdateData {
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
}

// Stepper component props
export interface StepperProps {
  activeStep: number;

  errors?: {
    email?: string;
    newemail?: string;
  }
  touched?: {
    email?: boolean;
    newemail?: boolean;
  }
  isSubmitting?: boolean;
  emailIsUpdated: boolean;
  closeStepper: ()=> void
  setActiveStep: (step: number)=> void;
  handleBack: ()=> void;
  handleNext: ()=> void;
}

export interface EmailToUpdateProps extends Partial<StepperProps> {
  handleSubmit: ()=> void;
  getFieldProps: (name: string)=> {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>)=> void;
  };
}

// Types definitions passed to stepper component from dialog
export interface StepperFormValues {
  userEmail?: string;
  userId?: string;
  activeStep: number;
  setActiveStep: (value: React.SetStateAction<number>)=> void
  closeStepper: ()=> void;

}

/**
 * Interface for arguments passed to Formik submit user submit handler
 */
export interface UpdateUserArgs {
  userId?: string;
  dispatch: Dispatch
  userData: {
    firstname: string;
    lastname: string;
    phone: string;
    gender: string;
  };
  token: unknown
  updateUser: MutationTrigger<MutationDefinition<Partial<UserArg>, BaseQueryFn<unknown, unknown, SerializedError>, never, UserResponse, 'userApi'>>
}

/**
 * Interface for arguments passed to Formik submit email submit handler
 */
export interface EmailToSubmit extends Partial<UpdateUserArgs> {
  userEmail: {
    newemail: string;
  }
  dispatch: Dispatch
  updateEmail: MutationTrigger<MutationDefinition<Partial<EmailArg>, BaseQueryFn<unknown, unknown, SerializedError>, never, EmailUserResponse, 'userApi'>>
}

/**
 * Interface type definitions for Formik Form that handles user info update
 */
export interface IUpdateFormFields {
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

  setFieldValue: (
    field: string, value?: string, shouldValidate?: boolean | undefined
  )=> Promise<void | FormikErrors<{
    firstname: string;
    lastname: string;
    gender: string;
    phone: string;
  }>>
}
