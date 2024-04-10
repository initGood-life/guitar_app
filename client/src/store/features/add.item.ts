import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ProductState {
  id: string;
  showAddCart: boolean;
}

const initialState: ProductState[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleAddCart: (state: ProductState[], action: PayloadAction<string>) => {
      const product = state.find((p) => p.id === action.payload);
      if (product) {
        product.showAddCart = !product.showAddCart;
      }
    },
  },
});

export const { toggleAddCart } = productSlice.actions;
export default productSlice.reducer;
