import { Link } from 'react-router-dom';

const EmptyCart = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-white">
    <div className="text-center">
      <h2 className="common-title mb-4 text-3xl">Your cart is empty</h2>
      <p className="mb-8 text-gray-500">
        It looks like you haven&#39;t added any products to your cart yet.
      </p>
      <Link
        className="rounded bg-gray-900 p-4 text-xl font-bold uppercase text-white hover:bg-gray-800 hover:text-white"
        to="/shop"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);

export default EmptyCart;
