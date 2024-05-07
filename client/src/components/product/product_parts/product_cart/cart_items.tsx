import CloseCartIcon from '@icons/rounded-cancel-icon.svg?react';
import { Rating } from '@material-tailwind/react';
import type { FC, JSX } from 'react';
import { memo, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux.hooks';
import { isRatedItem } from '@/store/features/user.item.rate';
import { getUserRate, userRateState } from '@/store/features/user.rate';
import type { CardState } from '@/store/types/feature_types/cart.state.type';
import type { FulfilledData } from '@/types/admin.types';

import { cartItemsCounters, cartItemsHandlers } from '../counters&handlers';

interface CartItemsProps {
  products: Record<string, FulfilledData>
  items: CardState[]
  setProducts: (value: React.SetStateAction<Record<string, FulfilledData>>)=> void,
}

const CartItems: FC<CartItemsProps> = ({ products, items, setProducts }): JSX.Element => {
  const dispatch = useAppDispatch();
  const ratedItem = useAppSelector(isRatedItem);
  const itemRateVal = useAppSelector(userRateState);
  const { uniqueProductAmount } = cartItemsCounters;
  const { handleAmountOfItems, removeFromCartHandler, getRandomDiscount } = cartItemsHandlers;

  const reduceAmountHandler = useCallback((id?: string) => handleAmountOfItems(id ?? '', uniqueProductAmount(id, items) - 1, dispatch, products), [dispatch, handleAmountOfItems, items, products, uniqueProductAmount]);

  const increaseAmountHandler = useCallback((id?: string) => handleAmountOfItems(id ?? '', uniqueProductAmount(id, items) + 1, dispatch, products), [dispatch, handleAmountOfItems, items, products, uniqueProductAmount]);

  // eslint-disable-next-line max-len
  const getRandomDiscountHandler = useCallback((id?: string, price?: number) => getRandomDiscount(dispatch, ratedItem, id, price), [ratedItem, dispatch, getRandomDiscount]);

  const memoizedUniqueProductAmount = useCallback(
    (id?: string) => uniqueProductAmount(id, items),
    [uniqueProductAmount, items],
  );

  return (
    <section className="flex w-2/3 flex-col items-start justify-start gap-10 p-1">
      {Object.values(products).map(({ data, requestId }) => (
        <div key={requestId} className="relative flex w-full items-start justify-start gap-12 rounded-md border-2 bg-gray-900 p-5 shadow-md">
          <img
            loading="lazy"
            src={data?.image[0]}
            alt={data?.model}
            className="size-96 rounded-sm border-1 border-white shadow-sm shadow-blue-gray-500"
          />
          <div className="flex flex-col items-start justify-start gap-3 text-gray-400">
            <h1 className="common-title max-w-72 text-xl">{data?.model}</h1>
            <p className="text-base">
              {memoizedUniqueProductAmount(data?._id)}
              {' '}
              {memoizedUniqueProductAmount(data?._id) > 1 ? 'items' : 'item'}
            </p>
          </div>
          <div className="absolute bottom-28 right-12 w-96 rounded-lg bg-white p-6 shadow-lg">
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="mb-4 text-center text-gray-700">
                Rate the item below to receive a random discount between
                {' '}
                <span className="font-bold">
                  {(0.01 * 100).toFixed(0)}
                  %
                </span>
                {' '}
                -
                {' '}
                <span className="font-bold">
                  {(0.05 * 100).toFixed(0)}
                  %
                </span>
                {' '}
                on the rated product.
              </p>
              <div className="flex w-full justify-end">
                <Rating
                  value={itemRateVal.userRate.find((rate) => rate.id === data?._id)?.rate ?? 0}
                  readonly={ratedItem.includes(data?._id ?? '')}
                  onClick={() => getRandomDiscountHandler(data?._id, data?.price)}
                  onChange={(rate) => dispatch(
                    getUserRate({
                      id: data?._id ?? '',
                      rate,
                    }),
                  )}
                  className="w-auto"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 text-xl font-semibold text-gray-400">
            $
            {data?.price}
          </div>
          {/* Count Items at cart */}
          <div className="absolute bottom-5 right-48 z-10 w-60 rounded-md bg-white p-2 shadow-md">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className={`size-12 text-5xl ${memoizedUniqueProductAmount(data?._id) <= 1 ? 'cursor-default text-gray-500 hover:text-gray-500' : 'cursor-pointer text-gray-900 shadow-gray-900 hover:text-gray-700 hover:shadow-lg'}`}
                onClick={() => reduceAmountHandler(data?._id)}
              >
                &ndash;
              </button>
              <input
                name="amount"
                type="text"
                value={memoizedUniqueProductAmount(data?._id)}
                readOnly
                className="pointer-events-none h-12 w-20 select-none rounded-md border border-none border-gray-900 bg-gray-200 text-center text-2xl"
              />
              <button
                type="button"
                className={`size-12 text-5xl ${data && memoizedUniqueProductAmount(data?._id) >= data?.available ? 'cursor-default text-gray-500 hover:text-gray-500' : 'cursor-pointer text-gray-900 shadow-gray-900 hover:text-gray-700 hover:shadow-lg'}`}
                onClick={() => increaseAmountHandler(data?._id)}
              >
                &#43;
              </button>
            </div>
          </div>
          <CloseCartIcon
            onClick={() => removeFromCartHandler(data?._id ?? '', dispatch, setProducts)}
            className="absolute right-2 top-2 size-8 cursor-pointer rounded-full bg-white fill-gray-900 hover:fill-red-300"
          />
        </div>

      ))}
    </section>
  );
};

export default memo(CartItems);
