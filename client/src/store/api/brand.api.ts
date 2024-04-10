import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { AllBrandsArgs, BrandArgs, BrandResponse } from '../types/api_types/brand.types';

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  refetchOnReconnect: false,
  endpoints: (builder) => ({
    postBrand: builder.mutation<BrandResponse, Partial<BrandArgs>>({
      query: (body) => ({
        url: 'brands/create_brand',
        method: 'POST',
        body,
      }),
    }),
    getAllBrands: builder.query<BrandResponse, Partial<AllBrandsArgs>>({
      query: ({ limit, order }) => `brands/all?=&limit=${limit}&order=${order}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { usePostBrandMutation, useGetAllBrandsQuery } = brandApi;
