import { Button } from '@material-tailwind/react';
import { Form } from 'formik';
import type { FC, JSX } from 'react';
import {
  useContext, useMemo,
  useState,
} from 'react';

import { AddProductContext, SelectBrandContext } from '@/types/context/admin.context';
import { Utils } from '@/utils';
import { TextAreaField } from '@/utils/utils';

import ImageDropDialog from '../upload/dialog_uploader';
import { SelectBrand } from './brand_options';

const { InputField, SelectField } = Utils;

export const AddProductForm: FC = (): JSX.Element => {
  const props = useContext(AddProductContext);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const {
    errors, touched, setFieldValue, getFieldProps,
  } = props;
  const selectBrandProps = useMemo(() => {
    const selectBrandValue = {
      errors, touched, setFieldValue, getFieldProps,
    };
    return selectBrandValue;
  }, [errors, touched, setFieldValue, getFieldProps]);

  return (
    <Form
      noValidate
      onSubmit={props.handleSubmit}
      className="mx-auto flex h-fit max-w-5xl flex-col gap-8 rounded-lg bg-white px-8 py-12 shadow-md shadow-gray-900"
    >
      <div className="flex w-[900px] flex-row items-center justify-between gap-5">
        <div className="flex h-[400px] w-full flex-col gap-8 rounded-l p-5">
          <InputField
            field="model"
            type="text"
            variant="static"
            color="gray"
            errors={errors}
            touched={touched}
            isSubmitting={props.isSubmitting}
            getFieldProps={props.getFieldProps}
          />

          <SelectBrandContext.Provider value={selectBrandProps}>
            <SelectBrand />
          </SelectBrandContext.Provider>

          <TextAreaField
            field="description"
            placeholder="Product Description"
            rows={2}
            errors={errors}
            touched={touched}
            setFieldValue={props.setFieldValue}
            getFieldProps={props.getFieldProps}
          />
        </div>

        <hr className="h-96 w-0.5 bg-gray-400/90" />

        <div className="flex h-fit w-full flex-col gap-8 rounded-l p-5">
          <InputField
            field="price"
            type="number"
            variant="static"
            color="gray"
            errors={errors}
            touched={touched}
            isSubmitting={props.isSubmitting}
            getFieldProps={props.getFieldProps}
          />

          <InputField
            field="available"
            type="number"
            variant="static"
            color="gray"
            errors={errors}
            touched={touched}
            isSubmitting={props.isSubmitting}
            getFieldProps={props.getFieldProps}
          />

          <InputField
            field="countryOfOrigin"
            hardcodedLabel="Country of Origin"
            type="text"
            variant="static"
            size="lg"
            color="gray"
            errors={errors}
            touched={touched}
            isSubmitting={props.isSubmitting}
            getFieldProps={props.getFieldProps}
          />

          <div className="w-72">
            <SelectField
              label="Is shipping required?"
              field="shipping"
              variant="standard"
              errors={errors}
              touched={touched}
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
              setFieldValue={setFieldValue}
            />
          </div>

        </div>
      </div>

      <div className="relative bottom-14 left-1/4">
        {touched?.image && errors?.image ? (
          <span className="pointer-events-none absolute left-24 top-10 max-w-[90%] truncate pt-[0.37rem] text-lg font-bold leading-[1.6] text-red-500">
            {errors?.image}
          </span>
        ) : null}
      </div>

      <ImageDropDialog
        isImageUploading={isImageUploading}
        setIsImageUploading={setIsImageUploading}
      />

      <div className="flex flex-row items-center justify-center">
        <Button
          color="gray"
          type="submit"
          loading={props.isSubmitting}
          ripple
          className="mx-auto mt-2 block rounded-md bg-gray-900 px-6 py-3 text-xl font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-gray-800"
        >
          Create Product
        </Button>

        <Button
          color="gray"
          type="button"
          onClick={() => setIsImageUploading(true)}
          className="mx-auto mt-2 block rounded-md bg-gray-900 px-6 py-3 text-xl font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-gray-800"
        >
          Upload Image
        </Button>
      </div>

    </Form>
  );
};
