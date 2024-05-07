import type { ProductsResponse } from '../api_types/product.types';

export interface CardState {
  id: string;
  amountItems: number;
  cartItems: ProductsResponse;
}
