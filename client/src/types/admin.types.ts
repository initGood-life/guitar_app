import type { Dispatch } from '@reduxjs/toolkit';
import type {
  BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta,
  MutationDefinition,
  QueryStatus,
} from '@reduxjs/toolkit/query';
import type { FormikErrors, FormikTouched, FormikValues } from 'formik';
import type { MutationTrigger } from 'node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';
import type { ChangeEvent, SyntheticEvent } from 'react';

import type {
  ProductArgs,
  ProductsMetaData, ProductsResponse,
} from '@/store/types/api_types/product.types';

import type { FormValues } from './utils.types';

interface Brand {
  _id?: string;
  name: string;
  description: string;
  website: string;
}

export interface ProductData {
  _id: string;
  model: string;
  brand: Brand;
  description: string;
  price: number;
  available: number;
  item_sold: number;
  shipping: boolean;
  image: string[];
  date: string;
}

export interface FulfilledData {
  status?: QueryStatus;
  endpointName?: string;
  requestId?: string;
  originalArgs?: {
    id?: string;
  };
  startedTimeStamp?: number;
  data?: ProductData;
  fulfilledTimeStamp?: number;
  isUninitialized?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export interface ISearchProducts {
  products?: {
    docs?: ProductsResponse[]
    rest?: ProductsMetaData
  }
}

export interface IAdminProductProps {
  errors?: FormikErrors<FormValues>;
  touched?: FormikTouched<FormValues>;
  handleSubmit?: ()=> void;
  setFieldValue: (
    field: string,
    value?: string | undefined,
    shouldValidate?: boolean | undefined)=> Promise<void | FormikErrors<FormikValues>>
  getFieldProps: (name: string)=> {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=> void;
    onBlur: (e: SyntheticEvent)=> void
    isSubmitting?: boolean;
  }
  isSubmitting: boolean;
}

export interface HandleSubmitAddProduct {
  model?: string,
  brand?: Brand | string,
  description?: string,
  price?: number,
  available?: number,
  image: string[],
  shipping?: boolean,
}

export interface HandleSubmitEditProduct {
  values: Omit<HandleSubmitAddProduct, 'image'>,
  token: unknown,
  dispatch: Dispatch,
  id?: string,
  editProductById: MutationTrigger<MutationDefinition<Partial<ProductArgs>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, ProductsResponse, 'productApi'>>
}

export type EditProductProps = Omit<HandleSubmitAddProduct, 'image'>;

export interface IAdminAddProductProps {
  addNewProduct: MutationTrigger<MutationDefinition<Partial<ProductArgs>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, ProductsResponse, 'productApi'>>
  dispatch: Dispatch
  values: HandleSubmitAddProduct
  token?: unknown;

}

export interface IImageDialogProps {
  isImageUploading: boolean;
  setIsImageUploading: (value: boolean)=> void;
}
