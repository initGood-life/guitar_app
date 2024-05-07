import type {
  BaseQueryFn, FetchArgs,
  FetchBaseQueryError, FetchBaseQueryMeta,
  QueryActionCreatorResult, QueryDefinition,
} from '@reduxjs/toolkit/query';

import type { ProductByIdResponse, ProductIdArg } from '@/store/types/api_types/product.types';
import type { FulfilledData } from '@/types/admin.types';

type ProductById = (arg: Partial<ProductIdArg>, preferCacheValue?: boolean | undefined)=> QueryActionCreatorResult<QueryDefinition<Partial<ProductIdArg>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, ProductByIdResponse, 'productApi'>>;

const getItems = async (
  cartItemId: ()=> string[],
  fetchProductById: ProductById,
  setProducts: (value: React.SetStateAction<Record<string, FulfilledData>>)=> void,
) => Promise.all(cartItemId().map(
  async (id) => {
    const productData = await fetchProductById({ id });
    setProducts((prevProducts) => ({
      ...prevProducts,
      [id]: productData,
    }));
  },
));

export default getItems;
