import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  AddImageURLArg,
  FetchAllProductsArg,
  PaginateProductsArg,
  PaginateProductsResponse,
  ProductArgs,
  ProductByIdResponse,
  ProductIdArg,
  ProductsResponse,
  RemoveImageURLArg,
  RemoveProductArg,
} from '../types/api_types/product.types';

/**
 * CRUD operations handler for products
 */
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (build) => ({
    fetchAllProducts: build
      .query<ProductsResponse[], Partial<FetchAllProductsArg>>({
      query: (
        { limit, order, sort },
      ) => `products/all?limit=${limit}&order=${order}&sort=${sort}`,
      keepUnusedDataFor: 30,
    }),
    fetchProductsById: build
      .query<ProductByIdResponse, Partial<ProductIdArg>>({
      query: ({ id }) => `products/product/${id}`,
    }),
    fetchPaginatedProducts: build
      .mutation<PaginateProductsResponse, Partial<PaginateProductsArg>>({
      query: (arg) => ({
        url: 'products/paginate/all',
        method: 'POST',
        body: arg,
      }),

    }),
    addNewProduct: build
      .mutation<ProductsResponse, Partial<ProductArgs>>({
      query: ({
        price, available, shipping, description, brand, image, model, countryOfOrigin, token = {},
      }) => ({
        url: 'products',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          price, available, shipping, description, brand, image, model, countryOfOrigin,
        },
      }),
    }),
    editProduct: build
      .mutation<ProductsResponse, Partial<ProductArgs>>({
      query: ({
        _id, price, available, shipping, description, countryOfOrigin, brand, model, token = {},
      }) => ({
        url: `products/product/${_id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          price, available, shipping, description, brand, model, countryOfOrigin,
        },
      }),
    }),
    handleRemoveProduct: build
      .mutation<null, Partial<RemoveProductArg>>({
      query: ({ id, token = {} }) => ({
        url: `products/product/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    handleRemoveImage: build
      .mutation<null, Partial<RemoveImageURLArg>>({
      query: ({ id, imageUrl, token = {} }) => ({
        url: 'products/admin_images',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { id, imageUrl },
      }),
    }),
    handleAddProdImage: build
      .mutation<null, Partial<AddImageURLArg>>({
      query: ({ id, imageUrl, token = {} }) => ({
        url: 'products/admin_images',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { id, imageUrl },
      }),
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useLazyFetchProductsByIdQuery,
  useFetchPaginatedProductsMutation,
  useAddNewProductMutation,
  useEditProductMutation,
  useHandleRemoveProductMutation,
  useHandleRemoveImageMutation,
  useHandleAddProdImageMutation,

} = productApi;
