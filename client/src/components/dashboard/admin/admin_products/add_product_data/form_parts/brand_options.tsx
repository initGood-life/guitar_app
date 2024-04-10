import type { JSX } from 'react';
import { useContext, useMemo } from 'react';

import { useGetAllBrandsQuery } from '@/store/api/brand.api';
import { SelectBrandContext } from '@/types/context/admin.context';
import { Utils } from '@/utils';

const { SelectField } = Utils;

export const SelectBrand = (): JSX.Element => {
  const props = useContext(SelectBrandContext);
  const {
    errors, touched, setFieldValue, getFieldProps,
  } = props;
  const { data: brands } = useGetAllBrandsQuery({ order: 'desc', limit: 5 });
  const brandOptions = useMemo(() => (brands ? brands?.map((item) => ({
    label: item.name,
    value: item._id,
  })) : []), [brands]);

  return (
    <div className="w-72">
      <SelectField
        label="Brand"
        field="brand"
        color="amber"
        variant="standard"
        errors={errors}
        value={String(getFieldProps('brand').value)}
        touched={touched}
        options={brandOptions}
        setFieldValue={setFieldValue}
      />
    </div>
  );
};
