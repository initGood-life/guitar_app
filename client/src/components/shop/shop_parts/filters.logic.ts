import { useCallback } from 'react';

import type { PaginateProductsResponse, ProductsResponse } from '@/store/types/api_types/product.types';
import type { ApplyFilter, FilterHooksProps, FilterProdState } from '@/types/shop.types';

export const useBrandFilterHandler = ({
  setAllFilters,
  stableAllFilters,
  initialProducts,
}: FilterHooksProps) => {
  const { triggeredFilters, brand: brandData } = stableAllFilters;
  const filterByBrandId = (_id: string) => {
    if (initialProducts) {
      const updatedBrandFilters = brandData?.includes(_id)
        ? brandData?.filter((brandId) => brandId !== _id)
        : [...(brandData ?? []), _id];

      setAllFilters((prevState) => ({
        ...prevState,
        brand: updatedBrandFilters,
        triggeredFilters: {
          ...prevState.triggeredFilters,
          brand: updatedBrandFilters.length > 0,
        },
      }));
    }
  };
  const resetBrandFilter = () => setAllFilters((prevState) => ({
    ...prevState,
    brand: [],
    triggeredFilters: {
      ...prevState.triggeredFilters,
      brand: false,
    },
  }));
  const applyBrandFilter = useCallback((filteredDocs: ProductsResponse[] | undefined) => (
    triggeredFilters.brand
      ? filteredDocs?.filter(({ brand }) => brandData.includes(brand?._id ?? ''))
      : filteredDocs), [brandData, triggeredFilters]);

  return {
    filterByBrandId,
    resetBrandFilter,
    applyBrandFilter,
  };
};

export const usePriceFilterHandler = ({
  setAllFilters,
  stableAllFilters,
}: FilterHooksProps) => {
  const { triggeredFilters, priceRange } = stableAllFilters;
  const filterByPrice = (value: number) => setAllFilters((prevState) => ({
    ...prevState,
    priceRange: [
      prevState.priceRange[0],
      prevState.priceRange[1],
      value,
    ],
    triggeredFilters: {
      ...prevState.triggeredFilters,
      priceRange: priceRange[0] !== value,
    },
  }));
  const resetPriceFilter = () => setAllFilters((prevState) => ({
    ...prevState,
    priceRange: [
      stableAllFilters.priceRange[0],
      stableAllFilters.priceRange[1],
      stableAllFilters.priceRange[0],
    ],
    triggeredFilters: {
      ...prevState.triggeredFilters,
      priceRange: false,
    },
  }));
  const applyPriceFilter = useCallback((filteredDocs: ApplyFilter) => (
    triggeredFilters.priceRange
      ? filteredDocs?.filter(({ price }) => price >= priceRange[2]
        && price <= priceRange[1])
      : filteredDocs
  ), [triggeredFilters, priceRange]);

  return {
    filterByPrice,
    resetPriceFilter,
    applyPriceFilter,
  };
};

export const useKeywordFilterHandler = ({
  setAllFilters,
  stableAllFilters,
}: FilterHooksProps) => {
  const filterByKeyword = (keyword: string) => setAllFilters((prevState) => ({
    ...prevState,
    keyword,
    triggeredFilters: {
      ...prevState.triggeredFilters,
      keywordState: keyword.length > 0,
    },
  }));
  const resetKeywordFilter = () => setAllFilters((prevState) => ({
    ...prevState,
    keyword: '',
    triggeredFilters: {
      ...prevState.triggeredFilters,
      keywordState: false,
    },
  }));
  const applyKeywordFilter = useCallback((
    filteredDocs: ApplyFilter,
  ) => (stableAllFilters.triggeredFilters.keywordState
    ? filteredDocs?.filter(({ model }) => model.toLowerCase().replace(/\s/g, '').includes(stableAllFilters.keyword.toLowerCase().replace(/\s/g, '')))
    : filteredDocs), [stableAllFilters]);

  return {
    filterByKeyword,
    resetKeywordFilter,
    applyKeywordFilter,
  };
};

export const useOriginFilterHandler = ({
  setAllFilters,
  stableAllFilters,
}: FilterHooksProps) => {
  const filterByCountryName = (countryOrigin: string) => {
    setAllFilters((prevState) => ({
      ...prevState,
      countryOrigin,
      triggeredFilters: {
        ...prevState.triggeredFilters,
        countryOriginState: countryOrigin !== 'all',
      },
    }));
  };

  const applyCountryNameFilter = useCallback((filteredDocs: ApplyFilter) => (
    stableAllFilters.triggeredFilters.countryOriginState
      ? filteredDocs?.filter((
        { countryOfOrigin },
      ) => countryOfOrigin === stableAllFilters.countryOrigin) : filteredDocs
  ), [stableAllFilters]);

  return {
    filterByCountryName,
    applyCountryNameFilter,
  };
};

export const initialFilters: FilterProdState = {
  brand: [],
  priceRange: [100, 100, 100],
  keyword: '',
  countryOrigin: '',
  triggeredFilters: {
    brand: false,
    priceRange: false,
    keywordState: false,
    countryOriginState: false,
  },
};

export const animationTransition = {
  duration: 0.3,
  delay: 0.1,
  ease: 'easeInOut',
  type: 'tween',
  stiffness: 260,
  damping: 20,
};

export const showAmountProducts = (
  id: string,
  products: ProductsResponse[] | undefined,
) => products?.filter(
  ({ brand }) => brand._id === id,
).length;

export const getCountryName = (
  productResponse: PaginateProductsResponse,
) => productResponse.docs.map((prod) => prod.countryOfOrigin);

export const priceDefaults = {
  minProductPrice: (productResponse: PaginateProductsResponse) => productResponse.docs
    .reduce((min, product) => (product.price < min ? product.price : min), Number.MAX_VALUE),
  maxProductPrice: (productResponse: PaginateProductsResponse) => productResponse.docs
    .reduce((max, product) => (product.price > max ? product.price : max), 0),
};
