import type {
  BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition,
} from '@reduxjs/toolkit/query';
import type { MutationTrigger } from 'node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';
import type { Dispatch, SetStateAction } from 'react';

import type { BrandResponse } from '@/store/types/api_types/brand.types';
import type { PaginateProductsArg, PaginateProductsResponse, ProductsResponse } from '@/store/types/api_types/product.types';

export interface FilterProdState {
  brand: string[];
  priceRange: [number, number, number];
  keyword: string;
  countryOrigin: string;
  triggeredFilters: {
    brand: boolean;
    priceRange: boolean;
    keywordState: boolean;
    countryOriginState: boolean;
  };
}

interface FilterProps {
  filters: FilterProdState;
  filtersLoadingPromises?: ()=> Promise<void>
}

export interface BrandFilterProps extends FilterProps {
  brands: BrandResponse | undefined;
  products: ProductsResponse[] | undefined;
  filterByBrandId: (keyword: string)=> void;
  resetBrandFilter: ()=> void;
}

export interface KeywordSearchProps extends FilterProps {
  productRef?: React.RefObject<HTMLDivElement>;
  filterByKeyword: (keyword: string)=> void;
  resetKeywordFilter: ()=> void;
}

export interface PriceFilterProps extends FilterProps {
  filterByPrice: (value: number)=> void;
  resetPriceFilter: ()=> void;
}

export interface CountryOfOriginSelectorProps extends FilterProps {
  countryName: string[] | undefined;
  filterByCountry: (countryName: string)=> void;
}

export interface FilterHooksProps {
  setAllFilters: Dispatch<SetStateAction<FilterProdState>>;
  stableAllFilters: FilterProdState;
  initialProducts?: PaginateProductsResponse | undefined;
}

export interface FetchProductsQuery {
  fetchPaginatedProducts: MutationTrigger<MutationDefinition<Partial<PaginateProductsArg>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, PaginateProductsResponse, 'productApi'>>;
  setProducts: (value: SetStateAction<ProductsResponse[] | undefined>)=> void
  setAllFilters: Dispatch<SetStateAction<FilterProdState>>
  setCountryName: Dispatch<SetStateAction<string[] | undefined>>
  brands: BrandResponse | undefined;
}

export type ApplyFilter = ProductsResponse[] | undefined;
