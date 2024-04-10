import type {
  FormikErrors, FormikTouched, FormikValues,
} from 'formik';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

import type { ProductsMetaData, ProductsResponse } from '@/store/types/api_types/product.types';

import type { FulfilledData, IAdminProductProps, ProductData } from '../admin.types';

interface ProductsWithMetaData {
  docs?: ProductsResponse[]
  rest?: ProductsMetaData
}

type FormikContextErrors = FormikErrors<Record<string, unknown>>;
type FormikContextTouched = FormikTouched<Record<string, unknown>>;

/**
 * Context for managing state related to admin product operations.
 *
*/
export const AdminProductsContext = createContext<{
  initialProducts?: ProductsWithMetaData
  handlePrevPage?: ()=> void;
  handleNextPage?: ()=> void;
  handleEditProduct: (id: string)=> void
} | undefined>(undefined);

/**
   * React context for managing state related to
   * admin product add/edit operations.
   */
export const AddProductContext = createContext<IAdminProductProps>({} as IAdminProductProps);

/**
   * Context for managing Formik state related to the brand selection form.
   *
   */
export const SelectBrandContext = createContext<{
  errors?: FormikContextErrors;
  touched?: FormikContextTouched;
  setFieldValue: (
  field: string,
  value: string | undefined,
  shouldValidate: boolean | undefined
  )=> Promise<void | FormikErrors<FormikValues>>
  getFieldProps: (name: string)=> {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    onBlur: (e: React.SyntheticEvent<Element, Event>)=> void;
    isSubmitting?: boolean | undefined;
  }
}>({
      setFieldValue: async () => { },
      getFieldProps: () => ({
        name: '',
        value: '',
        onChange: () => { },
        onBlur: () => { },
      }),
    },
    );

/**
 * React context for managing state related to the product table in the admin dashboard.
 *
 */
export const ProductTableContext = createContext<{
  products?: ProductsWithMetaData
  daysAgo: (date: string)=> number | 'Today';
  handleDialogOpen: (incomingId?: string)=> void
  handleEditProduct: ((id: string)=> void) | undefined
}>({
      daysAgo: () => 0,
      handleDialogOpen: () => { },
      handleEditProduct: () => { },
      products: {
        docs: [],
      },
    });

/**
 * React context for managing state related to the product
 * table pagination in the admin dashboard.
 *
 * Provides handlers for moving between table pages.
*/
export const TableNavContext = createContext<{
  handlePrevPage: (()=> void) | undefined;
  handleNextPage: (()=> void) | undefined;
  products?: ProductsWithMetaData
}>({
      handleNextPage: () => { },
      handlePrevPage: () => { },
      products: {
        docs: [],
      },
    });

/**
 * React context for managing state related to removing a product
 * in the admin dashboard.
 */
export const RemoveProductContext = createContext<{
  dialogOpened: boolean
  removeProduct: ()=> void
  setDialogClosed: ()=> void
}>({
      dialogOpened: false,
      removeProduct: () => { },
      setDialogClosed: () => { },
    });

export const RemoveImageDialogContext = createContext<{
  imageUrl: string;
  id: string | undefined;
  showDialog: boolean;
  data: ProductData | undefined;
  setProduct: Dispatch<SetStateAction<FulfilledData>>;
  setShowDialog: (showDialog: boolean)=> void;
}>({
      imageUrl: '',
      id: undefined,
      showDialog: false,
      data: undefined,
      setProduct: () => { },
      setShowDialog: () => { },
    });
