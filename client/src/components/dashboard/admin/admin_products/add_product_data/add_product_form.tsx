/* eslint-disable react-hooks/rules-of-hooks */
import { Formik } from 'formik';
import type { JSX } from 'react';
import { useMemo } from 'react';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useAppDispatch } from '@/redux.hooks';
import { useAddNewProductMutation } from '@/store/api/product.api';
import type { HandleSubmitAddProduct } from '@/types/admin.types';
import { AddProductContext } from '@/types/context/admin.context';

import { AddProductValidationSchema, InitialAddProductValues, submitAddProduct } from './form_parts/add.data';
import { AddProductForm } from './form_parts/add_product_field';

const AddProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [addNewProduct] = useAddNewProductMutation();
  const { cookies } = useReactCookieHandler();
  const token = cookies['x-access-token'];
  const handleAddProduct = async (values: HandleSubmitAddProduct) => submitAddProduct(
    {
      addNewProduct, dispatch, values, token,
    },
  );

  return (
    <Formik
      enableReinitialize
      initialValues={InitialAddProductValues}
      validationSchema={AddProductValidationSchema}
      onSubmit={handleAddProduct}
    >
      {(formik) => {
        const productValue = useMemo(() => ({
          errors: formik.errors,
          touched: formik.touched,
          isSubmitting: formik.isSubmitting,
          handleSubmit: formik.handleSubmit,
          setFieldValue: formik.setFieldValue,
          getFieldProps: formik.getFieldProps,
        }), [formik]);

        return (
          <AddProductContext.Provider value={productValue}>
            <AddProductForm />
          </AddProductContext.Provider>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
