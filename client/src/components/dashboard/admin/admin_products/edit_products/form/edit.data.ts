import * as Yup from 'yup';

import { setErrorState } from '@/store/features/error.handler';
import type { HandleSubmitEditProduct } from '@/types/admin.types';
import { showSwal } from '@/utils';
import isSerializedError from '@/utils/serialized';

export const submitEditProduct = async ({
  values, id, token, dispatch, editProductById,
}: HandleSubmitEditProduct) => {
  const {
    brand, model, description, price, shipping, available,
  } = values;

  try {
    const response = await editProductById({
      brand,
      model,
      description,
      price,
      shipping,
      available,
      token,
      _id: id,
    }).unwrap();
    if (response) {
      showSwal({
        title: 'Success',
        text: 'Product added successfully',
        icon: 'success',
      });
    }
  } catch (error) {
    if (isSerializedError(error)) {
      dispatch(setErrorState({
        error: error.data.message,
        field: error.data.field ?? '',
      }));
    }
  }
};

export const EditProductValidation = Yup.object({
  model: Yup
    .string()
    .required('Model is required')
    .min(3, 'Model must be at least 3 characters long')
    .max(50, 'Model must be at most 50 characters long')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Model must contain only alphanumeric characters and spaces'),
  brand: Yup
    .string()
    .required('Brand is required')
    .min(3, 'Brand must be at least 3 characters long')
    .max(50, 'Brand must be at most 50 characters long'),
  description: Yup
    .string()
    .matches(/^((?!damn|hell|shit|fuck|bitch).)*$/, 'No profanity allowed in description')
    .required('Description is required'),
  price: Yup
    .number()
    .required('Price is required')
    .min(0, 'Price must be greater than 0'),
  available: Yup
    .number()
    .required('Available is required')
    .min(0, 'Available products can not be less than zero'),
  shipping: Yup
    .boolean()
    .required('Shipping is required'),
});
