import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { CardState } from '../types/feature_types/cart.state.type';

const initialState: CardState[] = [];

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CardState>) => {
      const { id, amountItems, cartItems } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.amountItems = amountItems;
        existingItem.cartItems = {
          ...cartItems,
        };
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        state.splice(state.indexOf(existingItem), 1);
      }
    },
  },
});

export const { updateCart, removeFromCart } = cardSlice.actions;

export const selectedItems = (state: RootState) => state.counter;

export default cardSlice.reducer;
