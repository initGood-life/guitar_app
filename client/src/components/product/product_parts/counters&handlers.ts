import type { Dispatch } from '@reduxjs/toolkit';

import { removeFromCart, updateCart } from '@/store/features/item.counter.slice';
import { resetRatedId, setRatedId } from '@/store/features/rate.item.id';
import { setUniquePrices } from '@/store/features/unique.prices';
import { setIsRated } from '@/store/features/user.item.rate';
import type { ProductsResponse } from '@/store/types/api_types/product.types';
import type { CardState } from '@/store/types/feature_types/cart.state.type';
import type { FulfilledData } from '@/types/admin.types';

export const cartItemsCounters = {
  uniqueProductAmount: (id?: string, items?: CardState[]) => {
    if (!id || !items) {
      return 0;
    }

    return items.filter(({ id: itemId }) => itemId === id)
      .reduce((val, { amountItems }) => val + amountItems, 0);
  },
  countItems: (items: CardState[]) => items
    .reduce((val, { amountItems }) => val + amountItems, 0),
  savesOnShipping: (items: CardState[]) => items
    .filter((item) => item.cartItems.shipping)
    .reduce((
      total,
      { cartItems, amountItems },
    ) => total + (cartItems.price * amountItems), 0) * 0.05,
  freeShipping: (items: CardState[]) => items
    .filter(({ cartItems }) => cartItems.shipping).length,
  totalPrice: (items: CardState[]) => items.reduce(
    (val, { cartItems, amountItems }) => val + (cartItems.price * amountItems),
    0,
  ),
  discountSummary: (uniqueItemPrice: Record<string, number>) => Object.values(uniqueItemPrice)
    .reduce((total, discount) => total + discount, 0),
};

export const cartItemsHandlers = {
  handleAmountOfItems: (
    id: string,
    amountItems: number,
    dispatch: Dispatch,
    products: Record<string, FulfilledData>,
  ) => {
    const productData = products[id]?.data;
    if (productData && amountItems <= productData.available && amountItems >= 1) {
      dispatch(updateCart(
        { id, amountItems, cartItems: productData as ProductsResponse },
      ));
    }
  },
  removeFromCartHandler: (
    id: string,
    dispatch: Dispatch,
    setProducts: (value: React.SetStateAction<Record<string, FulfilledData>>)=> void,
  ) => {
    dispatch(removeFromCart({ id }));
    // dispatch(resetUniquePrices({ id }));
    dispatch(resetRatedId());
    setProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };
      delete updatedProducts[id];
      return updatedProducts;
    });
  },

  getRandomDiscount: (
    dispatch: Dispatch,
    ratedItem: string[],
    id?: string,
    price?: number,
  ) => {
    if (!ratedItem.includes(id ?? '')) {
      const discountPercentage = +(Math.random() * (0.05 - 0.01) + 0.01).toFixed(2);
      const uniqueDiscount = price ? (price * discountPercentage) : 0;

      if (id) {
        dispatch(setRatedId(id));
        dispatch(setIsRated({ id, condition: false }));
        dispatch(setUniquePrices({ id, uniqueDiscount }));
      }
    }
  },
};
