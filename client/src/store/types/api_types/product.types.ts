/**
 * Interface for the response from the API when fetching a paginated list of products.
 */
export interface ProductsResponse {
  _id: string;
  model: string;
  brand: {
    _id?: string;
    name: string;
    description: string;
    website: string;
  } | string
  description: string,
  price: number,
  available: number,
  item_sold: number,
  shipping: boolean,
  image: string[],
  date: string
}

export interface ProductArgs extends Partial<ProductsResponse> {
  token?: unknown;
  _id?: string;
}

/**
 * Interface that represent metadata for paginated products response
 */
export interface ProductsMetaData {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;
}

export interface FetchAllProductsArg {
  limit: number;
  order: 'asc' | 'desc';
  sort: string;
}

export interface PaginateProductsArg {
  page: number;
  keyword: string;
  price: number[];
  limit: number;
  sort: string;
  brand: string[];
}

export interface PaginateProductsResponse {
  docs: ProductsResponse[]
  rest: ProductsMetaData

}

export interface RemoveProductArg {
  id: string;
  token: unknown;
}

export interface ProductResponse {
  products: ProductsResponse[];
}

interface Brand {
  _id: string;
  name: string;
  description: string;
  website: string;
}

export interface ProductByIdResponse {
  _id: string;
  model: string;
  brand: Brand;
  description: string;
  price: number;
  available: number;
  item_sold: number;
  shipping: boolean;
  image: string[];
  date: string;
}

export interface RemoveImageURLArg {
  imageUrl: string;
  token: unknown;
  id: string;
}

export type AddImageURLArg = RemoveImageURLArg;
export type ProductIdArg = Pick<RemoveProductArg, 'id'>;
