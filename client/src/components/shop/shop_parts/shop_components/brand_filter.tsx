import ResetFilterIcon from '@icons/reset_all.svg?react';
import { Checkbox } from '@material-tailwind/react';
import type { FC, JSX } from 'react';

import type { BrandFilterProps } from '@/types/shop.types';

import { showAmountProducts } from '../filters.logic';

const BrandFilter: FC<BrandFilterProps> = ({
  brands, products, filters, filterByBrandId, resetBrandFilter, filtersLoadingPromises,
}): JSX.Element => {
  const { triggeredFilters, brand } = filters;
  const isChecked = (_id: string) => brand?.includes(_id) ?? false;
  const handleFilterByBrandId = async (brandId: string) => {
    filterByBrandId(brandId);

    if (filtersLoadingPromises) {
      await filtersLoadingPromises();
    }
  };
  return (
    <div className="relative h-56 w-full overflow-y-auto rounded-md bg-white/50 p-2">
      <h1 className="filters-title common-title mb-2">Filter by Brand</h1>
      <ResetFilterIcon
        onClick={resetBrandFilter}
        className={`absolute left-3 top-1 size-8 cursor-pointer rounded-full transition-transform duration-500 ease-in-out ${!triggeredFilters.brand
          ? 'bg-gray-600 fill-gray-900 '
          : '-rotate-180 bg-black/35 fill-white'
        }`}
      />
      {brands?.map(({ _id = '', name }) => (
        <label
          key={_id}
          htmlFor={`brand-${_id}`}
          className="m-1 flex flex-row items-center justify-start rounded-md border-0.5 border-gray-300/50 p-1"
        >
          <Checkbox
            id={`brand-${_id}`}
            crossOrigin="anonymous"
            checked={isChecked(_id)}
            onChange={() => handleFilterByBrandId(_id)}
            color="blue"
            className="-z-10"
          />
          <span className="font-rubik text-lg tracking-wider text-white">{name}</span>
          <small className="absolute right-10 rounded-full bg-gray-900 px-2 py-1 text-white">
            {showAmountProducts(_id, products)}
          </small>
        </label>
      ))}
    </div>
  );
};

export default BrandFilter;
