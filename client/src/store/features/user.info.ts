import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { IUserInfo } from '../types/feature_types/userInfo.types';

const initialState: IUserInfo = {};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      if (!action.payload) return initialState;

      return {
        ...state,
        user: action.payload,
      };
    },
    resetUser: (_state) => ({
      ...initialState,
    }),
  },
});

export const { setUserInfo, resetUser } = userInfoSlice.actions;

export const selectedItems = (state: RootState) => state.userInfo;

export default userInfoSlice.reducer;
