/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { authApi } from './api/auth.api';
import { brandApi } from './api/brand.api';
import RTKQueryLogger from './api/middleware/api.errors';
import { productApi } from './api/product.api';
import { userApi } from './api/user.api';
import productSlice from './features/add.item';
import errorSlice from './features/error.handler';
import idSlice from './features/id.handler';
import cardSlice from './features/item.counter.slice';
import userInfoSlice from './features/user.info';

const encryptPersist = encryptTransform({
  secretKey: import.meta.env.VITE_REDUX_KEY,
  onError(error: Error) {
    console.error('Encryption error:', error);
  },
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    productApi.reducerPath, authApi.reducerPath,
    userApi.reducerPath, brandApi.reducerPath,
  ],
  transforms: [encryptPersist],
};

const persistStorage = persistReducer(
  persistConfig,
  combineReducers({
    id: idSlice,
    error: errorSlice,
    counter: cardSlice,
    product: productSlice,
    userInfo: userInfoSlice,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  }),
);

const store = configureStore({
  reducer: persistStorage,
  // Adding the api middleware enables caching, invalidation and polling
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(productApi.middleware, authApi.middleware, brandApi.middleware, RTKQueryLogger),
  devTools: {
    trace: true,
  },

});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
