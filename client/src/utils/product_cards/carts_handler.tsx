import CloseIcon from '@/icons/close_icon.svg?react';
import { useAppDispatch, useAppSelector } from '@/redux.hooks';
import { removeFromCart, updateCart } from '@/store/features/item.counter.slice';
import type { CartProps } from '@/types/home.types';

const AddToCartMenu: React.FC<CartProps> = (
  {
    quantity, itemId, product, closeAddCart,
  },
): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleAddToCart = (id: string, cartSelector: number) => {
    // Prevent negative values for cart quantity
    const updatedCartItem = Math.max(0, Math.min(quantity, cartSelector));
    if (updatedCartItem > 0) {
      dispatch(updateCart({ id, amountItems: updatedCartItem, cartItems: product }));
    }
    return updatedCartItem === 0 && dispatch(removeFromCart({ id }));
  };

  const cartSelector = useAppSelector((state) => {
    const selectedItem = state.counter.find((item) => item.id === itemId);
    return selectedItem ? Math.max(0, Math.min(selectedItem.amountItems, quantity)) : 0;
  });

  return (
    <div className="relative w-60 rounded-md bg-[#222222] p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-full bg-gray-400 text-3xl text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-500 hover:text-white"
          onClick={() => handleAddToCart(itemId, cartSelector - 1)}
        >
          &ndash;
        </button>
        <input
          type="text"
          value={cartSelector}
          readOnly
          className="pointer-events-none h-12 w-20 select-none rounded-md border-none bg-gray-200 text-center text-2xl"
        />
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-full bg-gray-400 text-3xl text-green-500 transition-colors duration-300 ease-in-out hover:bg-green-500 hover:text-white"
          onClick={() => handleAddToCart(itemId, cartSelector + 1)}
        >
          &#43;
        </button>
      </div>
      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 shadow-gray-900/50 transition-all duration-300 ease-in-out hover:bg-[#222222] hover:shadow-xl"
          onClick={closeAddCart}
        >
          <CloseIcon className="size-6 fill-gray-600 hover:fill-red-500" />
        </button>
      </div>
    </div>
  );
};

export default AddToCartMenu;
