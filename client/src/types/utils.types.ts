import type { FormikErrors, FormikTouched } from 'formik';

export type FormValues = Record<string, unknown>;

/**
 * Reusable button component types
 */

export interface WavesButtonProps {

  children?: React.ReactNode;
  label?: string;
  isLinked?: boolean;
  link?: string;
  styled?: string;
}

/**
 * Reusable Formik input field types declaration
 */

export interface InputFieldProps {
  errors?: FormikErrors<FormValues>;
  touched?: FormikTouched<FormValues>;
  getFieldProps: (name: string)=> {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>)=> void;
  };
  hardcodedLabel?: string;
  Icon?: React.ElementType;
  field: string;
  // props values
  required?: boolean;
  size?: 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  className?: string;
  isSubmitting?: boolean;
  variant?: 'standard' | 'outlined' | 'static';
  color?: 'black'
  | 'white'
  | 'blue-gray'
  | 'gray'
  | 'brown'
  | 'deep-orange'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'light-green'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'light-blue'
  | 'blue'
  | 'indigo'
  | 'deep-purple'
  | 'purple'
  | 'pink'
  | 'red';
}

interface Option {
  label?: string;
  value?: string;
}

/**
 * Reusable Formik select field types declaration
 */

export interface SelectFieldProps {
  options?: Option[]
  label?: string;
  value?: string;
  field: string;
  required?: boolean;
  setFieldValue: (
    field: string,
    value?: string,
    shouldValidate?: boolean | undefined
  )=> Promise<void | FormikErrors<FormValues>>;
  errors?: FormikErrors<FormValues>;
  touched?: FormikTouched<FormValues>;
  className?: string;
  sizes?: 'md' | 'lg';
  variant?: 'standard' | 'outlined' | 'static';
  color?: 'blue-gray'
  | 'gray'
  | 'brown'
  | 'deep-orange'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'light-green'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'light-blue'
  | 'blue'
  | 'indigo'
  | 'deep-purple'
  | 'purple'
  | 'pink'
  | 'red';
}

export interface TextAreaFieldProps {
  field: string;
  errors?: FormikErrors<FormValues>;
  touched?: FormikTouched<FormValues>;
  // textAreaRef: React.RefObject<HTMLTextAreaElement>;
  getFieldProps: (name: string)=> {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>)=> void;
  };
  setFieldValue: (
    field: string,
    value?: string,
    shouldValidate?: boolean | undefined
  )=> Promise<void | FormikErrors<FormValues>>;
  cols?: number;

  placeholder?: string;
  rows?: number;
  className?: string;
}

export interface PromoTypes {
  title: string;
  description: string;
  button: {
    label: string;
    link: string;
  }
}

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
}

export interface CookieSetProps {
  token: string;
  options?: CookieOptions;
  defaultOptions?: CookieOptions;
}

// Define the return type of the hook
export interface ReactCookieHandler {
  cookies: Record<string, unknown>;
  handleSetCookie: (props: CookieSetProps)=> void;
  handleRemoveCookie: ()=> void;
}
