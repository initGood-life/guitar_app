import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface UniqueItemPrices {
  id: string;
  uniqueDiscount: number;
}

const initialState: Record<string, number> = {};

const uniqueItemPriceSlice = createSlice({
  name: 'uniques',
  initialState,
  reducers: {
    setUniquePrices: (state, action: PayloadAction<UniqueItemPrices>) => {
      const { id, uniqueDiscount } = action.payload;
      if (id in state) {
        state[id] += uniqueDiscount;
      } else {
        state[id] = uniqueDiscount;
      }
    },
    resetUniquePrices: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id in state) {
        delete state[id];
      }
    },
  },
});

export const { setUniquePrices, resetUniquePrices } = uniqueItemPriceSlice.actions;

export const uniquePriceItems = (state: RootState) => state.uniqueItemPrice;

export default uniqueItemPriceSlice.reducer;
