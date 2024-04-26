import ResetFilterIcon from '@icons/reset_all.svg?react';
import type { FC, JSX } from 'react';

import type { PriceFilterProps } from '@/types/shop.types';

const PriceFilter: FC<PriceFilterProps> = ({
  filters, filterByPrice, resetPriceFilter,
}): JSX.Element => (
  <div className="relative mb-6 rounded-md bg-white/50 p-3">
    <h1 className="filters-title m-1">Filter by Price</h1>
    <ResetFilterIcon
      onClick={resetPriceFilter}
      className={`absolute left-3 top-1 size-8 cursor-pointer rounded-full transition-transform duration-500 ease-in-out ${
        !filters.triggeredFilters.priceRange
          ? 'bg-gray-600 fill-gray-900 '
          : '-rotate-180 bg-black/35 fill-white'
      }`}
    />
    <input
      step={10}
      type="range"
      name="price_range"
      min={filters.priceRange[0]}
      max={filters.priceRange[1]}
      value={filters.priceRange[2]}
      onChange={({ target }) => filterByPrice(target.valueAsNumber)}
      className="w-full cursor-pointer rounded-md accent-white/50"
    />
    <div className="flex justify-between text-sm text-gray-800 dark:text-gray-400">
      <span>
        Min ($
        {filters.priceRange[0]}
        )
      </span>
      <span>
        Max ($
        {filters.priceRange[1]}
        )
      </span>
    </div>
    <div className="mt-1 flex justify-center">
      <span className="text-lg text-white">
        From
        {' '}
        $
        {filters.priceRange[2]}
        {' '}
        to $
        {filters.priceRange[1]}
      </span>
    </div>
  </div>
);

export default PriceFilter;
