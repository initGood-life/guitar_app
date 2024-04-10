import type { ProductListProps } from '@/types/home.types';
import { CardBlock } from '@/utils/product_cards/products';

const ProductList: React.FC<ProductListProps> = ({ products, title }): JSX.Element => (
  <>
    <h1 className="bg-gradient-to-r from-gray-800 to-black p-3 text-center text-4xl font-bold tracking-wide text-white">{title}</h1>
    <div className="m-6 flex flex-row space-x-6">
      {products.map((product) => (
        <CardBlock
          product={product}
          title={title}
          key={product?._id}
        />
      ))}
    </div>
  </>
);

export default ProductList;
