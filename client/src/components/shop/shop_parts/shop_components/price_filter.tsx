import ResetFilterIcon from '@icons/reset_all.svg?react';
import type { ChangeEvent, FC, JSX } from 'react';
import { useEffect, useRef } from 'react';

import type { PriceFilterProps } from '@/types/shop.types';

const PriceFilter: FC<PriceFilterProps> = (
  { filters, filterByPrice, resetPriceFilter },
): JSX.Element => {
  const priceRef = useRef<HTMLInputElement>(null);
  const { priceRange, triggeredFilters } = filters;

  useEffect(() => {
    if (triggeredFilters.priceRange && priceRef.current) {
      priceRef.current.focus();
    }
  }, [triggeredFilters.priceRange]);

  const handleFilterByPrice = (
    { target }: ChangeEvent<HTMLInputElement>,
  ) => filterByPrice(target.valueAsNumber);
  return (
    <div className="relative mb-6 rounded-md bg-white/50 p-3">
      <h1 className="filters-title common-title m-1">Filter by Price</h1>
      <ResetFilterIcon
        onClick={resetPriceFilter}
        className={`absolute left-3 top-1 size-8 cursor-pointer rounded-full transition-transform duration-500 ease-in-out ${!triggeredFilters.priceRange
          ? 'bg-gray-600 fill-gray-900 '
          : '-rotate-180 bg-black/35 fill-white'
        }`}
      />
      <input
        step={10}
        ref={priceRef}
        type="range"
        name="price_range"
        min={priceRange[0]}
        max={priceRange[1]}
        value={priceRange[2]}
        onChange={handleFilterByPrice}
        className="w-full cursor-pointer rounded-md accent-white/50"
      />
      <div className="flex justify-between text-sm text-gray-800 dark:text-gray-400">
        <span>
          Min ($
          {priceRange[0]}
          )
        </span>
        <span>
          Max ($
          {priceRange[1]}
          )
        </span>
      </div>
      <div className="mt-1 flex justify-center">
        <span className="text-lg text-white">
          From
          {' '}
          $
          {priceRange[2]}
          {' '}
          to $
          {priceRange[1]}
        </span>
      </div>
    </div>
  );
};

export default PriceFilter;
