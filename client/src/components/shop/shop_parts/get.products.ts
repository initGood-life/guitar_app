import type { FetchProductsQuery } from '@/types/shop.types';
import { showSwal } from '@/utils';

import { getCountryName, priceDefaults } from './filters.logic';

const fetchProducts = async ({
  fetchPaginatedProducts, setProducts, setCountryName, setAllFilters, brands,
}: FetchProductsQuery) => {
  try {
    const { minProductPrice, maxProductPrice } = priceDefaults;
    const productResponse = await fetchPaginatedProducts({
      page: 1,
      limit: 20,
      price: [100, 60000],
      brand: brands?.map((brand) => brand._id) as string[],
      sort: 'model',
    }).unwrap();

    setProducts(productResponse.docs);

    const countryNames = getCountryName(productResponse);
    const minPrice = minProductPrice(productResponse);
    const maxPrice = maxProductPrice(productResponse);

    setCountryName(countryNames);
    setAllFilters((prevState) => ({
      ...prevState,
      priceRange: [minPrice, maxPrice, minPrice],
    }));
  } catch (err) {
    showSwal({
      title: 'Error Fetching Products',
      text: `${(err as Error).message}`,
      icon: 'error',
    });
  }
};

export default fetchProducts;
