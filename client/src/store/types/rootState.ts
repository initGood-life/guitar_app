import type { IdState } from '../features/id.handler';
import type { AuthProps } from './api_types/auth.types';
import type { ProductsResponse } from './api_types/product.types';
import type { UserResponse } from './api_types/user.types';
import type { ErrorState } from './feature_types/error.types';
import type { IUserInfo } from './feature_types/userInfo.types';

interface Counter {
  id: string;
  cartItem: number;
}

interface ImgURIState {
  imgUrl: string;
}

export interface RootState {
  error: ErrorState;
  id: IdState;
  imgUrl: ImgURIState;
  product: ProductsResponse;
  userApi: UserResponse;
  userInfo: IUserInfo;
  auth: AuthProps;
  counter: Counter[];
}
