import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface UserRateItem {
  id: string;
  rate: number;
}
interface UserRateState {
  userRate: UserRateItem[];
}
const initialState: UserRateState = {
  userRate: [],
};

const userRateSlice = createSlice({
  name: 'userRateValues',
  initialState,
  reducers: {
    getUserRate: (state, action: PayloadAction<{
      id: string;
      rate: number;
    }>) => {
      const { rate, id } = action.payload;
      const existingIndex = state.userRate.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        state.userRate[existingIndex].rate = rate;
      } else {
        state.userRate.push({ id, rate });
      }
    },
  },
});

export const { getUserRate } = userRateSlice.actions;

export const userRateState = (state: RootState) => state.rateValue;

export default userRateSlice.reducer;
