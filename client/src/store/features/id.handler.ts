import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface IdState {
  id?: string;
}

const initialState: IdState = {
  id: '',
};

const idSlice = createSlice({
  name: 'idHandler',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<IdState>) => ({
      ...state,
      id: action.payload.id,
    }),
  },
});

export const { setId } = idSlice.actions;

export const storedId = (state: RootState) => state.id;

export default idSlice.reducer;
