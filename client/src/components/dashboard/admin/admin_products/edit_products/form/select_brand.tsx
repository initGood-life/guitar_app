import type {
  FieldConfig,
  FieldInputProps,
  FormikErrors, FormikTouched, FormikValues,
} from 'formik';
import type { JSX } from 'react';
import { useMemo } from 'react';

import { useGetAllBrandsQuery } from '@/store/api/brand.api';
import { Utils } from '@/utils';

const { SelectField } = Utils;

export const BrandSelector = ({
  errors, touched, setFieldValue, getFieldProps,
}: {
  errors: FormikErrors<Record<string, unknown>>;
  touched: FormikTouched<Record<string, unknown>>;
  setFieldValue: (
    field: string,
    value: string | undefined,
    shouldValidate: boolean | undefined
  )=> Promise<void | FormikErrors<FormikValues>>

  getFieldProps: (props: string | FieldConfig<string>)=> FieldInputProps<string>
}): JSX.Element => {
  const { data: brands } = useGetAllBrandsQuery({ order: 'desc', limit: 5 });
  const brandOptions = useMemo(() => (brands?.map((item) => ({
    label: item.name,
    value: item._id,
  }))), [brands]);

  if (!brands) {
    return <div>Loading brand options...</div>;
  }

  return (
    <div className="w-72">
      <SelectField
        label="Select Brand"
        field="brand"
        color="amber"
        variant="standard"
        errors={errors}
        touched={touched}
        value={getFieldProps('brand').value}
        options={brandOptions}
        setFieldValue={setFieldValue}
        className="text-lg text-white"
      />
    </div>
  );
};
