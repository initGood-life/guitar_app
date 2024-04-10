import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface CardState {
  id: string;
  cartItem: number;
}

const initialState: CardState[] = [];

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CardState>) => {
      const { id, cartItem } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.cartItem = cartItem;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { updateCart } = cardSlice.actions;

export const selectedItems = (state: RootState) => state.counter;

export default cardSlice.reducer;
