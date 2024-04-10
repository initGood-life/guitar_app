import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ErrorState } from '../types/feature_types/error.types';
import type { RootState } from '../types/rootState';

// Initial error state
const initialState: ErrorState = {
  error: '',
  field: '',
};

/**
 * Tracking errors from server responses
 */

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    // Set error state reducer - Updates error state with provided data
    setErrorState: (
      state: ErrorState,
      action: PayloadAction<ErrorState>,
    ) => {
      state.error = action.payload.error;
      state.field = action.payload.field;
    },
  },
});

export const { setErrorState } = errorSlice.actions;

export const selectError = (state: RootState) => state.error;

export default errorSlice.reducer;
