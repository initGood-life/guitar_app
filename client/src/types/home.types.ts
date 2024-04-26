import type { ProductsResponse } from '@/store/types/api_types/product.types';

export interface ProductType {
  product: ProductsResponse;
  searchKeyword?: string;
  title?: string;
}
export interface ProductListProps {
  products: ProductsResponse[];
  title: string;
}

export interface CartProps {
  itemId: string;
  quantity: number
  closeAddCart: ()=> void;
}
