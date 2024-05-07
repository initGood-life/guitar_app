import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const initialState = '';

const rateIdSlice = createSlice({
  name: 'rateIdHandler',
  initialState,
  reducers: {
    setRatedId: (_state, action: PayloadAction<string>) => action.payload,
    resetRatedId: () => '',
  },
});

export const { setRatedId, resetRatedId } = rateIdSlice.actions;

export const ratedId = (state: RootState) => state.ratedId;

export default rateIdSlice.reducer;
