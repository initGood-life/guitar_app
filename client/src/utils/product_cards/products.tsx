import AddShoppingCart from '@icons/add_shopping_cart_FILL0_wght400_GRAD0_opsz24.svg?react';
import {
  Button, Card, CardBody, CardFooter, CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';

import { usePrevious } from '@/custom/custom.hooks';
import { useAppSelector } from '@/redux.hooks';
import { selectedItems } from '@/store/features/item.counter.slice';
import type { ProductType } from '@/types/home.types';
import { AddToCartMenu, showSwal } from '@/utils';

export const CardBlock: React.FC<ProductType> = ({ product }): JSX.Element => {
  const [showAddCart, setShowAddCart] = useState<boolean>(false);
  const itemsInCart = useAppSelector(selectedItems)
    .find((item) => item.id === product._id);
  const isItemInCart = itemsInCart?.cartItem ?? 0;
  const prevQuantity = usePrevious(isItemInCart, 0) ?? 0;
  const isImage = product.image.length !== 0
    ? product.image[0]
    : 'images/image_not_available.png';
  const isAvailable = product.available > 0;

  const handleLeave = () => {
    if (isItemInCart > prevQuantity) {
      showSwal({
        title: 'Item added to cart',
        icon: 'success',
      });
    }
    setShowAddCart(false);
  };

  return (
    <Card className="flex w-[350px] max-w-sm shrink-0 flex-col bg-white">
      <CardHeader shadow={false} floated={false} className="h-80 transform-gpu cursor-pointer overflow-hidden shadow-md shadow-blue-gray-900/50 transition-transform duration-500 ease-in-out hover:scale-110">
        <img src={isImage} alt={product?.model ?? 'no image'} className="h-full w-full rounded-lg object-cover " />
      </CardHeader>
      <CardBody className="grow">
        <Typography variant="h3" className="mb-2 text-center font-oswald font-semibold text-gray-800">
          {product?.brand?.name ?? 'Unknown Brand'}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-2 text-center">
          {product.model}
        </Typography>
      </CardBody>
      <Typography variant="h3" className="pointer-events-none flex items-center justify-center">
        <div className="font-oswald font-semibold tracking-wider text-black">
          $
          {product.price}
        </div>
        <p className={`${isAvailable ? 'text-green-600' : 'text-red-700'} ml-2 text-left font-rubik text-sm font-normal uppercase`}>
          {product.available !== 0 ? 'In stock' : 'Out of stock'}
        </p>
      </Typography>
      <CardFooter className="flex h-[105px] justify-center p-4">
        <div className="relative">
          {
              showAddCart && isAvailable && (
                <AddToCartMenu
                  quantity={product.available}
                  itemId={product?._id ?? 'no-id'}
                  closeAddCart={() => handleLeave()}
                />
              )
            }
          {!showAddCart && (
          <Button
            onClick={() => setShowAddCart(true)}
            size="md"
            variant="filled"
            disabled={!isAvailable}
            className="my-button rounded-md bg-gray-900 text-white transition-all duration-500 ease-in-out hover:bg-gray-800"
          >
            <div className="flex items-center space-x-2 font-rubik tracking-wider">
              <p className="border-r-1 border-white pr-4 text-lg">Add to Cart</p>
              <AddShoppingCart
                className={`${isItemInCart ? 'my-icon fill-green-500' : 'my-icon fill-current'} h-8 w-8 transition duration-300 ease-in-out group-hover:rotate-12`}
              />
            </div>
          </Button>
          )}

        </div>
      </CardFooter>

    </Card>
  );
};
