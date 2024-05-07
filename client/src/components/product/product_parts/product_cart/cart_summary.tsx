import { Button } from '@material-tailwind/react';
import type { FC, JSX } from 'react';

import { useAppSelector } from '@/redux.hooks';
import { ratedId } from '@/store/features/rate.item.id';
import { uniquePriceItems } from '@/store/features/unique.prices';
import type { CardState } from '@/store/types/feature_types/cart.state.type';

import { cartItemsCounters } from '../counters&handlers';

interface CartSummaryProps {
  items: CardState[]
}

const CartSummary: FC<CartSummaryProps> = ({ items }): JSX.Element => {
  const itemsId = useAppSelector(ratedId);
  const uniqueItemPrice = useAppSelector(uniquePriceItems);

  const totalPriceVal = cartItemsCounters.totalPrice(items);
  const freeShippingVal = cartItemsCounters.freeShipping(items);
  const savesOnShippingVal = cartItemsCounters.savesOnShipping(items);
  const discountSummaryVal = cartItemsCounters.discountSummary(uniqueItemPrice);

  return (
    <section className="fixed right-20 flex w-1/4 flex-col items-start justify-start gap-3">
      <h1 className="common-title text-2xl">Summary</h1>
      <div className="mt-4 flex flex-col items-start justify-start gap-3">
        <p className="relative w-96 text-base text-gray-900">
          Total price(No tax)
          <span className="absolute right-0 font-oswald text-lg">
            {(totalPriceVal - (totalPriceVal * 0.12)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </p>
        <p className="relative w-96 text-base text-gray-900">
          Total savings on
          {' '}
          <br />
          {' '}
          items(
          {freeShippingVal}
          ) with free shipping

          <span className="absolute right-0 font-oswald text-lg">
            -
            {' '}
            {savesOnShippingVal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </p>
        <p className="relative w-96 text-base text-gray-900">
          Tax(12%) of total price
          <span className="absolute right-0 font-oswald text-lg">
            {(totalPriceVal * 0.12).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </p>
        <p className="relative w-96 text-base text-gray-900">
          Discounts (
          {discountSummaryVal > 0
            ? `${+((discountSummaryVal / (totalPriceVal + savesOnShippingVal)) * 100).toFixed(2)}%`
            : '0%'}
          )
          <span className="absolute right-0 font-oswald text-lg">
            {discountSummaryVal > 0
              ? `- ${discountSummaryVal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
              : (0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </p>
        <p className="relative w-96 text-base font-bold text-gray-900">
          Payable sum
          <span className="absolute right-0 font-oswald text-lg">
            {(uniqueItemPrice[itemsId] > 0
              ? totalPriceVal - (savesOnShippingVal + uniqueItemPrice[itemsId])
              : totalPriceVal - savesOnShippingVal).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </p>

        <hr className="my-5 h-0.5 w-full bg-gray-900" />
        <div className="relative w-96 text-lg font-bold text-gray-900">
          Balance
          <span className="absolute right-0 font-oswald">
            {(0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </div>
      </div>
      <Button
        size="lg"
        className="mt-2 w-96 text-lg tracking-wider transition-all duration-300 hover:bg-gray-800"
      >
        Checkout
      </Button>
    </section>
  );
};

export default CartSummary;
