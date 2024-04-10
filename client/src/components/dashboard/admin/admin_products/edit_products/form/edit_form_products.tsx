import { Button } from '@material-tailwind/react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import type { JSX } from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useAppDispatch } from '@/redux.hooks';
import { useEditProductMutation, useLazyFetchProductsByIdQuery } from '@/store/api/product.api';
import type { EditProductProps, FulfilledData } from '@/types/admin.types';
import { Loader, Utils } from '@/utils';

import { EditProductValidation, submitEditProduct } from './edit.data';
import { BrandSelector } from './select_brand';

const { InputField, SelectField, WavesButton } = Utils;

const EditProduct = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { cookies } = useReactCookieHandler();
  const [fetchProductById] = useLazyFetchProductsByIdQuery();
  const [editProductById] = useEditProductMutation();
  const [product, setProduct] = useState<FulfilledData>({
    data: undefined,
  });
  const { data } = product;
  const token = cookies['x-access-token'];
  useEffect(() => {
    const getById = async () => {
      const productData = await fetchProductById({ id });
      setProduct(productData);
    };
    void getById();
  }, [fetchProductById, id]);

  const editProduct = async (values: EditProductProps) => submitEditProduct({
    values, id, token, dispatch, editProductById,
  });

  if (!data) {
    return (
      <div className="grid h-screen w-screen items-center bg-gray-700">
        <Loader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        model: data.model ?? '',
        brand: data.brand._id ?? '',
        description: data.description ?? '',
        price: data.price ?? 0,
        available: data.available ?? false,
        shipping: data.shipping ?? 0,
      }}
      validationSchema={EditProductValidation}
      onSubmit={editProduct}
    >
      {(formik) => (
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          className="flex h-fit max-w-5xl flex-col gap-8 rounded-lg bg-gray-900 px-8 py-12 shadow-md shadow-gray-900"
        >
          <div className="flex w-[900px] flex-row items-center justify-between gap-10">
            <div className="flex w-full flex-col gap-8 p-5">
              <InputField
                field="model"
                type="text"
                variant="static"
                color="white"
                required
                errors={formik.errors}
                touched={formik.touched}
                isSubmitting={formik.isSubmitting}
                getFieldProps={formik.getFieldProps}
              />

              <InputField
                field="description"
                hardcodedLabel="Product Description"
                type="text"
                variant="static"
                color="white"
                required
                errors={formik.errors}
                touched={formik.touched}
                isSubmitting={formik.isSubmitting}
                getFieldProps={formik.getFieldProps}
              />

              <BrandSelector
                errors={formik.errors}
                touched={formik.touched}
                setFieldValue={formik.setFieldValue}
                getFieldProps={formik.getFieldProps}
              />

            </div>

            <hr className="h-72 w-0.5 bg-gray-400/90" />

            <div className="flex h-fit w-full flex-col gap-8 p-5">
              <InputField
                field="price"
                type="number"
                variant="static"
                color="white"
                required
                errors={formik.errors}
                touched={formik.touched}
                isSubmitting={formik.isSubmitting}
                getFieldProps={formik.getFieldProps}
              />

              <InputField
                field="available"
                type="number"
                variant="static"
                color="white"
                required
                errors={formik.errors}
                touched={formik.touched}
                isSubmitting={formik.isSubmitting}
                getFieldProps={formik.getFieldProps}
              />

              <div className="w-72">
                <SelectField
                  label="Is Shipping Required?"
                  field="shipping"
                  variant="standard"
                  color="amber"
                  value={String(formik.getFieldProps<string>('shipping').value)}
                  errors={formik.errors}
                  touched={formik.touched}
                  options={[
                    { label: 'Yes', value: 'true' },
                    { label: 'No', value: 'false' },
                  ]}
                  setFieldValue={formik.setFieldValue}
                  className="text-lg text-white"
                />

              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-6">
            <Button
              color="white"
              type="submit"
              loading={formik.isSubmitting}
              className="mx-auto mt-2 block rounded-md bg-white px-6 py-3 text-xl font-medium capitalize tracking-wide text-gray-900 transition-colors duration-300 hover:bg-gray-400"
            >
              Edit Product
            </Button>

            <WavesButton
              isLinked
              link={`/dashboard/admin/prod_images/${id}`}
              styled="mx-auto mt-2 block rounded-md bg-white px-6 py-3 text-xl font-medium capitalize tracking-wide text-gray-900 transition-colors duration-300 hover:bg-gray-400"
            >
              Manage Images
            </WavesButton>

          </div>

        </Form>
      )}
    </Formik>
  );
};

export default EditProduct;
