import { useFetchAllProductsQuery } from '@/store/api/product.api';
import { Spinner } from '@/utils';
import Promotion from '@/utils/promo/promotion';

import Slider from './home_parts/featured';
import ProductList from './home_parts/product_list';

const promoItems = {
  title: 'Up to 40% off',
  description: 'In second hand guitar sale now on!',
  button: {
    label: 'Shop Now',
    link: '/shop',
  },
};

// TODO mak product cards responsive when user clicks the card zoom in the image add description etc

const Home = (): React.JSX.Element => {
  // Fetch products sorted by items sold in descending order
  const {
    data: bestSoldProducts,
    isFetching: bestSoldIsFetching,
  } = useFetchAllProductsQuery(
    { limit: 4, order: 'desc', sort: 'item_sold' },
    { pollingInterval: 900000 },
  );

  // Fetch products sorted by date in descending order
  const {
    data: recentlyAddedProducts,
    isFetching: recentIsFetching,
  } = useFetchAllProductsQuery(
    { limit: 4, order: 'desc', sort: 'date' },
    { pollingInterval: 900000 },
  );

  return (
    <>
      <Slider />
      {
        recentIsFetching ? (
          <Spinner />
        ) : (
          recentlyAddedProducts && (
            <ProductList
              products={recentlyAddedProducts}
              title="Now Available"
            />
          )
        )
      }
      <Promotion {...promoItems} />
      {
        bestSoldIsFetching ? (
          <Spinner />
        ) : (
          bestSoldProducts && (
            <ProductList
              products={bestSoldProducts}
              title="Trending Now"
            />
          )
        )
      }
    </>
  );
};

export default Home;
