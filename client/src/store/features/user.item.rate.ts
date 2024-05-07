import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface IsRatedState {
  id: string[];
  condition: boolean;
}

const initialState: IsRatedState = {
  id: [],
  condition: false,
};

const isRatedSlice = createSlice({
  name: 'rateState',
  initialState,
  reducers: {
    setIsRated: (state, action: PayloadAction<{ id?: string, condition?: boolean }>) => {
      const { id, condition = false } = action.payload;

      if (id && !state.id.includes(id)) {
        state.id.push(id);
        state.condition = condition;
      }
    },
    resetIsRated: (state, action: PayloadAction<{ id?: string, condition?: boolean }>) => {
      const { id = '', condition = false } = action.payload;
      const idIndex = state.id.indexOf(id);
      if (idIndex !== -1) {
        state.id.splice(idIndex, 1);
        state.condition = condition;
      }
    },
  },
});

export const { setIsRated, resetIsRated } = isRatedSlice.actions;

export const isRatedItem = (state: RootState) => state.checkRate.id;
export const isRatedItemCondition = (state: RootState) => state.checkRate.condition;

export default isRatedSlice.reducer;
