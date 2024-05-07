import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@/redux.hooks';
import { useLazyFetchProductsByIdQuery } from '@/store/api/product.api';
import { selectedItems } from '@/store/features/item.counter.slice';
import type { FulfilledData } from '@/types/admin.types';
import { Loader } from '@/utils';

import { cartItemsCounters } from './product_parts/counters&handlers';
import CartItems from './product_parts/product_cart/cart_items';
import CartSummary from './product_parts/product_cart/cart_summary';
import EmptyCart from './product_parts/product_cart/default_cart';
import getItems from './product_parts/products.handler';

const ProductCart = (): JSX.Element => {
  const items = useAppSelector(selectedItems);
  const [products, setProducts] = useState<Record<string, FulfilledData>>({});
  const [fetchProductById] = useLazyFetchProductsByIdQuery();
  const cartItemId = useCallback(() => items.map((item) => item.id), [items]);

  const countItemsVal = cartItemsCounters.countItems(items);

  useEffect(() => {
    void getItems(cartItemId, fetchProductById, setProducts);
  }, [fetchProductById, cartItemId]);

  if (countItemsVal === 0) {
    return <EmptyCart />;
  }

  if (!products) {
    return (
      <div className="grid h-screen place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 size-full gap-5 bg-white px-24 py-10">
      <div className="mb-5 flex flex-col">
        <h1 className="common-title text-4xl">Your Cart</h1>
        <small className="mt-2">
          <b>{countItemsVal}</b>
          {' '}
          items in cart
        </small>
      </div>
      <div
        className="flex w-full items-start justify-between"
      >
        {/** Cart Items Section  */}

        <CartItems
          products={products}
          items={items}
          setProducts={setProducts}
        />

        {/** Summary Section  */}

        <CartSummary items={items} />

      </div>
    </div>
  );
};

export default ProductCart;
